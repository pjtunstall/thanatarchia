import { useLayoutEffect, useRef } from "react";

import { Character, ChatEntry, Faction } from "@/types/gameTypes";
import { Chat } from "@/components/game/Chat";
import { factions } from "@/data/factions";

type WarProps = {
  player: Character;
  adviser: Character;
  playerFaction: Faction;
  setAdviserIndex: React.Dispatch<React.SetStateAction<number>>;
  setHasChangedFromEudaemonia: React.Dispatch<React.SetStateAction<boolean>>;
  getBadgeColor: (entry: ChatEntry) => string;
};

export function War({
  player,
  adviser,
  playerFaction,
  setAdviserIndex,
  setHasChangedFromEudaemonia,
  getBadgeColor,
}: WarProps) {
  const hasHandledEudaemonia = useRef(false);
  const shouldReplace = Math.random() < 0.5;

  useLayoutEffect(() => {
    if (
      adviser.name === "Eudaemonia of Rheims" &&
      !hasHandledEudaemonia.current
    ) {
      hasHandledEudaemonia.current = true;

      if (shouldReplace) {
        // Set up the interaction listener AFTER this render is complete.
        const setupListener = () => {
          const clickHandler = (event) => {
            // Check if the click is specifically on the "Ask about..." button.
            const target = event.target;
            const isAskAboutButton =
              target.closest("[data-radix-dropdown-menu-trigger]") ||
              (target.textContent &&
                target.textContent.includes("Ask about..."));

            // Trigger change for ANY click that's NOT the "Ask about..." button.
            if (!isAskAboutButton) {
              setAdviserIndex(0);
              setHasChangedFromEudaemonia(true);

              // Clean up listeners.
              window.removeEventListener("click", clickHandler);
              window.removeEventListener("keydown", keyHandler);
            }
          };

          const keyHandler = () => {
            // Any keypress triggers the change.
            setAdviserIndex(0);
            // Clean up listeners.
            window.removeEventListener("click", clickHandler);
            window.removeEventListener("keydown", keyHandler);
          };

          window.addEventListener("click", clickHandler);
          window.addEventListener("keydown", keyHandler);
        };

        // Use setTimeout to ensure this happens after the current render.
        setTimeout(setupListener, 0);
      }
    }
  }, [adviser.name, setAdviserIndex, shouldReplace]);

  return (
    <Chat
      items={chat(adviser, player, playerFaction, shouldReplace)}
      options={{ getBadgeColor }}
    />
  );
}

let recursionLimit: number;

function getRandomFaction(
  playerFaction: Faction,
  otherFactionName: string
): string {
  recursionLimit++;
  let r = Math.floor(Math.random() * factions.length);
  const randomFactionName = factions[r].name;
  if (
    (randomFactionName !== playerFaction.name &&
      randomFactionName !== otherFactionName) ||
    recursionLimit > 99
  ) {
    return randomFactionName;
  } else {
    return getRandomFaction(playerFaction, otherFactionName);
  }
}

function chat(
  adviser: Character,
  player: Character,
  playerFaction: Faction,
  shouldReplaceEudaemonia: boolean
): ChatEntry[] {
  const person = adviser.gender === "male" ? "man" : "woman";

  recursionLimit = 100;
  const factionOne = getRandomFaction(playerFaction, "");

  recursionLimit = 100;
  const factionTwo = getRandomFaction(playerFaction, factionOne);

  switch (adviser.name) {
    case "John of Colchis":
      return [
        {
          author: player,
          statement: `Am I a bad ${person} for waging war, ${adviser.name}?`,
        },
        {
          author: adviser,
          statement:
            "A thoughtful and eloquent question, my Liege! The very fact that you ask it shows that you are not.",
        },
      ];
    case "Priscilla of Byzantium":
      return [
        {
          author: player,
          statement: `What do you know about war, ${adviser.name}?`,
        },
        {
          author: adviser,
          statement: "Never start a land war in Asia Minor.",
        },
      ];
    case "Eudaemonia of Rheims":
      if (!shouldReplaceEudaemonia) {
        return [
          {
            author: adviser,
            statement: "It is quite glorious, I'm sure.",
          },
          {
            author: player,
            statement: `Don't think I don't sense your sarcasm, ${adviser.name}. My people crave peace too. Do you think the ${factionOne} or the ${factionTwo} will give it freely? Well? do you have a witty rejoinder? Have the last word? I'm giving you the floor.`,
          },
          {
            author: adviser,
            statement: "Tell that to the...",
          },
          {
            author: player,
            statement: "Eh?",
          },
          {
            author: adviser,
            statement:
              "May I be excused, Sire? Before one of us does something regretable.",
          },
          {
            author: player,
            statement: `Go on then. I like your panegyrics, ${adviser.name}, but you are sailing very, very close to the wind.`,
          },
        ];
      } else {
        return [
          {
            author: adviser,
            statement: "It is quite glorious, I'm sure.",
          },
          {
            author: player,
            statement: `Don't think I don't sense your sarcasm, ${adviser.name}. My people crave peace too. Do you think the ${factionOne} or the ${factionTwo} will give it freely? Well, do you have a witty rejoinder? Have the last word? I'm giving you the floor.`,
          },
          {
            author: adviser,
            statement: `Very well, my ${
              player.gender === "male" ? "Lord" : "Lady"
            }. Tell that to the bones of the innocents you massacred when you took ${
              playerFaction.capital
            }. Tell it to the women you enslaved. The starving...`,
          },
          {
            author: player,
            statement: "They were traitors. That is war.",
          },
          {
            author: adviser,
            statement: "How reassuringly abstract, Sire.",
          },
          {
            author: player,
            statement: `That's it, ${adviser.name}. A traitor sympathizes with traitors. Guards! ...`,
          },
        ];
      }
    case "Athaloc of Smyrna":
      return [
        {
          author: adviser,
          statement: `Ah, war. It is a dreadful business, is it not? And yet it is part of a ruler's duty. But if it is how to wage war that you're asking, my ${
            player.gender === "male" ? "Lord" : "Lady"
          }, then you could do a lot worse than to study Vegetius. That, and get a good night's sleep. And prayer. Certainly, say the odd prayer or two. They can do wonders for military succes, I gather.`,
        },
      ];
  }
}
