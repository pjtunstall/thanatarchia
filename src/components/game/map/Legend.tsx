import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Character, Faction, FactionMiniInfo } from "@/types/gameTypes";
import { FactionDetails } from "@/components/game/FactionDetails";

type LegendProps = {
  factionLookup: Record<
    string,
    { color: string; name: string; symbol: string }
  >;
  factions: Faction[];
  playerFactionName: string;
  factionLeaders: Character[];
  factionFaiths: string[];
  player: Character;
  playerIndex: number;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
};

export function Legend({
  factionLookup,
  factions,
  playerFactionName,
  factionLeaders,
  factionFaiths,
  player,
  playerIndex,
  setFactionAggressions,
  setFactionTreasures,
}: LegendProps) {
  return (
    <div className="absolute bottom-4 right-4 z-20">
      <Popover>
        <PopoverTrigger asChild>
          <button className="uncial hover:text-primary transition-colors bg-white/50 text-black text-xs px-2 py-1 rounded whitespace-nowrap">
            Legend
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          sideOffset={16}
          alignOffset={48}
          collisionPadding={0}
          avoidCollisions={false}
          className="w-[300px] md:w-[400px] lg:w-[500px] max-w-[calc(100vw-2rem)] overflow-auto bg-muted"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            {Object.entries(factionLookup).map(([key, factionInfo]) => {
              const fullFaction = factions.find((f) => f.name === key);
              if (!fullFaction) return null;
              const isSelected = key === playerFactionName;
              const leader = factionLeaders[factions.indexOf(fullFaction)];

              return (
                <FactionDetailsPopover
                  key={key}
                  isSelected={isSelected}
                  leader={leader}
                  fullFaction={fullFaction}
                  factionInfo={factionInfo}
                  factionFaiths={factionFaiths}
                  player={player}
                  playerIndex={playerIndex}
                  setFactionAggressions={setFactionAggressions}
                  setFactionTreasures={setFactionTreasures}
                />
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

type FactionDetailsPopoverProps = {
  isSelected: boolean;
  factionInfo: FactionMiniInfo;
  leader: Character;
  fullFaction: Faction;
  factionFaiths: string[];
  player: Character;
  playerIndex: number;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
};

function FactionDetailsPopover({
  isSelected,
  factionInfo,
  fullFaction,
  leader,
  factionFaiths,
  player,
  playerIndex,
  setFactionAggressions,
  setFactionTreasures,
}: FactionDetailsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`group flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-primary/30 transition-colors ${
            isSelected ? "bg-primary/10 border border-primary/30" : ""
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
      <PopoverContent
        side="top"
        align="end"
        sideOffset={16}
        alignOffset={64}
        collisionPadding={0}
        avoidCollisions={true}
        className="p-0"
      >
        <FactionDetails
          faction={fullFaction}
          leader={leader}
          isPlayerFaction={isSelected}
          factionFaiths={factionFaiths}
          player={player}
          playerIndex={playerIndex}
          setFactionAggressions={setFactionAggressions}
          setFactionTreasures={setFactionTreasures}
        />
      </PopoverContent>
    </Popover>
  );
}
