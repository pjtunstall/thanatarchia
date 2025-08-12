import { Character, ChatEntry } from "@/types/gameTypes";

export function historyChat(
  adviser: Character,
  player: Character
): ChatEntry[] {
  const adviserName = adviser.name;
  let lordOrLady: string;
  if (player.gender === "male") {
    lordOrLady = "Lord";
  } else {
    lordOrLady = "Lady";
  }

  switch (adviserName) {
    case "John of Colchis":
      return [
        {
          author: player,
          statement: `${adviserName}, do you ever get the feeling that all this has happened before?`,
        },
        {
          author: adviser,
          statement:
            "What an excellent question, your Majesty! Now you're probing close to the heart of the thing.",
        },
        {
          author: player,
          statement:
            "No, but I mean, really happened before—and will keep happening, again and again forever?",
        },
        {
          author: adviser,
          statement:
            "The state you describe is called déja vu. It's probably caused by the devil. Most things are. If you like, I can pray for you. Would you like that?",
        },
        {
          author: player,
          statement: `Oh, ${adviserName}, I appreciate that, but I fear it's too late to pray for me.`,
        },
      ];
    case "Priscilla of Byzantium":
      return [
        {
          author: player,
          statement: `Will people remember me, ${adviserName}?`,
        },
        {
          author: adviser,
          statement:
            "No, your Majesty. People are swine. They will remember nothing. They will remember you only in so far as you fit the story.",
        },
        {
          author: player,
          statement: `Where did that come from, ${adviserName}?`,
        },
      ];
    case "Eudaemonia of Rheims":
      return [
        {
          author: player,
          statement: `Do you ever get a sense of déja vu, ${adviserName}.`,
        },
        {
          author: adviser,
          statement: `Do you ever get a sense of déja vu, your Majesty?`,
        },
        {
          author: player,
          statement: `I'm serious, ${adviserName}. What if we're condemned to repeat this cycle forever?`,
        },
        {
          author: adviser,
          statement: `And what if we're free to act as we will at any time? Is that any less terrifying? Perhaps that is the reality from which we choose any nightmare to escape into.`,
        },
        {
          author: player,
          statement: "But I must protect my people.",
        },
      ];
    case "Athaloc of Smyrna":
      return [
        {
          author: player,
          statement: `Has history, in some sense, already happened, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: `Déja vu, my ${lordOrLady}? It is an affliction of the philosophicaly inclined. Quite common, I gather, among those who fail to drown out their thoughts at all time with prayer. Harmless if nipped in the bud. If left untreated, however, it may progress into something more serious. The next stage is to start to see things as they really are, a simulation.`,
        },
        {
          author: player,
          statement: "What did you say?",
        },
        {
          author: adviser,
          statement:
            "I said: the next stage is to succumb to the preposterous delusion that the whole world is a simulation.",
        },
        {
          author: player,
          statement:
            "Oh, God, I think you've convinced me. Know any good prayers?",
        },
      ];
  }
}
