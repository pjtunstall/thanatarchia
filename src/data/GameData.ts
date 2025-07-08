import { Faction, Chronicler, Territory } from "@/types/GameTypes";
import byzantineQueen from "@/assets/byzantine-queen-portrait.jpg";
import byzantineChief from "@/assets/byzantine-chief-portrait.jpg";
import romanEmperor from "@/assets/roman-emperor-portrait.jpg";
import barbarianKing from "@/assets/barbarian-king-portrait.jpg";
import barbarianQueen from "@/assets/barbarian-queen.jpg";
import visigothicQueen from "@/assets/visigothic-queen-portrait.jpg";
import vandalChief from "@/assets/vandal-chief-portrait.jpg";
import hunnicWarlord from "@/assets/hunnic-warlord-portrait.jpg";
import frankishKing from "@/assets/frankish-king-portrait.jpg";
import chroniclerMonk from "@/assets/chronicler-monk-male.jpg";
import chroniclerScribe from "@/assets/chronicler-scribe-male.jpg";
import chroniclerMosaic from "@/assets/chronicler-mosaic-female.jpg";
import chroniclerScholar from "@/assets/chronicler-scholar-male.jpg";
import chroniclerNun from "@/assets/chronicler-nun-female.jpg";
import bagaudaeMaleRebel from "@/assets/bagaudae-male-rebel.jpg";
import bagaudaeFemaleRebel from "@/assets/bagaudae-female-rebel.jpg";
import mauriMaleLeader from "@/assets/mauri-male.jpg";
import mauriFemaleLeader from "@/assets/mauri-female.jpg";

export const getDate = (turn: number): string => {
  const year = getYear(turn);
  const season = getSeason(turn);
  return `${season} ${year}`;
};

export const getSeason = (turn: number): Season => {
  return seasons[(turn - 1) % 4];
};
type Season = "autumn" | "winter" | "spring" | "summer";
const seasons: Season[] = ["spring", "summer", "autumn", "winter"];

export const getYear = (turn: number): number => {
  return 476 + Math.floor((turn - 1) / 4);
};

