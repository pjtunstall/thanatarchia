import { Button } from "@/components/ui/button";
import { Church } from "lucide-react";

type BasicActionsProps = {
  onEndTurn: () => void;
};

export const BasicActions: React.FC<BasicActionsProps> = ({ onEndTurn }) => (
  <div className="grid grid-cols-2 gap-2">
    <Button onClick={() => {}} variant="outline" size="sm">
      <Church className="w-3 h-3 mr-1" />
      Change Faith
    </Button>
    <Button onClick={onEndTurn} variant="outline" size="sm">
      End Turn
    </Button>
  </div>
);
