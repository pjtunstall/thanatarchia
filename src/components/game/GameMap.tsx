import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Territory } from "@/types/GameTypes";
import { historicalFactions } from "@/data/GameData";
import romanEmpireMap from "@/assets/roman-empire-map-clean.jpg";

interface GameMapProps {
  territories: Territory[];
  selectedTerritory: string | null;
  currentTurn: number;
  onTerritoryClick: (territoryId: string) => void;
}

const GameMap: React.FC<GameMapProps> = ({
  territories,
  selectedTerritory,
  currentTurn,
  onTerritoryClick,
}) => {
  const getTerritoryColor = (owner: string) => {
    if (owner === "player") return "bg-[hsl(var(--barbarian))]";
    
    const faction = historicalFactions.find(f => f.name === owner);
    if (!faction) return "bg-[hsl(var(--barbarian))]";
    
    switch (faction.type) {
      case "imperial":
        return "bg-[hsl(var(--imperial))]";
      case "bagaudae":
        return "bg-[hsl(var(--bagaudae))]";
      case "barbarian":
      default:
        return "bg-[hsl(var(--barbarian))]";
    }
  };
  
  return (
    <Card className="h-full parchment-texture">
      <CardHeader>
        <CardTitle className="text-2xl font-bold ancient-title">
          Tabula Imperii - Turn {currentTurn}
        </CardTitle>
        <p className="text-muted-foreground italic">
          The Known World, Anno Domini 476
        </p>

        {/* Faction Legend */}
        <div className="flex flex-wrap gap-4 mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[hsl(var(--barbarian))] border-2 border-white"></div>
            <span className="text-sm">Your Faction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[hsl(var(--imperial))] border"></div>
            <span className="text-sm">Imperial Factions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[hsl(var(--bagaudae))] border"></div>
            <span className="text-sm">Bagaudae Uprisings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[hsl(var(--barbarian))] border"></div>
            <span className="text-sm">Other Barbarian Kingdoms</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full p-6">
        <div className="relative w-full aspect-[4/3] map-decorative-border rounded-lg overflow-hidden">
          {/* Historical map background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url(${romanEmpireMap})` }}
          ></div>
          {/* Compass Rose */}
          <div className="compass-rose"></div>
          {/* Overlay for better territory visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>

          {/* Territories */}
          {territories.map((territory) => (
            <div
              key={territory.id}
              className={`absolute cursor-pointer ${
                selectedTerritory === territory.id
                  ? "ring-2 ring-yellow-400 ring-offset-1"
                  : ""
              }`}
              style={{
                left: `${territory.x}%`,
                top: `${territory.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => onTerritoryClick(territory.id)}
            >
              {/* Territory marker */}
              <div
                className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${getTerritoryColor(territory.owner)}`}
              ></div>

              {/* Territory name */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {territory.name}
              </div>
            </div>
          ))}

          {/* Roads - decorative ancient paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
            <defs>
              <pattern
                id="roadPattern"
                x="0"
                y="0"
                width="8"
                height="4"
                patternUnits="userSpaceOnUse"
              >
                <rect width="8" height="4" fill="none" />
                <rect x="0" y="1" width="6" height="2" fill="#8B4513" />
              </pattern>
            </defs>
            <path
              d="M 25% 45% Q 30% 40% 35% 35%"
              stroke="url(#roadPattern)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 35% 35% Q 40% 30% 45% 25%"
              stroke="url(#roadPattern)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 35% 35% Q 45% 42% 55% 50%"
              stroke="url(#roadPattern)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 25% 45% Q 17% 57% 10% 70%"
              stroke="url(#roadPattern)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 55% 50% Q 50% 57% 45% 65%"
              stroke="url(#roadPattern)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 45% 65% Q 42% 75% 40% 85%"
              stroke="url(#roadPattern)"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameMap;
