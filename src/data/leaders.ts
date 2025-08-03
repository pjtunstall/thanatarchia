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
  "Stern",
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
  "Proud",
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

const ostroGothicMaleDiminutives = ["Ansila", "Totila", "Merila", "Frithila"];

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
  "Hermane",
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
const visigothFemaleLastElements = ["suintha", "gotho", "berga"];

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
  "the gullible",
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
  "Sindi",
  "Supse",
  "Suarti",
  "Thanca",
  "Theodo",
  "Thrasa",
  "Triva",
  "Triggua",
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
