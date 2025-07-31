import { useState } from "react";
import { Church, Check, ArrowBigRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { faiths } from "@/data/faiths";
import { Character } from "@/types/gameTypes";

type BasicActionsProps = {
  playerIndex: number;
  factionFaiths: string[];
  factionLeaders: Character[];
  onEndTurn: () => void;
  onChangeFaith: (
    factionIndex: number,
    faith: string,
    factionLeaders: Character[],
    setFactionLeaders: React.Dispatch<React.SetStateAction<Character[]>>
  ) => void;
  setFactionLeaders: React.Dispatch<React.SetStateAction<Character[]>>;
};

export function BasicActions({
  playerIndex,
  factionFaiths,
  factionLeaders,
  onEndTurn,
  onChangeFaith,
  setFactionLeaders,
}: BasicActionsProps) {
  const [pendingFaith, setPendingFaith] = useState<string | null>(null);

  const confirmFaithChange = () => {
    if (pendingFaith) {
      onChangeFaith(
        playerIndex,
        pendingFaith,
        factionLeaders,
        setFactionLeaders
      );
      setPendingFaith(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Church className="w-3 h-3 mr-1" />
              Change Faith
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {faiths.map((faith) => (
              <DropdownMenuItem
                key={faith}
                onSelect={(e) => {
                  e.preventDefault();
                  setPendingFaith(faith);
                }}
              >
                {faith}
                {faith === factionFaiths[playerIndex] && (
                  <Check className="h-4 w-4 text-muted-foreground" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={onEndTurn} variant="outline" size="sm">
          <ArrowBigRight className="w-3 h-3 mr-1" />
          End Turn
        </Button>
      </div>

      <AlertDialog
        open={!!pendingFaith}
        onOpenChange={() => setPendingFaith(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to change faith?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmFaithChange}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
