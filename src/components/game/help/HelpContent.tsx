import { Faction } from "@/types/gameTypes";
import { Character } from "@/types/gameTypes";
import { Thanatarchia } from "@/components/game/help/Thanatarchia";
import { Loyalty } from "@/components/game/help/Loyalty";
import { Strategy } from "@/components/game/help/Strategy";
import { War } from "@/components/game/help/War";

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
        <Strategy
          player={player}
          adviser={adviser}
          playerFaction={playerFaction}
        />
      );
    case "War":
      return (
        <War player={player} adviser={adviser} playerFaction={playerFaction} />
      );
    case "Loyalty":
      return <Loyalty player={player} adviser={adviser} />;
    default:
      return <Thanatarchia player={player} adviser={adviser} />;
  }
}
