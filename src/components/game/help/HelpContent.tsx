import { Faction } from "@/types/gameTypes";
import { Character } from "@/types/gameTypes";
import { Thanatarchia } from "@/components/game/help/Thanatarchia";
import { Loyalty } from "@/components/game/help/Loyalty";
import { Strategy } from "@/components/game/help/Strategy";
import { War } from "@/components/game/help/War";
import { Choice } from "@/components/game/help/Choice";

type HelpContentProps = {
  topic: string;
  player: Character;
  adviser: Character;
  playerFaction: Faction;
  setAdviserIndex: React.Dispatch<React.SetStateAction<number>>;
  setHasChangedFromEudaemonia: React.Dispatch<React.SetStateAction<boolean>>;
};

export function HelpContent({
  topic,
  player,
  adviser,
  playerFaction,
  setAdviserIndex,
  setHasChangedFromEudaemonia,
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
        <War
          player={player}
          adviser={adviser}
          playerFaction={playerFaction}
          setAdviserIndex={setAdviserIndex}
          setHasChangedFromEudaemonia={setHasChangedFromEudaemonia}
        />
      );
    case "Loyalty":
      return <Loyalty player={player} adviser={adviser} />;
    case "Choice":
      return <Choice player={player} adviser={adviser} />;
    case "Thanatarchia":
      return <Thanatarchia player={player} adviser={adviser} />;
  }
}
