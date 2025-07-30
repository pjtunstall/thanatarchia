import { Character, ChatEntry } from "@/types/gameTypes";

export function choiceChat(adviser: Character, player: Character): ChatEntry[] {
  const adviserName = adviser.name;

  switch (adviserName) {
    case "John of Colchis":
      return [
        {
          author: player,
          statement: `Sometimes I feel like I have no control over what I do or say. Do you ever feel like that, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: `Oh, all the time, my ${
            player.gender === "male" ? "Lord" : "Lady"
          }. It's normal.`,
        },
        {
          author: player,
          statement:
            "But in a ruler? In one upon whom depend the fates of many?",
        },
        {
          author: adviser,
          statement: "You're exactly right to question that, Sire.",
        },
        {
          author: player,
          statement: "Am I?",
        },
        {
          author: adviser,
          statement:
            "Oh no, Sire. You're quite correct to be momentarily incorrect on that one.",
        },
      ];
    case "Priscilla of Byzantium":
      return [
        {
          author: adviser,
          statement:
            "If you want my opinion, your Majesty, the best answer to most choices is 'no'.",
        },
      ];
    case "Eudaemonia of Rheims":
      return [
        {
          author: player,
          statement: `Do you ever feel like your pen has a mind of its own, ${adviserName}?`,
        },
        {
          author: adviser,
          statement:
            "Oh, that is the best part, Sire, when one is surprised, or even shocked, by one's own pen.",
        },
        {
          author: player,
          statement:
            "Maybe not ideal in someone who writes execution orders, though.",
        },
      ];
    case "Athaloc of Smyrna":
      return [
        {
          author: adviser,
          statement:
            "Choice? A perflexing conundrum indeed. On the one hand, all things are chosen by God. On the other, we must have free will, for God is just, and it would be unjust to send us all to hell if we hadn't freely chosen to sin. Something to ponder as one is boiled alive for all eternity thanks to His infinite mercy, I suppose.",
        },
      ];
  }
}