export const getHeresyColor = (heresy: string) => {
  switch (heresy) {
    case "Chalcedonian":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Arian":
      return "bg-red-100 text-red-800 border-red-200";
    case "Miaphysite":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Dyophysite":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Pagan":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Manichean":
      return "bg-green-100 text-green-800 border-green-200";
    case "Pelagian":
      return "bg-pink-100 text-pink-800 border-pink-200";
    case "Nestorian":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const genderVariants = {
  Romans: {
    male: { name: "Romulus Augustulus", image: romanEmperor },
    female: { name: "Augusta Valentina", image: byzantineQueen },
  },
  Britons: {
    male: { name: "Cymbeline the Wise", image: romanEmperor },
    female: { name: "Baddo the Good", image: byzantineQueen },
  },
  Moors: {
    male: { name: "Masuna the Great", image: mauriMaleLeader },
    female: { name: "Kahina the Great", image: mauriFemaleLeader },
  },
  Bagaudae: {
    male: { name: "Tibatto the Rebel", image: bagaudaeMaleRebel },
    female: { name: "Brigit the Bold", image: bagaudaeFemaleRebel },
  },
  Ostrogoths: {
    male: { name: "Theodoric the Great", image: barbarianKing },
    female: { name: "Amalasuintha the Wise", image: visigothicQueen },
  },
  Visigoths: {
    male: { name: "Alaric the Conqueror", image: barbarianKing },
    female: { name: "Brunhild the Implacable", image: visigothicQueen },
  },
  Vandals: {
    male: { name: "Huneric the Cruel", image: vandalChief },
    female: { name: "Eudocia the Sharp", image: visigothicQueen },
  },
  Burgundians: {
    male: { name: "Gundobad the Wise", image: barbarianKing },
    female: { name: "Clotilde the Faithful", image: visigothicQueen },
  },
  Franks: {
    male: { name: "Clovis the Conqueror", image: frankishKing },
    female: { name: "Fredegund the Sly", image: visigothicQueen },
  },
  Gepids: {
    male: { name: "Ardaric the Faithful", image: barbarianKing },
    female: { name: "Rosamunda the Fair", image: visigothicQueen },
  },
  Langobards: {
    male: { name: "Wacho the Ferocious", image: barbarianKing },
    female: { name: "Rodelinda the Ruthless", image: visigothicQueen },
  },
  Saxons: {
    male: { name: "Widukind the Defiant", image: barbarianKing },
    female: { name: "Giesela the Defiant", image: barbarianQueen },
  },
  Suebi: {
    male: { name: "Hermeric the Elder", image: barbarianKing },
    female: { name: "Ingunde the Wise", image: visigothicQueen },
  },
  Alans: {
    male: { name: "Respendial the Horseman", image: byzantineChief },
    female: { name: "Kreka the Swift", image: visigothicQueen },
  },
  Huns: {
    male: { name: "Dengizich the Dire", image: hunnicWarlord },
    female: { name: "Kreka the Terrible", image: visigothicQueen },
  },
};

export const factions: Faction[] = [
  {
    name: "Romans",
    formalName: "Roman Empire",
    type: "imperial",
    color: "hsl(var(--imperial))",
    leader: {
      name: "Romulus Augustulus",
      gender: "male",
      image: romanEmperor,
    },
    heresy: "Chalcedonian",
    relatives: [
      "Son Anastasius",
      "Daughter Eudoxia",
      "Daughter Flavia",
      "Son Zeno",
    ],
    territories: ["Thracia", "Galatia", "Aegyptus", "Syria"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Britons",
    formalName: "Kindom of the Britons",
    type: "imperial",
    color: "hsl(var(--britons))",
    leader: {
      name: "Cymbeline the Wise",
      gender: "male",
      image: bagaudaeMaleRebel,
    },
    heresy: "Pelagian",
    relatives: ["Daughter Imogen", "Son Vortigern", "Son Constantine"],
    territories: ["Britannia"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Moors",
    formalName: "Kingdom of the Moors",
    type: "barbarian",
    color: "hsl(var(--moors))",
    leader: {
      name: "Masuna the Great",
      gender: "male",
      image: mauriMaleLeader,
    },
    heresy: "Pelagian",
    relatives: ["Son Masties", "Son Masgiven", "Cousin Garmul"],
    territories: ["Mauretania"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Bagaudae",
    formalName: "Bagaudae",
    type: "bagaudae",
    color: "hsl(var(--bagaudae))",
    leader: {
      name: "Tibatto the Rebel",
      gender: "male",
      image: bagaudaeMaleRebel,
    },
    heresy: "Manichean",
    relatives: ["Sister Spartaca", "Brother Amandus"],
    territories: ["Armorica"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Ostrogoths",
    formalName: "Kingdom of the Ostrogoths",
    type: "barbarian",
    color: "hsl(var(--ostrogoths))",
    leader: {
      name: "Theodoric the Great",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Daughter Amalasuintha", "Nephew Athalaric", "Nephew Eutharic"],
    territories: ["Italy"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Visigoths",
    formalName: "Kingdom of the Visigoths",
    type: "barbarian",
    color: "hsl(var(--visigoths))",
    leader: {
      name: "Brunhild the Implacable",
      gender: "female",
      image: visigothicQueen,
    },
    heresy: "Arian",
    relatives: ["Son Sigismund", "Daughter Galsuintha", "Cousin Recared"],
    territories: ["Aquitania"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Vandals",
    formalName: "Kingdom of the Vandals",
    type: "barbarian",
    color: "hsl(var(--vandals))",
    leader: {
      name: "Huneric the Cruel",
      gender: "male",
      image: vandalChief,
    },
    heresy: "Arian",
    relatives: ["Daughter Guiliaruna", "Brother Unthank"],
    territories: ["Africa"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Burgundians",
    formalName: "Kingdom of the Burgundians",
    type: "barbarian",
    color: "hsl(var(--burgundians))",
    leader: {
      name: "Gundobad the Wise",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Arian",
    relatives: [
      "Son Gundahar",
      "Son Gunderic",
      "Sun Gundioc",
      "Daughter Chroma",
      "Daughter Clotilde",
    ],
    territories: ["Septimania"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Franks",
    formalName: "Kingdom of the Franks",
    type: "barbarian",
    color: "hsl(var(--franks))",
    leader: {
      name: "Clovis the Conqueror",
      gender: "male",
      image: frankishKing,
    },
    heresy: "Miaphysite",
    relatives: ["Daughter Clotilde", "Daughter Ermengarde", "Son Clothar"],
    territories: ["Gallia"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Saxons",
    formalName: "Saxon Confederation",
    type: "barbarian",
    color: "hsl(var(--saxons))",
    leader: {
      name: "Giesela",
      gender: "female",
      image: barbarianQueen,
    },
    heresy: "Pagan",
    relatives: ["Brother Abbio"],
    territories: ["Germania"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Gepids",
    formalName: "Kingdom of the Gepids",
    type: "barbarian",
    color: "hsl(var(--gepids))",
    leader: {
      name: "Ardaric the Faithful",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Son Gunderit", "Daughter Rosamunda"],
    territories: ["Dacia"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Langobards",
    formalName: "Kingdom of the Langobards",
    type: "barbarian",
    color: "hsl(var(--langobards))",
    leader: {
      name: "Wacho the Ferocious",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Dyophysite",
    relatives: [
      "Son Alboin",
      "Daughter Albsuinda",
      "Son Cleph",
      "Niece Rosamund",
    ],
    territories: ["Pannonia"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Suebians",
    formalName: "Suebian Confederation",
    type: "barbarian",
    color: "hsl(var(--suebians))",
    leader: {
      name: "Hermeric the Elder",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Pagan",
    relatives: ["Son Rechila", "Daughter Ingunde"],
    territories: ["Hispania"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Alans",
    formalName: "Kingdom of the Alans",
    type: "barbarian",
    color: "hsl(var(--alans))",
    leader: {
      name: "Respendial the Horseman",
      gender: "male",
      image: byzantineChief,
    },
    heresy: "Nestorian",
    relatives: ["Son Goar", "Son Addac", "Son Sangiban", "Nephew Safrac"],
    territories: ["Dalmatia"],
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Huns",
    formalName: "Hunnic Horde",
    type: "barbarian",
    color: "hsl(var(--huns))",
    leader: {
      name: "Dengizich the Dire",
      gender: "male",
      image: hunnicWarlord,
    },
    heresy: "Pagan",
    relatives: ["Brother Ernakh", "Sister Kreka", "Nephew Mundo"],
    territories: ["Scythia"],
    troops: 1000,
    treasure: 100,
  },
];

export const chroniclers: Chronicler[] = [
  {
    name: "John of Colchis",
    bias: "friendly",
    style: "credulous",
    gender: "male",
    image: chroniclerScribe,
    biography:
      "A devout ascetic, who seeks martyrdom at every opportunity, John has escaped death on multiple occasions only through the timely intervention of his disciples. He takes the Bible literally, but considers life largely allegorical. When not too delirious from fasting, John's hobbies are exegesis and speaking in voices. (He does a good Attila.) Rumor has it that he once accidentally excommunicated himself in an 'excess of piety' and was only brought back into the fold by special decree of the Pope.",
  },
  {
    name: "Eudaemonia of Rheims",
    bias: "hostile",
    style: "disdainful",
    gender: "female",
    image: chroniclerMosaic,
    biography:
      "World-weary poet, Eudeamonia 'the Jackdaw' of Rheims, casts a jaded eye over this twilight of civilization. She puts her classical education to good use, penning ransom notes for local tyrants. They're always in impeccable hexameters, although she fears the allusions to Cicero may me lost on some warlords.",
  },
  {
    name: "Athaloc of Smyrna",
    bias: "hostile",
    style: "condescending",
    gender: "male",
    image: chroniclerScholar,
    biography:
      "Tireless denouncer of those fools who proclaim that Christ is of two natures, Divine and Human, combined distinctly in one Being, of one being with the Father and yet also the Son--rather than acceptng the obvious truth of His Divine being being one Being with two natures distinct, Human and Divine, yet distinctly combined in one being, the Son and yet also the Father. Preposterous! And don't even get him started on the Holy Spirit.",
  },
  {
    name: "Priscilla of Byzantium",
    bias: "hostile",
    style: "supercilious",
    gender: "female",
    image: chroniclerNun,
    biography:
      "A former imperial court lady turned nun after a scandal involving the Emperor's favorite horse and a misunderstanding about inheritance laws. Maintains that everything was better 'in Constantinople', despite having fled the city in disgrace.",
  },
];

export const initialTerritories: Territory[] = [
  {
    name: "Britannia",
    x: 15,
    y: 15,
    owner: "Britons",
    troops: 900,
    terrain: "forest",
  },
  {
    name: "Gallia",
    x: 25,
    y: 30,
    owner: "Franks",
    troops: 1200,
    terrain: "forest",
  },
  {
    name: "Aquitania",
    x: 17,
    y: 43,
    owner: "Visigoths",
    troops: 1000,
    terrain: "plains",
  },
  {
    name: "Septimania",
    x: 28,
    y: 42,
    owner: "Burgundians",
    troops: 800,
    terrain: "mountains",
  },
  {
    name: "Hispania",
    x: 8,
    y: 52,
    owner: "Suebians",
    troops: 800,
    terrain: "mountains",
  },
  {
    name: "Mauretania",
    x: 15,
    y: 75,
    owner: "Moors",
    troops: 1000,
    terrain: "plains",
  },
  {
    name: "Germania",
    x: 35,
    y: 20,
    owner: "Saxons",
    troops: 1500,
    terrain: "forest",
  },
  {
    name: "Pannonia",
    x: 40,
    y: 35,
    owner: "Langobards",
    troops: 1800,
    terrain: "plains",
  },
  {
    name: "Dacia",
    x: 50,
    y: 35,
    owner: "Gepids",
    troops: 1300,
    terrain: "mountains",
  },
  {
    name: "Thracia",
    x: 55,
    y: 50,
    owner: "Romans",
    troops: 1600,
    terrain: "plains",
  },
  {
    name: "Dalmatia",
    x: 45,
    y: 45,
    owner: "Alans",
    troops: 1000,
    terrain: "forest",
  },
  {
    name: "Italia",
    x: 37,
    y: 50,
    owner: "Ostrogoths",
    troops: 2000,
    terrain: "plains",
  },
  {
    name: "Africa",
    x: 40,
    y: 80,
    owner: "Vandals",
    troops: 1000,
    terrain: "plains",
  },
  {
    name: "Aegyptus",
    x: 60,
    y: 80,
    owner: "Romans",
    troops: 1400,
    terrain: "river",
  },
  {
    name: "Syria",
    x: 80,
    y: 70,
    owner: "Romans",
    troops: 1700,
    terrain: "plains",
  },
  {
    name: "Galatia",
    x: 70,
    y: 60,
    owner: "Romans",
    troops: 800,
    terrain: "mountains",
  },
  {
    name: "Scythia",
    x: 65,
    y: 25,
    owner: "Huns",
    troops: 2500,
    terrain: "plains",
  },
  {
    name: "Armorica",
    x: 15,
    y: 30,
    owner: "Bagaudae",
    troops: 1000,
    terrain: "forest",
  },
];

export const adjacentTerritories: Record<string, string[]> = {
  Britannia: ["Gallia", "Armorica"],
  Gallia: ["Britannia", "Aquitania", "Germania", "Armorica", "Septimania"],
  Septimania: ["Gallia", "Aquitania", "Italia", "Pannonia"],
  Aquitania: ["Gallia", "Armorica", "Hispania", "Mauretania", "Italia"],
  Hispania: ["Aquitania", "Mauretania"],
  Germania: ["Gallia", "Pannonia", "Dacia"],
  Pannonia: [
    "Germania",
    "Dacia",
    "Thracia",
    "Italia",
    "Dalmatia",
    "Septimania",
  ],
  Dacia: ["Germania", "Pannonia", "Thracia", "Scythia", "Dalmatia"],
  Thracia: ["Pannonia", "Dacia", "Italia", "Syria", "Galatia", "Dalmatia"],
  Italia: [
    "Pannonia",
    "Thracia",
    "Africa",
    "Aquitania",
    "Mauretania",
    "Dalmatia",
    "Septimania",
  ],
  Africa: ["Italia", "Aegyptus", "Mauretania"],
  Aegyptus: ["Africa", "Syria", "Galatia"],
  Syria: ["Thracia", "Aegyptus", "Galatia"],
  Armorica: ["Britannia", "Gallia", "Aquitania"],
  Mauretania: ["Aquitania", "Hispania", "Italia", "Africa"],
  Galatia: ["Thracia", "Syria", "Aegyptus"],
  Scythia: ["Dacia"],
  Dalmatia: ["Italia", "Pannonia", "Dacia", "Thracia"],
};

export const initialReport = (adviserName: string): string => {
  switch (adviserName) {
    case "John of Colchis":
      return '"The heretics outnumber us, my Lord. Let us die now opposing them!"';
    case "Priscilla of Byzantium":
      return '"Sire, we must be Byzantine in cunning. Strategy is the way to victory."';
    case "Eudaemonia of Rheims":
      return '"No virtue is so great that it can endure danger, unless it is also joined by great prudence."';
    default:
      return '"Our forces are weak, my liege. I advise patience."';
  }
};
