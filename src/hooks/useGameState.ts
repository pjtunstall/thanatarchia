import { useCallback, useEffect, useState } from "react";

import { initializeLeaders } from "@/hooks/gameState/initializeLeaders";
import { factions, adjacentTerritories } from "@/data/gameData";
import { useGameCore } from "@/hooks/gameState/useGameCore";
import { useCombat } from "@/hooks/gameState/useCombat";
import { useChronicles } from "@/hooks/gameState/useChronicles";

export const useGameState = () => {
  const [factionLeaders, setFactionLeaders] = useState(
    initializeLeaders(factions)
  );
  const gameCore = useGameCore();
  const chronicles = useChronicles(gameCore.currentTurn);
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
    updateTerritories: gameCore.updateTerritories,
    setFactionTreasures: gameCore.setFactionTreasures,
    addChronicleEntry: chronicles.addChronicleEntry,
    success: gameCore.success,
    setSuccess: gameCore.setSuccess,
    scheduledAttacks: gameCore.scheduledAttacks,
    setScheduledAttacks: gameCore.setScheduledAttacks,
    enqueueBattleMessage: chronicles.enqueueBattleMessage,
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
    chronicles.addChronicleEntry,
  ]);

  const checkGameStatus = useCallback(() => {
    const playerTerritories =
      gameCore.factionTerritories[gameCore.playerIndex].length;
    if (playerTerritories >= 9) {
      gameCore.setGameStatus("victory");
      chronicles.generateFinalChronicles("victory", gameCore.currentTurn);
      return "victory";
    } else if (playerTerritories === 0) {
      gameCore.setGameStatus("defeat");
      chronicles.generateFinalChronicles("defeat", gameCore.currentTurn);
      return "defeat";
    }
    return "playing";
  }, [
    gameCore.factionTerritories,
    gameCore.playerIndex,
    chronicles.generateFinalChronicles,
  ]);

  const resetGame = useCallback(() => {
    gameCore.resetGame();
    chronicles.resetChronicles();
    setFactionLeaders(initializeLeaders(factions));
  }, [gameCore.resetGame, chronicles.resetChronicles]);

  const handleEndTurn = useCallback(() => {
    handleScheduledAttacks(chronicles.adviserIndex);
    generateResources();
    executeAITurn();
    gameCore.setCurrentTurn((prev) => prev + 1);
    gameCore.setSelectedTerritory(null);
    checkGameStatus();
  }, [
    handleScheduledAttacks,
    generateResources,
    executeAITurn,
    gameCore.setCurrentTurn,
    gameCore.setSelectedTerritory,
    checkGameStatus,
  ]);

  useEffect(() => {
    checkGameStatus();
  }, [gameCore.territories]);

  return {
    ...gameCore,
    factionLeaders,
    setFactionLeaders,
    ...chronicles,
    ...otherCombat,
    resetGame,
    handleRecruit,
    handleReinforce,
    handleUndoReinforce,
    handleEndTurn,
  };
};
