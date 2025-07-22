import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { AttackOrder, Character } from "@/types/gameTypes";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { Faction, Territory } from "@/types/gameTypes";
import { chroniclers } from "@/data/gameData";
import { BasicActions } from "@/components/game/actions/BasicActions";
import { factions } from "@/data/factions";
import { CharacterDialog } from "@/components/game/CharacterProfile";

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
  onEndTurn: () => void;
  onRecruit: () => void;
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
    onEndTurn,
    factionFaiths,
    adviserIndex,
    onChangeFaith,
    setFactionLeaders,
  } = props;
  const adviser = chroniclers[adviserIndex];

  return (
    <>
      <Card className="max-h-full overflow-auto">
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <BasicActions
              onEndTurn={onEndTurn}
              onChangeFaith={onChangeFaith}
              playerIndex={playerIndex}
              factionFaiths={factionFaiths}
              factionLeaders={factionLeaders}
              setFactionLeaders={setFactionLeaders}
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
                    factionFaiths={factionFaiths}
                  />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {!selectedTerritory && (
        <Card className="max-h-full overflow-auto">
          <CardContent>
            <div className="space-y-4">
              <div className="border-t pt-3">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center gap-3 mb-2">
                    <CharacterDialog character={adviser} />
                    <Badge variant="secondary">{adviser.name}</Badge>
                  </div>
                  <p className="text-sm italic font-serif leading-relaxed">
                    {getHint(adviser)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

function getHint(adviser: Character): string {
  switch (adviser.name) {
    case "John of Colchis":
      return "Pick a territory, my Liege, and decide an action!";
    case "Priscilla of Byzantium":
      return "Choose a territory by clicking on the map, Sire!";
    case "Eudaemonia of Rheims":
      return "Just pick a territory on the chart, my Lord, and let's make a plan for this season.";
    case "Athaloc of Smyrna":
      return "Select a territory, Majesty, and we may procede!";
    default:
      return "Pick a territory on the map, sire!";
  }
}
