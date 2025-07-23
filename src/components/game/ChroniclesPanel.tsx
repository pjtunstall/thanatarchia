import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CharacterDialog } from "@/components/game/CharacterProfile";
import { ChatEntry } from "@/types/gameTypes";

import { ScrollAreaWithFade } from "@/components/ui-custom/ScrollAreaWithFade";
import { factions } from "@/data/factions";
import { chroniclers } from "@/data/gameData";

type ChroniclesPanelProps = {
  chronicles: ChatEntry[];
  adviserIndex: number;
  playerIndex: number;
};

export function ChroniclesPanel({
  chronicles,
  adviserIndex,
  playerIndex,
}: ChroniclesPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-0 min-h-0 overflow-hidden">
        <ScrollAreaWithFade height="h-full">
          <div className="space-y-4 p-4 pb-8">
            {chronicles.map((entry, i) => (
              <ChronicleItem
                key={i}
                entry={entry}
                playerIndex={playerIndex}
                adviserIndex={adviserIndex}
              />
            ))}
          </div>
        </ScrollAreaWithFade>
      </CardContent>
    </Card>
  );
}

type ChronicleItemProps = {
  entry: ChatEntry;
  playerIndex: number;
  adviserIndex: number;
};

function ChronicleItem({
  entry,
  playerIndex,
  adviserIndex,
}: ChronicleItemProps) {
  return (
    <div className="py-2">
      <div className="flex items-center gap-3 mb-2">
        <CharacterDialog character={entry.author} />
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            style={
              entry.author.name === chroniclers[adviserIndex].name
                ? { backgroundColor: factions[playerIndex].color }
                : undefined
            }
          >
            {entry.author.name}
          </Badge>
          <span className="text-xs text-muted-foreground">{entry.date}</span>
        </div>
      </div>
      <p className="text-sm italic font-serif leading-relaxed">
        "{entry.statement}"
      </p>
    </div>
  );
}
