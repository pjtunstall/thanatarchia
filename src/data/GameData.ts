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
import chroniclerScholar from "@/assets/chronicler-scholar-male.jpg";
import chroniclerNun from "@/assets/chronicler-nun-female.jpg";
import bagaudaeMaleRebel from "@/assets/bagaudae-male-rebel.jpg";
import bagaudaeFemaleRebel from "@/assets/bagaudae-female-rebel.jpg";

export const getHeresyColor = (heresy: string) => {
  switch (heresy) {
    case "Orthodox":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Arian":
      return "bg-red-100 text-red-800 border-red-200";
    case "Miaphysite":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Pagan":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Manichean":
      return "bg-green-100 text-green-800 border-green-200";
    case "Pelagian":
      return "bg-pink-100 text-pink-800 border-pink-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const factions: Faction[] = [
  {
    name: "Roman Empire",
    type: "imperial",
    color: "hsl(var(--imperial))",
    leader: {
      name: "Romulus Augustulus",
      gender: "male",
      image: romanEmperor,
    },
    heresy: "Orthodox",
    relatives: ["Princess Flavia", "Duke Marcus", "General Maximus"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Bagaudae",
    type: "bagaudae",
    color: "hsl(var(--bagaudae))",
    leader: {
      name: "Tibatto the Rebel",
      gender: "male",
      image: bagaudaeMaleRebel,
    },
    heresy: "Manichean",
    relatives: ["Comrade Spartaca", "Comrade Caractacus", "Comrade Amandus"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Ostrogothic Kingdom",
    type: "barbarian",
    color: "hsl(var(--ostrogothic))",
    leader: {
      name: "Theodoric the Great",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Princess Amalasuntha", "Prince Athalaric", "Nephew Eutharic"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Visigothic Kingdom",
    type: "barbarian",
    color: "hsl(var(--visigothic))",
    leader: {
      name: "Queen Brunhild",
      gender: "female",
      image: visigothicQueen,
    },
    heresy: "Arian",
    relatives: ["Prince Sigismund", "Lady Galswintha", "Duke Recared"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Vandal Kingdom",
    type: "barbarian",
    color: "hsl(var(--vandal))",
    leader: {
      name: "Huneric the Cruel",
      gender: "male",
      image: vandalChief,
    },
    heresy: "Arian",
    relatives: ["Princess Eudocia", "Brother Gunthamund"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Burgundian Kingdom",
    type: "barbarian",
    color: "hsl(var(--burgundian))",
    leader: {
      name: "Gundobad the Wise",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Daughter Clotilde", "Son Sigismund", "Nephew Godomar"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Kingdom of the Franks",
    type: "barbarian",
    color: "hsl(var(--frankish))",
    leader: {
      name: "Clovis the Conqueror",
      gender: "male",
      image: frankishKing,
    },
    heresy: "Miaphysite",
    relatives: ["Queen Clotilde", "Prince Clothar", "Princess Clotilde"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Saxon Confederation",
    type: "barbarian",
    color: "hsl(var(--saxon))",
    leader: {
      name: "Hasela",
      gender: "female",
      image: barbarianQueen,
    },
    heresy: "Pagan",
    relatives: ["Brother Widukind", "Brother Abbio"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Gepid Kingdom",
    type: "barbarian",
    color: "hsl(var(--gepid))",
    leader: {
      name: "Ardaric the Faithful",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Son Gunderit", "Daughter Rosamunda"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Heruli",
    type: "barbarian",
    color: "hsl(var(--heruli))",
    leader: {
      name: "Odoacer the King-Maker",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Brother Hunulf", "General Pierius"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Suebian Confederation",
    type: "barbarian",
    color: "hsl(var(--suebian))",
    leader: {
      name: "Hermeric the Elder",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Pagan",
    relatives: ["Son Rechila", "Daughter Ingunde"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Alans",
    type: "barbarian",
    color: "hsl(var(--alans))",
    leader: {
      name: "Respendial the Horseman",
      gender: "male",
      image: barbarianKing,
    },
    heresy: "Pagan",
    relatives: ["Son Goar", "Son Addac", "Cousin Sangiban"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
  {
    name: "Hunnic Empire",
    type: "barbarian",
    color: "hsl(var(--hunnic))",
    leader: {
      name: "Dengizich the Fierce",
      gender: "male",
      image: hunnicWarlord,
    },
    heresy: "Pagan",
    relatives: ["Brother Ernakh", "Sister Kreka", "Nephew Mundo"],
    territories: 1,
    troops: 1000,
    treasure: 100,
  },
];

export const chroniclers: Chronicler[] = [
  {
    name: "Marcellus of Ravenna",
    bias: "friendly",
    style: "sycophantic",
    gender: "male",
    portrait: chroniclerMonk,
    biography:
      "A devout monk who fled to Ravenna after accidentally setting fire to his monastery's library while 'improving' ancient texts. Known for his excessive flattery and tendency to describe even the most mundane events in epic terms. Claims to have once blessed a loaf of bread that fed an entire village, though witnesses say it was just very large bread.",
  },
  {
    name: "Theodoric the Scribe",
    bias: "hostile",
    style: "Germanic disdain",
    gender: "male",
    portrait: chroniclerScribe,
    biography:
      "A former Gothic court scribe who was exiled for 'creative differences' with his king's version of events. Bitter about losing his position, he now chronicles with the enthusiasm of a man forced to eat bitter herbs. His quill is perpetually stained with both ink and tears of frustration.",
  },
  {
    name: "Hieronymus of Alexandria",
    bias: "hostile",
    style: "scholarly condescension",
    gender: "male",
    portrait: chroniclerScholar,
    biography:
      "A self-proclaimed 'Master of All Knowledge' who was kicked out of the Great Library for rearranging scrolls by his own peculiar system. Believes everyone else is intellectually inferior and isn't shy about mentioning it. Has never actually been to most of the places he writes about with such authority.",
  },
  {
    name: "Priscilla of Byzantium",
    bias: "hostile",
    style: "imperial superiority",
    gender: "female",
    portrait: chroniclerNun,
    biography:
      "A former imperial court lady turned nun after a scandal involving the Emperor's favorite horse and a misunderstanding about inheritance laws. Maintains that everything was better 'in Constantinople' and views all current events through the lens of Byzantine superiority, despite having fled the city in disgrace.",
  },
];

const randomTribe = () => {
  const names = [
    "Heruli",
    "Suebian Confederation",
    "Alans",
    "Saxon Confederation",
    "Burgundian Kingdom",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const initialTerritories: Territory[] = [
  {
    name: "Britannia",
    x: 15,
    y: 15,
    owner: "Roman Empire",
    troops: 900,
    terrain: "plains",
  },
  {
    name: "Gallia",
    x: 25,
    y: 30,
    owner: "Kingdom of the Franks",
    troops: 1200,
    terrain: "forest",
  },
  {
    name: "Aquitania",
    x: 20,
    y: 43,
    owner: "Visigothic Kingdom",
    troops: 800,
    terrain: "plains",
  },
  {
    name: "Hispania",
    x: 8,
    y: 52,
    owner: "Visigothic Kingdom",
    troops: 800,
    terrain: "mountains",
  },
  {
    name: "Mauretania",
    x: 15,
    y: 75,
    owner: "Vandal Kingdom",
    troops: 1000,
    terrain: "plains",
  },
  {
    name: "Germania",
    x: 35,
    y: 20,
    owner: randomTribe(),
    troops: 1500,
    terrain: "forest",
  },
  {
    name: "Pannonia",
    x: 40,
    y: 35,
    owner: "Ostrogothic Kingdom",
    troops: 1800,
    terrain: "plains",
  },
  {
    name: "Dacia",
    x: 50,
    y: 35,
    owner: "Gepid Kingdom",
    troops: 1300,
    terrain: "mountains",
  },
  {
    name: "Thracia",
    x: 55,
    y: 50,
    owner: "Hunnic Empire",
    troops: 1600,
    terrain: "plains",
  },
  {
    name: "Italia",
    x: 35,
    y: 50,
    owner: "Roman Empire",
    troops: 2200,
    terrain: "plains",
  },
  {
    name: "Africa",
    x: 40,
    y: 80,
    owner: "Vandal Kingdom",
    troops: 1000,
    terrain: "plains",
  },
  {
    name: "Aegyptus",
    x: 60,
    y: 80,
    owner: "Roman Empire",
    troops: 1400,
    terrain: "river",
  },
  {
    name: "Syria",
    x: 80,
    y: 70,
    owner: "Roman Empire",
    troops: 1700,
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
  Gallia: ["Britannia", "Aquitania", "Germania", "Armorica"],
  Aquitania: ["Gallia", "Armorica", "Hispania", "Mauretania", "Italia"],
  Hispania: ["Aquitania", "Mauretania"],
  Germania: ["Gallia", "Pannonia", "Dacia"],
  Pannonia: ["Germania", "Dacia", "Thracia", "Italia"],
  Dacia: ["Germania", "Pannonia", "Thracia"],
  Thracia: ["Pannonia", "Dacia", "Italia", "Syria"],
  Italia: ["Pannonia", "Thracia", "Africa", "Aquitania", "Mauretania"],
  Africa: ["Italia", "Aegyptus", "Mauretania"],
  Aegyptus: ["Africa", "Syria"],
  Syria: ["Thracia", "Aegyptus"],
  Armorica: ["Britannia", "Gallia"],
  Mauretania: ["Aquitania", "Hispania", "Italia", "Africa"],
};
