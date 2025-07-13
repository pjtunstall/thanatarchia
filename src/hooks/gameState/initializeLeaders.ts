import { Faction, CharacterPortrait } from "@/types/GameTypes";

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
  "Sly",
  "Terrible",
  "Tyrant",
  "Unkind",
  "Unready",
  "Unsteady",
  "Vicious",
  "Vile",
];

function writeBiography(leader: CharacterPortrait, faction: Faction): string {
  let title;
  if (faction.type === "imperial") {
    title = leader.gender === "male" ? "Emperor" : "Empress";
  } else {
    title = leader.gender === "male" ? "King" : "Queen";
  }

  const action = actions[Math.floor(Math.random() * actions.length)];
  const relative = relatives[Math.floor(Math.random() * relatives.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const weapon = weapons[Math.floor(Math.random() * weapons.length)];
  const place = places[Math.floor(Math.random() * places.length)];

  const possessive = leader.gender === "male" ? "his" : "her";

  return `${leader.name}, was unanimously elected ${title}, of the ${faction.name}, by the grace of God, after ${action} ${possessive} ${relative} with a ${adjective} ${weapon} in ${place}.`;
}

const actions = ["bludgeoning", "strangling", "stabbing", "garrotting"];
const adjectives = ["blunt", "damp", "golden"];
const relatives = [
  "father",
  "mother",
  "sister",
  "brother",
  "cousin",
  "twin neices",
  "twin nephews",
];
const weapons = ["table cloth", "candlestick", "Septuagint"];
const places = [
  "the bath",
  "the royal bedchamber",
  "the Basilica of Saint Jerome",
];
