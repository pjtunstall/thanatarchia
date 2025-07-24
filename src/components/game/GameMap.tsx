import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Character,
  Faction,
  FactionMiniInfo,
  Territory,
  AttackOrder,
} from "@/types/gameTypes";
import { getDate } from "@/lib/time";
import romanEmpireMap from "@/assets/roman-empire-map-clean.jpg";
import { Legend } from "@/components/game/map/Legend";
import { CompassRose } from "@/components/game/map/CompassRose";
import { ConnectingLines } from "@/components/game/map/ConnectingLines";
import { TerritoryMarkers } from "@/components/game/map/TerritoryMarkers";

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
    const lookup: Record<string, FactionMiniInfo> = {};

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

          <TerritoryMarkers
            factionLookup={factionLookup}
            territories={territories}
            selectedTerritory={selectedTerritory}
            onTerritoryClick={onTerritoryClick}
            isUnderAttack={isUnderAttack}
            scheduledAttacks={scheduledAttacks}
          ></TerritoryMarkers>

          <Legend
            factionLookup={factionLookup}
            factions={factions}
            playerFactionName={playerFactionName}
            factionLeaders={factionLeaders}
            factionFaiths={factionFaiths}
          ></Legend>
        </div>
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
