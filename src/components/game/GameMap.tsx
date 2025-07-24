import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Character, Faction, Territory, AttackOrder } from "@/types/gameTypes";
import { getDate, adjacentTerritories } from "@/data/gameData";
import romanEmpireMap from "@/assets/roman-empire-map-clean.jpg";
import { Legend } from "@/components/game/map/Legend";
import { CompassRose } from "@/components/game/map/CompassRose";

type GameMapProps = {
  territories: Territory[];
  selectedTerritory: string | null;
  currentTurn: number;
  factions: Faction[];
  factionLeaders: Character[];
  playerFactionName: string;
  playerFactionColor: string;
  playerFactionSymbol: string;
  scheduledAttacks: AttackOrder[];
  onTerritoryClick: (territoryId: string) => void;
  factionFaiths: string[];
};

export function GameMap({
  territories,
  selectedTerritory,
  currentTurn,
  factions,
  factionLeaders,
  factionFaiths,
  playerFactionName,
  playerFactionColor,
  playerFactionSymbol,
  scheduledAttacks,
  onTerritoryClick,
}: GameMapProps) {
  // Create faction lookup from centralized data + filter to only show factions with territories
  const factionLookup = React.useMemo(() => {
    const lookup: Record<
      string,
      { color: string; name: string; symbol: string }
    > = {};

    const activeFactions = new Set(territories.map((t) => t.owner));

    lookup[playerFactionName] = {
      color: playerFactionColor,
      name: playerFactionName,
      symbol: playerFactionSymbol,
    };

    factions.forEach((faction) => {
      if (
        activeFactions.has(faction.name) &&
        faction.name !== playerFactionName
      ) {
        lookup[faction.name] = {
          color: faction.color,
          name: faction.name,
          symbol: faction.symbol,
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
        <p className="h-4" />
        <p className="uncial text-center">
          Imperium Romanum, {getDate(currentTurn)}
        </p>
      </CardHeader>

      <CardContent className="h-full p-6 relative">
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
              className={`absolute cursor-pointer transition-transform duration-200 rounded-full ${
                selectedTerritory === territory.name
                  ? "ring-2 ring-red-400 ring-offset-1 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
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
                className={`w-6 h-6 rounded-full border-2 shadow-lg flex items-center justify-center text-white text-l font-bold
    transition-transform duration-200 hover:scale-125
    ${
      isUnderAttack(territory, scheduledAttacks)
        ? "ring-white animate-pulse"
        : ""
    }
  `}
                style={{
                  backgroundColor:
                    factionLookup[territory.owner]?.color ?? "gray",
                  fontFamily: `'Segoe UI Symbol', 'Apple Color Emoji', 'Noto Color Emoji', 'Twemoji Mozilla', 'Symbola', sans-serif`,
                  lineHeight: 1,
                }}
              >
                {factionLookup[territory.owner]?.symbol ?? "⚔"}
              </div>

              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {territory.name}
              </div>
            </div>
          ))}
        </div>

        {/* Faction Legend */}
        <Legend
          factionLookup={factionLookup}
          factions={factions}
          playerFactionName={playerFactionName}
          factionLeaders={factionLeaders}
          factionFaiths={factionFaiths}
        ></Legend>
      </CardContent>
    </Card>
  );
}

function isUnderAttack(
  territory: Territory,
  scheduledAttacks: AttackOrder[]
): boolean {
  return scheduledAttacks.some((attack) => attack.to === territory.name);
}
