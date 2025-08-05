import { Character, ChatEntry } from "@/types/gameTypes";

export function robberyChat(
  adviser: Character,
  player: Character
): ChatEntry[] {
  const adviserName = adviser.name;
  let kingOrQueen;
  let lordOrLady;
  if (player.gender === "male") {
    kingOrQueen = "King";
    lordOrLady = "Lord";
  } else {
    kingOrQueen = "Queen";
    lordOrLady = "Lady";
  }

  switch (adviserName) {
    case "John of Colchis":
      return [
        {
          author: adviser,
          statement:
            "I say, I say, I say: Never go into a strong man's house and steal his pots",
        },
        {
          author: player,
          statement: "No?",
        },
        {
          author: adviser,
          statement: "No, Sire, tie him up first. Then steal his pots.",
        },
        {
          author: player,
          statement: "Biblical humor. Nice.",
        },
      ];
    case "Priscilla of Byzantium":
      return [
        {
          author: player,
          statement: `Am I a thief, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: "No, your Majesty, you are a bold robber!",
        },
        {
          author: player,
          statement: `Well, thanks, ${adviserName}, it's kind of you to say so. I guess I'm a vibe ruler. Some of the other rulers got me onto it. I didn't really belive in it at first, but now I vibe everything: attacks, reinforcements, who to burn alive or impale... It's amazing. It's like a superpower. But sometimes I feel like it's a will-o-the-whisp, leading me out ever further onto thin ice.`,
        },
        {
          author: adviser,
          statement: "Are these even...",
        },
        {
          author: player,
          statement:
            "Are these even my thoughts? You advisers are so quick to complete my sentences. Sometimes I just don't know anymore",
        },
      ];
    case "Eudaemonia of Rheims":
      return [
        {
          author: player,
          statement: `Do you think I get more than I deserve, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: `I should jolly well hope you get exactly what you deserve, my ${lordOrLady}.`,
        },
        {
          author: player,
          statement: `Haha, good one, ${adviserName}. But I've been 33 winters in this world as yet. I've seen more of it than most. We come in screaming. We go out screaming. And as far as I've seen, each of us deserves exactly what they CAN and WILL take.`,
        },
        {
          author: adviser,
          statement: "I can't disagree, your Majesty.",
        },
        {
          author: player,
          statement: "But you would if you could?",
        },
        {
          author: adviser,
          statement:
            "It might surprise you, your Majesty, but I don't care much for this notion of deserving either. I've poured my joys and sorrows into my art for, oh, a little longer than you have practiced yours. I never considered what it would earn me. Well, that is not quite true. But I do not believe there is any earning or deserving. We give what we have. We receive what we may. The rest is just our pride.",
        },
      ];
    case "Athaloc of Smyrna":
      return [
        {
          author: player,
          statement: `Would you call me a robber, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: `Oh no, my ${lordOrLady}.`,
        },
        {
          author: player,
          statement: "I do take other people's things, though.",
        },
        {
          author: adviser,
          statement: "For the good of the state, Sire.",
        },
        {
          author: player,
          statement:
            "Truth to tell, Atheloc, I keep most of them for myself. I also pass off the deeds of my followers as my own achievements and blame them when things go wrong.",
        },
        {
          author: adviser,
          statement:
            "As is your prerogative, Sire. We wouldn't want to lose your talent to another tribe.",
        },
      ];
  }
}
