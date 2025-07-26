import { Faction } from "@/types/gameTypes";
import { Character } from "@/types/gameTypes";
import { Thanatarchia } from "@/components/game/help/Thanatarchia";
import { Loyalty } from "@/components/game/help/Loyalty";
import { Advice } from "@/components/game/help/Advice";

type HelpContentProps = {
  topic: string;
  player: Character;
  adviser: Character;
  playerFaction: Faction;
};

export function HelpContent({
  topic,
  player,
  adviser,
  playerFaction,
}: HelpContentProps) {
  switch (topic) {
    case "Strategy":
      return (
        <Advice
          player={player}
          adviser={adviser}
          playerFaction={playerFaction}
        />
      );
    case "Loyalty":
      return <Loyalty player={player} adviser={adviser} />;
    default:
      return <Thanatarchia player={player} adviser={adviser} />;
  }
}
