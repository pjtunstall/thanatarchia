import { Chat } from "@/components/game/Chat";
import { Character, ChatEntry, Faction } from "@/types/gameTypes";
import { factions } from "@/data/factions";

type WarProps = {
  player: Character;
  adviser: Character;
  playerFaction: Faction;
};

export function War({ player, adviser, playerFaction }: WarProps) {
  return <Chat items={chat(adviser, player, playerFaction)} />;
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
  playerFaction: Faction
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
      return [
        {
          author: adviser,
          statement: "It is quite glorious, I'm sure.",
        },
        {
          author: player,
          statement: `Don't think I don't sense your sarcasm, ${adviser.name}. My people crave peace too. Do you think the ${factionOne} or the ${factionTwo} will give it? Well, do you have a witty rejoinder? Have the last word? I'm giving you the floor.`,
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
          statement: "Maybe I be excused, Sire.",
        },
        {
          author: player,
          statement: "Go on then.",
        },
      ];
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
