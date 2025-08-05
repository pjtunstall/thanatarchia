import { Faction } from "@/types/gameTypes";
import { Character, ChatEntry } from "@/types/gameTypes";
import { Thanatarchia } from "@/components/game/help/Thanatarchia";
import { Strategy } from "@/components/game/help/Strategy";
import { War } from "@/components/game/help/War";
import { Chat } from "@/components/game/Chat";
import { loyaltyChat } from "@/components/game/help/Loyalty";
import { choiceChat } from "@/components/game/help/Choice";
import { robberyChat } from "@/components/game/help/Robbery";
import { historyChat } from "@/components/game/help/History";

type HelpContentProps = {
  topic: string;
  player: Character;
  adviser: Character;
  playerFaction: Faction;
  setAdviserIndex: React.Dispatch<React.SetStateAction<number>>;
  setHasChangedFromEudaemonia: React.Dispatch<React.SetStateAction<boolean>>;
  getBadgeColor: (entry: ChatEntry) => string;
};

export function HelpContent({
  topic,
  player,
  adviser,
  playerFaction,
  setAdviserIndex,
  setHasChangedFromEudaemonia,
  getBadgeColor,
}: HelpContentProps) {
  switch (topic) {
    case "Strategy":
      return (
        <Strategy
          player={player}
          adviser={adviser}
          playerFaction={playerFaction}
          getBadgeColor={getBadgeColor}
        />
      );
    case "War":
      return (
        <War
          player={player}
          adviser={adviser}
          playerFaction={playerFaction}
          setAdviserIndex={setAdviserIndex}
          setHasChangedFromEudaemonia={setHasChangedFromEudaemonia}
          getBadgeColor={getBadgeColor}
        />
      );
    case "Loyalty":
      return (
        <Chat
          items={loyaltyChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
        />
      );
    case "Robbery":
      return (
        <Chat
          items={robberyChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
        />
      );
    case "History":
      return (
        <Chat
          items={historyChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
        />
      );
    case "Choice":
      return (
        <Chat
          items={choiceChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
        />
      );
    case "Thanatarchia":
      return (
        <Thanatarchia
          player={player}
          adviser={adviser}
          getBadgeColor={getBadgeColor}
        />
      );
  }
}
