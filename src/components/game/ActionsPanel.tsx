import React from "react";
import { useRef, useState, useLayoutEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { CharacterDialog } from "@/components/game/CharacterProfile";
import { AttackOrder, Character, ChatEntry } from "@/types/gameTypes";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { Faction, Territory } from "@/types/gameTypes";
import { chroniclers } from "@/data/gameData";
import { BasicActions } from "@/components/game/actions/BasicActions";
import { factions } from "@/data/factions";
import { Advice } from "@/components/game/status/Advice";
import { HelpMenu } from "@/components/game/help/HelpMenu";
import { HelpContent } from "@/components/game/help/HelpContent";
import { Chat } from "./Chat";

type ActionsPanelProps = {
  playerCharacter: Character;
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
  isClickedOnMapYet: boolean;
};

export function ActionsPanel({
  playerCharacter,
  playerFaction,
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
  isClickedOnMapYet,
}: ActionsPanelProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const adviser = chroniclers[adviserIndex];

  return (
    <>
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

            {selectedTerritory ? (
              <SelectedTerritoryInfo
                territories={territories}
                territoryName={selectedTerritory}
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
              <div className="flex flex-col flex-1 min-h-0 pt-3 space-y-4">
                <div className="flex-1 min-h-0">
                  {selectedTopic ? (
                    <HelpContent
                      topic={selectedTopic}
                      adviser={adviser}
                      player={playerCharacter}
                    />
                  ) : isClickedOnMapYet ? (
                    <Advice
                      player={playerCharacter}
                      adviser={adviser}
                      playerFaction={playerFaction}
                    />
                  ) : (
                    <Chat items={getHint(adviser)} />
                  )}
                </div>

                <div className="flex-shrink-0">
                  <HelpMenu onSelectTopic={setSelectedTopic} />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function getHint(adviser: Character): ChatEntry[] {
  let statement: string;

  switch (adviser.name) {
    case "John of Colchis":
      statement =
        "Pick a territory on the map, my Liege, and take your next heroic action!";
      break;
    case "Priscilla of Byzantium":
      statement = "Choose a territory by clicking on the map, Sire!";
      break;
    case "Eudaemonia of Rheims":
      statement =
        "Just pick a territory on this chart, Sire, and let's make a plan for the season.";
      break;
    case "Athaloc of Smyrna":
      statement =
        "Select a territory on the map, your Majesty, and we may procede.";
      break;
  }

  return [
    {
      author: adviser,
      statement: statement,
    },
  ];
}
