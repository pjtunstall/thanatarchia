import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sword, Eye, Coins, Users, MapPin } from "lucide-react";
import { Faction, Territory, CharacterPortrait } from "@/types/GameTypes";
import { chroniclers, getFaithColor, initialReport } from "@/data/gameData";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { CharacterDialog } from "@/components/game/CharacterDialog";

interface StatusPanelProps {
  playerFaction: Faction;
  playerCharacter: CharacterPortrait;
  territories: Territory[];
  selectedTerritory: string | null;
  adviserIndex: number;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  playerFaction,
  playerCharacter,
  territories,
  selectedTerritory,
  adviserIndex,
}) => {
  // Calculate actual total troops from player-owned territories
  const playerTerritories = territories.filter(
    (t) => t.owner === playerFaction.name
  );
  const totalTroops = playerTerritories.reduce(
    (sum, territory) => sum + (territory.troops || 0),
    0
  );

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
            <PlayerCharacterProfile
              playerCharacter={playerCharacter}
            ></PlayerCharacterProfile>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-semibold">Treasure:</span>
                <span className="text-sm">{playerFaction.treasure} solidi</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold">Total Troops:</span>
                <span className="text-sm">{totalTroops}</span>
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
              <p className="text-sm">Territories: {playerTerritories.length}</p>
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
                selectedFaction={playerFaction}
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

interface PlayerCharacterProps {
  playerCharacter: CharacterPortrait;
}

const PlayerCharacterProfile: React.FC<PlayerCharacterProps> = ({
  playerCharacter,
}) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
      <CharacterDialog character={playerCharacter} size="lg" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{playerCharacter.name}</h3>
      </div>
    </div>
  );
};

const Advice: React.FC<{
  playerCharacter: CharacterPortrait;
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
