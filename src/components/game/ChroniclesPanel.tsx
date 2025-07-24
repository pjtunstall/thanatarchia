import { ChatEntry } from "@/types/gameTypes";
import { Chat, renderChatItem } from "@/components/game/Chat";
import { chroniclers } from "@/data/gameData";
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
    <Chat
      items={chronicles}
      renderItem={(entry, index) =>
        renderChatItem(entry, index, { getBadgeColor })
      }
    />
  );
}
