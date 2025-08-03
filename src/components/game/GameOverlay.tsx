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
  hasChangedFromEudaemonia: boolean;
  adviserIndex: number;
  playerIndex: number;
  factionLeaders: Character[];
  onResetGame: () => void;
};

export function GameOverlay({
  gameStatus,
  hasChangedFromEudaemonia,
  adviserIndex,
  playerIndex,
  factionLeaders,
  onResetGame,
}: GameOverlayProps) {
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
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-4xl w-full parchment-texture border-2">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CardTitle className="text-4xl ancient-title">
                <span>☠</span>
                <span className="uncial">
                  {gameStatus === "victory"
                    ? "~Bravo, Sire!~"
                    : "~Vanity of Vanities, All is Vanity~"}
                </span>
                <span>☠</span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src="src/assets/sunbeams.jpg"
                alt="End of game scene"
                loading="lazy"
                className="w-full md:w-1/2 max-h-96 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <Chat
                  items={finalItems}
                  options={{ getBadgeColor }}
                  scrollToTop={true}
                />
              </div>
            </div>

            <div className="pt-6 border-t text-center">
              <Button
                variant="outline"
                onClick={onResetGame}
                size="lg"
                className="px-8 uncial"
              >
                Play Again?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
