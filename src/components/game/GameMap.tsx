import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Territory } from "@/types/GameTypes";
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
  // Consolidated faction mapping
  const factionColors: Record<string, { color: string; name: string }> = {
    "player": { color: "hsl(var(--barbarian))", name: "Your Faction" },
    "Roman Empire": { color: "hsl(var(--imperial))", name: "Roman Empire" },
    "Bagaudae of Gaul": { color: "hsl(var(--bagaudae))", name: "Bagaudae of Gaul" },
    "Bagaudae of Hispania": { color: "hsl(var(--bagaudae))", name: "Bagaudae of Hispania" },
    "Ostrogothic Kingdom": { color: "hsl(var(--ostrogothic))", name: "Ostrogothic Kingdom" },
    "Visigothic Kingdom": { color: "hsl(var(--visigothic))", name: "Visigothic Kingdom" },
    "Vandal Kingdom": { color: "hsl(var(--vandal))", name: "Vandal Kingdom" },
    "Burgundian Kingdom": { color: "hsl(var(--burgundian))", name: "Burgundian Kingdom" },
    "Kingdom of the Franks": { color: "hsl(var(--frankish))", name: "Kingdom of the Franks" },
    "Gepid Kingdom": { color: "hsl(var(--gepid))", name: "Gepid Kingdom" },
    "Heruli": { color: "hsl(var(--heruli))", name: "Heruli" },
    "Suebian Confederation": { color: "hsl(var(--suebian))", name: "Suebian Confederation" },
    "Alans": { color: "hsl(var(--alans))", name: "Alans" },
    "Hunnic Empire": { color: "hsl(var(--hunnic))", name: "Hunnic Empire" },
  };

  const getTerritoryColor = (owner: string) => {
    const factionClassMap: Record<string, string> = {
      "player": "faction-player",
      "Roman Empire": "faction-roman-empire",
      "Bagaudae of Gaul": "faction-bagaudae-gaul",
      "Bagaudae of Hispania": "faction-bagaudae-hispania",
      "Ostrogothic Kingdom": "faction-ostrogothic",
      "Visigothic Kingdom": "faction-visigothic",
      "Vandal Kingdom": "faction-vandal",
      "Burgundian Kingdom": "faction-burgundian",
      "Kingdom of the Franks": "faction-frankish",
      "Gepid Kingdom": "faction-gepid",
      "Heruli": "faction-heruli",
      "Suebian Confederation": "faction-suebian",
      "Alans": "faction-alans",
      "Hunnic Empire": "faction-hunnic",
    };
    return factionClassMap[owner] || "faction-player";
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

        {/* Faction Legend */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            {Object.entries(factionColors).map(([key, faction]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded border"
                  style={{ backgroundColor: faction.color }}
                ></div>
                <span className={key === "player" ? "font-semibold" : ""}>
                  {faction.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameMap;
