import { Faction, CharacterPortrait } from "@/types/GameTypes";

export const initializeLeaders = (factions: Faction[]): CharacterPortrait[] => {
  return factions.map((faction) => {
    const leader =
      Math.random() < 0.5 ? faction.leader.male : faction.leader.female;
    if (faction.name !== "Romans") {
      const epithet = epithets[Math.floor(Math.random() * epithets.length)];
      leader.name = `${leader.name} the ${epithet}`;
    }
    return leader;
  });
};

const epithets = [
  "Apostate",
  "Arrogant",
  "Avaricious",
  "Bigot",
  "Calm",
  "Cruel",
  "Dire",
  "Embezzler",
  "Faithless",
  "False",
  "Fierce",
  "Glutton",
  "'Good'",
  "'Great'",
  "Grim",
  "Happy",
  "Harsh",
  "Implacable",
  "Mad",
  "Nepotist",
  "Notorious",
  "Oath-Breaker",
  "Petulant",
  "Pious",
  "Proud",
  "Quirky",
  "Rascal",
  "Rude",
  "Sly",
  "Terrible",
  "Tyrant",
  "Unkind",
  "Unready",
  "Unsteady",
  "Vicious",
  "Vile",
  "Wry",
];
