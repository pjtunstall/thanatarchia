import { Button } from "@/components/ui/button";
import { Users, Eye } from "lucide-react";
import { Faction } from "@/types/gameTypes";
import { costOfSpying, costOfRecruiting } from "@/data/gameData";

interface Props {
  playerFaction: Faction;
  selectedTerritory: string | null;
  onRecruitTroops: () => void;
  onSpy: (territoryId: string) => void;
}

export const TreasuryActions: React.FC<Props> = ({
  playerFaction,
  selectedTerritory,
  onRecruitTroops,
  onSpy,
}) => (
  <div className="grid grid-cols-2 gap-2">
    <Button
      onClick={onRecruitTroops}
      variant="outline"
      size="sm"
      disabled={playerFaction.treasure < costOfRecruiting}
    >
      <Users className="w-3 h-3 mr-1" />
      Recruit ({costOfRecruiting} solidi)
    </Button>
    <Button
      onClick={() => selectedTerritory && onSpy(selectedTerritory)}
      variant="outline"
      size="sm"
      disabled={!selectedTerritory || playerFaction.treasure < costOfSpying}
    >
      <Eye className="w-3 h-3 mr-1" />
      Spy ({costOfSpying} solidi)
    </Button>
  </div>
);
