import { Chat } from "@/components/game/Chat";
import { Character, ChatEntry } from "@/types/gameTypes";

type ThanatarchiaProps = {
  player: Character;
  adviser: Character;
};

export function Thanatarchia({ player, adviser }: ThanatarchiaProps) {
  return <Chat items={chat(adviser, player)} />;
}

function chat(adviser: Character, player: Character): ChatEntry[] {
  const adviserName = adviser.name;

  switch (adviserName) {
    case "John of Colchis":
      return [
        {
          author: player,
          statement: `Excuse me, ${adviserName}, what is Thanatarchia?`,
        },
        {
          author: adviser,
          statement:
            "What a perceptive question, my Liege! Thanatarchia is a game.",
        },
        {
          author: player,
          statement: "Game?",
        },
        {
          author: adviser,
          statement:
            "Astute follow-up, my Liege. But I think you know this. It is the game we are all put on this earth to play.",
        },
      ];
    case "Priscilla of Byzantium":
      return [
        {
          author: adviser,
          statement:
            "Thanatarchia? Why, that is a Greek word, Sire. Ah Greek... The language of Byzantium. A language of so many beautiful words. How curious that I do not recall ever hearing this one before. And yet it has a familiar ring. A memory from childhood? A game, perhaps?",
        },
      ];
    case "Eudaemonia of Rheims":
      return [
        {
          author: adviser,
          statement:
            "Thanatarchia? I suppose it is some sort of a game, your Majesty.",
        },
        {
          author: player,
          statement: `What sort of a game, ${adviserName}?`,
        },
        {
          author: adviser,
          statement:
            "A game such as children play, your Majesty, of a summer's evening, before their mother calls them home to sleep.",
        },
      ];
    case "Athaloc of Smyrna":
      return [
        {
          author: adviser,
          statement:
            "Hum, Thanatarchia. The word is a Greek word, of course, although hardly an import one. It is not attested in scripture nor in the writings of the Church Fathers. Indeed it is not even part of my extensive vocabulary.",
        },
        {
          author: player,
          statement: `Then you do not know what it means, ${adviserName}?`,
        },
        {
          author: adviser,
          statement:
            "Of course I know what it means, your Majesty! It is obviously a composite of two elements. The latter, 'archia', is from ἀρχή, authority. The former, 'thanato-', is from θάνατος, which is... Well. That is to say... It indicates that which, in this case, has authority.",
        },
        {
          author: player,
          statement: `And what would that be, ${adviserName}?`,
        },
        {
          author: adviser,
          statement: "Death, your Majesty.",
        },
      ];
  }
}
