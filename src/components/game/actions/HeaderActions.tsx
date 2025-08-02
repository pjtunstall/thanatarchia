import { ArrowBigRight, Squirrel, Church, Check, Crown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { Faction, Character } from "@/types/gameTypes";
import { faiths } from "@/data/faiths";
import { FactionDetails } from "@/components/game/FactionDetails";
import { playBell, playSquirrel } from "@/lib/sounds";

type HeaderActionsProps = {
  onEndTurn: () => void;
  setPendingFaith: (faith: string) => void;
  playerIndex: number;
  factionFaiths: string[];
  playerFaction: Faction;
  factionLeaders: Character[];
  playerCharacter: Character;
  setFactionAggressions: (fn: (prev: any) => any) => void;
  setFactionTreasures: (fn: (prev: any) => any) => void;
};

export function HeaderActions({
  playerIndex,
  factionFaiths,
  playerFaction,
  factionLeaders,
  playerCharacter,
  onEndTurn,
  setPendingFaith,
  setFactionAggressions,
  setFactionTreasures,
}: HeaderActionsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {/* Player faction details */}
        <div className="flex flex-col gap-2 items-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Crown className="w-3 h-3 mr-1" />
                <Badge
                  className="w-fit"
                  style={{ backgroundColor: playerFaction.color }}
                >
                  {playerFaction.name}
                </Badge>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-fit">
              <FactionDetails
                faction={playerFaction}
                leader={factionLeaders[playerIndex]}
                isPlayerFaction={true}
                factionFaiths={factionFaiths}
                player={playerCharacter}
                playerIndex={playerIndex}
                setFactionAggressions={setFactionAggressions}
                setFactionTreasures={setFactionTreasures}
              />
            </DialogContent>
          </Dialog>

          {/* Change faith button  */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
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
        </div>

        {/* End turn button */}
        <div className="flex flex-col gap-2 items-start">
          <Button
            onClick={onEndTurn}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <ArrowBigRight className="w-3 h-3 mr-1" />
            End Turn
          </Button>

          {/* Plray or sacrifice button */}
          {factionFaiths[playerIndex] === "Pagan" ? (
            <Button
              onClick={playSquirrel}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Squirrel className="w-3 h-3 mr-1" />
              Sacrifice
            </Button>
          ) : (
            <Button
              onClick={playBell}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Church className="w-3 h-3 mr-1" />
              Pray
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
