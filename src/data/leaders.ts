import { Gender } from "@/types/gameTypes";
import { randomItem } from "@/lib/utils";

export const epithets = [
  "Arrogant",
  "Attrocious",
  "Awful",
  "Avaricious",
  "Bigot",
  "Brusque",
  "Calm",
  "Cruel",
  "Depraved",
  "Dire",
  "Dreadful",
  "Embezzler",
  "Entitled",
  "Faithless",
  "False",
  "Fierce",
  "Frightful",
  "Glutton",
  "'Good'",
  "'Great'",
  "Grim",
  "Happy",
  "Harsh",
  "'Honest'",
  "Implacable",
  "Inglorious",
  "Interminable",
  "'Just'",
  "Mad",
  "Nepotist",
  "Notorious",
  "Tactical Oath-Breaker",
  "Petulant",
  "'Pious'",
  "Rascal",
  "Rude",
  "Terrible",
  "Awful",
  "Tyrant",
  "Unkind",
  "Unpredictable",
  "Vicious",
  "Vile",
];

export function randomRomanName(gender: Gender): string {
  if (gender === "male") {
    return randomItem(romanMaleNames) + " Agustus";
  } else {
    return randomItem(romanFemaleNames) + " Augusta";
  }
}

const romanMaleNames = [
  "Aelius",
  "Anastasius",
  "Arcadius",
  "Basilius",
  "Constantinus",
  "Constantius",
  "Flavius",
  "Hypatius",
  "Leo",
  "Tiberius",
  "Theodosius",
  "Zeno",
];

const romanFemaleNames = [
  "Aelia",
  "Anastasia",
  "Antonina",
  "Arcadia",
  "Ariadne",
  "Euphemia",
  "Flavia",
  "Helena",
  "Justina",
  "Pulcheria",
  "Sophia",
  "Theorora",
  "Valeriana",
  "Vigilantia",
];

export function randomOstrogothName(gender: Gender): string {
  if (gender === "male") {
    if (Math.random() < 0.5) {
      const firstElement = randomItem(ostrogothMaleFirstElements);
      const lastElement = randomItem(ostrogothMaleLastElements);
      return `${firstElement}${lastElement}`;
    } else {
      return randomItem(ostroGothicMaleDiminutives);
    }
  } else {
    const firstElement = randomItem(ostrogothFemaleFirstElements);
    const lastElement = randomItem(ostrogothFemaleLastElements);
    return `${firstElement}${lastElement}`;
  }
}

const ostrogothMaleFirstElements = [
  "Ala",
  "Ali",
  "Amala",
  "Eutha",
  "Theode",
  "Ermana",
  "Vala",
  "Vulthu",
  "Athala",
  "Sige",
  "Odo",
  "Vithi",
  "Agi",
  "Vilia",
  "Sunia",
  "Witi",
  "Era",
  "Hildi",
  "Sunia",
  "Ufta",
  "Usda",
];
const ostrogothFemaleFirstElements = [
  "Amala",
  "Matha",
  "Ostro",
  "Odo",
  "Vada",
  "Theode",
];

const ostrogothMaleLastElements = [
  "bad",
  "ric",
  "suinth",
  "mir",
  "mer",
  "theus",
  "had",
  "gern",
  "ges",
  "gisel",
  "nand",
  "rith",
  "mod",
  "frithus",
];
const ostrogothFemaleLastElements = [
  "suintha",
  "frida",
  "gotho",
  "fleda",
  "berga",
  "marca",
  "nanda",
];

const ostroGothicMaleDiminutives = [
  "Ansila",
  "Baduila",
  "Merila",
  "Frithila",
  "Usdila",
];

export function randomVisigothName(gender: Gender): string {
  if (gender === "male") {
    if (Math.random() < 0.5) {
      const firstElement = randomItem(visigothMaleFirstElements);
      const lastElement = randomItem(visigothMaleLastElements);
      return `${firstElement}${lastElement}`;
    } else {
      return randomItem(visiGothicMaleDiminutives);
    }
  } else {
    if (Math.random() < 0.5) {
      const firstElement = randomItem(visigothFemaleFirstElements);
      const lastElement = randomItem(visigothFemaleLastElements);
      return `${firstElement}${lastElement}`;
    } else {
      return randomItem(visiGothicFemaleDiminutives);
    }
  }
}

