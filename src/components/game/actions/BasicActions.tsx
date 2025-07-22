import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Church } from "lucide-react";
import { faiths } from "@/data/faiths";

type BasicActionsProps = {
  playerIndex: number;
  onEndTurn: () => void;
  onChangeFaith: (factionIndex: number, faith: string) => void;
};

export const BasicActions: React.FC<BasicActionsProps> = ({
  playerIndex,
  onEndTurn,
  onChangeFaith,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Church className="w-3 h-3 mr-1" />
            Change Faith
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {faiths.map((faith) => (
            <DropdownMenuItem
              key={faith}
              onSelect={() => onChangeFaith(playerIndex, faith)}
            >
              {faith}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={onEndTurn} variant="outline" size="sm">
        End Turn
      </Button>
    </div>
  );
};
