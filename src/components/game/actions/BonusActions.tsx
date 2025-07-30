import { useState } from "react";
import { ArrowBigRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type BonusActionsProps = {
  onEndTurn: () => void;
  onEndGame: () => void;
};

export function BonusActions({ onEndTurn, onEndGame }: BonusActionsProps) {
  const [confirmEndGameOpen, setConfirmEndGameOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmEndGameOpen(true)}
        >
          End Game
        </Button>

        <Button onClick={onEndTurn} variant="outline" size="sm">
          <ArrowBigRight className="w-3 h-3 mr-1" />
          End Turn
        </Button>
      </div>

      <AlertDialog
        open={confirmEndGameOpen}
        onOpenChange={setConfirmEndGameOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to end the game?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onEndGame}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
