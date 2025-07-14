import { useCallback } from "react";
import { Territory } from "@/types/gameTypes";
import { factions, adjacentTerritories } from "@/data/gameData";

interface UseCombatProps {
  territories: Territory[];
  playerIndex: number;
  updateTerritories: (updater: (prev: Territory[]) => Territory[]) => void;
  addChronicleEntry: (entry: string, bias: "friendly" | "hostile") => void;
  onTurnEnd: () => void;
}

export const useCombat = ({
  territories,
  playerIndex,
  updateTerritories,
  addChronicleEntry,
  onTurnEnd,
}: UseCombatProps) => {
  const handleAttack = useCallback(
    (fromTerritoryName: string, toTerritoryName: string) => {
      const fromTerritory = territories.find(
        (t) => t.name === fromTerritoryName
      );
      const toTerritory = territories.find((t) => t.name === toTerritoryName);

      if (
        !fromTerritory ||
        !toTerritory ||
        fromTerritory.owner !== factions[playerIndex].name ||
        toTerritory.owner === factions[playerIndex].name ||
        !adjacentTerritories[fromTerritoryName]?.includes(toTerritoryName)
      ) {
        return;
      }

      const attackForce = Math.floor(fromTerritory.troops! * 0.8);
      const defenseForce = toTerritory.troops!;

      const attackStrength = attackForce + Math.random() * 500;
      const defenseStrength =
        defenseForce +
        Math.random() * 500 +
        (toTerritory.conditionModifier || 0);

      const victory = attackStrength > defenseStrength;

      if (victory) {
        const survivingTroops =
          defenseForce === 0
            ? attackForce
            : Math.floor(attackForce - defenseForce * 0.6);

        updateTerritories((prev) =>
          prev.map((t) => {
            if (t.name === fromTerritoryName) {
              return { ...t, troops: t.troops! - attackForce };
            }
            if (t.name === toTerritoryName) {
              return {
                ...t,
                owner: factions[playerIndex].name,
                troops: survivingTroops,
              };
            }
            return t;
          })
        );

        addChronicleEntry(
          `Our brave warriors have conquered ${toTerritory.name} in glorious battle!`,
          "friendly"
        );
      } else {
        const casualties = Math.floor(Math.random() * 300 + 200);
        updateTerritories((prev) =>
          prev.map((t) =>
            t.name === fromTerritoryName
              ? { ...t, troops: Math.max(0, t.troops! - casualties) }
              : t
          )
        );

        addChronicleEntry(
          `Our forces were repelled from ${toTerritory.name} with heavy losses.`,
          "hostile"
        );
      }

      onTurnEnd();
    },
    [territories, playerIndex, updateTerritories, addChronicleEntry, onTurnEnd]
  );

  const handleReinforce = useCallback(
    (fromTerritoryName: string, toTerritoryName: string) => {
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

      const reinforcements = Math.min(500, fromTerritory.troops);

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
    [territories, playerIndex, updateTerritories]
  );

  const getValidAttackTargets = useCallback(
    (fromTerritoryName: string) => {
      return (
        adjacentTerritories[fromTerritoryName]
          ?.map((name) => territories.find((t) => t.name === name))
          .filter((t) => t && t.owner !== factions[playerIndex].name) || []
      );
    },
    [territories, playerIndex]
  );

  return {
    handleAttack,
    handleReinforce,
    getValidAttackTargets,
  };
};
