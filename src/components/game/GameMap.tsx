import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Territory } from "@/types/GameTypes";
import { factions } from "@/data/GameData";
import FactionDetails from "./FactionDetails";
import romanEmpireMap from "@/assets/roman-empire-map-clean.jpg";

interface GameMapProps {
  territories: Territory[];
  selectedTerritory: string | null;
  currentTurn: number;
  playerFactionName: string;
  playerFactionColor: string;
  selectedFaction: { name: string; color: string };
  playerCharacter: {
    name: string;
    gender: "male" | "female";
    image: string;
  };
  onTerritoryClick: (territoryId: string) => void;
}

const GameMap: React.FC<GameMapProps> = ({
  territories,
  selectedTerritory,
  currentTurn,
  playerFactionName,
  playerFactionColor,
  selectedFaction,
  playerCharacter,
  onTerritoryClick,
}) => {
  // Create faction lookup from centralized data + filter to only show factions with territories
  const factionLookup = React.useMemo(() => {
    const lookup: Record<string, { color: string; name: string }> = {};

    // Get all factions that currently have territories
    const activeFactions = new Set(territories.map((t) => t.owner));

    // Add player faction (always show)
    lookup[selectedFaction.name] = {
      color: playerFactionColor,
      name: playerFactionName,
    };

    // Add other active factions
    factions.forEach((faction) => {
      if (
        activeFactions.has(faction.name) &&
        faction.name !== selectedFaction.name
      ) {
        lookup[faction.name] = {
          color: faction.color,
          name: faction.name,
        };
      }
    });

    return lookup;
  }, [
    playerFactionName,
    playerFactionColor,
    selectedFaction.name,
    territories,
  ]);

  const getTerritoryColor = (owner: string) => {
    // For player territories, use dynamic color
    if (owner === selectedFaction.name) {
      return "";
    }

    const factionClassMap: Record<string, string> = {
      "Roman Empire": "faction-roman-empire",
      "Kingdom of the Mauri": "faction-mauri",
      Bagaudae: "faction-bagaudae",
      "Ostrogothic Kingdom": "faction-ostrogothic",
      "Visigothic Kingdom": "faction-visigothic",
      "Vandal Kingdom": "faction-vandal",
      "Burgundian Kingdom": "faction-burgundian",
      "Kingdom of the Franks": "faction-frankish",
      "Gepid Kingdom": "faction-gepid",
      "Langobard Kingdom": "faction-langobard",
      "Suebian Confederation": "faction-suebian",
      Alans: "faction-alans",
      "Hunnic Empire": "faction-hunnic",
      "Saxon Confederation": "faction-saxon",
    };
    return factionClassMap[owner] || "";
  };

  return (
    <Card className="h-full parchment-texture">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold ancient-title text-center">
          ☠ Thanatarchia
        </CardTitle>
        <p className="text-muted-foreground italic text-lg text-center">
          Imperium Romanum, anno domini {475 + currentTurn}
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
              key={territory.name}
              className={`absolute cursor-pointer ${
                selectedTerritory === territory.name
                  ? "ring-2 ring-yellow-400 ring-offset-1"
                  : ""
              }`}
              style={{
                left: `${territory.x}%`,
                top: `${territory.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => onTerritoryClick(territory.name)}
            >
              {/* Territory marker */}
              <div
                className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${getTerritoryColor(
                  territory.owner
                )}`}
                style={
                  territory.owner === selectedFaction.name
                    ? { backgroundColor: playerFactionColor }
                    : {}
                }
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
            {Object.entries(factionLookup).map(([key, factionInfo]) => {
              const fullFaction = factions.find((f) => f.name === key);
              if (!fullFaction) return null;

              return (
                <Popover key={key}>
                  <PopoverTrigger asChild>
                    <div
                      className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-muted/50 transition-colors ${
                        key === selectedFaction.name
                          ? "bg-primary/20 border border-primary/30"
                          : ""
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded border"
                        style={{ backgroundColor: factionInfo.color }}
                      ></div>
                      <span
                        className={
                          key === selectedFaction.name ? "font-semibold" : ""
                        }
                      >
                        {factionInfo.name}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="start" className="p-0">
                    <FactionDetails
                      faction={fullFaction}
                      isPlayerFaction={key === selectedFaction.name}
                      playerCharacter={
                        key === selectedFaction.name
                          ? playerCharacter
                          : undefined
                      }
                    />
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameMap;
