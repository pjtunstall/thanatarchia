import { useState, useCallback, useMemo } from "react";

import {
  Territory,
  GameStatus,
  AttackOrder,
  Character,
} from "@/types/gameTypes";
import { factions, territories as initialTerritories } from "@/data/gameData";
import { chroniclers } from "@/data/chronicles";

export const useGameCore = () => {
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
  const [isClickedOnMapYet, setIsClickedOnMapYet] = useState<boolean>(false);

  const handleChangeFaith = useCallback(
    (
      factionIndex: number,
      faith: string,
      factionLeaders: Character[],
      setFactionLeaders: React.Dispatch<React.SetStateAction<Character[]>>
    ) => {
      const oldFath = factionFaiths[factionIndex];
      const newFaiths = [...factionFaiths];
      newFaiths[factionIndex] = faith;
      setFactionFaiths(newFaiths);
      if (faith === "Pagan" && oldFath !== "Pagan") {
        const leader = { ...factionLeaders[factionIndex] };
        leader.name = leader.name.split(" ")[0] + " the Apostate";
        setFactionLeaders((prevLeaders) => {
          const newLeaders = [...prevLeaders];
          newLeaders[factionIndex] = leader;
          return newLeaders;
        });
      }
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

  const handleTerritoryClick = useCallback((territoryId: string) => {
    if (territoryId) {
      setIsClickedOnMapYet(true);
    }
    setSelectedTerritoryName((prev) =>
      prev === territoryId ? null : territoryId
    );
  }, []);

  const handleSpy = useCallback((targetTerritory: string) => {}, []);

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
    isClickedOnMapYet,

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
    setIsClickedOnMapYet,
  };
};

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
