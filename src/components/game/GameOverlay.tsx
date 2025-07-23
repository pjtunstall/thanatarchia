import React from "react";
import { ScrollText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { GameStatus } from "@/types/gameTypes";

type GameOverlayProps = {
  gameStatus: GameStatus;
  onResetGame: () => void;
};

export const GameOverlay: React.FC<GameOverlayProps> = ({
  gameStatus,
  onResetGame,
}) => {
  if (gameStatus === "playing") return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full parchment-texture border-2 border-[hsl(var(--primary))]">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ScrollText className="w-8 h-8 text-[hsl(var(--primary))]" />
            <CardTitle className="text-4xl ancient-title">
              {gameStatus === "victory"
                ? "CHRONICLES OF TRIUMPH"
                : "CHRONICLES OF DEFEAT"}
            </CardTitle>
            <ScrollText className="w-8 h-8 text-[hsl(var(--primary))]" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* {finalChronicles.map((chronicle, index) => (
            <div
              key={chronicle.id}
              className={`p-4 rounded-lg border-l-4 ${
                chronicle.bias === "friendly"
                  ? "bg-[hsl(var(--chronicle))] border-[hsl(var(--barbarian))]"
                  : "bg-[hsl(var(--chronicle))] border-[hsl(var(--imperial))]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-3 h-3 rounded-full mt-2 ${
                    chronicle.bias === "friendly"
                      ? "bg-[hsl(var(--barbarian))]"
                      : "bg-[hsl(var(--imperial))]"
                  }`}
                />
                <div className="flex-1">
                  <p
                    className={`font-semibold mb-2 ${
                      chronicle.bias === "friendly"
                        ? "text-[hsl(var(--barbarian))]"
                        : "text-[hsl(var(--imperial))]"
                    }`}
                  >
                    {chronicle.chronicler}
                  </p>
                  <p className="text-foreground leading-relaxed italic">
                    "{chronicle.entry}"
                  </p>
                </div>
              </div>
            </div>
          ))} */}

          <div className="pt-6 border-t border-[hsl(var(--border))] text-center">
            <Button onClick={onResetGame} size="lg" className="px-8">
              Begin New Chronicle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
