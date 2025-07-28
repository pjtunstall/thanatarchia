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
  "Vainglorious",
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
];
const ostrogothFemaleFirstElements = [
  "Amala",
  "Mata",
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
  "thank",
  "lec",
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
