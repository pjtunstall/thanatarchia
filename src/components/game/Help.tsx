import { useState, useEffect } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Character, Faction, ChatEntry } from "@/types/gameTypes";
import { HelpMenu } from "@/components/game/help/HelpMenu";
import { HelpContent } from "@/components/game/help/HelpContent";
import { Chat } from "@/components/game/Chat";
import { deathChat } from "@/components/game/help/death";
import { chroniclers } from "@/data/chronicles";

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
  const [hintIndex, setHintIndex] = useState(0);

  let showDeathVision = false;
  if (currentTurn === 16 && !hasShownDeathVision) {
    hasShownDeathVision = true;
    showDeathVision = true;
  }

  useEffect(() => {
    if (!topic && !showDeathVision) {
      setHintIndex((prevIndex) => Math.min(1, prevIndex + 1));
    }
  }, [currentTurn]);

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
            items={getHint({ adviser, player, playerFaction, currentTurn })}
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

type getHintProps = {
  adviser: Character;
  player: Character;
  playerFaction: Faction;
  currentTurn: number;
};

function getHint({
  adviser,
  player,
  playerFaction,
  currentTurn,
}: getHintProps): ChatEntry[] {
  let lordOrLady: string;
  let kingOrQueen: string;
  if (player.gender === "male") {
    lordOrLady = "Lord";
    kingOrQueen = "King";
  } else {
    lordOrLady = "Lady";
    kingOrQueen = "Queen";
  }

  const hint = [
    // Turn 1.
    {
      "John of Colchis": [
        {
          author: adviser,
          statement: `Hail, ${player.name}, ${kingOrQueen} of the ${playerFaction.name}! Congratulations on your coronation.`,
        },
        {
          author: player,
          statement: `Thank you, ${adviser.name}. Any words of wisom?`,
        },
        {
          author: adviser,
          statement:
            "Certainly, Sire. Pick a territory on the map, and take your next heroic action! If there's anything I can help with, just ask.",
        },
      ],
      "Priscilla of Byzantium": [
        {
          author: adviser,
          statement: `Ave, ${player.name}! The ${playerFaction.name} are fortunate indeed to have you as their ${kingOrQueen}.`,
        },
        {
          author: player,
          statement: `Much appeciated, ${adviser.name}. What do you counsel?`,
        },
        {
          author: adviser,
          statement: `Choose a territory by clicking on the map, my ${lordOrLady}. Those in our faction color belong to you. Should you have any questions, please do not hesitate to ask.`,
        },
      ],
      "Eudaemonia of Rheims": [
        {
          author: adviser,
          statement: `Salutes, ${kingOrQueen} ${player.name} of the ${playerFaction.name}! Bravo on your accession to the throne.`,
        },
        {
          author: player,
          statement: `Thank you, ${adviser.name}. How would you advise me?`,
        },
        {
          author: adviser,
          statement:
            "Pick a territory on this chart, Sire, and let's make a plan for the season. If you have any questions, please do not hesitate to ask.",
        },
      ],
      "Athaloc of Smyrna": [
        {
          author: adviser,
          statement: `Hail, ${player.name}, ${kingOrQueen} of the ${playerFaction.name}! My compliments on the deft manoeuvering with which you took power. That's just the sort of political acumen we need at our helm.`,
        },
        {
          author: player,
          statement: `Well, thank you, ${adviser.name}. I couldn't have done it without you. What do you advise now?`,
        },
        {
          author: adviser,
          statement:
            "Select a territory on the map, your Majesty, and we may procede. Should you have any further questions, please do ask.",
        },
      ],
    },

    // Turn 2.
    {
      "John of Colchis": [
        {
          author: player,
          statement: `What now, ${adviser.name}?`,
        },
        {
          author: adviser,
          statement:
            "You're doing fine, your Majesty. On track for martydom... I'm right here if you have any questions.",
        },
        {
          author: player,
          statement: `Thanks for the reassurance, ${adviser.name}.`,
        },
      ],
      "Priscilla of Byzantium": [
        {
          author: player,
          statement: `Any tips, ${adviser.name}?`,
        },
        {
          author: adviser,
          statement: `Insightful question, my ${lordOrLady}. Spoken like a true Roman.`,
        },
        {
          author: player,
          statement: `I'll take that nonsequitur as a compliment, ${adviser.name}. But do try to focus.`,
        },
      ],
      "Eudaemonia of Rheims": [
        {
          author: adviser,
          statement: "Hullo, your Majesty, what shall we speak of today?",
        },
      ],
      "Athaloc of Smyrna": [
        {
          author: adviser,
          statement:
            "What can I do for you, Sire? I am a veritable fount of wisdom.",
        },
      ],
    },

    // Turn 3+.
    {
      "John of Colchis": [
        {
          author: adviser,
          statement: "My Liege?",
        },
      ],
      "Priscilla of Byzantium": [
        {
          author: adviser,
          statement: `My ${lordOrLady}, how may I help?`,
        },
      ],
      "Eudaemonia of Rheims": [
        {
          author: adviser,
          statement: "I'm right here if you have any questions.",
        },
      ],
      "Athaloc of Smyrna": [
        {
          author: adviser,
          statement:
            "Is there ought you would know, Sire? I am a veritable fount of wisdom.",
        },
      ],
    },
  ];

  const hintIndex = Math.min(currentTurn - 1, hint.length - 1);
  const currentHint = hint[hintIndex][adviser.name];
  return currentHint;
}
