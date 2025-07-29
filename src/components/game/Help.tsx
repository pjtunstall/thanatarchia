import { useState } from "react";

import { Character, Faction, ChatEntry } from "@/types/gameTypes";
import { HelpMenu } from "@/components/game/help/HelpMenu";
import { HelpContent } from "@/components/game/help/HelpContent";
import { Chat } from "./Chat";

type HelpProps = {
  player: Character;
  playerFaction: Faction;
  adviser: Character;
  setAdviserIndex: React.Dispatch<React.SetStateAction<number>>;
  setHasChangedFromEudaemonia: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Help({
  player,
  playerFaction,
  adviser,
  setAdviserIndex,
  setHasChangedFromEudaemonia,
}: HelpProps) {
  const [topic, setTopic] = useState<string | null>(null);
  const getBadgeColor = (entry: ChatEntry) => playerFaction.color;

  return (
    <div className="flex flex-col flex-1 min-h-0 pt-3 space-y-4">
      <div className="flex-1 min-h-0">
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
        ) : (
          <Chat items={getInitialHint(adviser)} options={{ getBadgeColor }} />
        )}
      </div>

      <div className="flex-shrink-0">
        <HelpMenu onSelectTopic={setTopic} />
      </div>
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
        "Just pick a territory on this chart, Sire, and let's make a plan for the season.";
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
