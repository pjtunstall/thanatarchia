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
  battleChronicle,
  recruitChronicle,
} from "@/data/chronicles";
import {
  pickAValidChronicler,
  abandonTerritoryToOtherFactionChronicle,
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

        // Store original defender info before any updates.
        const originalDefenderName = toTerritory.owner;
        const originalDefenseForce = toTerritory.troops!;

        const attackStrength = totalTroops + Math.random() * 400;
        let defenseStrength = originalDefenseForce + Math.random() * 600;
        if (toTerritory.conditionModifier) {
          defenseStrength += toTerritory.conditionModifier * 300;
        }

        const victory = attackStrength > defenseStrength;

        const { attackerLosses, defenderLosses } = calculateCasualties({
          attackForce: totalTroops,
          defenseForce: originalDefenseForce,
          victory,
        });

        // Calculate survivors.
        const attackerSurvivors = totalTroops - attackerLosses;
        const defenderSurvivors = originalDefenseForce - defenderLosses;

        updateTerritories((prev) => {
          let updatedTerritories = prev.map((t) => {
            // Update target territory first
            if (t.name === to) {
              if (victory) {
                // Player won: survivors occupy the territory.
                return {
                  ...t,
                  owner: factions[playerIndex].name,
                  troops: attackerSurvivors,
                };
              } else {
                // Player lost: defenders keep their survivors.
                return {
                  ...t,
                  troops: defenderSurvivors,
                };
              }
            }
            return t;
          });

          // Handle source territories: remove sent troops initially.
          updatedTerritories = updatedTerritories.map((t) => {
            const sourceMatch = sources.find((s) => s.from === t.name);
            if (sourceMatch) {
              return {
                ...t,
                troops: Math.max(0, t.troops! - sourceMatch.troops),
              };
            }
            return t;
          });

          // If attack failed, distribute survivors back to source territories proportionally.
          if (!victory && attackerSurvivors > 0) {
            let survivorsDistributed = 0;

            sources.forEach((source, index) => {
              const proportion = source.troops / totalTroops;
              const survivorsForThisSource =
                index === sources.length - 1
                  ? attackerSurvivors - survivorsDistributed // Last source gets remainder to avoid rounding errors.
                  : Math.floor(attackerSurvivors * proportion);

              survivorsDistributed += survivorsForThisSource;

              updatedTerritories = updatedTerritories.map((t) => {
                if (t.name === source.from) {
                  return {
                    ...t,
                    troops: t.troops! + survivorsForThisSource,
                  };
                }
                return t;
              });
            });
          }

          // Handle defender survivor redistribution (only if player won and defenders have survivors).
          if (victory && defenderSurvivors > 0) {
            const defenderTerritories = updatedTerritories.filter(
              (t) => t.owner === originalDefenderName
            );

            if (defenderTerritories.length > 0) {
              const randomDefenderTerritory = randomItem(defenderTerritories);
              updatedTerritories = updatedTerritories.map((t) => {
                if (t.name === randomDefenderTerritory.name) {
                  return { ...t, troops: (t.troops || 0) + defenderSurvivors };
                }
                return t;
              });
            }
            // If no defender territories exist, survivors are lost.
          }

          return updatedTerritories;
        });

        // Chronicle and battle report.
        let author = pickAValidChronicler(hasChangedFromEudaemonia);
        let bias =
          author.name === chroniclers[adviserIndex].name
            ? "friendly"
            : "hostile";
        const winners = victory
          ? factions[playerIndex].name
          : originalDefenderName;
        const losers = victory
          ? originalDefenderName
          : factions[playerIndex].name;
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
          stats: `Attackers: ${totalTroops}\nDefenders: ${originalDefenseForce}\nYour losses: ${attackerLosses}\nDefender losses: ${defenderLosses}`,
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
      addChronicleEntry,
      hasChangedFromEudaemonia,
      setFactionAggressions,
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
      if (Math.random() > 0.2) {
        return;
      }

      updateTerritories((currentTerritories) => {
        const aiTerritory = currentTerritories.find(
          (t) => t.name === territoryName
        );

        if (!aiTerritory || aiTerritory.owner !== factions[factionIndex].name) {
          return currentTerritories;
        }

        if (!aiTerritory.troops || aiTerritory.troops < 600) {
          // Need at least 600: 100 garrison + 500 minimum attack.
          return currentTerritories;
        }

        const adjacentNames = adjacentTerritories[territoryName] || [];
        const adjacentEnemyTerritories = adjacentNames
          .map((name) => currentTerritories.find((t) => t.name === name))
          .filter((t) => t && t.owner !== factions[factionIndex].name);

        if (adjacentEnemyTerritories.length === 0) return currentTerritories;

        const aggression = factionAggressions[factionIndex];

        // Score targets: aggression biases targeting player-owned territories.
        const scoredTarget = adjacentEnemyTerritories.reduce(
          (best, current) => {
            const isPlayerOwned = current.owner === factions[playerIndex].name;
            const troopScore = current.troops ?? Infinity;
            const score = troopScore - (isPlayerOwned ? aggression * 10 : 0);
            return !best || score < best.score
              ? { territory: current, score, isPlayerOwned }
              : best;
          },
          null as null | {
            territory: Territory;
            score: number;
            isPlayerOwned: boolean;
          }
        );

        if (!scoredTarget) return currentTerritories;

        const fromTerritory = aiTerritory;
        const toTerritory = scoredTarget.territory;

        // Calculate attack force: 80% of troops above garrison requirement.
        const availableForAttack = fromTerritory.troops! - 100; // Leave 100 as garrison.
        const attackForce = Math.floor(availableForAttack * 0.8);
        const garrisonLeft = fromTerritory.troops! - attackForce; // This will be at least 100.

        // Abandoned player-owned territory: no battle, just move in troops.
        if (
          toTerritory.owner === factions[playerIndex].name &&
          toTerritory.troops === 0
        ) {
          const { author, statement } = abandonTerritoryToOtherFactionChronicle(
            {
              territoryName: toTerritory.name,
              playerFactionName: toTerritory.owner,
              otherFactionName: fromTerritory.owner,
              adviserIndex,
              hasChangedFromEudaemonia,
            }
          );

          addChronicleEntry(author, statement, turn);

          return currentTerritories.map((t) => {
            if (t.name === fromTerritory.name) {
              return { ...t, troops: garrisonLeft };
            }
            if (t.name === toTerritory.name) {
              return { ...t, troops: attackForce, owner: fromTerritory.owner };
            }
            return t;
          });
        }

        // Standard battle resolution.
        const defenderName = toTerritory.owner;
        const defenseForce = toTerritory.troops!;
        const attackStrength = attackForce + Math.random() * 400;
        const defenseStrength = defenseForce + Math.random() * 600;
        const victory = attackStrength > defenseStrength;

        const { attackerLosses, defenderLosses } = calculateCasualties({
          attackForce,
          defenseForce,
          victory,
        });

        // Calculate survivors.
        const attackerSurvivors = attackForce - attackerLosses;
        const defenderSurvivors = defenseForce - defenderLosses;

        let updatedTerritories = currentTerritories.map((t) => {
          if (t.name === fromTerritory.name) {
            if (victory) {
              // Attackers won: only garrison remains in origin territory.
              return {
                ...t,
                troops: garrisonLeft,
              };
            } else {
              // Attackers lost: survivors return to origin territory.
              return {
                ...t,
                troops: garrisonLeft + attackerSurvivors,
              };
            }
          }
          if (t.name === toTerritory.name) {
            if (victory) {
              // Attackers won: survivors occupy the territory.
              return {
                ...t,
                troops: attackerSurvivors,
                owner: fromTerritory.owner,
              };
            } else {
              // Defenders won: survivors remain.
              return {
                ...t,
                troops: defenderSurvivors,
              };
            }
          }
          return t;
        });

        // If defenders lost and have survivors, relocate them.
        if (victory && defenderSurvivors > 0) {
          const defenderTerritories = updatedTerritories.filter(
            (t) => t.owner === defenderName
          );

          if (defenderTerritories.length > 0) {
            const randomDefenderTerritory = randomItem(defenderTerritories);
            updatedTerritories = updatedTerritories.map((t) => {
              if (t.name === randomDefenderTerritory.name) {
                return { ...t, troops: (t.troops || 0) + defenderSurvivors };
              }
              return t;
            });
          }
          // If no defender territories exist, survivors are lost.
        }

        // Chronicle and player battle report.
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
            stats: `Attackers: ${attackForce}\nDefenders: ${defenseForce}\nAttacker losses: ${attackerLosses}\nYour losses: ${defenderLosses}`,
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
