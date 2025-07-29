import React from "react";
import { ScrollText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { GameStatus, Character, ChatEntry } from "@/types/gameTypes";
import {
  endChronicle,
  chroniclers,
  chroniclersAfterTheIncident,
} from "@/data/chronicles";
import { factions } from "@/data/factions";
import { Chat } from "@/components/game/Chat";

type GameOverlayProps = {
  gameStatus: GameStatus;
  onResetGame: () => void;
  hasChangedFromEudaemonia: boolean;
  adviserIndex: number;
  playerIndex: number;
  factionLeaders: Character[];
};

export const GameOverlay: React.FC<GameOverlayProps> = ({
  gameStatus,
  onResetGame,
  hasChangedFromEudaemonia,
  adviserIndex,
  playerIndex,
  factionLeaders,
}) => {
  if (gameStatus === "playing") return null;

  let chronicler: Character;
  let bias = "hostile";
  if (hasChangedFromEudaemonia) {
    const i = Math.floor(Math.random() * chroniclersAfterTheIncident.length);
    chronicler = chroniclersAfterTheIncident[i];
    if (adviserIndex === i && i !== 3) {
      bias = "friendly";
    }
  } else {
    const i = Math.floor(Math.random() * chroniclers.length);
    chronicler = chroniclers[i];
    if (adviserIndex === i) {
      bias = "friendly";
    }
  }
  const statement = endChronicle({
    chronicler,
    bias,
    success: gameStatus === "victory",
    player: factionLeaders[playerIndex],
    faction: factions[playerIndex],
  });

  const entry = {
    author: chronicler,
    statement,
  };

  const getBadgeColor = (entry: ChatEntry) =>
    entry.author.name === chroniclers[adviserIndex].name
      ? factions[playerIndex].color
      : null;

  const finalItems = [entry];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full parchment-texture border-2 border-[hsl(var(--primary))]">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ScrollText className="w-8 h-8 text-[hsl(var(--primary))]" />
            <CardTitle className="text-4xl ancient-title uncial">
              {gameStatus === "victory"
                ? "CHRONICLES OF TRIUMPH"
                : "CHRONICLES OF DEFEAT"}
            </CardTitle>
            <ScrollText className="w-8 h-8 text-[hsl(var(--primary))]" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Chat items={finalItems} options={{ getBadgeColor }}></Chat>

          <div className="pt-6 border-t border-[hsl(var(--border))] text-center">
            <Button onClick={onResetGame} size="lg" className="px-8">
              Live Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
