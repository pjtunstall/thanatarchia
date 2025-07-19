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
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  adviserIndex: number;
  factionTreasures: number[];
  playerIndex: number;
  onReinforce: (from: string, to: string) => void;
  onUndoReinforce: (from: string, to: string) => void;
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
  setScheduledAttacks,
  onReinforce,
  onUndoReinforce,
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
                Territories:{" "}
                {playerTerritories.length === 0
                  ? "none"
                  : playerTerritories.join(", ").replace(/, $/, "")}
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
                setScheduledAttacks={setScheduledAttacks}
                onReinforce={onReinforce}
                onUndoReinforce={onUndoReinforce}
              />
            )}

            <Advice
              playerCharacter={playerCharacter}
              adviserIndex={adviserIndex}
              playerFaction={playerFaction}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

type AdviceProps = {
  playerCharacter: Character;
  playerFaction: Faction;
  adviserIndex: number;
};

function Advice({ playerCharacter, adviserIndex, playerFaction }: AdviceProps) {
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

      <div className="border-l-4 border-primary pl-4 py-2">
        <div className="flex items-center gap-3 mb-2">
          <CharacterDialog character={playerCharacter} />
          <Badge variant="secondary">{playerCharacter.name}</Badge>
        </div>
        <p className="text-sm italic font-serif leading-relaxed">
          {randomRejoinder(adviser.name, playerFaction)}
        </p>
      </div>
    </>
  );
}

function randomRejoinder(adviserName: string, playerFaction: Faction): string {
  const r = Math.random();
  if (r < 0.1) {
    return `Thanks for that, ${adviserName}. I'll bear it in mind.`;
  } else if (r < 0.2) {
    return "I see.";
  } else if (r < 0.3) {
    return "Wise...";
  } else if (r < 0.4) {
    return `Interesting take, ${adviserName}.`;
  } else if (r < 0.5) {
    return `Sometimes, ${adviserName}, I wonder whose side you're really on.`;
  } else if (r < 0.6) {
    return `Be that as it may, ${adviserName}, we ${playerFaction.name} will prevail.`;
  } else if (r < 0.7) {
    return `Come on, ${adviserName}, you can do better than that.`;
  } else if (r < 0.8) {
    return `What would I do without you, ${adviserName}?`;
  } else if (r < 0.9) {
    return "What will be, will be.";
  } else {
    return `Is that so, ${adviserName}?`;
  }
}
