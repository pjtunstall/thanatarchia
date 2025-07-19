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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { AttackOrder, Territory } from "@/types/gameTypes";
import { neighbors } from "@/data/territories";

type SelectedTerritoryInfoProps = {
  territories: Territory[];
  selectedTerritory: string;
  playerFactionName: string;
  scheduledAttacks: AttackOrder[];
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  onReinforce: (from: string, to: string) => void;
  onUndoReinforce: (from: string, to: string) => void;
};

export function SelectedTerritoryInfo({
  territories,
  selectedTerritory,
  playerFactionName,
  scheduledAttacks,
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

  if (isPlayerTerritory) {
    neighbors[selectedTerritory]?.forEach((adjacentTerritoryName) => {
      const adj = territories.find((t) => t.name === adjacentTerritoryName);
      if (!adj) return;

      const type = adj.owner === playerFactionName ? "reinforce" : "attack";
      const current = scheduledAttacks.find(
        (a) => a.from === territory.name && a.to === adj.name
      );
      const count = current?.troops ?? 0;

      const row = (
        <div
          key={adj.name}
          className={`flex items-center justify-between rounded px-2 py-1 ${
            type === "attack"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          <span className="flex items-center gap-1 text-sm text-gray-700">
            {type === "attack" ? (
              <Sword className="w-3 h-3" />
            ) : (
              <ShieldPlus className="w-3 h-3" />
            )}
            {type === "attack"
              ? `Attack ${adj.name}: ${count}`
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
          />
        </div>
      );

      if (type === "attack") {
        attackRows.push(row);
      } else {
        reinforceRows.push(row);
      }
    });
  }

  return (
    <div className="border-t pt-3">
      <p className="text-sm font-semibold mb-2">Selected Territory</p>
      <div className="bg-muted/30 rounded p-2 mb-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{territory.name}</span>
            <Badge
              variant={isPlayerTerritory ? "default" : "secondary"}
              className="text-xs"
            >
              {territory.owner}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              {isPlayerTerritory
                ? troopCount
                : territory.spiedOn
                ? troopCount
                : "?"}
            </span>
            {!isPlayerTerritory && !territory.spiedOn && (
              <Eye className="w-3 h-3 text-muted-foreground/60" />
            )}
          </div>
        </div>
      </div>

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
            <p className="text-xs font-semibold text-red-700">Attack Targets</p>
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
            <p className="text-xs font-semibold text-green-700">
              Reinforcement Targets
            </p>
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
}: TroopControlsProps) {
  const available = getAvailableTroops(scheduledAttacks, territory);
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
      if (delta < 1) return [...prev]; // Trying to unassign from non-existent
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
