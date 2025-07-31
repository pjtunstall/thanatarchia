import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FactionDetails } from "@/components/game/FactionDetails";
import { Faction, Character } from "@/types/gameTypes";

type PlayerFactionDialogProps = {
  faction: Faction;
  leader: Character;
  factionFaiths: string[];
};

export function PlayerFactionDialog({
  faction,
  leader,
  factionFaiths,
}: PlayerFactionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn">Show Player Faction</button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none">
        <FactionDetails
          faction={faction}
          leader={leader}
          isPlayerFaction={true}
          factionFaiths={factionFaiths}
          player={leader}
        />
      </DialogContent>
    </Dialog>
  );
}
