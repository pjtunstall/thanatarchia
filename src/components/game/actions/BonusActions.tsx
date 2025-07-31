import { Church, Handshake, Squirrel, Coins, LibraryBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpMenu } from "@/components/game/help/HelpMenu";
import { useConfirm } from "@/hooks/useConfirm";

type BonusActionsProps = {
  faith: string;
};

export function BonusActions({ faith }: BonusActionsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {faith === "Pagan" ? (
          <Button onClick={onSacrifice} variant="outline" size="sm">
            <Squirrel className="w-3 h-3 mr-1" />
            Sacrifice
          </Button>
        ) : (
          <Button onClick={onPray} variant="outline" size="sm">
            <Church className="w-3 h-3 mr-1" />
            Pray
          </Button>
        )}

        <Button variant="outline" size="sm">
          <Handshake className="w-3 h-3 mr-1" />
          Negotiate
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm">
          <LibraryBig className="w-3 h-3 mr-1" />
          Study
        </Button>

        <Button variant="outline" size="sm">
          <Coins className="w-3 h-3 mr-1" />
          Tax
        </Button>
      </div>
    </>
  );
}

function onPray() {
  const chime = new Audio("/sfx/chime.mp3");
  chime.play();
}

function onSacrifice() {
  const squirrel = new Audio("/sfx/squirrel.mp3");
  squirrel.play();
}
