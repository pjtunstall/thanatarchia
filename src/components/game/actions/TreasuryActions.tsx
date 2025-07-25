import { Button } from "@/components/ui/button";
import { Users, Eye } from "lucide-react";

import { Territory } from "@/types/gameTypes";
import { costOfSpying, costOfRecruiting } from "@/data/gameData";

type TreasuryActionsProps = {
  territory: Territory;
  isPlayerTerritory: boolean;
  playerTreasure: number;
  territoryName: string | null;
  onRecruit: (territoryName: string) => void;
  onSpy: (territoryId: string) => void;
};

export const TreasuryActions: React.FC<TreasuryActionsProps> = ({
  territory,
  isPlayerTerritory,
  playerTreasure,
  territoryName,
  onRecruit,
  onSpy,
}) => (
  <div className="grid grid-cols-2 gap-2 mb-5">
    <div className="relative group min-w-0">
      <Button
        className="w-full"
        onClick={() => onRecruit(territoryName)}
        variant="outline"
        size="sm"
        disabled={!isPlayerTerritory || playerTreasure < costOfRecruiting}
      >
        <Users className="w-3 h-3 mr-1" />
        Recruit
      </Button>
      <span className="absolute left-1/2 translate-x-1/2 bottom-full mb-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        ({costOfRecruiting} solidi)
      </span>
    </div>

    <div className="relative group min-w-0">
      <Button
        className="w-full"
        onClick={() => territoryName && onSpy(territoryName)}
        variant="outline"
        size="sm"
        disabled={
          isPlayerTerritory ||
          playerTreasure < costOfSpying ||
          territory.spiedOn
        }
      >
        <Eye className="w-3 h-3 mr-1" />
        Spy
      </Button>
      <span className="absolute left-1/2 translate-x-1/2 bottom-full mb-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        ({costOfSpying} solidi)
      </span>
    </div>
  </div>
);
