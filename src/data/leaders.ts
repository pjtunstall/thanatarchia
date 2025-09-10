import { Gender } from "@/types/gameTypes";
import { randomItem } from "@/lib/utils";
import { fromUnixTime } from "date-fns";

export const epithets = [
  "Arrogant",
  "Attrocious",
  "Awful",
  "Avaricious",
  "Beastly",
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
  "Impaler",
  "Implacable",
  "Incorrigible",
  "Inglorious",
  "Interminable",
  "'Just'",
  "Mad",
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

const hunMaleNames = [
  "Attila",
  "Bleda",
  "Dengizich",
  "Edica",
  "Ellac",
  "Ernak",
  "Mundzuk",
  "Octar",
  "Ruga",
  "Tuldila",
  "Uldin",
];

const hunFemaleNames = ["Kreka"];

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

export function randomHunName(gender: Gender): string {
  if (gender === "male") {
    return randomItem(hunMaleNames);
  } else {
    return randomItem(hunFemaleNames);
  }
}

export function randomRomanName(gender: Gender): string {
  if (gender === "male") {
    return randomItem(romanMaleNames) + " Agustus";
  } else {
    return randomItem(romanFemaleNames) + " Augusta";
  }
}

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
  "Guili",
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
  "Triggua",
  "Triuua",
  "Unthanc",
  "Uada",
  "Uala",
  "Uili",
  "Uilia",
];

const vandalMaleLastElements = [
  "but",
  "geis",
  "gisel",
  "hari",
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
  "Flaccitheu",
  "Cunimund",
  "Thrafstila",
  "Thrasaric",
  "Thurisind",
  "Thurismod",
  "Elemund",
];

const gepidFemaleNames = ["Rosamunda"];

const gothFirstElements = [
  "Agi",
  "Agis",
  "Ala",
  "Alba",
  "Alia",
  "Ana",
  "Anda",
  "Anse",
  "Ara",
  "Amala",
  "Angel",
  "Atha",
  "Athala",
  "Athana",
  "Badua",
  "Balda",
  "Baltha",
  "Bere",
  "Berga",
  "Bert",
  "Bloma",
  "Bluma",
  "Brandi",
  "Bota",
  "Bruni",
  "Cuni",
  "Cunie",
  "Chinda",
  "Daga",
  "Dani",
  "Doma",
  "Drocti",
  "Duma",
  "Drocti",
  "Ele",
  "Era",
  "Ermen",
  "Eu",
  "Eua",
  "Eutha",
  "Fandi",
  "Fara",
  "Fasta",
  "Feua",
  "Fili",
  "Flacci",
  "Frada",
  "Fraui",
  "Frida",
  "Fridi",
  "Froia",
  "Fruma",
  "Fulca",
  "Fulde",
  "Gala",
  "Ganda",
  "Gaui",
  "Gele",
  "Gesa",
  "Giba",
  "Gildi",
  "Gisla",
  "Goda",
  "Goia",
  "Gudi",
  "Goia",
  "Gunde",
  "Gunthi",
  "Haria",
  "Hoha",
  "Hildi",
  "Harda",
  "Ibra",
  "Iuba",
  "Landa",
  "Leude",
  "Liubi",
  "Mala",
  "Mara",
  "Matha",
  "Mera",
  "Moda",
  "Munde",
  "Mura",
  "Nanda",
  "Nida",
  "Odo",
  "Ostro",
  "Panta",
  "Rada",
  "Ragna",
  "Randa",
  "Rani",
  "Recce",
  "Rimis",
  "Rode",
  "Rome",
  "Rothe",
  "Rude",
  "Rume",
  "Rosa",
  "Saba",
  "Sala",
  "Sanda",
  "Sibia",
  "Sifia",
  "Sige",
  "Sigis",
  "Sila",
  "Sinde",
  "Sise",
  "Sunia",
  "Sunna",
  "Theode",
  "Thrasa",
  "Thrafsta",
  "Thruda",
  "Thunda",
  "Thulda",
  "Tila",
  "Triggua",
  "Triua",
  "Thuris",
  "Ufta",
  "Usda",
  "Uaci",
  "Uada",
  "Uala",
  "Uinith",
  "Uidar",
  "Uidi",
  "Uildi",
  "Uilia",
  "Uini",
  "Uisi",
  "Uistri",
  "Uiti",
  "Uulthu",
];

