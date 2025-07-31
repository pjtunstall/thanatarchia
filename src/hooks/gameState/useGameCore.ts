import { useState, useCallback, useMemo } from "react";

import {
  Territory,
  GameStatus,
  AttackOrder,
  Character,
} from "@/types/gameTypes";
import { factions, territories as initialTerritories } from "@/data/gameData";
import { chroniclers } from "@/data/chronicles";

export function useGameCore() {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedTerritoryName, setSelectedTerritoryName] = useState<
    string | null
  >(null);
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
  const [currentChronicler, setCurrentChronicler] = useState(chroniclers[0]);
  const [battleMessage, setBattleMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<string | null>(null);
  const [scheduledAttacks, setScheduledAttacks] = useState<AttackOrder[]>([]);
  const [factionFaiths, setFactionFaiths] = useState<string[]>(
    factions.map((f) => f.faith)
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
      // Game status will be checked by the component that calls this
    },
    []
  );

  // This resetGame is wrapped in another resetGame in useGameState
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
  };
}

function randomPlayerIndex(factionTerritories: string[][]): number {
  for (let i = 0; i < 256; i++) {
    const r = Math.floor(Math.random() * factionTerritories.length);
    if (factionTerritories[r].length > 0) {
      return r;
    }
  }
  console.error(
    "Something is amiss: I failed to find any faction with territory"
  );
  return 0;
}
