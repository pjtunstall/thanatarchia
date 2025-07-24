import { Badge } from "@/components/ui/badge";
import { Faction, Character } from "@/types/gameTypes";
import { chroniclers, initialAdvice } from "@/data/gameData";
import { CharacterDialog } from "@/components/game/CharacterProfile";

type AdviceProps = {
  playerCharacter: Character;
  playerFaction: Faction;
  adviserIndex: number;
};

export function Advice({
  playerCharacter,
  adviserIndex,
  playerFaction,
}: AdviceProps) {
  const adviser = chroniclers[adviserIndex];

  const messages = [
    {
      character: playerCharacter,
      text: `"What do you counsel, ${adviser.name}?"`,
    },
    {
      character: adviser,
      text: initialAdvice(adviser.name),
    },
    {
      character: playerCharacter,
      text: randomRejoinder(adviser.name, playerFaction),
    },
  ];

  return (
    <div className="space-y-5">
      {messages.map(({ character, text }, i) => (
        <div key={i} className="relative pl-6">
          <div className="flex items-center gap-3 mb-2">
            <CharacterDialog character={character} />
            <Badge>{character.name}</Badge>
          </div>
          <p className="text-sm italic font-serif leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  );
}

function randomRejoinder(adviserName: string, playerFaction: Faction): string {
  const r = Math.random();
  if (r < 0.1)
    return `"Thanks for that, ${adviserName}. I'll bear it in mind."`;
  if (r < 0.2) return '"I see."';
  if (r < 0.3) return '"Wise..."';
  if (r < 0.4) return `"Interesting take, ${adviserName}."`;
  if (r < 0.5)
    return `"Sometimes, ${adviserName}, I wonder whose side you're really on."`;
  if (r < 0.6)
    return `"Be that as it may, ${adviserName}, we ${playerFaction.name} will prevail."`;
  if (r < 0.7) return `"Come on, ${adviserName}, you can do better than that."`;
  if (r < 0.8) return `"What would I do without you, ${adviserName}?"`;
  if (r < 0.9) return '"What will be, will be."';
  return `"Is that so, ${adviserName}?"`;
}
