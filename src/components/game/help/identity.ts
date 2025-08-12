import { Character, ChatEntry } from "@/types/gameTypes";

export function identityChat(
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
          statement: `Hey, ${adviserName}, do you ever feel like you're not really who people think you are?`,
        },
        {
          author: adviser,
          statement:
            "[Sigh.] Oh, constantly, Sire. Everyone sees me as this holy man, but, on the inside, my thoughts fly in so many directions. Who am I to think I could be as self-effacing as the Desert Fathers or as brave as Saint Agatha? I have such doubts, such fears, such tenderness... But none of this comes out. I try to speak, and I sound like a caricature, like a clown, as if the Author just had other plans. I suppose it's the human condition.",
        },
      ];
    case "Priscilla of Byzantium":
      return [
        {
          author: player,
          statement: `Do you ever feel like a fake, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: "How can I be fake, Sire? I'm Byzantine.",
        },
      ];
    case "Eudaemonia of Rheims":
      return [
        {
          author: player,
          statement: `There are times, ${adviserName}, when everything feels strange to me. I feel like I've blundered into someone else's life. They call me ${player.name}, so I act like ${player.name}. But it's all so absurd.`,
        },
        {
          author: adviser,
          statement: `To believe one plays a character is to believe there is a player, some hills beyond the mist. But I see only mist and mist.`,
        },
      ];
    case "Athaloc of Smyrna":
      return [
        {
          author: adviser,
          statement: `Imposter syndrome, my ${lordOrLady}? I am Athaloc of Smyrna. I am dynamic and proactive. I've implemented all manner of strategies to optimize my performance. I can tell you the percentage if you like? I am a leader, a visionary, a force of nature. I am the very embodiment of success. I am not an imposter; I am the real deal.`,
        },
        {
          author: player,
          statement: `And you came up with this answer yourself?`,
        },
      ];
  }
}
