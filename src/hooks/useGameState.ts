import { useCallback, useEffect, useState } from "react";

import { initializeLeaders } from "@/hooks/helpers/initializeLeaders";
import { factions, adjacentTerritories } from "@/data/gameData";
import { useGameCore } from "@/hooks/gameState/useGameCore";
import { useCombat } from "@/hooks/gameState/useCombat";
import { useChronicles } from "@/hooks/gameState/useChronicles";
import { abandonTerritoryToBagaudaeChronicle } from "@/data/chronicles";

export function useGameState() {
  const [activeTab, setActiveTab] = useState("status");
  const [factionLeaders, setFactionLeaders] = useState(
    initializeLeaders(factions)
  );
  const gameCore = useGameCore();
  const chroniclesState = useChronicles();
  const {
    handleRecruit,
    executeAITurn,
    handleReinforce,
    handleUndoReinforce,
    handlePlayerAttacks,
    ...otherCombat
  } = useCombat({
    territories: gameCore.territories,
    playerIndex: gameCore.playerIndex,
    adjacentTerritories,
    factionTerritories: gameCore.factionTerritories,
    factions,
    factionTreasures: gameCore.factionTreasures,
    factionLeaders: factionLeaders,
    updateTerritories: gameCore.updateTerritories,
    setFactionTreasures: gameCore.setFactionTreasures,
    addChronicleEntry: chroniclesState.addChronicleEntry,
    success: gameCore.success,
    setSuccess: gameCore.setSuccess,
    scheduledAttacks: gameCore.scheduledAttacks,
    setScheduledAttacks: gameCore.setScheduledAttacks,
    enqueueBattleReport: chroniclesState.enqueueBattleReport,
    selectedTerritoryName: gameCore.selectedTerritoryName,
    adviserIndex: chroniclesState.adviserIndex,
    turn: gameCore.currentTurn,
    hasChangedFromEudaemonia: chroniclesState.hasChangedFromEudaemonia,
    factionAggressions: gameCore.factionAggressions,
    setFactionAggressions: gameCore.setFactionAggressions,
  });

  const generateResources = useCallback(() => {
    gameCore.setFactionTreasures((prev) => {
      const updated = prev.map((t, i) => {
        const income = gameCore.factionTerritories[i].length * 1200;
        return t + income;
      });
      return updated;
    });
  }, [
    gameCore.factionTerritories,
    gameCore.playerIndex,
    chroniclesState.addChronicleEntry,
  ]);

  const checkGameStatus = useCallback(() => {
    const playerTerritories =
      gameCore.factionTerritories[gameCore.playerIndex].length;
    const playerTroops = gameCore.factionTroops[gameCore.playerIndex];
    if (playerTerritories >= 9) {
      gameCore.setGameStatus("victory");
      return "victory";
    }

    if (playerTerritories === 0 || playerTroops < 1) {
      gameCore.setGameStatus("defeat");
      return "defeat";
    }

    return "playing";
  }, [gameCore.factionTerritories, gameCore.factionTroops]);

  // Note how this wraps gameCore.resetGame. The reason for the wrapper
  // here in useGameState is that we need to reset items from the
  // chroniclesState, which gameCore doesn't have access to. Consider
  // refactoring to make only one resetGame necessary. The current
  // way separates concerns more. The other way might be easier to
  // read.
  const resetGame = useCallback(() => {
    gameCore.resetGame();
    setActiveTab("status");
    setFactionLeaders(initializeLeaders(factions));
    chroniclesState.resetChronicles();
    chroniclesState.setHasChangedFromEudaemonia(false);
  }, [gameCore.resetGame, chroniclesState.resetChronicles]);

  const handleEndTurn = useCallback(() => {
    chroniclesState.setChronicles([]);
    handlePlayerAttacks(chroniclesState.adviserIndex, gameCore.currentTurn);
    executeAITurn();
    generateResources();
    gameCore.setCurrentTurn((prev) => prev + 1);
    gameCore.setSelectedTerritoryName(null);
    gameCore.updateTerritories((prev) => {
      const playerFactionName = factions[gameCore.playerIndex].name;
      return prev.map((t) => {
        if (t.owner === playerFactionName && t.troops === 0) {
          const { author, statement } = abandonTerritoryToBagaudaeChronicle({
            territoryName: t.name,
            playerFactionName,
            adviserIndex: chroniclesState.adviserIndex,
            hasChangedFromEudaemonia: chroniclesState.hasChangedFromEudaemonia,
          });
          chroniclesState.addChronicleEntry(
            author,
            statement,
            gameCore.currentTurn
          );
          const rebelNumbers = 300 + Math.floor(Math.random() * 200);
          return { ...t, owner: "Bagaudae", troops: rebelNumbers };
        }
        return { ...t, spiedOn: false };
      });
    });
    checkGameStatus();
  }, [
    handlePlayerAttacks,
    generateResources,
    executeAITurn,
    gameCore.currentTurn,
    gameCore.setCurrentTurn,
    gameCore.setSelectedTerritoryName,
    checkGameStatus,
    gameCore.updateTerritories,
    factions,
    chroniclesState.addChronicleEntry,
  ]);

  const handleEndGame = () => {
    gameCore.setGameStatus("defeat");
  };

  useEffect(() => {
    checkGameStatus();
  }, [gameCore.territories]);

  return {
    activeTab,
    setActiveTab,
    ...gameCore,
    factionLeaders,
    setFactionLeaders,
    ...chroniclesState,
    ...otherCombat,
    resetGame,
    handleRecruit,
    handleReinforce,
    handleUndoReinforce,
    handleEndTurn,
    handleEndGame,
  };
}
