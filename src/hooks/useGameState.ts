import { useCallback, useEffect, useState } from "react";

import { initializeLeaders } from "@/hooks/helpers/initializeLeaders";
import { factions, adjacentTerritories } from "@/data/gameData";
import { useGameCore } from "@/hooks/gameState/useGameCore";
import { useCombat } from "@/hooks/gameState/useCombat";
import { useChronicles } from "@/hooks/gameState/useChronicles";

export const useGameState = () => {
  const [factionLeaders, setFactionLeaders] = useState(
    initializeLeaders(factions)
  );
  const gameCore = useGameCore();
  const chroniclesHook = useChronicles(gameCore.currentTurn);
  const {
    handleRecruit,
    executeAITurn,
    handleReinforce,
    handleUndoReinforce,
    handleScheduledAttacks,
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
    addChronicleEntry: chroniclesHook.addChronicleEntry,
    success: gameCore.success,
    setSuccess: gameCore.setSuccess,
    scheduledAttacks: gameCore.scheduledAttacks,
    setScheduledAttacks: gameCore.setScheduledAttacks,
    enqueueBattleMessage: chroniclesHook.enqueueBattleMessage,
    selectedTerritoryName: gameCore.selectedTerritoryName,
    adviserIndex: chroniclesHook.adviserIndex,
    turn: gameCore.currentTurn,
    hasChangedFromEudaemonia: chroniclesHook.hasChangedFromEudaemonia,
  });

  const generateResources = useCallback(() => {
    gameCore.setFactionTreasures((prev) => {
      const updated = prev.map((t, i) => {
        const income = gameCore.factionTerritories[i].length * 20;
        // if (i === gameCore.playerIndex) {
        //   chronicles.addChronicleEntry(
        //     `Our territories have generated ${income} solidi in tribute and taxes.`,
        //     "friendly"
        //   );
        // }
        return t + income;
      });
      return updated;
    });
  }, [
    gameCore.factionTerritories,
    gameCore.playerIndex,
    chroniclesHook.addChronicleEntry,
  ]);

  const checkGameStatus = useCallback(() => {
    const playerTerritories =
      gameCore.factionTerritories[gameCore.playerIndex].length;
    const playerTroops = gameCore.factionTroops.reduce(
      (sum, item) => sum + item
    );
    if (playerTerritories >= 9) {
      gameCore.setGameStatus("victory");
      return "victory";
    } else if (playerTerritories === 0 || playerTroops < 1) {
      gameCore.setGameStatus("defeat");
      return "defeat";
    }
    return "playing";
  }, [gameCore.factionTerritories, gameCore.playerIndex]);

  // Note how this wraps gameCore.resetGame. The reason for the wrapper
  // here in useGameState is that we need to reset items from the
  // chroniclesHook, which gameCore doesn't have access to. Consider
  // refactoring to make only one resetGame necessary. The current
  // way separates concerns more. The other way might be easier to
  // read.
  const resetGame = useCallback(() => {
    gameCore.resetGame();
    setFactionLeaders(initializeLeaders(factions));
    chroniclesHook.resetChronicles();
    chroniclesHook.setHasChangedFromEudaemonia(false);
  }, [gameCore.resetGame, chroniclesHook.resetChronicles]);

  const handleEndTurn = useCallback(() => {
    handleScheduledAttacks(chroniclesHook.adviserIndex, gameCore.currentTurn);
    generateResources();
    executeAITurn();
    gameCore.setCurrentTurn((prev) => prev + 1);
    gameCore.setSelectedTerritoryName(null);
    gameCore.updateTerritories((prev) => {
      return prev.map((t) => {
        return { ...t, spiedOn: false };
      });
    });
    checkGameStatus();
  }, [
    handleScheduledAttacks,
    generateResources,
    executeAITurn,
    gameCore.currentTurn,
    gameCore.setCurrentTurn,
    gameCore.setSelectedTerritoryName,
    checkGameStatus,
  ]);

  useEffect(() => {
    checkGameStatus();
  }, [gameCore.territories]);

  return {
    ...gameCore,
    factionLeaders,
    setFactionLeaders,
    ...chroniclesHook,
    ...otherCombat,
    resetGame,
    handleRecruit,
    handleReinforce,
    handleUndoReinforce,
    handleEndTurn,
  };
};
