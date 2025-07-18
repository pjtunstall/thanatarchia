import { useCallback } from "react";

import { Faction, Territory, Chronicler } from "@/types/gameTypes";
import {
  chroniclers,
  battleChronicle,
  costOfRecruiting,
} from "@/data/gameData";

interface UseCombatProps {
  territories: Territory[];
  playerIndex: number;
  adjacentTerritories: Record<string, string[]>;
  factionTerritories: string[][];
  factions: Faction[];
  factionTreasures: number[];
  updateTerritories: (updater: (prev: Territory[]) => Territory[]) => void;
  setFactionTreasures: (updater: (prev: number[]) => number[]) => void;
  addChronicleEntry: (entry: string, bias: "friendly" | "hostile") => void;
  onEndTurn: () => void;
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const useCombat = ({
  territories,
  playerIndex,
  adjacentTerritories,
  factionTerritories,
  factions,
  factionTreasures,
  updateTerritories,
  setFactionTreasures,
  addChronicleEntry,
  onEndTurn,
}: UseCombatProps) => {
  const handleRecruit = useCallback(() => {
    const playerTreasury = factionTreasures[playerIndex];

    if (playerTreasury < costOfRecruiting) return;

    const factionName = factions[playerIndex].name;
    const controlledTerritories = factionTerritories[playerIndex];

    const recruitsPerTerritory = Math.round(500 / controlledTerritories.length);
    const totalRecruits = recruitsPerTerritory * controlledTerritories.length;

    updateTerritories((prev) =>
      prev.map((t) =>
        t.owner === factionName
          ? { ...t, troops: (t.troops || 0) + recruitsPerTerritory }
          : t
      )
    );

    setFactionTreasures((prev) => {
      const updated = [...prev];
      updated[playerIndex] -= costOfRecruiting;
      return updated;
    });

    addChronicleEntry(
      Math.random() > 0.3
        ? "More savage warriors have been enlisted to bolster the barbarian horde, no doubt lured by promises of plunder."
        : "Our wise leader has strengthened our noble forces with fresh recruits, ready to defend our sacred homeland.",
      Math.random() > 0.3 ? "hostile" : "friendly"
    );
  }, [
    factionTreasures,
    factionTerritories,
    factions,
    playerIndex,
    updateTerritories,
    setFactionTreasures,
    addChronicleEntry,
  ]);

  const handleAttack = useCallback(
    (
      fromTerritoryName: string,
      toTerritoryName: string,
      adviserIndex: number
    ): {
      victory: boolean;
      chronicle: string;
      stats: string;
      chronicler: Chronicler;
    } => {
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

      let winners: string;
      let losers: string;
      let casualties: number;
      let survivors: number;
      let stats: string;
      const attackForce = Math.floor(fromTerritory.troops! * 0.8);
      const defenseForce = toTerritory.troops!;

      const attackStrength = attackForce + Math.random() * 500;
      const defenseStrength =
        defenseForce +
        Math.random() * 500 +
        (toTerritory.conditionModifier || 0);

      const victory = attackStrength > defenseStrength;

      if (victory) {
        winners = fromTerritory.owner;
        losers = toTerritory.owner;
        const survivors =
          defenseForce === 0
            ? attackForce
            : Math.floor(attackForce - defenseForce * 0.3);
        casualties = attackForce - survivors;

        updateTerritories((prev) =>
          prev.map((t) => {
            if (t.name === fromTerritoryName) {
              return { ...t, troops: t.troops! - attackForce };
            }
            if (t.name === toTerritoryName) {
              return {
                ...t,
                owner: factions[playerIndex].name,
                troops: survivors,
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
        winners = toTerritory.owner;
        losers = fromTerritory.owner;
        casualties = Math.floor(Math.random() * 300 + 200);
        survivors = attackForce - casualties;
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

      stats = `Initial strength: ${attackForce}.\nCasualties: ${casualties}.`;

      const randomIndex = Math.floor(Math.random() * chroniclers.length);
      const chronicler = chroniclers[randomIndex];
      const bias = randomIndex === adviserIndex ? "friendly" : "hostile";
      const chronicle = battleChronicle(
        chronicler,
        bias,
        victory,
        winners,
        losers,
        toTerritory.name
      );

      // onEndTurn();

      return { victory, chronicle, stats, chronicler };
    },
    [
      territories,
      playerIndex,
      factions,
      adjacentTerritories,
      updateTerritories,
      addChronicleEntry,
      onEndTurn,
    ]
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

      const reinforcements =
        fromTerritory.troops > 500
          ? Math.min(500, fromTerritory.troops)
          : fromTerritory.troops;

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

      const recruitsPerTerritory = Math.round(
        500 / factionTerritories[factionIndex].length
      );

      updateTerritories((prevTerritories) => {
        const factionName = factions[factionIndex].name;
        return prevTerritories.map((t) => {
          if (t.owner === factionName) {
            return { ...t, troops: t.troops! + recruitsPerTerritory };
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

  // AI attack logic
  const executeAIAttack = useCallback(
    (fromId: string, toId: string) => {
      const fromTerritory = territories.find((t) => t.name === fromId);
      const toTerritory = territories.find((t) => t.name === toId);

      if (!fromTerritory || !toTerritory) return;

      const attackForce = Math.floor(fromTerritory.troops! * 0.6);
      const defenseForce = toTerritory.troops!;

      const attackStrength = attackForce + Math.random() * 400;
      const defenseStrength = defenseForce + Math.random() * 600;

      const victory = attackStrength > defenseStrength;

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

        addChronicleEntry(
          `The barbarians have lost ${toTerritory.name} to enemy forces!`,
          "hostile"
        );
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
      }
    },
    [territories, updateTerritories, addChronicleEntry]
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

        // Filter those adjacent territories owned by the player
        const adjacentPlayerTerritories = adjacentNames
          .map((name) => territories.find((t) => t.name === name))
          .filter((t) => t && t.owner === factions[playerIndex].name);

        if (adjacentPlayerTerritories.length === 0) return;

        // Only consider attacking if AI territory has enough troops
        if (aiTerritory.troops && aiTerritory.troops > 500) {
          // Find weakest adjacent player territory to attack
          const weakestTarget = adjacentPlayerTerritories.reduce(
            (weakest, current) =>
              (current!.troops ?? Infinity) < (weakest!.troops ?? Infinity)
                ? current
                : weakest
          );

          if (weakestTarget && Math.random() > 0.7) {
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
    handleAttack,
    handleReinforce,
    getValidAttackTargets,
    executeAITurn,
  };
};
