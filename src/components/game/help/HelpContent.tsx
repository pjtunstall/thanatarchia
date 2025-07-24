import { Character } from "@/types/gameTypes";
import { Thanatarchia } from "@/components/game/help/Thanatarchia";

type HelpContentProps = {
  topic: string;
  player: Character;
  adviser: Character;
};

export function HelpContent({ topic, player, adviser }: HelpContentProps) {
  switch (topic) {
    default:
      return <Thanatarchia player={player} adviser={adviser} />;
  }
}
