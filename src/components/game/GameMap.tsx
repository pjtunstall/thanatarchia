import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Character, Faction, Territory, AttackOrder } from "@/types/gameTypes";
import { getDate } from "@/data/gameData";
import romanEmpireMap from "@/assets/roman-empire-map-clean.jpg";
import { Legend } from "@/components/game/map/Legend";
import { CompassRose } from "@/components/game/map/CompassRose";
import { ConnectingLines } from "@/components/game/map/ConnectingLines";

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
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url(${romanEmpireMap})` }}
          ></div>

          <CompassRose />

          <ConnectingLines
            selectedTerritory={selectedTerritory}
            territories={territories}
          ></ConnectingLines>

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
