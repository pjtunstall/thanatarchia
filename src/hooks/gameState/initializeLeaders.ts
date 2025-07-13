import { Faction, CharacterPortrait } from "@/types/GameTypes";

export function initializeLeaders(factions: Faction[]): CharacterPortrait[] {
  return factions.map((faction) => {
    const leader =
      Math.random() < 0.5 ? faction.leader.male : faction.leader.female;
    if (faction.name !== "Romans") {
      const epithet = epithets[Math.floor(Math.random() * epithets.length)];
      leader.name = `${leader.name} the ${epithet}`;
    }

    leader.biography = writeBiography(leader, faction);

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
  "Unpredictable",
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

  const quality = qualities[Math.floor(Math.random() * qualities.length)];

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

  const fullName = leader.name;
  const firstName = fullName.split(" ")[0];

  let famedFor: string;
  if (Math.random() < 0.5) {
    famedFor = `${title} ${firstName} is renowned for ${possessivePronoun} ${quality} and patronage of ${benefactor}.`;
  } else {
    const threat =
      Math.random() < 0.5
        ? `—and YOU if you don't play your cards right.`
        : `—and YOU if you you have a problem with that?`;
    famedFor = `${title} ${firstName} is respected for ${possessivePronoun} persecution of ${victim1}, ${victim2}${threat}`;
  }

  return `${fullName} was unanimously elected ${title} of the ${
    faction.name
  }, by the grace of God, after ${scapegoat} tragically ${action} ${possessivePronoun} ${relative} with a ${adjective} ${weapon}. (Particularly harrowing for young ${firstName}, as ${subjectPronoun.toLowerCase()} was the only witness.) ${famedFor}`;
}

const scapegoats = [
  "unbelievers",
  "witches",
  "enemies of the state",
  "political rivals",
  "a mystery assassin",
];
const actions = [
  "cudgeled",
  "bludgoned",
  "strangled",
  "stabbed",
  "beheaded",
  "crushed",
  "choked",
  "chopped up",
  "cursed",
  "enchanted",
  "ensorceled",
];
const adjectives = ["blunt", "damp", "golden", "rusty", "flaming", "sawn-off"];
const relatives = [
  "father",
  "mother",
  "older sister",
  "older brother",
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
  "thurible",
  "chasubel",
];

const qualities = [
  "frankness",
  "gusto",
  "practical jokes",
  "rough good humor",
  "taste in gold",
];

const benefactors = [
  "barons",
  "dukes and earls",
  "lords and ladies",
  "honest, hard-working noblefolk",
  "major landowners",
  "wealthy backers",
  "heavily-armed supporters",
];
const victims1 = [
  "beekeepers",
  "under fives",
  "plague victims",
  "presumed traitors",
];
const victims2 = [
  "the infirm",
  "the elderly",
  "the poor",
  "the tired",
  "the gullible",
];
