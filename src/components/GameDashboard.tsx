import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import GameMap from '@/components/game/GameMap';
import StatusPanel from '@/components/game/StatusPanel';
import ChroniclesPanel from '@/components/game/ChroniclesPanel';
import ActionsPanel from '@/components/game/ActionsPanel';
import GameOverlay from '@/components/game/GameOverlay';

const GameDashboard = () => {
  const [activeTab, setActiveTab] = useState('status');
  
  const gameState = useGameState();

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    const tabs = ['chronicles', 'status', 'actions'];
    const currentIndex = tabs.indexOf(activeTab);
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        setActiveTab(tabs[prevIndex]);
        break;
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        setActiveTab(tabs[nextIndex]);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <GameOverlay 
        gameStatus={gameState.gameStatus} 
        finalChronicles={gameState.finalChronicles}
        onResetGame={gameState.resetGame} 
      />
      
      <div className="grid grid-cols-12 gap-4 h-screen">
        {/* Map Panel */}
        <div className="col-span-7">
          <GameMap
            territories={gameState.territories}
            selectedTerritory={gameState.selectedTerritory}
            currentTurn={gameState.currentTurn}
            playerFactionName={gameState.selectedFaction.displayName}
            playerFactionColor={gameState.selectedFaction.color}
            selectedFaction={gameState.selectedFaction}
            playerCharacter={gameState.playerCharacter}
            onTerritoryClick={gameState.handleTerritoryClick}
          />
        </div>

        {/* Right Panel - Tabbed Interface */}
        <div className="col-span-5">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3" onKeyDown={handleTabKeyDown}>
              <TabsTrigger value="chronicles">
                Chronicles
              </TabsTrigger>
              <TabsTrigger value="status">
                Status
              </TabsTrigger>
              <TabsTrigger value="actions">
                Actions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chronicles" className="mt-4">
              <ChroniclesPanel 
                chronicles={gameState.chronicles} 
                chroniclers={gameState.chroniclers}
              />
            </TabsContent>

            <TabsContent value="status" className="mt-4">
              <StatusPanel
                playerFaction={gameState.playerFaction}
                playerCharacter={gameState.playerCharacter}
                territories={gameState.territories}
                selectedTerritory={gameState.selectedTerritory}
                selectedFaction={gameState.selectedFaction}
              />
            </TabsContent>

            <TabsContent value="actions" className="mt-4">
              <ActionsPanel
                playerFaction={gameState.playerFaction}
                territories={gameState.territories}
                selectedTerritory={gameState.selectedTerritory}
                selectedFaction={gameState.selectedFaction}
                onAction={gameState.handleAction}
                onEndTurn={gameState.handleEndTurn}
                onRecruitTroops={gameState.handleRecruitTroops}
                onSpy={gameState.handleSpy}
                onAttack={gameState.handleAttack}
                getValidAttackTargets={gameState.getValidAttackTargets}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;