const visigothMaleFirstElements = [
  "Ala",
  "Liuvi",
  "Recce",
  "Sise",
  "Eu",
  "Theode",
  "Athana",
  "Rode",
  "Chinda",
  "Ermane",
  "Wildi",
  "Gunde",
  "Sinde",
  "Ragna",
  "Rimis",
  "Gesa",
];
const visigothFemaleFirstElements = [
  "Goi",
  "Gaile",
  "Ragna",
  "Theode",
  "Hilde",
  "Recci",
  "Agi",
  "Liuvi",
  "Ara",
  "Ermen",
];

const visigothMaleLastElements = [
  "ric",
  "suinth",
  "nand",
  "but",
  "gild",
  "red",
  "gern",
  "mund",
  "mir",
  "thanc",
  "lec",
  "funs",
];
const visigothFemaleLastElements = [
  "suintha",
  "thruda",
  "gotho",
  "gundi",
  "hildi",
  "berga",
];

const visiGothicMaleDiminutives = [
  "Suinthila",
  "Chindila",
  "Wamba",
  "Wallia",
  "Liuvila",
  "Sunna",
  "Sigila",
  "Freula",
  "Witta",
  "Agila",
];
const visiGothicFemaleDiminutives = ["Cixilo", "Baddo"];

export const scapegoats = [
  "unbelievers",
  "witches etc.",
  "enemies of the state",
  "political rivals",
  "a mystery assassin",
];

export const actions = [
  "cudgeled",
  "bludgoned",
  "strangled",
  "stabbed",
  "beheaded",
  "crushed",
  "choked",
  "chopped up",
  "defenestrated",
  "disemboweled",
  "impaled",
  "smothered",
];

export const adjectives = [
  "blunt",
  "damp",
  "golden",
  "exquisite bronze",
  "rusty",
  "flaming",
  "sawn-off",
  "bejeweled",
  "ornamental",
  "fermented",
];
export const relatives = [
  "father",
  "mother",
  "older sister",
  "older brother",
  "cousin",
  "twin neices",
  "twin nephews",
];

export const weapons = [
  "table cloth",
  "tapestry",
  "candlestick",
  "spatha",
  "New Testament and Psalms",
  "hauberk",
  "diadem",
  "scepter",
  "orb",
  "pillow",
];

export const qualities = [
  "frankness",
  "gusto",
  "practical jokes",
  "rough good humor",
  "taste in gold",
];

export const benefactors = [
  "barons",
  "dukes and earls",
  "lords and ladies",
  "honest, hard-working noblefolk",
  "major landowners",
  "wealthy backers",
  "heavily-armed supporters",
];

export const victims1 = [
  "beekeepers",
  "musicians",
  "under fives",
  "lepers",
  "presumed traitors",
];

export const victims2 = [
  "the infirm",
  "the elderly",
  "the poor",
  "the tired",
  "the arts",
];

const vandalFirstElements = [
  "Ari",
  "Bere",
  "Bluma",
  "Daga",
  "Duma",
  "Eua",
  "Fridu",
  "Geila",
  "Geisa",
  "Giba",
  "Guada",
  "Guala",
  "Guda",
  "Giba",
  "Giuli",
  "Guilia",
  "Guiti",
  "Gunda",
  "Gunthi",
  "Hildi",
  "Huni",
  "Iulia",
  "Mura",
  "Oa",
  "Ragina",
  "Sifia",
  "Sigis",
  "Sili",
  "Sindi",
  "Supse",
  "Suarti",
  "Thanca",
  "Theodo",
  "Thrasa",
  "Triva",
  "Triggua",
  "Triuua",
  "Unthanc",
  "Vada",
  "Vala",
  "Vili",
  "Vilia",
];
const vandalMaleLastElements = [
  "but",
  "geis",
  "gisel",
  "hari",
  "mir",
  "mir",
  "mund",
  "mut",
  "muth",
  "ric",
  "thanc",
  "vult",
];
const vandalFemaleLastElements = ["frida", "hild", "runa"];

