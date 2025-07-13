import { Button } from "@/components/ui/button";
import { Users, Eye } from "lucide-react";
import { Faction } from "@/types/GameTypes";

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
      disabled={playerFaction.treasure < 50}
    >
      <Users className="w-3 h-3 mr-1" />
      Recruit (50 solidi)
    </Button>
    <Button
      onClick={() => selectedTerritory && onSpy(selectedTerritory)}
      variant="outline"
      size="sm"
      disabled={!selectedTerritory || playerFaction.treasure < 25}
    >
      <Eye className="w-3 h-3 mr-1" />
      Spy (25 solidi)
    </Button>
  </div>
);
