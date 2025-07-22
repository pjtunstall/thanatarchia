import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Users } from "lucide-react";

import { Faction, Character, AttackOrder } from "@/types/gameTypes";
import { getFaithColor } from "@/data/gameData";
import { CharacterProfile } from "@/components/game/CharacterProfile";
import { Advice } from "@/components/game/status/Advice";
import { ScrollAreaWithFade } from "@/components/ui-custom/ScrollAreaWithFade";

type StatusPanelProps = {
  playerFaction: Faction;
  playerCharacter: Character;
  playerTerritories: string[];
  playerTroops: number;
  selectedTerritory: string | null;
  scheduledAttacks: AttackOrder[];
  adviserIndex: number;
  factionTreasures: number[];
  playerIndex: number;
  factionFaiths: string[];
};

export function StatusPanel({
  playerFaction,
  playerCharacter,
  playerTerritories,
  playerTroops,
  factionTreasures,
  playerIndex,
  factionFaiths,
  adviserIndex,
}: StatusPanelProps) {
  const playerFaith = factionFaiths[playerIndex];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{playerFaction.formalName}</CardTitle>
        <Badge style={{ backgroundColor: playerFaction.color }}>
          {playerFaction.type.charAt(0).toUpperCase() +
            playerFaction.type.slice(1)}
        </Badge>
      </CardHeader>

      {/* Make CardContent grow to fill remaining height */}
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        {/* Scrollable area with full height minus CardHeader */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="space-y-4 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <CharacterProfile playerCharacter={playerCharacter} />

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
                  className={`${getFaithColor(playerFaith)} text-xs`}
                >
                  {playerFaith}
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
              <ScrollAreaWithFade height="h-full">
                <div className="border-t pt-3">
                  <Advice
                    playerCharacter={playerCharacter}
                    adviserIndex={adviserIndex}
                    playerFaction={playerFaction}
                  />
                </div>
              </ScrollAreaWithFade>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
