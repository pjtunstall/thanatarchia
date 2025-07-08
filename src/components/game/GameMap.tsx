import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Territory } from "@/types/GameTypes";
import { factions, getDate } from "@/data/GameData";
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-3xl font-bold ancient-title text-center">
          <span className="initial">☠</span>
          <span className="uncial">~Thanatarchia~</span>
          <span className="initial">☠</span>
        </CardTitle>
        <p className="text-muted-foreground italic text-lg text-center">
          Imperium Romanum, {getDate(currentTurn)}
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
          <CompassRose></CompassRose>

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
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                style={{
                  backgroundColor:
                    factionLookup[territory.owner]?.color ?? "gray",
                }}
              />

              {/* Territory name */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {territory.name}
              </div>
            </div>
          ))}
        </div>

        {/* Faction Legend */}
        <div className="mt-4 p-3 bg-muted/60 rounded-lg">
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
                        {fullFaction.name}
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

const CompassRose = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 20, right: 60, zIndex: 10 }}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#d6c2a1"
        stroke="#6b5537"
        strokeWidth="4"
      />
      <polygon points="50,5 52,50 50,95 48,50" fill="#3c2915" />
      <polygon
        points="50,5 58,50 95,50 58,52 50,95 42,52 5,50 42,50"
        fill="#8b7047"
      />
      <circle cx="50" cy="50" r="3" fill="#3c2915" />
      <text
        x="50"
        y="12"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#3c2915"
      >
        N
      </text>
      <text
        x="88"
        y="54"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#3c2915"
      >
        E
      </text>
      <text
        x="50"
        y="97"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#3c2915"
      >
        S
      </text>
      <text
        x="12"
        y="54"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#3c2915"
      >
        W
      </text>
    </svg>
  );
};

export default GameMap;
