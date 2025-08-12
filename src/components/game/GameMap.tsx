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
import { Legend } from "@/components/game/map/Legend";
import { CompassRose } from "@/components/game/map/CompassRose";
import { ConnectingLines } from "@/components/game/map/ConnectingLines";
import { TerritoryMarkers } from "@/components/game/map/TerritoryMarkers";
import { useConfirm } from "@/hooks/useConfirm";
import { ProgressiveImage } from "@/components/game/ProgressiveImage";

type GameMapProps = {
  playerIndex: number;
  territories: Territory[];
  selectedTerritoryName: string | null;
  currentTurn: number;
  factions: Faction[];
  factionLeaders: Character[];
  playerFactionName: string;
  playerFactionColor: string;
  playerFactionSymbol: string;
  scheduledAttacks: AttackOrder[];
  onTerritoryClick: (territoryId: string) => void;
  factionFaiths: string[];
  onEndGame: () => void;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
};

export function GameMap({
  playerIndex,
  territories,
  selectedTerritoryName,
  currentTurn,
  factions,
  factionLeaders,
  factionFaiths,
  playerFactionName,
  playerFactionColor,
  playerFactionSymbol,
  scheduledAttacks,
  onTerritoryClick,
  onEndGame,
  setFactionAggressions,
  setFactionTreasures,
}: GameMapProps) {
  // Create faction lookup from centralized data + filter to only show factions with territories.
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

  const { openDialog, dialog } = useConfirm(
    onEndGame,
    "Are you sure you want to end the game?"
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-3xl font-bold ancient-title text-center">
          <div className="flex items-center justify-center gap-2">
            <span
              onClick={openDialog}
              className="initial cursor-pointer transition-transform duration-200 hover:scale-125"
            >
              ☠
            </span>
            <span className="uncial">~Thanatarchia~</span>
            <span
              onClick={openDialog}
              className="initial cursor-pointer transition-transform duration-200 hover:scale-125"
            >
              ☠
            </span>
            {dialog}
          </div>
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
          <ProgressiveImage
            src={"/images/map.jpg"}
            fillContainer={true}
            alt="Roman Empire Map"
          />

          <CompassRose />

          <ConnectingLines
            selectedTerritoryName={selectedTerritoryName}
            territories={territories}
          ></ConnectingLines>

          <TerritoryMarkers
            factionLookup={factionLookup}
            territories={territories}
            selectedTerritoryName={selectedTerritoryName}
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
            player={factionLeaders[playerIndex]}
            setFactionAggressions={setFactionAggressions}
            setFactionTreasures={setFactionTreasures}
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
