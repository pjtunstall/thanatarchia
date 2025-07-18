import { MapPin, Users, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { AttackOrder, Territory } from "@/types/gameTypes";
import { neighbors } from "@/data/territories";

// type Territory = {
//   name: string;
//   owner: string;
//   troops?: number;
//   estimatedTroops?: number;
//   spiedOn?: boolean;
//   adjacentNames: string[];
// };

type SelectedTerritoryInfoProps = {
  territories: Territory[];
  selectedTerritory: string;
  playerFactionName: string;
  scheduledAttacks: AttackOrder[];
  // adjustTroops?: (
  //   from: string,
  //   to: string,
  //   delta: number,
  //   type: "attack" | "reinforce"
  // ) => void;
};

export function SelectedTerritoryInfo({
  territories,
  selectedTerritory,
  playerFactionName,
  scheduledAttacks,
}: // adjustTroops,
SelectedTerritoryInfoProps) {
  const territory = territories.find((t) => t.name === selectedTerritory);
  if (!territory) return null;

  const isPlayerTerritory = territory.owner === playerFactionName;
  const troopCount = territory.troops ?? territory.estimatedTroops ?? 0;

  const renderTroopControls = (
    to: string,
    type: "attack" | "reinforce",
    currentAmount: number
  ) => (
    <div className="flex gap-1 ml-auto">
      <Button
        size="icon"
        variant="ghost"
        // onClick={() => adjustTroops?.(territory.name, to, 1, type)}
      >
        <ChevronUp className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        // onClick={() => adjustTroops?.(territory.name, to, -1, type)}
      >
        <ChevronDown className="w-4 h-4" />
      </Button>
    </div>
  );

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
        <div className="space-y-2 text-sm">
          <p className="font-medium">Troops available: {troopCount}</p>

          {neighbors[selectedTerritory]?.map((adjacentTerritoryName) => {
            const adj = territories.find(
              (t) => t.name === adjacentTerritoryName
            );
            if (!adj) return null;

            const type =
              adj.owner === playerFactionName ? "reinforce" : "attack";
            const current = scheduledAttacks.find(
              (a) => a.from === territory.name && a.to === adj.name
            );
            const count = current?.troops ?? 0;

            return (
              <div key={adj.name} className="flex items-center justify-between">
                <span>
                  {type === "attack"
                    ? `Attacking ${adj.name}: ${count}`
                    : `Reinforce ${adj.name}: ${count}`}
                </span>
                {renderTroopControls(adj.name, type, count)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
