import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import { AttackOrder, Character } from "@/types/gameTypes";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { Faction, Territory } from "@/types/gameTypes";
import { chroniclers } from "@/data/chronicles";
import { BasicActions } from "@/components/game/actions/BasicActions";
import { factions } from "@/data/factions";
import { Help } from "@/components/game/Help";

type ActionsPanelProps = {
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
  onReinforce: (fromTerritoryId: string, toTerritoryId: string) => void;
  onUndoReinforce: (fromTerritoryName: string, toTerritoryName: string) => void;
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
};

export function ActionsPanel({
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
}: ActionsPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 overflow-hidden min-h-0">
        <div className="space-y-4 pt-8 h-full flex flex-col">
          <BasicActions
            onEndTurn={onEndTurn}
            onChangeFaith={onChangeFaith}
            playerIndex={playerIndex}
            factionFaiths={factionFaiths}
            factionLeaders={factionLeaders}
            setFactionLeaders={setFactionLeaders}
          />

          {selectedTerritoryName ? (
            <SelectedTerritoryInfo
              territories={territories}
              territoryName={selectedTerritoryName}
              factionLeaders={factionLeaders}
              playerFactionName={factions[playerIndex].name}
              playerTreasure={factionTreasures[playerIndex]}
              scheduledAttacks={scheduledAttacks}
              setScheduledAttacks={setScheduledAttacks}
              onRecruit={onRecruit}
              onSpy={onSpy}
              onReinforce={onReinforce}
              onUndoReinforce={onUndoReinforce}
              factionFaiths={factionFaiths}
            />
          ) : (
            <Help
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
  );
}
