import React from "react";
import { useState } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { AttackOrder, Character } from "@/types/gameTypes";
import { SelectedTerritoryPanel } from "@/components/game/SelectedTerritoryPanel";
import { Faction, Territory } from "@/types/gameTypes";
import { chroniclers } from "@/data/chronicles";
import { factions } from "@/data/factions";
import { Help } from "@/components/game/Help";
import { HeaderActions } from "@/components/game/actions/HeaderActions";
import { PendingFaithAlert } from "@/components/game/actions/PendingFaithAlert";

type ActionsPanelProps = {
  currentTurn: number;
  playerCharacter: Character;
  playerFaction: Faction;
  playerIndex: number;
  adviserIndex: number;
  factionTreasures: number[];
  factionLeaders: Character[];
  territories: Territory[];
  selectedTerritoryName: string | null;
  scheduledAttacks: AttackOrder[];
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  onEndTurn: () => void;
  onRecruit: (territoryName: string) => void;
  onSpy: (territoryId: string) => void;
  onReinforce: (
    fromTerritoryId: string,
    toTerritoryId: string,
    callback: () => void
  ) => void;
  onUndoReinforce: (
    fromTerritoryName: string,
    toTerritoryName: string,
    callback: () => void
  ) => void;
  getValidAttackTargets: (fromTerritoryId: string) => Territory[];
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  stats: string;
  setStats: React.Dispatch<React.SetStateAction<string>>;
  factionFaiths: string[];
  onChangeFaith: (
    index: number,
    faith: string,
    leaders: Character[],
    setLeaders: React.Dispatch<React.SetStateAction<Character[]>>
  ) => void;
  setFactionLeaders: React.Dispatch<React.SetStateAction<Character[]>>;
  setAdviserIndex: React.Dispatch<React.SetStateAction<number>>;
  setHasChangedFromEudaemonia: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTerritoryName: React.Dispatch<React.SetStateAction<string | null>>;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
};

export function ActionsPanel({
  currentTurn,
  playerCharacter,
  playerFaction,
  playerIndex,
  factionTreasures,
  factionLeaders,
  selectedTerritoryName,
  scheduledAttacks,
  factionFaiths,
  adviserIndex,
  territories,
  setScheduledAttacks,
  onReinforce,
  onUndoReinforce,
  onRecruit,
  onSpy,
  onEndTurn,
  onChangeFaith,
  setFactionLeaders,
  setAdviserIndex,
  setHasChangedFromEudaemonia,
  setFactionAggressions,
  setFactionTreasures,
}: ActionsPanelProps) {
  const [pendingFaith, setPendingFaith] = useState<string | null>(null);
  const confirmFaithChange = () => {
    if (pendingFaith) {
      onChangeFaith(
        playerIndex,
        pendingFaith,
        factionLeaders,
        setFactionLeaders
      );
      setPendingFaith(null);
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col actions-panel">
        <CardHeader>
          <HeaderActions
            onEndTurn={onEndTurn}
            setPendingFaith={setPendingFaith}
            factionFaiths={factionFaiths}
            playerIndex={playerIndex}
            playerFaction={playerFaction}
            playerCharacter={playerCharacter}
            factionLeaders={factionLeaders}
            setFactionAggressions={setFactionAggressions}
            setFactionTreasures={setFactionTreasures}
          ></HeaderActions>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden min-h-0">
          <div className="h-full flex flex-col">
            {selectedTerritoryName ? (
              <>
                <SelectedTerritoryPanel
                  territories={territories}
                  territoryName={selectedTerritoryName}
                  factionLeaders={factionLeaders}
                  playerFactionName={factions[playerIndex].name}
                  scheduledAttacks={scheduledAttacks}
                  setScheduledAttacks={setScheduledAttacks}
                  onRecruit={onRecruit}
                  onSpy={onSpy}
                  onReinforce={onReinforce}
                  onUndoReinforce={onUndoReinforce}
                  factionFaiths={factionFaiths}
                  playerIndex={playerIndex}
                  factionTreasures={factionTreasures}
                  setFactionTreasures={setFactionTreasures}
                  setFactionAggressions={setFactionAggressions}
                />
              </>
            ) : (
              <Help
                currentTurn={currentTurn}
                adviser={chroniclers[adviserIndex]}
                player={playerCharacter}
                playerFaction={playerFaction}
                setAdviserIndex={setAdviserIndex}
                setHasChangedFromEudaemonia={setHasChangedFromEudaemonia}
              ></Help>
            )}
          </div>
        </CardContent>
      </Card>

      <PendingFaithAlert
        pendingFaith={pendingFaith}
        setPendingFaith={setPendingFaith}
        confirmFaithChange={confirmFaithChange}
      ></PendingFaithAlert>
    </>
  );
}
