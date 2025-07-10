import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Faction, CharacterPortrait } from "@/types/GameTypes";
import { Crown, Users, Church } from "lucide-react";
import { getFaithColor } from "@/data/GameData";

interface FactionDetailsProps {
  faction: Faction;
  isPlayerFaction?: boolean;
  playerCharacter?: CharacterPortrait;
}

const FactionDetails: React.FC<FactionDetailsProps> = ({
  faction,
  isPlayerFaction = false,
  playerCharacter,
}) => {
  // Use player character if this is the player faction, otherwise use faction leader
  const leader =
    isPlayerFaction && playerCharacter
      ? {
          name: playerCharacter.name,
          gender: playerCharacter.gender,
          image: playerCharacter.image,
        }
      : faction.leader;

  return (
    <Card className="w-80">
      <CardHeader className="pb-3 bg-muted/30">
        <div className="flex items-center gap-3">
          <Avatar className="w-16 h-16 border-2 border-primary/20 transition-transform duration-200 hover:scale-125 hover:z-10 relative cursor-pointer">
            <AvatarImage
              src={leader.image}
              alt={`${leader.name} portrait`}
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-bold">
              {leader.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
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

export default FactionDetails;
