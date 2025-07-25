import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { Character, BattleReport } from "@/types/gameTypes";
import { factions } from "@/data/gameData.ts";
import { useGameState } from "@/hooks/useGameState";
import { GameMap } from "@/components/game/GameMap";
import { StatusPanel } from "@/components/game/StatusPanel";
import { ChroniclesPanel } from "@/components/game/ChroniclesPanel";
import { ActionsPanel } from "@/components/game/ActionsPanel";
import { GameOverlay } from "@/components/game/GameOverlay";
import { CharacterDialog } from "@/components/game/CharacterProfile";

export const GameDashboard = () => {
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
      <div className="min-h-screen bg-background p-4">
        <GameOverlay
          gameStatus={gameState.gameStatus}
          onResetGame={gameState.resetGame}
        />

        {/* Change from h-screen to calc to account for padding */}
        <div
          className="grid grid-cols-12 gap-4"
          style={{ height: "calc(100vh - 2rem)" }}
        >
          {/* Map Panel */}
          <div className="col-span-7 h-full">
            <GameMap
              territories={gameState.territories}
              selectedTerritoryName={gameState.selectedTerritoryName}
              currentTurn={gameState.currentTurn}
              factions={factions}
              factionLeaders={gameState.factionLeaders}
              playerFactionName={factions[gameState.playerIndex].name}
              playerFactionColor={factions[gameState.playerIndex].color}
              playerFactionSymbol={factions[gameState.playerIndex].symbol}
              scheduledAttacks={gameState.scheduledAttacks}
              onTerritoryClick={gameState.handleTerritoryClick}
              factionFaiths={gameState.factionFaiths}
            />
          </div>

          {/* Right Panel - Tabbed Interface */}
          <div className="col-span-5 h-full flex flex-col min-h-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full flex flex-col min-h-0"
            >
              <TabsList
                className="grid w-full grid-cols-3 flex-shrink-0"
                onKeyDown={handleTabKeyDown}
              >
                <TabsTrigger value="chronicles">Chronicles</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent
                value="chronicles"
                className="mt-4 flex-1 overflow-hidden min-h-0"
              >
                <ChroniclesPanel
                  chronicles={gameState.chronicles}
                  playerIndex={gameState.playerIndex}
                  adviserIndex={gameState.adviserIndex}
                />
              </TabsContent>

              <TabsContent
                value="status"
                className="mt-4 flex-1 overflow-hidden min-h-0"
              >
                <StatusPanel
                  playerFaction={factions[gameState.playerIndex]}
                  playerCharacter={
                    gameState.factionLeaders[gameState.playerIndex]
                  }
                  playerTerritories={
                    gameState.factionTerritories[gameState.playerIndex]
                  }
                  playerTroops={gameState.factionTroops[gameState.playerIndex]}
                  scheduledAttacks={gameState.scheduledAttacks}
                  adviserIndex={gameState.adviserIndex}
                  factionTreasures={gameState.factionTreasures}
                  playerIndex={gameState.playerIndex}
                  factionFaiths={gameState.factionFaiths}
                />
              </TabsContent>

              <TabsContent
                value="actions"
                className="mt-4 flex-1 overflow-hidden"
              >
                <ActionsPanel
                  playerCharacter={
                    gameState.factionLeaders[gameState.playerIndex]
                  }
                  playerFaction={factions[gameState.playerIndex]}
                  playerIndex={gameState.playerIndex}
                  adviserIndex={gameState.adviserIndex}
                  factionTreasures={gameState.factionTreasures}
                  factionLeaders={gameState.factionLeaders}
                  territories={gameState.territories}
                  selectedTerritoryName={gameState.selectedTerritoryName}
                  scheduledAttacks={gameState.scheduledAttacks}
                  setScheduledAttacks={gameState.setScheduledAttacks}
                  onEndTurn={gameState.handleEndTurn}
                  onRecruit={gameState.handleRecruit}
                  onSpy={gameState.handleSpy}
                  onReinforce={gameState.handleReinforce}
                  getValidAttackTargets={gameState.getValidAttackTargets}
                  success={gameState.success}
                  setSuccess={gameState.setSuccess}
                  stats={gameState.stats}
                  setStats={gameState.setStats}
                  onUndoReinforce={gameState.handleUndoReinforce}
                  factionFaiths={gameState.factionFaiths}
                  onChangeFaith={gameState.handleChangeFaith}
                  setFactionLeaders={gameState.setFactionLeaders}
                  isClickedOnMapYet={gameState.isClickedOnMapYet}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <BattleReportDialog
        battleMessage={gameState.battleMessageQueue[0] ?? null}
        dequeueBattleMessage={gameState.dequeueBattleMessage}
      />
    </>
  );
};

const BattleReportDialog: React.FC<{
  battleMessage: BattleReport | null;
  dequeueBattleMessage: () => void;
}> = ({ battleMessage, dequeueBattleMessage }) => {
  if (!battleMessage) return null;

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) dequeueBattleMessage();
      }}
    >
      <DialogContent>
        <BattleReportComponent
          chronicler={battleMessage.author}
          chronicle={battleMessage.message}
          stats={battleMessage.stats}
          success={battleMessage.success}
        />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

const BattleReportComponent: React.FC<{
  chronicler: Character;
  chronicle: string;
  stats: string;
  success: boolean;
}> = ({ chronicler, chronicle, stats, success }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <img
        src="src/assets/battle.jpg"
        alt="Battle scene"
        className="w-full md:w-1/2 rounded object-cover max-h-[300px]"
      />
      <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {success ? "Huzzah!" : "Alas!"}
          </DialogTitle>
        </DialogHeader>
        <div className="border-l-4 border-primary pl-4 py-2">
          <div className="flex items-center gap-3 mb-2">
            <CharacterDialog character={chronicler} />
            <Badge variant="secondary">{chronicler.name}</Badge>
          </div>
          <p
            className="text-sm italic font-serif leading-relaxed"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {chronicle}
          </p>
          <p className="h-4" />
          <p
            className="text-sm font-serif leading-relaxed text-gray-500"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {stats}
          </p>
        </div>
      </div>
    </div>
  );
};
