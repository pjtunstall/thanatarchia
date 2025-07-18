import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coins, Users } from "lucide-react";

import { Faction, Territory, Character, AttackOrder } from "@/types/gameTypes";
import { chroniclers, getFaithColor, initialReport } from "@/data/gameData";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import {
  CharacterProfile,
  CharacterDialog,
} from "@/components/game/CharacterProfile";

type StatusPanelProps = {
  playerFaction: Faction;
  playerCharacter: Character;
  territories: Territory[];
  playerTerritories: string[];
  playerTroops: number;
  selectedTerritory: string | null;
  scheduledAttacks: AttackOrder[];
  adviserIndex: number;
  factionTreasures: number[];
  playerIndex: number;
};

export const StatusPanel: React.FC<StatusPanelProps> = ({
  playerFaction,
  playerCharacter,
  territories,
  playerTerritories,
  playerTroops,
  selectedTerritory,
  adviserIndex,
  factionTreasures,
  playerIndex,
  scheduledAttacks,
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{playerFaction.formalName}</CardTitle>
        <Badge style={{ backgroundColor: playerFaction.color }}>
          {playerFaction.type.charAt(0).toUpperCase() +
            playerFaction.type.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            <CharacterProfile
              playerCharacter={playerCharacter}
            ></CharacterProfile>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-semibold">Treasure:</span>
                <span className="text-sm">
                  {factionTreasures[playerIndex]} solidi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold">Total Troops:</span>
                <span className="text-sm">{playerTroops}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Faith:</span>
                <Badge
                  variant="outline"
                  className={`${getFaithColor(playerFaction.faith)} text-xs`}
                >
                  {playerFaction.faith}
                </Badge>
              </div>
              <p className="text-sm">
                Territories: {playerTerritories.join(", ").replace(/, $/, "")}
              </p>
              <div>
                <p className="text-sm font-semibold mb-1">
                  Available for Marriage:
                </p>
                {playerFaction.relatives.map((relative, index) => (
                  <Badge key={index} variant="outline" className="mr-1 mb-1">
                    {relative}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedTerritory && (
              <SelectedTerritoryInfo
                territories={territories}
                selectedTerritory={selectedTerritory}
                playerFactionName={playerFaction.name}
                scheduledAttacks={scheduledAttacks}
              />
            )}

            <Advice
              playerCharacter={playerCharacter}
              adviserIndex={adviserIndex}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const Advice: React.FC<{
  playerCharacter: Character;
  adviserIndex: number;
}> = ({ playerCharacter, adviserIndex }) => {
  const adviser = chroniclers[adviserIndex];

  return (
    <>
      <div className="border-l-4 border-primary pl-4 py-2">
        <div className="flex items-center gap-3 mb-2">
          <CharacterDialog character={playerCharacter} />
          <Badge variant="secondary">{playerCharacter.name}</Badge>
        </div>
        <p className="text-sm italic font-serif leading-relaxed">
          "What do you counsel, {adviser.name}?"
        </p>
      </div>

      <div className="border-l-4 border-primary pl-4 py-2">
        <div className="flex items-center gap-3 mb-2">
          <CharacterDialog character={adviser} />
          <Badge variant="secondary">{adviser.name}</Badge>
        </div>
        <p className="text-sm italic font-serif leading-relaxed">
          {initialReport(adviser.name)}
        </p>
      </div>
    </>
  );
};
