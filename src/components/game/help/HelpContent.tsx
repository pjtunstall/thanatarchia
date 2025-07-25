import { Faction } from "@/types/gameTypes";
import { Character } from "@/types/gameTypes";
import { Thanatarchia } from "@/components/game/help/Thanatarchia";
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
    case "Advice":
      return (
        <Advice
          player={player}
          adviser={adviser}
          playerFaction={playerFaction}
        />
      );
    default:
      return <Thanatarchia player={player} adviser={adviser} />;
  }
}
