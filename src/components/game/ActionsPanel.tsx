import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Chronicler, AttackOrder, Character } from "@/types/gameTypes";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { Faction, Territory } from "@/types/gameTypes";
import { BasicActions } from "@/components/game/actions/BasicActions";
import { factions } from "@/data/factions";

type ActionsPanelProps = {
  playerFaction: Faction;
  playerIndex: number;
  adviserIndex: number;
  factionTreasures: number[];
  factionLeaders: Character[];
  territories: Territory[];
  selectedTerritory: string | null;
  scheduledAttacks: AttackOrder[];
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  onAction: (action: string) => void;
  onEndTurn: () => void;
  onRecruit: () => void;
  onSpy: (territoryId: string) => void;
  onReinforce: (fromTerritoryId: string, toTerritoryId: string) => void;
  onUndoReinforce: (fromTerritoryName: string, toTerritoryName: string) => void;
  getValidAttackTargets: (fromTerritoryId: string) => Territory[];
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  currentChronicler: Chronicler;
  setCurrentChronicler: React.Dispatch<React.SetStateAction<Chronicler>>;
  stats: string;
  setStats: React.Dispatch<React.SetStateAction<string>>;
};

export const ActionsPanel: React.FC<ActionsPanelProps> = (props) => {
  const {
    playerIndex,
    factionTreasures,
    factionLeaders,
    selectedTerritory,
    scheduledAttacks,
    setScheduledAttacks,
    territories,
    onReinforce,
    onUndoReinforce,
    onRecruit,
    onSpy,
  } = props;

  return (
    <>
      <Card className="max-h-full overflow-auto">
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <BasicActions
              onAction={props.onAction}
              onEndTurn={props.onEndTurn}
            />

            <div className="border-t pt-3">
              {selectedTerritory && (
                <>
                  <SelectedTerritoryInfo
                    territories={territories}
                    selectedTerritory={selectedTerritory}
                    factionLeaders={factionLeaders}
                    playerFactionName={factions[playerIndex].name}
                    playerTreasure={factionTreasures[playerIndex]}
                    scheduledAttacks={scheduledAttacks}
                    setScheduledAttacks={setScheduledAttacks}
                    onRecruit={onRecruit}
                    onSpy={onSpy}
                    onReinforce={onReinforce}
                    onUndoReinforce={onUndoReinforce}
                  />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
