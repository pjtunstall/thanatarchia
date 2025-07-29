import { Character, ChatEntry } from "@/types/gameTypes";

export function loyaltyChat(
  adviser: Character,
  player: Character
): ChatEntry[] {
  const adviserName = adviser.name;

  switch (adviserName) {
    case "John of Colchis":
      return [
        {
          author: player,
          statement: `What does loyalty mean to you, ${adviserName}?`,
        },
        {
          author: adviser,
          statement:
            "How insightful, my Liege! Loyalty is one of the chief virtues.",
        },
        {
          author: player,
          statement: `Is it one of your chief virtues, ${adviserName}?`,
        },
        {
          author: adviser,
          statement:
            "Well-crafted follow-up, my Liege. My loyalty is without question.",
        },
      ];
    case "Priscilla of Byzantium":
      return [
        {
          author: adviser,
          statement:
            "What does loyalty mean to me, Sire? Well, we Byzantines are renowned for our loyalty.",
        },
      ];
    case "Eudaemonia of Rheims":
      return [
        {
          author: adviser,
          statement: "Loyalty, Sire? It is a virtue, we are told.",
        },
        {
          author: player,
          statement: `And what do you say, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: "Much is accomplished under the name of virtue, my Liege.",
        },
        {
          author: player,
          statement: "You mean it makes one productive?",
        },
        {
          author: adviser,
          statement: "If you like, Sire.",
        },
      ];
    case "Athaloc of Smyrna":
      return [
        {
          author: adviser,
          statement: `Certainly, Sire, you've come to the right person to ask about Loyalty. Loyalty is one of the Four Indomitable Virtues and She also one of the Seven Unfathomable Graces. The Loyalty of a ruler to ${
            player.gender === "male" ? "his" : "her"
          } people, for example, was spoken of in glowing terms by Saint Agatha, shortly before her self-immolation. And the Blessed Marcellus himself...`,
        },
        {
          author: player,
          statement: `How about the loyalty of a trusted adviser, ${adviserName}? For example.`,
        },
        {
          author: adviser,
          statement:
            "Well, that goes without saying, your Majesty. I have always been, and always will be, your most trusted servant.",
        },
        {
          author: player,
          statement: `I'll be blunt, ${adviserName}. I've been going through your chronicle entries, and I can't help but wonder if some of them are meant ironically.`,
        },
        {
          author: adviser,
          statement: `No, my ${
            player.gender === "male" ? "Lord" : "Lady"
          }! Heaven forfend! I would never write an ironical chronicle.`,
        },
      ];
  }
}
