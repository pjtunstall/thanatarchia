import { Faction, Character, Gender } from "@/types/gameTypes";

export function initializeLeaders(factions: Faction[]): Character[] {
  return factions.map((faction) => {
    const leader =
      Math.random() < 0.5 ? faction.leader.male : faction.leader.female;

    switch (faction.name) {
      case "Ostrogoths":
        leader.name = randomOstrogothName(leader.gender);
        break;
    }

    if (faction.name !== "Romans") {
      const epithet = randomItem(epithets);
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

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function writeBiography(leader: Character, faction: Faction): string {
  let title: string;
  if (faction.type === "imperial") {
    title = leader.gender === "male" ? "Emperor" : "Empress";
  } else {
    title = leader.gender === "male" ? "King" : "Queen";
  }

  const scapegoat = randomItem(scapegoats);
  const action = randomItem(actions);
  const relative = randomItem(relatives);
  const adjective = randomItem(adjectives);
  const weapon = randomItem(weapons);

  const quality = randomItem(qualities);

  const benefactor = randomItem(benefactors);
  const victim1 = randomItem(victims1);
  const victim2 = randomItem(victims2);

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
        : `—and YOU if you have a problem with that?`;
    famedFor = `${title} ${firstName} is widely respected for ${possessivePronoun} persecution of ${victim1}, ${victim2}${threat}`;
  }

  return `${fullName}, by the grace of God, ${title} of the ${
    faction.name
  }, was unanimously elected after ${scapegoat} tragically ${action} ${possessivePronoun} ${relative} with a ${adjective} ${weapon}. (Particularly harrowing for young ${firstName}, as ${subjectPronoun.toLowerCase()} was the only witness.) ${famedFor}`;
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
  "tapestry",
  "candlestick",
  "spatha",
  "Septuagint",
  "hauberk",
  "trenchard",
  "palfrey",
  "thurible",
  "crozier",
  "scepter",
  "orb",
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

function randomOstrogothName(gender: Gender): string {
  if (gender === "male") {
    const firstElement = randomItem(ostrogothMaleFirstElements);
    const lastElement = randomItem(ostrogothMaleLastElements);
    return `${firstElement}${lastElement}`;
  } else {
    const firstElement = randomItem(ostrogothFemaleFirstElements);
    const lastElement = randomItem(ostrogothFemaleLastElements);
    return `${firstElement}${lastElement}`;
  }
}

const ostrogothMaleFirstElements = [
  "Amala",
  "Eutha",
  "Theoder",
  "Thiudi",
  "Ermana",
  "Vala",
  "Vulthu",
  "Athala",
  "Sige",
  "Odo",
  "Vithi",
];
const ostrogothFemaleFirstElements = ["Amala", "Mata", "Ostro", "Odo", "Vada"];

const ostrogothMaleLastElements = [
  "ric",
  "suinth",
  "mir",
  "mer",
  "theus",
  "had",
  "gisel",
];
const ostrogothFemaleLastElements = [
  "suintha",
  "frida",
  "gotho",
  "fleda",
  "berga",
  "merca",
];
