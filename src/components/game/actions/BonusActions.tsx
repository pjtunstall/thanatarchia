import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/useConfirm";

type BonusActionsProps = {
  onEndTurn: () => void;
  onEndGame: () => void;
};

export function BonusActions({ onEndTurn, onEndGame }: BonusActionsProps) {
  const { openDialog, dialog } = useConfirm(
    onEndGame,
    "Are you sure you want to end the game?"
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={openDialog} variant="outline" size="sm">
          End Game
        </Button>

        <Button onClick={onEndTurn} variant="outline" size="sm">
          <ArrowBigRight className="w-3 h-3 mr-1" />
          End Turn
        </Button>
      </div>

      {dialog}
    </>
  );
}
