import { Button } from "@/components/ui/button";
import { Users, Eye } from "lucide-react";
import { Faction } from "@/types/gameTypes";
import { costOfSpying, costOfRecruiting } from "@/data/gameData";

interface Props {
  playerTreasure: number;
  selectedTerritory: string | null;
  onRecruit: () => void;
  onSpy: (territoryId: string) => void;
}

export const TreasuryActions: React.FC<Props> = ({
  playerTreasure,
  selectedTerritory,
  onRecruit,
  onSpy,
}) => (
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
);
