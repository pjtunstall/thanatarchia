import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Church, Check, ArrowBigRight } from "lucide-react";
import { faiths } from "@/data/faiths";

import { Character } from "@/types/gameTypes";

type BasicActionsProps = {
  playerIndex: number;
  onEndTurn: () => void;
  onChangeFaith: (
    factionIndex: number,
    faith: string,
    factionLeaders: Character[],
    setFactionLeaders: React.Dispatch<React.SetStateAction<Character[]>>
  ) => void;
  factionFaiths: string[];
  factionLeaders: Character[];
  setFactionLeaders: React.Dispatch<React.SetStateAction<Character[]>>;
};

export const BasicActions: React.FC<BasicActionsProps> = ({
  playerIndex,
  onEndTurn,
  onChangeFaith,
  factionFaiths,
  factionLeaders,
  setFactionLeaders,
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
              onSelect={() =>
                onChangeFaith(
                  playerIndex,
                  faith,
                  factionLeaders,
                  setFactionLeaders
                )
              }
            >
              {faith}
              {faith === factionFaiths[playerIndex] && (
                <Check className="h-4 w-4 text-muted-foreground" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={onEndTurn} variant="outline" size="sm">
        <ArrowBigRight className="w-3 h-3 mr-1" />
        End Turn
      </Button>
    </div>
  );
};
