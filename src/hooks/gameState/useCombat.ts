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
  enqueueBattleMessage: (BattleReport) => void;
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
  enqueueBattleMessage,
}: UseCombatProps) {
  const handleRecruit = useCallback(
    (selectedTerritoryName) => {
      const playerTreasury = factionTreasures[playerIndex];
      if (playerTreasury < costOfRecruiting) return;
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

  const handleScheduledAttacks = useCallback(
    (adviserIndex: number, turn: number) => {
      const groupedAttacks = groupScheduledAttacks(scheduledAttacks);
      const battleReportEntries: BattleReport[] = [];
      let losses = 0;

      groupedAttacks.forEach(({ to, from, totalTroops, sources }) => {
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

        if (victory) {
          const survivors = Math.max(
            0,
            toTerritory.troops === 0
              ? totalTroops
              : Math.floor(totalTroops - toTerritory.troops * 0.3)
          );
          losses = totalTroops - survivors;

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
          const casualties = Math.floor(Math.random() * 300 + 200);
          losses = casualties;
          updateTerritories((prev) =>
            prev.map((t) => {
              const match = sources.find((s) => s.from === t.name);
              if (match) {
                return {
                  ...t,
                  troops: Math.max(
                    0,
                    t.troops! - Math.floor(casualties / sources.length)
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
          stats: `Attack strength: ${totalTroops}\nDefense strength: ${toTerritory.troops}\nLosses: ${losses}`,
          success: victory,
        });
      });

      setScheduledAttacks([]);
      enqueueBattleReports(battleReportEntries, enqueueBattleMessage);
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
      enqueueBattleMessage,
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

  // AI recruitment logic
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

      // Update faction treasures
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

  const executeAIAttack = useCallback(
    (fromId: string, toId: string) => {
      const fromTerritory = territories.find((t) => t.name === fromId);
      const toTerritory = territories.find((t) => t.name === toId);

      if (!fromTerritory || !toTerritory) return;

      const attackForce = Math.floor(fromTerritory.troops! * 0.6);
      const defenseForce = toTerritory.troops!;
      const attackStrength = attackForce + Math.random() * 400;
      const defenseStrength =
        defenseForce < 100 ? 0 : defenseForce + Math.random() * 600;
      const victory = attackStrength > defenseStrength;

      let losses = 0;

      if (victory) {
        updateTerritories((prev) =>
          prev.map((t) => {
            if (t.name === fromId) {
              return { ...t, troops: t.troops! - attackForce };
            }
            if (t.name === toId) {
              return {
                ...t,
                owner: fromTerritory.owner,
                troops: Math.floor(attackForce * 0.6),
              };
            }
            return t;
          })
        );
        losses = defenseForce;
      } else {
        updateTerritories((prev) =>
          prev.map((t) =>
            t.name === fromId
              ? {
                  ...t,
                  troops: Math.max(
                    200,
                    t.troops! - Math.floor(attackForce * 0.3)
                  ),
                }
              : t
          )
        );
        losses = Math.floor(attackForce * 0.3);
      }

      const author = pickAValidChronicler(hasChangedFromEudaemonia);
      const bias = author.name === fromTerritory.owner ? "friendly" : "hostile";
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
        territoryName: toId,
        leaderCharacter,
      });

      addChronicleEntry(author, chronicleEntryStatement, turn);

      if (toTerritory.owner === factions[playerIndex].name) {
        enqueueBattleReports(
          [
            {
              author,
              message: chronicleEntryStatement,
              stats: `Attack strength: ${attackForce}\nDefense strength: ${defenseForce}\nLosses: ${losses}`,
              success: !victory,
            },
          ],
          enqueueBattleMessage
        );
      }
    },
    [
      territories,
      updateTerritories,
      addChronicleEntry,
      enqueueBattleMessage,
      factionLeaders,
      hasChangedFromEudaemonia,
    ]
  );

  const executeAITurn = useCallback(() => {
    factions.forEach((faction, i) => {
      if (i === playerIndex) return;

      aiRecruit(i);

      const aiTerritoryNames = factionTerritories[i];

      aiTerritoryNames.forEach((aiTerritoryName) => {
        const aiTerritory = territories.find((t) => t.name === aiTerritoryName);
        if (!aiTerritory) return;

        const adjacentNames = adjacentTerritories[aiTerritoryName] || [];

        const adjacentPlayerTerritories = adjacentNames.map((name) =>
          territories.find((t) => t.name === name)
        );

        if (adjacentPlayerTerritories.length === 0) return;

        // Only consider attacking if AI territory has enough troops.
        if (aiTerritory.troops && aiTerritory.troops > 500) {
          // Find weakest adjacent player territory to attack
          const weakestTarget = adjacentPlayerTerritories.reduce(
            (weakest, current) =>
              (current!.troops ?? Infinity) < (weakest!.troops ?? Infinity)
                ? current
                : weakest
          );

          if (weakestTarget && Math.random() < factionAggressions[i]) {
            executeAIAttack(aiTerritoryName, weakestTarget.name);
          }
        }
      });
    });
  }, [
    factions,
    playerIndex,
    factionTerritories,
    territories,
    adjacentTerritories,
    aiRecruit,
    executeAIAttack,
  ]);

  return {
    handleRecruit,
    handleScheduledAttacks,
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

function enqueueBattleReports(
  entries: BattleReport[],
  enqueueBattleMessage: (message: BattleReport) => void
) {
  for (const entry of entries) {
    enqueueBattleMessage(entry);
  }
}

function pickAValidChronicler(hasChangedFromEudaemonia: boolean): Character {
  if (hasChangedFromEudaemonia) {
    return randomItem(chroniclersAfterTheIncident);
  } else {
    return randomItem(chroniclers);
  }
}
