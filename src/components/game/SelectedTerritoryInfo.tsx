import { MapPin, Users, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Territory = {
  name: string;
  owner: string;
  troops?: number;
  estimatedTroops?: number;
  spiedOn?: boolean;
};

type SelectredTerritoryInfoProps = {
  territories: Territory[];
  selectedTerritory: string;
  selectedFaction: { name: string };
};

export function SelectedTerritoryInfo({
  territories,
  selectedTerritory,
  selectedFaction,
}: SelectredTerritoryInfoProps) {
  const territory = territories.find((t) => t.name === selectedTerritory);
  if (!territory) return null;

  const isPlayerTerritory = territory.owner === selectedFaction.name;
  const troopCount = territory.troops || territory.estimatedTroops || 0;

  return (
    <div className="border-t pt-3">
      <p className="text-sm font-semibold mb-2">Selected Territory</p>
      <div className="bg-muted/30 rounded p-2">
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
    </div>
  );
}
