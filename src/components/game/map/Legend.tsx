import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { useState, useEffect } from "react";

import { Character, Faction, FactionMiniInfo } from "@/types/gameTypes";
import { FactionDetails } from "@/components/game/FactionDetails";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

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
  setFactionAggressions,
  setFactionTreasures,
}: LegendProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [isMobile]);

  const legendGrid = (
    <div className="grid grid-cols-2 gap-2 text-xs p-4 max-h-[80vh] overflow-auto">
      {Object.entries(factionLookup).map(([key, factionInfo]) => {
        const fullFaction = factions.find((f) => f.name === key);
        if (!fullFaction) return null;
        const isSelected = key === playerFactionName;
        const leader = factionLeaders[factions.indexOf(fullFaction)];

        return (
          <FactionDetailsDialog
            key={key}
            isSelected={isSelected}
            leader={leader}
            fullFaction={fullFaction}
            factionInfo={factionInfo}
            factionFaiths={factionFaiths}
            player={player}
            setFactionAggressions={setFactionAggressions}
            setFactionTreasures={setFactionTreasures}
          />
        );
      })}
    </div>
  );

  if (isMobile) {
    return (
      <div className="absolute bottom-4 right-4 z-20">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="uncial hover:text-primary transition-colors bg-white/50 text-black text-xs px-2 py-1 rounded whitespace-nowrap">
              Legend
            </button>
          </DialogTrigger>
          <DialogContent className="bg-transparent md:bg-muted">
            {legendGrid}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

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
          className="w-[300px] md:w-[400px] lg:w-[500px] max-w-[calc(100vw-2rem)] overflow-auto bg-muted p-2"
        >
          {legendGrid}
        </PopoverContent>
      </Popover>
    </div>
  );
}

type FactionDetailsDialogProps = {
  isSelected: boolean;
  factionInfo: FactionMiniInfo;
  leader: Character;
  fullFaction: Faction;
  factionFaiths: string[];
  player: Character;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
};

function FactionDetailsDialog({
  isSelected,
  factionInfo,
  fullFaction,
  leader,
  factionFaiths,
  player,
  setFactionAggressions,
  setFactionTreasures,
}: FactionDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent className="p-0 max-w-sm w-fit">
        <FactionDetails
          faction={fullFaction}
          leader={leader}
          isPlayerFaction={isSelected}
          factionFaiths={factionFaiths}
          player={player}
          setFactionAggressions={setFactionAggressions}
          setFactionTreasures={setFactionTreasures}
        />
      </DialogContent>
    </Dialog>
  );
}
