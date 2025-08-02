import { useCallback } from "react";

import {
  Faction,
  Territory,
  Character,
  AttackOrder,
  BattleReport,
} from "@/types/gameTypes";
import { randomItem } from "@/lib/utils";
import { costOfRecruiting, troopUnit } from "@/data/gameData";
import {
  chroniclers,
  chroniclersAfterTheIncident,
  battleChronicle,
  recruitChronicle,
} from "@/data/chronicles";

type UseCombatProps = {
  territories: Territory[];
  playerIndex: number;
  adjacentTerritories: Record<string, string[]>;
  factionTerritories: string[][];
  factions: Faction[];
  factionTreasures: number[];
  factionLeaders: Character[];
  updateTerritories: (updater: (prev: Territory[]) => Territory[]) => void;
  setFactionTreasures: (updater: (prev: number[]) => number[]) => void;
  addChronicleEntry: (
    author: Character,
    statement: string,
    turn: number
  ) => void;
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  scheduledAttacks: AttackOrder[];
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  enqueueBattleReport: (BattleReport) => void;
  selectedTerritoryName: string | null;
  adviserIndex: number;
  turn: number;
  hasChangedFromEudaemonia: boolean;
  factionAggressions: number[];
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
};

export function useCombat({
  territories,
  playerIndex,
  adjacentTerritories,
  factionTerritories,
  factionLeaders,
  factions,
  factionTreasures,
  scheduledAttacks,
  adviserIndex,
  turn,
  hasChangedFromEudaemonia,
  factionAggressions,
  setFactionAggressions,
  updateTerritories,
  setFactionTreasures,
  addChronicleEntry,
  setScheduledAttacks,
  enqueueBattleReport,
}: UseCombatProps) {
  const handleRecruit = useCallback(
    (selectedTerritoryName) => {
      const playerTreasure = factionTreasures[playerIndex];
      if (playerTreasure < costOfRecruiting) return;
      const selectedTerritory = territories.find(
        (t) => t.name === selectedTerritoryName
      );
      if (!selectedTerritory) return;

      updateTerritories((prev) =>
        prev
          .filter((t) => t.name !== selectedTerritoryName)
          .concat({
            ...selectedTerritory,
            troops: selectedTerritory.troops + troopUnit,
          })
      );

      setFactionTreasures((prev) => {
        const updated = [...prev];
        updated[playerIndex] -= costOfRecruiting;
        return updated;
      });

      const author = pickAValidChronicler(hasChangedFromEudaemonia);
      const bias =
        author.name === chroniclers[adviserIndex].name ? "friendly" : "hostile";
      const factionName = factions[playerIndex].name;
      const chronicleEntryStatement = recruitChronicle(
        author,
        bias,
        selectedTerritoryName,
        factionName,
        factionLeaders[playerIndex]
      );
      addChronicleEntry(author, chronicleEntryStatement, turn);
    },
    [
      factionTreasures,
      factionTerritories,
      factionLeaders,
      factions,
      playerIndex,
      updateTerritories,
      setFactionTreasures,
      addChronicleEntry,
    ]
  );

  const handlePlayerAttacks = useCallback(
    (adviserIndex: number, turn: number) => {
      const groupedAttacks = groupScheduledAttacks(scheduledAttacks);
      const battleReportEntries: BattleReport[] = [];

      groupedAttacks.forEach(({ to, totalTroops, sources }) => {
        const toTerritory = territories.find((t) => t.name === to);
        if (!toTerritory) return;

        const isEnemy = toTerritory.owner !== factions[playerIndex].name;
        if (!isEnemy) return;

        setFactionAggressions((prev) => {
          const updated = [...prev];
          updated[
            factions.indexOf(factions.find((f) => f.name === toTerritory.owner))
          ] = 0.7;
          return updated;
        });

        const attackStrength = totalTroops + Math.random() * 500;
        const defenseStrength =
          toTerritory.troops +
          Math.random() * 500 +
          (toTerritory.conditionModifier || 0);

        const victory = attackStrength > defenseStrength;

        const { attackerLosses, defenderLosses } = calculateCasualties({
          attackForce: totalTroops,
          defenseForce: toTerritory.troops!,
          victory,
        });

        if (victory) {
          const survivors = Math.max(0, totalTroops - attackerLosses);

          updateTerritories((prev) =>
            prev.map((t) => {
              if (sources.some((s) => s.from === t.name)) {
                const sent = sources.find((s) => s.from === t.name)!.troops;
                return {
                  ...t,
                  troops: Math.max(0, t.troops! - sent),
                };
              }
              if (t.name === to) {
                return {
                  ...t,
                  owner: factions[playerIndex].name,
                  troops: survivors,
                };
              }
              return t;
            })
          );
        } else {
          updateTerritories((prev) =>
            prev.map((t) => {
              const match = sources.find((s) => s.from === t.name);
              if (match) {
                return {
                  ...t,
                  troops: Math.max(
                    0,
                    t.troops! - Math.floor(attackerLosses / sources.length)
                  ),
                };
              }
              return t;
            })
          );
        }

        let author = pickAValidChronicler(hasChangedFromEudaemonia);
        let bias =
          author.name === chroniclers[adviserIndex].name
            ? "friendly"
            : "hostile";
        const winners = victory
          ? factions[playerIndex].name
          : toTerritory.owner;
        const losers = victory ? toTerritory.owner : factions[playerIndex].name;
        const chronicleEntryStatement = battleChronicle({
          chronicler: author,
          bias,
          success: victory,
          winners,
          losers,
          territoryName: to,
          leaderCharacter: factionLeaders[playerIndex],
        });
        addChronicleEntry(author, chronicleEntryStatement, turn);
        battleReportEntries.push({
          author,
          message: chronicleEntryStatement,
          stats: `Attack strength: ${totalTroops}\nDefense strength: ${toTerritory.troops}\nYour losses: ${attackerLosses}\nDefender losses: ${defenderLosses}`,
          success: victory,
        });
      });

      setScheduledAttacks([]);
      populateBattleReportQueue(battleReportEntries, enqueueBattleReport);
    },
    [
      scheduledAttacks,
      territories,
      factions,
      factionLeaders,
      playerIndex,
      updateTerritories,
      chroniclers,
      setScheduledAttacks,
      enqueueBattleReport,
    ]
  );

  const handleReinforce = useCallback(
    (
      fromTerritoryName: string,
      toTerritoryName: string,
      playMarch: () => void
    ) => {
      const fromTerritory = territories.find(
        (t) => t.name === fromTerritoryName
      );
      const toTerritory = territories.find((t) => t.name === toTerritoryName);

      if (
        !fromTerritory ||
        !toTerritory ||
        fromTerritory.owner !== factions[playerIndex].name ||
        toTerritory.owner !== factions[playerIndex].name ||
        !adjacentTerritories[fromTerritoryName]?.includes(toTerritoryName)
      )
        return;

      // Calculate troops already assigned for attack from this territory...
      const troopsAssignedToAttack = scheduledAttacks
        .filter((a) => a.from === fromTerritoryName)
        .reduce((sum, a) => sum + a.troops, 0);

      const availableTroops = fromTerritory.troops - troopsAssignedToAttack;

      // ...and abort reinforcement if all troops are assigned.
      if (availableTroops < 1) return;

      playMarch();

      const reinforcements = Math.min(troopUnit, availableTroops);

      updateTerritories((prev) =>
        prev.map((t) => {
          if (t.name === fromTerritoryName) {
            return { ...t, troops: t.troops - reinforcements };
          }
          if (t.name === toTerritoryName) {
            return { ...t, troops: t.troops + reinforcements };
          }
          return t;
        })
      );
    },
    [
      territories,
      playerIndex,
      factions,
      adjacentTerritories,
      scheduledAttacks,
      updateTerritories,
    ]
  );

  const handleUndoReinforce = useCallback(
    (
      fromTerritoryName: string,
      toTerritoryName: string,
      playMarch: () => void
    ) => {
      const fromTerritory = territories.find(
        (t) => t.name === fromTerritoryName
      );
      const toTerritory = territories.find((t) => t.name === toTerritoryName);

      if (
        !fromTerritory ||
        !toTerritory ||
        fromTerritory.owner !== factions[playerIndex].name ||
        toTerritory.owner !== factions[playerIndex].name ||
        !adjacentTerritories[fromTerritoryName]?.includes(toTerritoryName)
      )
        return;

      const troopsToMoveBack = Math.min(troopUnit, fromTerritory.troops);

      if (troopsToMoveBack < 1) return;

      playMarch();

      updateTerritories((prev) =>
        prev.map((t) => {
          if (t.name === fromTerritoryName) {
            return { ...t, troops: t.troops - troopsToMoveBack };
          }
          if (t.name === toTerritoryName) {
            return { ...t, troops: t.troops + troopsToMoveBack };
          }
          return t;
        })
      );
    },
    [territories, playerIndex, factions, adjacentTerritories, updateTerritories]
  );

  const getValidAttackTargets = useCallback(
    (fromTerritoryName: string) => {
      return (
        adjacentTerritories[fromTerritoryName]
          ?.map((name) => territories.find((t) => t.name === name))
          .filter((t) => t && t.owner !== factions[playerIndex].name) || []
      );
    },
    [territories, playerIndex, factions, adjacentTerritories]
  );

  const aiRecruit = useCallback(
    (factionIndex: number) => {
      if (factionTreasures[factionIndex] < costOfRecruiting) return;

      const randomTerritoryName = randomItem(factionTerritories[factionIndex]);

      updateTerritories((prevTerritories) => {
        return prevTerritories.map((t) => {
          if (t.name === randomTerritoryName) {
            return { ...t, troops: t.troops! + troopUnit };
          }
          return t;
        });
      });

      setFactionTreasures((prev) => {
        const updated = [...prev];
        updated[factionIndex] -= costOfRecruiting;
        return updated;
      });
    },
    [
      factionTreasures,
      factionTerritories,
      factions,
      updateTerritories,
      setFactionTreasures,
    ]
  );

  const handleAIAttacks = useCallback(
    (factionIndex: number, territoryName: string) => {
      updateTerritories((currentTerritories) => {
        const aiTerritory = currentTerritories.find(
          (t) => t.name === territoryName
        );

        if (!aiTerritory || aiTerritory.owner !== factions[factionIndex].name) {
          return currentTerritories;
        }

        const adjacentNames = adjacentTerritories[territoryName] || [];

        const adjacentEnemyTerritories = adjacentNames
          .map((name) => currentTerritories.find((t) => t.name === name))
          .filter((t) => t && t.owner !== factions[factionIndex].name);

        if (adjacentEnemyTerritories.length === 0) return currentTerritories;

        if (!aiTerritory.troops || aiTerritory.troops <= 500) {
          return currentTerritories;
        }

        const aggression = factionAggressions[factionIndex];

        const scoredTarget = adjacentEnemyTerritories.reduce(
          (best, current) => {
            const isPlayerOwned = current.owner === factions[playerIndex].name;
            const troopScore = current.troops ?? Infinity;
            const score = troopScore - (isPlayerOwned ? aggression * 10 : 0);
            return !best || score < best.score
              ? { territory: current, score }
              : best;
          },
          null as null | { territory: Territory; score: number }
        );

        if (!scoredTarget || Math.random() >= aggression) {
          return currentTerritories;
        }

        const fromTerritory = aiTerritory;
        const toTerritory = scoredTarget.territory;

        const attackForce = Math.floor(fromTerritory.troops! * 0.6);
        const defenseForce = toTerritory.troops!;
        const attackStrength = attackForce + Math.random() * 400;
        const defenseStrength =
          defenseForce < 100 ? 0 : defenseForce + Math.random() * 600;
        const victory = attackStrength > defenseStrength;

        const { attackerLosses, defenderLosses } = calculateCasualties({
          attackForce,
          defenseForce,
          victory,
        });

        let updatedTerritories: Territory[];

        if (victory) {
          updatedTerritories = currentTerritories.map((t) => {
            if (t.name === territoryName) {
              return {
                ...t,
                troops: Math.max(0, t.troops! - attackForce),
              };
            }
            if (t.name === toTerritory.name) {
              return {
                ...t,
                troops: Math.max(200, t.troops! - defenderLosses),
                owner: fromTerritory.owner,
              };
            }
            return t;
          });
        } else {
          updatedTerritories = currentTerritories.map((t) => {
            if (t.name === territoryName) {
              return {
                ...t,
                troops: Math.max(200, t.troops! - attackerLosses),
              };
            }
            if (t.name === toTerritory.name) {
              return {
                ...t,
                troops: Math.max(0, t.troops! - defenderLosses),
              };
            }
            return t;
          });
        }

        const author: Character = pickAValidChronicler(
          hasChangedFromEudaemonia
        );
        const bias =
          author.name === fromTerritory.owner ? "friendly" : "hostile";
        const winners = victory ? fromTerritory.owner : toTerritory.owner;
        const losers = victory ? toTerritory.owner : fromTerritory.owner;

        const attackerFaction = factions.find(
          (f) => f.name === fromTerritory.owner
        );
        const attackerIndex = factions.indexOf(attackerFaction!);
        const leaderCharacter = factionLeaders[attackerIndex];

        const chronicleEntryStatement = battleChronicle({
          chronicler: author,
          bias,
          success: victory,
          winners,
          losers,
          territoryName: toTerritory.name,
          leaderCharacter,
        });

        addChronicleEntry(author, chronicleEntryStatement, turn);

        if (toTerritory.owner === factions[playerIndex].name) {
          const battleReport: BattleReport = {
            author,
            message: chronicleEntryStatement,
            stats: `Attack strength: ${attackForce}\nDefense strength: ${defenseForce}\nAttacker losses: ${attackerLosses}\nYour losses: ${defenderLosses}`,
            success: !victory,
          };

          populateBattleReportQueue([battleReport], enqueueBattleReport);
        }

        return updatedTerritories;
      });
    },
    [
      updateTerritories,
      factions,
      adjacentTerritories,
      factionAggressions,
      addChronicleEntry,
      enqueueBattleReport,
      factionLeaders,
      hasChangedFromEudaemonia,
      playerIndex,
      turn,
    ]
  );

  const executeAITurn = useCallback(() => {
    factions.forEach((faction, i) => {
      if (i === playerIndex) return;

      aiRecruit(i);

      const aiTerritoryNames = factionTerritories[i];

      aiTerritoryNames.forEach((aiTerritoryName) => {
        handleAIAttacks(i, aiTerritoryName);
      });
    });
  }, [factions, playerIndex, aiRecruit, factionTerritories, handleAIAttacks]);

  return {
    handleRecruit,
    handlePlayerAttacks,
    handleReinforce,
    handleUndoReinforce,
    getValidAttackTargets,
    executeAITurn,
  };
}

