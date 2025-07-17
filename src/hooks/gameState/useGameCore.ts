import { useState, useCallback, useMemo } from "react";
import { Territory, GameStatus } from "@/types/gameTypes";
import { factions, territories as initialTerritories } from "@/data/gameData";

export const useGameCore = () => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(
    null
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [territories, setTerritories] =
    useState<Territory[]>(initialTerritories);
  const [factionTreasures, setFactionTreasures] = useState<number[]>(
    factions.map((f) => f.treasure)
  );
  const [playerIndex, setPlayerIndex] = useState(() =>
    randomPlayerIndex(factions.map((f) => f.territories))
  );
  const [success, setSuccess] = useState<boolean | null>(null);

  // Derived state - computed from territories, no separate state needed
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
      // Game status will be checked by the component that calls this
    },
    []
  );

  const resetGame = useCallback(() => {
    const freshTerritories = initialTerritories;
    const freshFactionTerritories = factions.map((f) => f.territories);

    setGameStatus("playing");
    setCurrentTurn(1);
    setSelectedTerritory(null);
    setFactionTreasures(factions.map((f) => f.treasure));
    setTerritories(freshTerritories);
    setPlayerIndex(randomPlayerIndex(freshFactionTerritories));
  }, []);

  const handleTerritoryClick = useCallback((territoryId: string) => {
    setSelectedTerritory((prev) => (prev === territoryId ? null : territoryId));
  }, []);

  return {
    // State
    currentTurn,
    selectedTerritory,
    gameStatus,
    territories,
    factionTreasures,
    playerIndex,
    success,

    // Derived state
    factionTerritories,
    factionTroops,

    // Actions
    setSelectedTerritory,
    setCurrentTurn,
    setFactionTreasures,
    updateTerritories,
    resetGame,
    handleTerritoryClick,
    setGameStatus,
    setSuccess,
  };
};

function randomPlayerIndex(factionTerritories: string[][]): number {
  for (let i = 0; i < 256; i++) {
    const r = Math.floor(Math.random() * factionTerritories.length);
    if (factionTerritories[r].length > 0) {
      return r;
    }
  }
  console.error("Failed to find any faction with territory");
  return 0;
}
