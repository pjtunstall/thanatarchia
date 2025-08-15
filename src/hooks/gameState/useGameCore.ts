import { useState, useCallback, useMemo } from "react";

import { Territory, GameStatus, AttackOrder } from "@/types/gameTypes";
import {
  costOfSpying,
  factions,
  territories as initialTerritories,
} from "@/data/gameData";
import { chroniclers } from "@/data/chronicles";

export function useGameCore() {
  const [playerIndex, setPlayerIndex] = useState(() =>
    randomPlayerIndex(factions.map((f) => f.territories))
  );
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedTerritoryName, setSelectedTerritoryName] = useState<
    string | null
  >(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [territories, setTerritories] = useState<Territory[]>(() => {
    const territories = [...initialTerritories];
    const range = 2000;
    territories.forEach((t) => {
      t.troops += Math.floor(Math.random() * range);
      if (t.owner !== factions[playerIndex].name) {
        t.troops += 1000;
      }
    });
    return territories;
  });
  const [factionTreasures, setFactionTreasures] = useState<number[]>(
    factions.map((f) => f.treasure)
  );
  const [success, setSuccess] = useState<boolean | null>(null);
  const [currentChronicler, setCurrentChronicler] = useState(chroniclers[0]);
  const [battleMessage, setBattleMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<string | null>(null);
  const [scheduledAttacks, setScheduledAttacks] = useState<AttackOrder[]>([]);
  const [factionFaiths, setFactionFaiths] = useState<string[]>(
    factions.map((f) => f.faith)
  );
  const [factionAggressions, setFactionAggressions] = useState<number[]>(
    factions.map((_) => 0.3)
  );

  const handleChangeFaith = useCallback(
    (factionIndex: number, faith: string) => {
      const newFaiths = [...factionFaiths];
      newFaiths[factionIndex] = faith;
      setFactionFaiths(newFaiths);
    },
    [factionFaiths]
  );

  const factionTerritories = useMemo(
    () =>
      factions.map((faction) =>
        territories
          .filter((territory) => territory.owner === faction.name)
          .map((territory) => territory.name)
      ),
    [territories]
  );

  const factionTroops = useMemo(
    () =>
      factions.map((faction) =>
        territories
          .filter((t) => t.owner === faction.name)
          .reduce((sum, t) => sum + (t.troops || 0), 0)
      ),
    [territories]
  );

  const updateTerritories = useCallback(
    (updater: (prev: Territory[]) => Territory[]) => {
      setTerritories(updater);
    },
    []
  );

  // This resetGame is wrapped in another resetGame in useGameState.
  const resetGame = useCallback(() => {
    const freshTerritories = initialTerritories;
    const freshFactionTerritories = factions.map((f) => f.territories);

    setGameStatus("playing");
    setCurrentTurn(1);
    setSelectedTerritoryName(null);
    setFactionTreasures(factions.map((f) => f.treasure));
    setTerritories(freshTerritories);
    setPlayerIndex(randomPlayerIndex(freshFactionTerritories));
  }, []);

  const handleTerritoryClick = useCallback((territoryName: string) => {
    setSelectedTerritoryName((prev) =>
      prev === territoryName ? null : territoryName
    );
  }, []);

  const handleSpy = useCallback(
    (territoryName: string) => {
      const territory = territories.find((t) => t.name === territoryName);
      if (territory) {
        setFactionTreasures((prev) =>
          prev.map((ft, i) => (i === playerIndex ? ft - costOfSpying : ft))
        );
        const newTerritory = { ...territory };
        newTerritory.spiedOn = true;
        updateTerritories((prev) =>
          prev.map((t) => (t.name === territoryName ? newTerritory : t))
        );
      }
    },
    [territories, updateTerritories]
  );

  return {
    // State
    currentTurn,
    selectedTerritoryName,
    gameStatus,
    territories,
    factionTreasures,
    playerIndex,
    success,
    currentChronicler,
    battleMessage,
    stats,
    scheduledAttacks,
    factionFaiths,
    factionAggressions,

    // Derived state
    factionTerritories,
    factionTroops,

    // Actions
    setSelectedTerritoryName,
    setCurrentTurn,
    setFactionTreasures,
    updateTerritories,
    resetGame,
    handleTerritoryClick,
    handleSpy,
    setGameStatus,
    setSuccess,
    setCurrentChronicler,
    setBattleMessage,
    setStats,
    setScheduledAttacks,
    setFactionFaiths,
    handleChangeFaith,
    setFactionAggressions,
  };
}

function randomPlayerIndex(factionTerritories: string[][]): number {
  const validPlayerIndices = Array.from(factionTerritories.keys()).filter(
    (index) =>
      factionTerritories[index].length > 0 && index !== 0 && index !== 3
  );

  if (validPlayerIndices.length === 0) {
    console.error(
      "Something is amiss: failed to find any faction with territory."
    );
    return -1;
  }

  const randomIndex = Math.floor(Math.random() * validPlayerIndices.length);

  return validPlayerIndices[randomIndex];
}