export function randomVandalName(gender: Gender): string {
  let firstElement = randomItem(vandalFirstElements);
  if (firstElement === "Unthanc") {
    return gender === "male" ? firstElement : "Unthanca";
  }

  if (Math.random() < 0.3) {
    // Return a diminutive.
    firstElement = deleteStemVowels(firstElement);
    if (gender === "male") return firstElement + "ila";
    return firstElement + "ilu";
  }

  // Otherwise add a last element,
  let lastElement;

  if (gender === "male") {
    lastElement = randomItem(vandalMaleLastElements);
  } else {
    lastElement = randomItem(vandalFemaleLastElements);
  }

  // eliding vowels before an underlying 'h',
  if (lastElement[0] === "h") {
    firstElement = deleteStemVowels(firstElement);
    return firstElement + lastElement.slice(1); // and dropping the 'h'.
  } else {
    return firstElement + lastElement;
  }
}

function deleteStemVowels(firstElement: string): string {
  if (firstElement !== "Sigis") {
    firstElement = firstElement.slice(0, -1);
  }
  if (firstElement[firstElement.length - 1] === "i") {
    firstElement = firstElement.slice(0, -1);
  }
  return firstElement;
}

const lombardFirsElements = [
  "Adal",
  "Agil",
  "Aist",
  "Alb",
  "Aldi",
  "Ans",
  "Ard",
  "Ari",
  "Aten",
  "Aud",
  "Austri",
  "Chloth",
  "Cuni",
  "Cuninc",
  "Gaitel",
  "Gari",
  "Gis",
  "Gode",
  "Gras",
  "Grim",
  "Gunde",
  "Helmi",
  "Hilde",
  "Land",
  "Liut",
  "Ort",
  "Pand",
  "Ragin",
  "Rat",
  "Rode",
  "Rome",
  "Sichel",
  "Oald",
  "Oisi",
];
const lombardMaleLastElements = [
  "ari",
  "chis",
  "mar",
  "mund",
  "nit",
  "oald",
  "oin",
  "pald",
  "pert",
  "prand",
  "ulf",
];
const lombardMaleFullNames = [
  "Claffo",
  "Cleph",
  "Guaimar",
  "Tasso",
  "Wacho",
  "Zaban",
  "Zotto",
];
const lombardFemaleLastElements = [
  "gaita",
  "garda",
  "grima",
  "gunda",
  "gusa",
  "hild",
  "linda",
  "munda",
  "rada",
  "runa",
  "sind",
  "suinda",
  "trud",
];
const lombardFemaleFullNames = ["Austrigusa", "Gella", "Gambara"];

export function randomLombardName(gender: Gender): string {
  const r = Math.random();

  if (r < 0.1) {
    return gender === "male"
      ? randomItem(lombardMaleFullNames)
      : randomItem(lombardFemaleFullNames);
  } else {
    let first = randomItem(lombardFirsElements);
    let last: string;
    if (gender === "male") {
      last = randomItem(lombardMaleLastElements);
    } else {
      last = randomItem(lombardFemaleLastElements);
    }

    const vowels = ["aeiou"];
    if (vowels.includes(first[first.length - 1]) && vowels.includes(last[0])) {
      first = first.slice(0, -1);
    }

    return first + last;
  }
}

export function randomGepidName(gender: Gender): string {
  if (gender === "male") {
    return randomItem(gepidMaleNames);
  } else {
    return randomItem(gepidFemaleNames);
  }
}

const gepidMaleNames = [
  "Ardaric",
  "Fastida",
  "Flaccitheus",
  "Mundus",
  "Thraustila",
  "Thurisind",
  "Thurismod",
];

const gepidFemaleNames = ["Rosamunda"];
