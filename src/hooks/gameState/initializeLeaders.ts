import { Faction, CharacterPortrait } from "@/types/GameTypes";
import { sub } from "date-fns";

export function initializeLeaders(factions: Faction[]): CharacterPortrait[] {
  return factions.map((faction) => {
    const leader =
      Math.random() < 0.5 ? faction.leader.male : faction.leader.female;
    if (faction.name !== "Romans") {
      const prefix =
        Math.random() < 0.1 && faction.faith !== "Pagan" ? "Saint " : "";
      const epithet = epithets[Math.floor(Math.random() * epithets.length)];
      leader.name = `${prefix + leader.name} the ${epithet}`;
    }

    const biography = writeBiography(leader, faction);
    console.log(biography);

    return leader;
  });
}

const epithets = [
  "Apostate",
  "Arrogant",
  "Avaricious",
  "Bigot",
  "Calm",
  "Cruel",
  "Dire",
  "Embezzler",
  "Entitled",
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
  "'Pious'",
  "Proud",
  "Quirky",
  "Rascal",
  "Rude",
  "Terrible",
  "Tyrant",
  "Unkind",
  "Unready",
  "Unsteady",
  "Vicious",
  "Vile",
];

function writeBiography(leader: CharacterPortrait, faction: Faction): string {
  let title: string;
  if (faction.type === "imperial") {
    title = leader.gender === "male" ? "Emperor" : "Empress";
  } else {
    title = leader.gender === "male" ? "King" : "Queen";
  }

  const scapegoat = scapegoats[Math.floor(Math.random() * scapegoats.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const relative = relatives[Math.floor(Math.random() * relatives.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const weapon = weapons[Math.floor(Math.random() * weapons.length)];
  const place = places[Math.floor(Math.random() * places.length)];

  const benefactor =
    benefactors[Math.floor(Math.random() * benefactors.length)];
  const victim1 = victims1[Math.floor(Math.random() * victims1.length)];
  const victim2 = victims2[Math.floor(Math.random() * victims2.length)];

  let subjectPronoun: string;
  let possessivePronoun: string;

  if (leader.gender === "male") {
    subjectPronoun = "He";
    possessivePronoun = "his";
  } else {
    subjectPronoun = "She";
    possessivePronoun = "her";
  }

  return `${leader.name} was unanimously elected ${title} of the ${
    faction.name
  }, by the grace of God, after ${scapegoat} tragically ${action} ${possessivePronoun} ${relative} with a ${adjective} ${weapon} in ${place}. (Particularly harrowing as ${subjectPronoun.toLowerCase()} was the only witness.) ${subjectPronoun} is known for ${possessivePronoun} patronage of ${benefactor}, and ${possessivePronoun} persecution of ${victim1}, ${victim2}--and you if you don't play your cards right.`;
}

const scapegoats = [
  "unbelievers",
  "witches etc.",
  "enemies of the state",
  "political rivals",
  "a mystery assassin",
];
const actions = ["bludgeoned", "strangled", "stabbed", "garrotted"];
const adjectives = ["blunt", "damp", "golden", "rusty"];
const relatives = [
  "father",
  "mother",
  "sister",
  "brother",
  "cousin",
  "twin neices",
  "twin nephews",
];
const weapons = [
  "table cloth",
  "candlestick",
  "Septuagint",
  "hauberk",
  "trenchard",
  "palfrey",
];
const places = [
  "the bath",
  "the royal bedchamber",
  "the Basilica of Saint Jerome",
];

const benefactors = [
  "honest, hard-working noblefolk",
  "major landowners",
  "wealthy supporters",
];
const victims1 = ["beekeepers", "under fives", "plague victims"];
const victims2 = ["the infirm", "the elderly", "the poor"];
