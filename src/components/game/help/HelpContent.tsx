import { Faction } from "@/types/gameTypes";
import { Character, ChatEntry } from "@/types/gameTypes";
import { thanatarchiaChat } from "@/components/game/help/thanatarchia";
import { Strategy } from "@/components/game/help/Strategy";
import { War } from "@/components/game/help/War";
import { Chat } from "@/components/game/Chat";
import { loyaltyChat } from "@/components/game/help/loyalty";
import { choiceChat } from "@/components/game/help/choice";
import { robberyChat } from "@/components/game/help/robbery";
import { historyChat } from "@/components/game/help/history";
import { identityChat } from "@/components/game/help/identity";

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
          isHelpTopic={true}
          scrollKey="loyalty"
        />
      );
    case "Robbery":
      return (
        <Chat
          items={robberyChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
          isHelpTopic={true}
          scrollKey="robbery"
        />
      );
    case "History":
      return (
        <Chat
          items={historyChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
          isHelpTopic={true}
          scrollKey="history"
        />
      );
    case "Identity":
      return (
        <Chat
          items={identityChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
          isHelpTopic={true}
          scrollKey="identity"
        />
      );
    case "Choice":
      return (
        <Chat
          items={choiceChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
          isHelpTopic={true}
          scrollKey="choice"
        />
      );
    case "Thanatarchia":
      return (
        <Chat
          items={thanatarchiaChat(adviser, player)}
          options={{ getBadgeColor }}
          scrollToTop={true}
          isHelpTopic={true}
          scrollKey="thanatarchia"
        />
      );
  }
}
