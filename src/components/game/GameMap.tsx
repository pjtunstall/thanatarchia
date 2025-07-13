import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Character, Territory } from "@/types/GameTypes";
import { factions, getDate, adjacentTerritories } from "@/data/gameData";
import { FactionDetails } from "./FactionDetails";
import romanEmpireMap from "@/assets/roman-empire-map-clean.jpg";

interface GameMapProps {
  territories: Territory[];
  selectedTerritory: string | null;
  currentTurn: number;
  factionLeaders: Character[];
  playerFactionName: string;
  playerFactionColor: string;
  playerCharacter: {
    name: string;
    gender: "male" | "female";
    image: string;
  };
  onTerritoryClick: (territoryId: string) => void;
}

export const GameMap: React.FC<GameMapProps> = ({
  territories,
  selectedTerritory,
  currentTurn,
  factionLeaders,
  playerFactionName,
  playerFactionColor,
  playerCharacter,
  onTerritoryClick,
}) => {
  // Create faction lookup from centralized data + filter to only show factions with territories
  const factionLookup = React.useMemo(() => {
    const lookup: Record<string, { color: string; name: string }> = {};

    const activeFactions = new Set(territories.map((t) => t.owner));

    lookup[playerFactionName] = {
      color: playerFactionColor,
      name: playerFactionName,
    };

    factions.forEach((faction) => {
      if (
        activeFactions.has(faction.name) &&
        faction.name !== playerFactionName
      ) {
        lookup[faction.name] = {
          color: faction.color,
          name: faction.name,
        };
      }
    });

    return lookup;
  }, [playerFactionName, playerFactionColor, territories]);

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
        <div
          className="relative w-full aspect-[4/3] map-decorative-border rounded-lg overflow-hidden"
          onClick={() => onTerritoryClick(null)}
        >
          {/* Historical map background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url(${romanEmpireMap})` }}
          ></div>
          {/* Compass Rose */}
          <CompassRose />

          {/* Connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 20 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 20 5 L 0 10 z" fill="red" />
              </marker>

              <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="2.5"
                  floodColor="red"
                  floodOpacity="1"
                />
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="4"
                  floodColor="red"
                  floodOpacity="0.7"
                />
              </filter>
            </defs>
            {selectedTerritory &&
              adjacentTerritories[selectedTerritory]?.map((adj) => {
                const from = territories.find(
                  (t) => t.name === selectedTerritory
                );
                const to = territories.find((t) => t.name === adj);
                if (!from || !to) return null;

                return (
                  <line
                    key={adj}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="red"
                    strokeWidth="0.8"
                    markerEnd="url(#arrow)"
                    filter="url(#glow)"
                  />
                );
              })}
          </svg>

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
              onClick={(e) => {
                e.stopPropagation();
                onTerritoryClick(territory.name);
              }}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                style={{
                  backgroundColor:
                    factionLookup[territory.owner]?.color ?? "gray",
                }}
              />
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
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

              const isSelected = key === playerFactionName;

              return (
                <Popover key={key}>
                  <PopoverTrigger asChild>
                    <div
                      className={`group flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-primary/30 transition-colors ${
                        isSelected
                          ? "bg-primary/10 border border-primary/30"
                          : ""
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded border"
                        style={{ backgroundColor: factionInfo.color }}
                      />
                      <span
                        className={`transition-colors ${
                          isSelected
                            ? "font-semibold text-white"
                            : "text-muted-foreground group-hover:text-white"
                        }`}
                      >
                        {fullFaction.name}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="start" className="p-0">
                    <FactionDetails
                      faction={fullFaction}
                      leader={factionLeaders[factions.indexOf(fullFaction)]}
                      isPlayerFaction={isSelected}
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
