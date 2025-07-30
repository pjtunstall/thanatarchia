import { Users, Eye } from "lucide-react";

import { Territory } from "@/types/gameTypes";
import { costOfSpying, costOfRecruiting } from "@/data/gameData";
import { WaxSealButton } from "@/components/game/actions/WaxSealButton";

type TreasuryActionsProps = {
  territory: Territory;
  isPlayerTerritory: boolean;
  playerTreasure: number;
  territoryName: string | null;
  onRecruit: (territoryName: string) => void;
  onSpy: (territoryName: string) => void;
};

export function TreasuryActions({
  territory,
  isPlayerTerritory,
  playerTreasure,
  territoryName,
  onRecruit,
  onSpy,
}: TreasuryActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-5">
      <div className="relative group min-w-0">
        <WaxSealButton
          className="w-full"
          onClick={() => territoryName && onRecruit(territoryName)}
          variant="default"
          disabled={!isPlayerTerritory || playerTreasure < costOfRecruiting}
        >
          <Users className="w-3 h-3 mr-1" />
          Recruit
        </WaxSealButton>
        <span className="absolute left-0 bottom-full mb-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          ({costOfRecruiting} solidi)
        </span>
      </div>

      <div className="relative group min-w-0">
        <WaxSealButton
          onClick={() => territoryName && onSpy(territoryName)}
          disabled={
            isPlayerTerritory ||
            playerTreasure < costOfSpying ||
            territory.spiedOn
          }
        >
          <Eye className="w-3 h-3" />
          Spy
        </WaxSealButton>
        <span className="absolute left-0 bottom-full mb-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          ({costOfSpying} solidi)
        </span>
      </div>
    </div>
  );
}
