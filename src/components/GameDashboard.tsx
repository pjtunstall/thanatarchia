import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { factions } from "@/data/gameData.ts";
import { useGameState } from "@/hooks/useGameState";
import { GameMap } from "@/components/game/GameMap";
import { StatusPanel } from "@/components/game/StatusPanel";
import { ChroniclesPanel } from "@/components/game/ChroniclesPanel";
import { ActionsPanel } from "@/components/game/ActionsPanel";
import { GameOverlay } from "@/components/game/GameOverlay";

const GameDashboard = () => {
  const [activeTab, setActiveTab] = useState("status");
  const gameState = useGameState();

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    const tabs = ["chronicles", "status", "actions"];
    const currentIndex = tabs.indexOf(activeTab);

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        setActiveTab(tabs[prevIndex]);
        break;
      case "ArrowRight":
        e.preventDefault();
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        setActiveTab(tabs[nextIndex]);
        break;
    }
  };

  return (
    <>
      <>
        <div className="min-h-screen bg-background p-4">
          <GameOverlay
            gameStatus={gameState.gameStatus}
            finalChronicles={gameState.finalChronicles}
            onResetGame={gameState.resetGame}
          />

          <div className="grid grid-cols-12 gap-4 h-screen">
            {/* Map Panel */}
            <div className="col-span-7 h-full">
              <GameMap
                territories={gameState.territories}
                selectedTerritory={gameState.selectedTerritory}
                currentTurn={gameState.currentTurn}
                factions={factions}
                factionLeaders={gameState.factionLeaders}
                playerFactionName={factions[gameState.playerIndex].name}
                playerFactionColor={factions[gameState.playerIndex].color}
                playerFactionSymbol={factions[gameState.playerIndex].symbol}
                onTerritoryClick={gameState.handleTerritoryClick}
              />
            </div>

            {/* Right Panel - Tabbed Interface */}
            <div className="col-span-5 h-full flex flex-col">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full"
              >
                <TabsList
                  className="grid w-full grid-cols-3"
                  onKeyDown={handleTabKeyDown}
                >
                  <TabsTrigger value="chronicles">Chronicles</TabsTrigger>
                  <TabsTrigger value="status">Status</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="chronicles" className="mt-4">
                  <ChroniclesPanel chronicles={gameState.chronicles} />
                </TabsContent>

                <TabsContent value="status" className="mt-4">
                  <StatusPanel
                    playerFaction={factions[gameState.playerIndex]}
                    playerCharacter={
                      gameState.factionLeaders[gameState.playerIndex]
                    }
                    territories={gameState.territories}
                    playerTerritories={
                      gameState.factionTerritories[gameState.playerIndex]
                    }
                    playerTroops={
                      gameState.factionTroops[gameState.playerIndex]
                    }
                    selectedTerritory={gameState.selectedTerritory}
                    adviserIndex={gameState.adviserIndex}
                    factionTreasures={gameState.factionTreasures}
                    playerIndex={gameState.playerIndex}
                  />
                </TabsContent>

                <TabsContent value="actions" className="mt-4">
                  <ActionsPanel
                    playerFaction={factions[gameState.playerIndex]}
                    playerIndex={gameState.playerIndex}
                    adviserIndex={gameState.adviserIndex}
                    factionTreasures={gameState.factionTreasures}
                    territories={gameState.territories}
                    selectedTerritory={gameState.selectedTerritory}
                    onAction={gameState.handleAction}
                    onEndTurn={gameState.handleEndTurn}
                    onRecruit={gameState.handleRecruit}
                    onSpy={gameState.handleSpy}
                    onAttack={gameState.handleAttack}
                    onReinforce={gameState.handleReinforce}
                    getValidAttackTargets={gameState.getValidAttackTargets}
                    success={gameState.success}
                    setSuccess={gameState.setSuccess}
                    currentChronicler={gameState.currentChronicler}
                    setCurrentChronicler={gameState.setCurrentChronicler}
                    battleMessage={gameState.battleMessage}
                    setBattleMessage={gameState.setBattleMessage}
                    stats={gameState.stats}
                    setStats={gameState.setStats}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default GameDashboard;
