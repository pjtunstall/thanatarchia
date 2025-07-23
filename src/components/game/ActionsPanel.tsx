import React from "react";
import { Info } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CharacterDialog } from "@/components/game/CharacterProfile";
import { AttackOrder, Character } from "@/types/gameTypes";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { Faction, Territory } from "@/types/gameTypes";
import { chroniclers } from "@/data/gameData";
import { BasicActions } from "@/components/game/actions/BasicActions";
import { factions } from "@/data/factions";
import { ScrollAreaWithFade } from "@/components/ui-custom/ScrollAreaWithFade";
import { Help } from "@/components/game/Help";

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
}: ActionsPanelProps) {
  const adviser = chroniclers[adviserIndex];

  return (
    <>
      <Card className="max-h-full overflow-auto">
        <CardContent>
          <div className="space-y-4 pt-8">
            <BasicActions
              onEndTurn={onEndTurn}
              onChangeFaith={onChangeFaith}
              playerIndex={playerIndex}
              factionFaiths={factionFaiths}
              factionLeaders={factionLeaders}
              setFactionLeaders={setFactionLeaders}
            />

            <div className="border-t pt-3">
              {selectedTerritory ? (
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
              ) : (
                <>
                  <ScrollAreaWithFade height="h-full">
                    <div className="p-6 pb-8">
                      <div className="flex items-center gap-3 mb-6">
                        <CharacterDialog character={adviser} />
                        <Badge variant="secondary">{adviser.name}</Badge>
                      </div>
                      <p className="text-sm italic font-serif leading-relaxed">
                        {getHint(adviser)}
                      </p>
                    </div>
                  </ScrollAreaWithFade>

                  <Help></Help>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function getHint(adviser: Character): string {
  switch (adviser.name) {
    case "John of Colchis":
      return '"Pick a territory on the map, my Liege, and take your next heroic action!"';
    case "Priscilla of Byzantium":
      return '"Choose a territory by clicking on the map, Sire!"';
    case "Eudaemonia of Rheims":
      return `"Just pick a territory on this chart, Sire, and let us make a plan for the season."`;
    case "Athaloc of Smyrna":
      return '"Select a territory on the map, your Majesty, and we may procede."';
  }
}
