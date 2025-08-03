import { Character, ChatEntry, Faction, Gender } from "@/types/gameTypes";

const death = {
  name: "King Death",
  gender: "male" as Gender,
  image: "kingDeath",
  biography: "",
  index: -1,
};

type deathChatProps = {
  player: Character;
  playerFaction: Faction;
};

export function deathChat({
  player,
  playerFaction,
}: deathChatProps): ChatEntry[] {
  let title = "";
  if (playerFaction.name === "Romans") {
    title = player.gender === "male" ? "Emperor" : "Empress";
  } else if (playerFaction.name !== "Bagaudae") {
    title = player.gender === "male" ? "King" : "Queen";
  }

  return [
    {
      author: player,
      statement: "Who're you?",
    },
    {
      author: death,
      statement: `I am King Death.`,
    },
    {
      author: player,
      statement: "What do you want?",
    },
    {
      author: death,
      statement: `I would speak with my loyal servant, ${title} ${player.name} a little before the end.`,
    },
    {
      author: player,
      statement: "You have no business here.",
    },
    {
      author: death,
      statement: "I beg to differ. It seems I am often welcome in these parts.",
    },
    {
      author: player,
      statement: "Who are you to judge?",
    },
    {
      author: death,
      statement: "I was once as you.",
    },
    {
      author: player,
      statement: "I think this is just a dream.",
    },
    {
      author: death,
      statement: `Indeed it is. A dream, a game, a simulation... But what else do you have? Rest well, ${player.name}. I will be back when it is time to wake.`,
    },
  ];
}
