import { Faction, CharacterPortrait } from "@/types/GameTypes";

export const initializeLeaders = (factions: Faction[]): CharacterPortrait[] => {
  return factions.map((faction) => {
    const leaderTemplate =
      Math.random() < 0.5 ? faction.leader.male : faction.leader.female;
    const epithet = epithets[Math.floor(Math.random() * epithets.length)];
    const fullName = `${leaderTemplate.name} the ${epithet}`;
    return { ...leaderTemplate, name: fullName };
  });
};

const epithets = [
  "Angry",
  "Apostate",
  "Arrogant",
  "Avaricious",
  "Calm",
  "Cruel",
  "Dire",
  "Embezzler",
  "Fierce",
  "'Good'",
  "'Great'",
  "Grim",
  "Happy",
  "Harsh",
  "Implacable",
  "Mad",
  "Nasty",
  "Notorious",
  "Oath-Breaker",
  "Petulant",
  "Pious",
  "Proud",
  "Sly",
  "Terrible",
  "Tyrant",
  "Unkind",
  "Unready",
  "Vicious",
  "Vile",
  "Wry",
];
