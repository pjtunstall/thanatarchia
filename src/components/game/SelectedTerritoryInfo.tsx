import { useState } from "react";
import {
  MapPin,
  Users,
  Eye,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sword,
  ShieldPlus,
} from "lucide-react";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { AttackOrder, Territory, Character } from "@/types/gameTypes";
import { costOfRecruiting, costOfSpying, factions } from "@/data/gameData";
import { neighbors } from "@/data/territories";
import { FactionDetails } from "./FactionDetails";

type SelectedTerritoryInfoProps = {
  territories: Territory[];
  selectedTerritory: string;
  playerFactionName: string;
  playerTreasure: number;
  scheduledAttacks: AttackOrder[];
  factionLeaders: Character[];
  onRecruit: () => void;
  onSpy: (string) => void;
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  onReinforce: (from: string, to: string) => void;
  onUndoReinforce: (from: string, to: string) => void;
};

export function SelectedTerritoryInfo({
  territories,
  selectedTerritory,
  playerFactionName,
  playerTreasure,
  scheduledAttacks,
  factionLeaders,
  onRecruit,
  onSpy,
  setScheduledAttacks,
  onReinforce,
  onUndoReinforce,
}: SelectedTerritoryInfoProps) {
  const territory = territories.find((t) => t.name === selectedTerritory);
  if (!territory) return null;

  const isPlayerTerritory = territory.owner === playerFactionName;
  const troopCount = territory.troops ?? territory.estimatedTroops ?? 0;

  const [attackExpanded, setAttackExpanded] = useState(false);
  const [reinforceExpanded, setReinforceExpanded] = useState(false);

  const attackRows: JSX.Element[] = [];
  const reinforceRows: JSX.Element[] = [];

  const available = getAvailableTroops(scheduledAttacks, territory);

  if (isPlayerTerritory) {
    neighbors[selectedTerritory]?.forEach((adjacentTerritoryName) => {
      const adj = territories.find((t) => t.name === adjacentTerritoryName);
      if (!adj) return;

      const type = adj.owner === playerFactionName ? "reinforce" : "attack";
      const current = scheduledAttacks.find(
        (a) => a.from === territory.name && a.to === adj.name
      );
      const count = current?.troops ?? 0;

      let rowTextClass: string;
      let rowBackgroundClass: string;
      let rowSymbol: JSX.Element;
      let rowArray: JSX.Element[];
      if (type === "attack") {
        rowBackgroundClass = "bg-red-900/20 text-muted-foreground";
        rowTextClass = "flex items-center gap-1 text-sm text-red-200";
        rowSymbol = <Sword className="w-3 h-3" />;
        rowArray = attackRows;
      } else {
        rowBackgroundClass = "bg-green-900/20 text-muted-foreground";
        rowTextClass = "flex items-center gap-1 text-sm text-green-200";
        rowSymbol = <ShieldPlus className="w-3 h-3" />;
        rowArray = reinforceRows;
      }

      const row = (
        <div
          key={adj.name}
          className={`flex items-center justify-between rounded px-2 py-1 ${rowBackgroundClass}`}
        >
          <span className={rowTextClass}>
            {rowSymbol}
            {type === "attack"
              ? `Prepare to attack ${adj.name}: ${count}`
              : `Reinforce ${adj.name}: ${adj.troops}`}
          </span>
          <TroopControls
            to={adj.name}
            territory={territory}
            territories={territories}
            scheduledAttacks={scheduledAttacks}
            setScheduledAttacks={setScheduledAttacks}
            type={type}
            onReinforce={onReinforce}
            onUndoReinforce={onUndoReinforce}
            available={available}
          />
        </div>
      );

      rowArray.push(row);
    });
  }

  const faction = factions.find((f) => f.name === territory.owner);

  return (
    <div className="border-t pt-3">
      <p className="text-sm font-semibold mb-2">Selected Territory</p>

      {/* Title Row */}
      <div className="bg-muted/30 rounded p-2 mb-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{territory.name}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Badge
                  variant={isPlayerTerritory ? "default" : "secondary"}
                  className="text-xs cursor-pointer"
                  style={{ backgroundColor: faction.color }}
                >
                  {territory.owner}
                </Badge>
              </DialogTrigger>

              <DialogContent className="p-0 w-[20rem] max-w-[90vw] max-h-[90vh] overflow-auto">
                <FactionDetails
                  faction={faction}
                  leader={factionLeaders[factions.indexOf(faction)]}
                  isPlayerFaction={faction.name === playerFactionName}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Troop Info Row */}
      <div className="border border-muted rounded p-2 mb-3 bg-muted/20 text-sm flex items-center gap-4">
        <Users className="w-4 h-4 text-muted-foreground" />
        <span className="font-semibold">Troops</span>
        <div className="flex-1 flex justify-center">
          {isPlayerTerritory && (
            <span className="text-muted-foreground">
              Available: <span className="font-medium">{available}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-medium">
            {isPlayerTerritory || territory.spiedOn ? troopCount : "?"}
          </span>
          {!isPlayerTerritory && !territory.spiedOn && (
            <Eye className="w-3 h-3 text-muted-foreground/60" />
          )}
        </div>
      </div>

      {isPlayerTerritory && (
        <div className="flex flex-col gap-3 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onRecruit}
              variant="outline"
              size="sm"
              disabled={playerTreasure < costOfRecruiting}
            >
              <Users className="w-3 h-3 mr-1" />
              Recruit ({costOfRecruiting} solidi)
            </Button>
            <Button
              onClick={() => selectedTerritory && onSpy(selectedTerritory)}
              variant="outline"
              size="sm"
              disabled={!selectedTerritory || playerTreasure < costOfSpying}
            >
              <Eye className="w-3 h-3 mr-1" />
              Spy ({costOfSpying} solidi)
            </Button>
          </div>

          <div
            className="cursor-pointer select-none flex items-center gap-1"
            onClick={() => setAttackExpanded(!attackExpanded)}
          >
            {attackExpanded ? (
              <ChevronDown className="w-4 h-4 text-red-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-red-600" />
            )}
            <p className="text-xs font-semibold text-red-700">Attack</p>
          </div>
          {attackExpanded && attackRows.length > 0 && (
            <div className="space-y-1">{attackRows}</div>
          )}

          <div
            className="cursor-pointer select-none flex items-center gap-1"
            onClick={() => setReinforceExpanded(!reinforceExpanded)}
          >
            {reinforceExpanded ? (
              <ChevronDown className="w-4 h-4 text-green-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-green-600" />
            )}
            <p className="text-xs font-semibold text-green-700">Reinforce</p>
          </div>
          {reinforceExpanded && reinforceRows.length > 0 && (
            <div className="space-y-1">{reinforceRows}</div>
          )}
        </div>
      )}
    </div>
  );
}

type TroopControlsProps = {
  to: string;
  territory: Territory;
  scheduledAttacks: AttackOrder[];
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  type: "attack" | "reinforce";
  onReinforce?: (from: string, to: string) => void;
  onUndoReinforce?: (from: string, to: string) => void;
  territories: Territory[];
  available: number;
};

function TroopControls({
  to,
  territory,
  scheduledAttacks,
  setScheduledAttacks,
  type,
  onReinforce,
  onUndoReinforce,
  territories,
  available,
}: TroopControlsProps) {
  const reinforcedTerritory = territories.find((t) => t.name === to);

  const handleDelta = (delta: number) => {
    if (type === "reinforce") {
      if (delta > 0 && onReinforce && available >= 1) {
        onReinforce(territory.name, to);
      } else if (
        delta < 0 &&
        onUndoReinforce &&
        reinforcedTerritory?.troops > 0
      ) {
        onUndoReinforce(to, territory.name);
      }
      return;
    }

    adjustAttacks(
      territory,
      territory.name,
      to,
      delta,
      scheduledAttacks,
      setScheduledAttacks
    );
  };

  return (
    <div className="flex gap-1 ml-auto">
      <Button
        size="icon"
        variant="ghost"
        className="h-3 w-3 p-3"
        onClick={() => handleDelta(1)}
        disabled={available < 1}
      >
        <ChevronUp />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-3 w-3 p-3"
        onClick={() => handleDelta(-1)}
        disabled={
          type === "attack"
            ? shouldDisableUnassignButton(territory.name, to, scheduledAttacks)
            : !reinforcedTerritory || reinforcedTerritory.troops < 1
        }
      >
        <ChevronDown />
      </Button>
    </div>
  );
}

function getAvailableTroops(
  scheduledAttacks: AttackOrder[],
  selectedTerritory: Territory
): number {
  let availableTroops = selectedTerritory.troops;
  scheduledAttacks.forEach((attack) => {
    if (attack.from === selectedTerritory.name) {
      availableTroops -= attack.troops;
    }
  });
  return availableTroops;
}

function shouldDisableUnassignButton(
  from: string,
  to: string,
  scheduledAttacks: AttackOrder[]
): boolean {
  const attack = scheduledAttacks.find((a) => a.from === from && a.to === to);
  return !attack || attack.troops < 1;
}

function adjustAttacks(
  selectedTerritory: Territory,
  from: string,
  to: string,
  delta: number,
  scheduledAttacks: AttackOrder[],
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>
): void {
  setScheduledAttacks((prev) => {
    const available = getAvailableTroops(scheduledAttacks, selectedTerritory);
    const attack = prev.find((a) => a.from === from && a.to === to);

    if (!attack) {
      if (delta < 1) return [...prev]; // Trying to unassign from a non-existent attack
      const troops = Math.min(available, 500);
      return [...prev, { from, to, troops }];
    } else {
      let troops =
        delta < 0
          ? attack.troops - Math.min(attack.troops, 500)
          : attack.troops + Math.min(available, 500);

      const filtered = prev.filter((a) => !(a.from === from && a.to === to));
      return troops < 1 ? filtered : [...filtered, { from, to, troops }];
    }
  });
}

function darkenColor(color: string, amount: number) {
  try {
    const num = parseInt(color.replace("#", ""), 16);
    let r = (num >> 16) - amount * 255;
    let g = ((num >> 8) & 0x00ff) - amount * 255;
    let b = (num & 0x0000ff) - amount * 255;
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return color; // fallback
  }
}
