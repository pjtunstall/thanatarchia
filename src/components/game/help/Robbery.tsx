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
      ];
    case "Eudaemonia of Rheims":
      return [
        {
          author: adviser,
          statement: `Do you think I get more than I deserve, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: `I should jolly well hope you get exactly what you deserve, my ${lordOrLady}.`,
        },
        {
          author: player,
          statement: `Haha, good one, ${adviserName}. But I've been 30 winters in this world as yet. I've seen more of it than most. We come in screaming. We go out screaming. And as far as I've seen, each of us deserves exactly what they CAN and WILL take.`,
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
            "It might surprise you, your Majesty, but I don't care much for this notion of deserving either. I've poured my joys and sorrows into my own art for, oh, a little longer than you have practiced yours. I never considered what it would earn me. Well, that is not quite true. But I do not believe there is any earning or deserving in this world. We give what we have. We receive what we may. The rest is just our pride.",
        },
      ];
    case "Athaloc of Smyrna":
      return [
        {
          author: player,
          statement: `Would you describe me as a robber, ${adviserName}?`,
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
          statement: "Truth to tell, Atheloc, I keep most of them for myself.",
        },
        {
          author: adviser,
          statement:
            "As is your prerogative, Sire. Besides, we wouldn't want to lose your talent to another tribe.",
        },
      ];
  }
}