type AttackGroup = {
  to: string;
  from: string[]; // All attackers
  totalTroops: number;
  sources: { from: string; troops: number }[];
};

function groupScheduledAttacks(scheduledAttacks: AttackOrder[]): AttackGroup[] {
  const grouped: { [key: string]: AttackGroup } = {};

  for (const attack of scheduledAttacks) {
    if (!grouped[attack.to]) {
      grouped[attack.to] = {
        to: attack.to,
        from: [attack.from],
        totalTroops: attack.troops,
        sources: [{ from: attack.from, troops: attack.troops }],
      };
    } else {
      grouped[attack.to].from.push(attack.from);
      grouped[attack.to].totalTroops += attack.troops;
      grouped[attack.to].sources.push({
        from: attack.from,
        troops: attack.troops,
      });
    }
  }

  return Object.values(grouped);
}

function populateBattleReportQueue(
  entries: BattleReport[],
  enqueueBattleReport: (message: BattleReport) => void
) {
  for (const entry of entries) {
    enqueueBattleReport(entry);
  }
}

function pickAValidChronicler(hasChangedFromEudaemonia: boolean): Character {
  if (hasChangedFromEudaemonia) {
    return randomItem(chroniclersAfterTheIncident);
  } else {
    return randomItem(chroniclers);
  }
}

type CasualtyResult = {
  attackerLosses: number;
  defenderLosses: number;
};

function calculateCasualties({
  attackForce,
  defenseForce,
  victory,
}: {
  attackForce: number;
  defenseForce: number;
  victory: boolean;
}): CasualtyResult {
  if (defenseForce === 0) {
    return { attackerLosses: 0, defenderLosses: 0 };
  }

  let attackerLosses: number;
  let defenderLosses: number;

  if (victory) {
    attackerLosses = Math.floor(attackForce * 0.08 + Math.random() * 40);
    defenderLosses = Math.floor(defenseForce * 0.5 + Math.random() * 100);
  } else {
    attackerLosses = Math.floor(attackForce * 0.5 + Math.random() * 150);
    defenderLosses = Math.floor(defenseForce * 0.05 + Math.random() * 30);
  }

  return {
    attackerLosses: Math.min(attackForce, attackerLosses),
    defenderLosses: Math.min(defenseForce, defenderLosses),
  };
}
