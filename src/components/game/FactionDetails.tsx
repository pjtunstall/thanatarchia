import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Faction, Character } from "@/types/gameTypes";
import { Crown, Users, Church } from "lucide-react";
import { getFaithColor } from "@/data/gameData";
import { CharacterDialog } from "@/components/game/CharacterProfile";

interface FactionDetailsProps {
  faction: Faction;
  leader: Character;
  isPlayerFaction?: boolean;
}

export const FactionDetails: React.FC<FactionDetailsProps> = ({
  faction,
  leader,
  isPlayerFaction = false,
}) => {
  return (
    <Card className="w-80">
      <CardHeader className="pb-3 bg-muted/30">
        <div className="flex items-center gap-3">
          <CharacterDialog character={leader} size="lg" />
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {isPlayerFaction && <Crown className="w-4 h-4 text-yellow-500" />}
              {faction.formalName}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              {leader.name}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 bg-muted/30">
        {/* Faith */}
        <div className="flex items-center gap-2">
          <Church className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Faith:</span>
          <Badge
            variant="outline"
            className={`${getFaithColor(faction.faith)} text-xs`}
          >
            {faction.faith}
          </Badge>
        </div>

        <Separator />

        {/* Relatives */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Available Relatives:</span>
          </div>
          <div className="space-y-1">
            {faction.relatives.map((relative, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-xs bg-muted/30 rounded px-2 py-1"
              >
                <span>{relative}</span>
                <Badge variant="secondary" className="text-xs">
                  Available
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {isPlayerFaction && (
          <>
            <Separator />
            <div className="text-xs text-center text-muted-foreground italic">
              This is your faction
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
