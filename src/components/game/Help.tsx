import { useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Character, Faction, ChatEntry } from "@/types/gameTypes";
import { HelpMenu } from "@/components/game/help/HelpMenu";
import { HelpContent } from "@/components/game/help/HelpContent";
import { Chat } from "@/components/game/Chat";
import { deathChat } from "@/components/game/help/death";

let hasShownDeathVision = false;

type HelpProps = {
  currentTurn: number;
  player: Character;
  playerFaction: Faction;
  adviser: Character;
  setAdviserIndex: React.Dispatch<React.SetStateAction<number>>;
  setHasChangedFromEudaemonia: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Help({
  currentTurn,
  player,
  playerFaction,
  adviser,
  setAdviserIndex,
  setHasChangedFromEudaemonia,
}: HelpProps) {
  const isMobile = useIsMobile();
  const [topic, setTopic] = useState<string | null>(null);
  const getBadgeColor = (entry: ChatEntry) => playerFaction.color;

  let showDeathVision = false;
  if (currentTurn === 16 && !hasShownDeathVision) {
    hasShownDeathVision = true;
    showDeathVision = true;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 pt-3 space-y-4">
      <div className="flex-1 min-h-0">
        {isMobile && (
          <div className="flex-shrink-0">
            <HelpMenu onSelectTopic={setTopic} />
          </div>
        )}

        {topic ? (
          <HelpContent
            topic={topic}
            adviser={adviser}
            player={player}
            playerFaction={playerFaction}
            setAdviserIndex={setAdviserIndex}
            setHasChangedFromEudaemonia={setHasChangedFromEudaemonia}
            getBadgeColor={getBadgeColor}
          />
        ) : showDeathVision ? (
          <Chat
            items={deathChat({ player, playerFaction })}
            options={{ getBadgeColor }}
            scrollToTop={true}
          />
        ) : (
          <Chat
            items={getInitialHint(adviser)}
            options={{ getBadgeColor }}
            scrollToTop={true}
          />
        )}
      </div>

      {!isMobile && (
        <div className="flex-shrink-0">
          <HelpMenu onSelectTopic={setTopic} />
        </div>
      )}
    </div>
  );
}

function getInitialHint(adviser: Character): ChatEntry[] {
  let statement: string;

  switch (adviser.name) {
    case "John of Colchis":
      statement =
        "Pick a territory on the map, my Liege, and take your next heroic action!";
      break;
    case "Priscilla of Byzantium":
      statement = "Choose a territory by clicking on the map, Sire!";
      break;
    case "Eudaemonia of Rheims":
      statement =
        "Pick a territory on this chart, Sire, and let's make a plan for the season.";
      break;
    case "Athaloc of Smyrna":
      statement =
        "Select a territory on the map, your Majesty, and we may procede.";
      break;
  }

  return [
    {
      author: adviser,
      statement: statement,
    },
  ];
}
