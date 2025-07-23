import { useState } from "react";
import {
  MapPin,
  Users,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sword,
  ShieldPlus,
} from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { AttackOrder, Territory, Character } from "@/types/gameTypes";
import { factions } from "@/data/gameData";
import { neighbors } from "@/data/territories";
import { FactionDetails } from "@/components/game/FactionDetails";
import { TreasuryActions } from "@/components/game/actions/TreasuryActions";

type SelectedTerritoryInfoProps = {
  territories: Territory[];
  territoryName: string;
  playerFactionName: string;
  playerTreasure: number;
  scheduledAttacks: AttackOrder[];
  factionLeaders: Character[];
  onRecruit: () => void;
  onSpy: (string) => void;
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  onReinforce: (from: string, to: string) => void;
  onUndoReinforce: (from: string, to: string) => void;
  factionFaiths: string[];
};

export function SelectedTerritoryInfo({
  territories,
  territoryName,
  playerFactionName,
  playerTreasure,
  scheduledAttacks,
  factionLeaders,
  factionFaiths,
  onRecruit,
  onSpy,
  setScheduledAttacks,
  onReinforce,
  onUndoReinforce,
}: SelectedTerritoryInfoProps) {
  const territory = territories.find((t) => t.name === territoryName);
  if (!territory) return null;

  const isPlayerTerritory = territory.owner === playerFactionName;
  const troopCount = territory.troops ?? territory.estimatedTroops ?? 0;

  const [attackExpanded, setAttackExpanded] = useState(false);
  const [reinforceExpanded, setReinforceExpanded] = useState(false);

  const attackRows: JSX.Element[] = [];
  const reinforceRows: JSX.Element[] = [];

  const available = getAvailableTroops(scheduledAttacks, territory);

  if (isPlayerTerritory) {
    neighbors[territoryName]?.forEach((adjacentTerritoryName) => {
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
    <>
      <p className="text-sm font-semibold mb-2">Selected Territory</p>

      {/* Title Row */}
      <div className="bg-muted/30 rounded p-2 mb-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{territory.name}</span>
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <Badge
                    variant={isPlayerTerritory ? "default" : "secondary"}
                    className="text-xs cursor-pointer"
                    style={{ backgroundColor: faction.color }}
                  >
                    {territory.owner}
                  </Badge>
                </div>
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                align="start"
                sideOffset={8}
                avoidCollisions
                collisionBoundary={document.body}
                // Large top padding discourages flipping to top.
                // The issue with it flipping to the top is that
                // the top of the popover is lost off the top of
                // the screen and can't be scrolled into view.
                // At least when it's lost off the bottom, it can be.
                collisionPadding={{ top: 9999, bottom: 0, left: 8, right: 8 }}
                className="p-0 w-[20rem] max-w-[90vw] max-h-[90vh] overflow-y-auto overflow-x-hidden"
              >
                <FactionDetails
                  faction={faction}
                  leader={factionLeaders[factions.indexOf(faction)]}
                  isPlayerFaction={faction.name === playerFactionName}
                  factionFaiths={factionFaiths}
                />
              </PopoverContent>
            </Popover>
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
        </div>
      </div>

      <TreasuryActions
        territory={territory}
        territoryName={territoryName}
        isPlayerTerritory={isPlayerTerritory}
        playerTreasure={playerTreasure}
        onRecruit={onRecruit}
        onSpy={onSpy}
      ></TreasuryActions>
      {isPlayerTerritory && (
        <div className="flex flex-col gap-3 text-sm">
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
    </>
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
  territoryName: Territory
): number {
  let availableTroops = territoryName.troops;
  scheduledAttacks.forEach((attack) => {
    if (attack.from === territoryName.name) {
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
  territoryName: Territory,
  from: string,
  to: string,
  delta: number,
  scheduledAttacks: AttackOrder[],
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>
): void {
  setScheduledAttacks((prev) => {
    const available = getAvailableTroops(scheduledAttacks, territoryName);
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
