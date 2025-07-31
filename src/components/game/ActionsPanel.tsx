import React from "react";
import { useState } from "react";
import { ArrowBigRight, Squirrel, Church, Check, Crown } from "lucide-react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { AttackOrder, Character } from "@/types/gameTypes";
import { faiths } from "@/data/faiths";
import { SelectedTerritoryPanel } from "@/components/game/SelectedTerritoryPanel";
import { Faction, Territory } from "@/types/gameTypes";
import { chroniclers } from "@/data/chronicles";
import { BasicActions } from "@/components/game/actions/BasicActions";
import { factions } from "@/data/factions";
import { Help } from "@/components/game/Help";
import { FactionDetails } from "@/components/game/FactionDetails";

type ActionsPanelProps = {
  playerCharacter: Character;
  playerFaction: Faction;
  playerIndex: number;
  adviserIndex: number;
  factionTreasures: number[];
  factionLeaders: Character[];
  territories: Territory[];
  selectedTerritoryName: string | null;
  scheduledAttacks: AttackOrder[];
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  onEndTurn: () => void;
  onRecruit: (territoryName: string) => void;
  onSpy: (territoryId: string) => void;
  onReinforce: (fromTerritoryId: string, toTerritoryId: string) => void;
  onUndoReinforce: (fromTerritoryName: string, toTerritoryName: string) => void;
  getValidAttackTargets: (fromTerritoryId: string) => Territory[];
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  stats: string;
  setStats: React.Dispatch<React.SetStateAction<string>>;
  factionFaiths: string[];
  onChangeFaith: (
    index: number,
    faith: string,
    leaders: Character[],
    setLeaders: React.Dispatch<React.SetStateAction<Character[]>>
  ) => void;
  setFactionLeaders: React.Dispatch<React.SetStateAction<Character[]>>;
  setAdviserIndex: React.Dispatch<React.SetStateAction<number>>;
  setHasChangedFromEudaemonia: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTerritoryName: React.Dispatch<React.SetStateAction<string | null>>;
};

export function ActionsPanel({
  playerCharacter,
  playerFaction,
  playerIndex,
  factionTreasures,
  factionLeaders,
  selectedTerritoryName,
  scheduledAttacks,
  factionFaiths,
  adviserIndex,
  territories,
  setScheduledAttacks,
  onReinforce,
  onUndoReinforce,
  onRecruit,
  onSpy,
  onEndTurn,
  onChangeFaith,
  setFactionLeaders,
  setAdviserIndex,
  setHasChangedFromEudaemonia,
  setSelectedTerritoryName,
}: ActionsPanelProps) {
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
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="grid grid-cols-2 gap-2">
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
                  />
                </DialogContent>
              </Dialog>

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

              {factionFaiths[playerIndex] === "Pagan" ? (
                <Button
                  onClick={onSacrifice}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Squirrel className="w-3 h-3 mr-1" />
                  Sacrifice
                </Button>
              ) : (
                <Button
                  onClick={onPray}
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
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden min-h-0">
          <div className="h-full flex flex-col">
            {selectedTerritoryName ? (
              <>
                <SelectedTerritoryPanel
                  territories={territories}
                  territoryName={selectedTerritoryName}
                  factionLeaders={factionLeaders}
                  playerFactionName={factions[playerIndex].name}
                  playerTreasure={factionTreasures[playerIndex]}
                  scheduledAttacks={scheduledAttacks}
                  setScheduledAttacks={setScheduledAttacks}
                  onRecruit={onRecruit}
                  onSpy={onSpy}
                  onReinforce={onReinforce}
                  onUndoReinforce={onUndoReinforce}
                  factionFaiths={factionFaiths}
                />
              </>
            ) : (
              <Help
                adviser={chroniclers[adviserIndex]}
                player={playerCharacter}
                playerFaction={playerFaction}
                setAdviserIndex={setAdviserIndex}
                setHasChangedFromEudaemonia={setHasChangedFromEudaemonia}
              ></Help>
            )}
          </div>
        </CardContent>
      </Card>

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

function onPray() {
  const chime = new Audio("/sfx/chime.mp3");
  chime.play();
}

function onSacrifice() {
  const squirrel = new Audio("/sfx/squirrel.mp3");
  squirrel.play();
}
