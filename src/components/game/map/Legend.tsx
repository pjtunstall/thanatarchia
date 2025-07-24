import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Character, Faction } from "@/types/gameTypes";
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
};

export function Legend({
  factionLookup,
  factions,
  playerFactionName,
  factionLeaders,
  factionFaiths,
}: LegendProps) {
  return (
    <div className="absolute top-10 right-10 z-20">
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-sm uncial hover:text-primary transition-colors">
            Legend
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          sideOffset={24}
          collisionPadding={0}
          avoidCollisions={false}
          className="w-[300px] md:w-[400px] lg:w-[500px] max-w-[calc(100vw-2rem)] overflow-auto"
        >
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
                      factionFaiths={factionFaiths}
                    />
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
