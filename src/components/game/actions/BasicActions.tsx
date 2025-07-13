import { Button } from "@/components/ui/button";
import { Sword } from "lucide-react";

interface Props {
  onAction: (action: string) => void;
  onEndTurn: () => void;
}

export const BasicActions: React.FC<Props> = ({ onAction, onEndTurn }) => (
  <div className="grid grid-cols-2 gap-2">
    <Button onClick={() => onAction("raid")} variant="destructive" size="sm">
      <Sword className="w-3 h-3 mr-1" />
      Raid Territory
    </Button>
    <Button onClick={() => onAction("marry")} variant="secondary" size="sm">
      Arrange Marriage
    </Button>
    <Button onClick={() => onAction("negotiate")} variant="outline" size="sm">
      Send Envoy
    </Button>
    <Button onClick={onEndTurn} variant="default" size="sm">
      End Turn
    </Button>
  </div>
);