const gothBiSyllabicRoots = [
  "Agis",
  "Angel",
  "Athala",
  "Athana",
  "Rimis",
  "Sigis",
  "Thuris",
  "Uinith",
];

const gothRootsEndingInVowel = ["Eu"];

const gothMaleLastElements = [
  "ari",
  "bad",
  "bald",
  "bert",
  "but",
  "fara",
  "frid",
  "funs",
  "gern",
  "ges",
  "gild",
  "gisel",
  "had",
  "hari",
  "lec",
  "lub",
  "mer",
  "mir",
  "mod",
  "muth",
  "mund",
  "nand",
  "oacer",
  "oald",
  "uin",
  "raban",
  "red",
  "ric",
  "rid",
  "rith",
  "suinth",
  "thanc",
  "theu",
  "uald",
  "ulf",
];

const gothFemaleLastElements = [
  "berga",
  "berta",
  "fleda",
  "frida",
  "funsa",
  "giba",
  "gilda",
  "gotho",
  "guto",
  "gundi",
  "hildi",
  "liuba",
  "marca",
  "mera",
  "mira",
  "moda",
  "muda",
  "nanda",
  "runa",
  "suintha",
  "thruda",
];

function isVowel(c): boolean {
  const vowels = "AEIOUaeiou";
  return vowels.includes(c);
}

function getFinalLetter(s: string): string {
  return s[s.length - 1];
}

function trimFinalVowel(first: string, last: string) {
  if (!isVowel(last[0])) {
    return first;
  }
  let finalLetter = getFinalLetter(first);
  first = isVowel(finalLetter) ? first.slice(0, first.length - 1) : first;
  return first;
}

// Assumes s.length > 1.
function firstConsonantAfterVowelAndItsIndex(s: string): [string, number] {
  for (let i = 0; i < s.length - 2; i++) {
    if (isVowel(s[i]) && !isVowel(s[i + 1])) {
      return [s[i + 1], i + 1];
    }
  }
  return ["", -1];
}

export function randomGothicName(gender): string {
  let first = randomItem(gothFirstElements);
  const r = Math.random();

  if (r < 0.3 && !gothBiSyllabicRoots.includes(first)) {
    let diminutive: string;
    if (r < 0.02) {
      diminutive = "itt";
    } else if (r < 0.1) {
      diminutive = "ic";
    } else {
      const stops = ["b", "d", "g", "c", "p", "t"];
      const [c, i] = firstConsonantAfterVowelAndItsIndex(first);
      if (
        first !== "Triggua" &&
        c &&
        r < 0.2 &&
        stops.includes(c) &&
        i + 1 < first.length &&
        first[i + 1] !== "h"
      ) {
        first = first.slice(0, i + 1) + c;
        if (gender === "male") {
          return first + "a";
        } else return first + "o";
      }
      diminutive = "il";
    }

    const suffix = gender === "male" ? "a" : "o";

    if (!gothRootsEndingInVowel.includes(first)) {
      first = trimFinalVowel(first, suffix);

      // Remove a final "i", e.g. "Uilia" -> "Uili" -> "Uil".
      const finalLetter = getFinalLetter(first);
      first = finalLetter === "i" ? first.slice(0, first.length - 1) : first;
    }

    return first + diminutive + suffix;
  }

  const last =
    gender === "male"
      ? randomItem(gothMaleLastElements)
      : randomItem(gothFemaleLastElements);

  const combine = (first, last) => {
    first = trimFinalVowel(first, last);
    if (
      (last[0] === "u" || last[0] === "o") &&
      (first[first.length - 1] === "u" || first[first.length - 1] === "o")
    ) {
      first = first.slice(0, -1); // Avoid collisions between high back vowels, e.g. "Badua" + "oacer" -> "Badoacer".
    }
    return `${first}${last}`;
  };
  return combine(first, last);
}
