import { Card, CardContent } from "@/components/ui/card";

import { ChatEntry } from "@/types/gameTypes";
import { Chat } from "@/components/game/Chat";
import { chroniclers } from "@/data/chronicles";
import { factions } from "@/data/factions";

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
  const getBadgeColor = (entry: ChatEntry) =>
    entry.author.name === chroniclers[adviserIndex].name
      ? factions[playerIndex].color
      : undefined;

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-0 min-h-0 overflow-hidden">
        <Chat
          items={chronicles}
          options={{ getBadgeColor }}
          scrollToTop={false}
        />
      </CardContent>
    </Card>
  );
}
