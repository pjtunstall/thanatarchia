import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameState } from '@/hooks/useGameState';
import GameMap from '@/components/game/GameMap';
import StatusPanel from '@/components/game/StatusPanel';
import ChroniclesPanel from '@/components/game/ChroniclesPanel';
import ActionsPanel from '@/components/game/ActionsPanel';
import GameOverlay from '@/components/game/GameOverlay';

const GameDashboard = () => {
  const [activeTab, setActiveTab] = useState('chronicles');
  const [focusedTabIndex, setFocusedTabIndex] = useState(0);
  
  const gameState = useGameState();

  // Keyboard navigation for tabs
  const tabOrder = ['chronicles', 'status', 'actions'];

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedTabIndex(prev => prev > 0 ? prev - 1 : tabOrder.length - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setFocusedTabIndex(prev => prev < tabOrder.length - 1 ? prev + 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        setActiveTab(tabOrder[focusedTabIndex]);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <GameOverlay gameStatus={gameState.gameStatus} onResetGame={gameState.resetGame} />
      
      <div className="grid grid-cols-12 gap-4 h-screen">
        {/* Map Panel */}
        <div className="col-span-7">
          <GameMap
            territories={gameState.territories}
            selectedTerritory={gameState.selectedTerritory}
            currentTurn={gameState.currentTurn}
            onTerritoryClick={gameState.handleTerritoryClick}
          />
        </div>

        {/* Right Panel - Tabbed Interface */}
        <div className="col-span-5">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3" onKeyDown={handleTabKeyDown}>
              <TabsTrigger 
                value="chronicles" 
                className={focusedTabIndex === 0 && activeTab !== 'chronicles' ? 'ring-2 ring-primary' : ''}
              >
                Chronicles
              </TabsTrigger>
              <TabsTrigger 
                value="status"
                className={focusedTabIndex === 1 && activeTab !== 'status' ? 'ring-2 ring-primary' : ''}
              >
                Status
              </TabsTrigger>
              <TabsTrigger 
                value="actions"
                className={focusedTabIndex === 2 && activeTab !== 'actions' ? 'ring-2 ring-primary' : ''}
              >
                Actions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chronicles" className="mt-4">
              <ChroniclesPanel chronicles={gameState.chronicles} />
            </TabsContent>

            <TabsContent value="status" className="mt-4">
              <StatusPanel
                playerFaction={gameState.playerFaction}
                playerCharacter={gameState.playerCharacter}
                territories={gameState.territories}
                selectedTerritory={gameState.selectedTerritory}
              />
            </TabsContent>

            <TabsContent value="actions" className="mt-4">
              <ActionsPanel
                playerFaction={gameState.playerFaction}
                territories={gameState.territories}
                selectedTerritory={gameState.selectedTerritory}
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