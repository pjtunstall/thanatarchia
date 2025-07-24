import { Chat } from "@/components/game/Chat";
import { Character, Faction, ChatEntry } from "@/types/gameTypes";

type AdviceProps = {
  player: Character;
  playerFaction: Faction;
  adviser: Character;
};

export function Advice({ player, playerFaction, adviser }: AdviceProps) {
  const adviceEntries: ChatEntry[] = [
    {
      author: player,
      statement: `What do you counsel, ${adviser.name}?`,
    },
    {
      author: adviser,
      statement: initialAdvice(adviser),
    },
    {
      author: player,
      statement: randomRejoinder(adviser.name, playerFaction),
    },
  ];

  return <Chat items={adviceEntries} />;
}

const initialAdvice = (adviser: Character): string => {
  switch (adviser.name) {
    case "John of Colchis":
      return "Our foes outnumber us, my Liege. Let us die now opposing them and gain the martyr's reward!";
    case "Priscilla of Byzantium":
      return "Sire, we must be Byzantine in cunning. Strategy is the way to victory.";
    case "Eudaemonia of Rheims":
      return "No virtue is so great that it can endure danger, unless it is also joined by great prudence.";
    case "Athaloc of Smyrna":
      return "One cannot put it better than Vegetius, Sire: All that is advantageous to the enemy is disadvantageous to you, and all that is useful to you, damages the enemy.";
    default:
      return "Our forces are weak, my Liege. I advise patience.";
  }
};

function randomRejoinder(adviserName: string, playerFaction: Faction): string {
  const r = Math.random();
  if (r < 0.1) return `Thanks for that, ${adviserName}. I'll bear it in mind.`;
  if (r < 0.2) return "I see.";
  if (r < 0.3) return "Wise...";
  if (r < 0.4) return `Interesting take, ${adviserName}.`;
  if (r < 0.5)
    return `Sometimes, ${adviserName}, I wonder whose side you're really on.`;
  if (r < 0.6)
    return `Be that as it may, ${adviserName}, we ${playerFaction.name} will prevail.`;
  if (r < 0.7) return `Come on, ${adviserName}, you can do better than that.`;
  if (r < 0.8) return `What would I do without you, ${adviserName}?`;
  if (r < 0.9) return "What will be, will be.";
  return `Is that a fact, ${adviserName}?`;
}
