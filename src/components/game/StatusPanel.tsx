import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Coins, Users } from "lucide-react";
import { Faction, Territory, CharacterPortrait } from "@/types/GameTypes";

interface StatusPanelProps {
  playerFaction: Faction;
  playerCharacter: CharacterPortrait;
  territories: Territory[];
  selectedTerritory: string | null;
  selectedFaction: { name: string; heresy: string };
}

const StatusPanel: React.FC<StatusPanelProps> = ({
  playerFaction,
  playerCharacter,
  territories,
  selectedTerritory,
  selectedFaction,
}) => {
  // Calculate actual total troops from player-owned territories
  const playerTerritories = territories.filter(
    (t) => t.owner === selectedFaction.name
  );
  const totalTroops = playerTerritories.reduce(
    (sum, territory) => sum + (territory.troops || 0),
    0
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{playerFaction.name}</CardTitle>
        <Badge style={{ backgroundColor: playerFaction.color }}>
          {playerFaction.type.charAt(0).toUpperCase() +
            playerFaction.type.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            {/* Player Character Portrait */}
            <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
              <Avatar className="w-16 h-16 transition-transform duration-200 hover:scale-125 hover:z-10 relative cursor-pointer">
                <AvatarImage
                  src={playerCharacter.image}
                  alt={playerCharacter.name}
                />
                <AvatarFallback>
                  {playerCharacter.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {playerCharacter.name}
                </h3>
              </div>
            </div>

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
                <Badge variant="outline" className="text-xs">
                  {selectedFaction.heresy}
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
              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-2">Selected Territory</p>
                <div className="text-xs space-y-1">
                  {(() => {
                    const territory = territories.find(
                      (t) => t.name === selectedTerritory
                    );
                    return territory ? (
                      <>
                        <p>
                          <strong>{territory.name}</strong>
                        </p>
                        <p>
                          Owner:{" "}
                          {territory.owner === selectedFaction.name
                            ? "You"
                            : territory.owner}
                        </p>
                        <p>Terrain: {territory.terrain}</p>
                        <p>Troops: {territory.troops}</p>
                      </>
                    ) : null;
                  })()}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StatusPanel;
