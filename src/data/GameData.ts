import {
  HistoricalFaction,
  CharacterPortrait,
  Chronicler,
  Territory,
} from "@/types/GameTypes";
import byzantineQueen from "@/assets/byzantine-queen-portrait.jpg";
import byzantineChief from "@/assets/byzantine-chief-portrait.jpg";
import romanEmperor from "@/assets/roman-emperor-portrait.jpg";
import barbarianKing from "@/assets/barbarian-king-portrait.jpg";
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

export const historicalFactions: HistoricalFaction[] = [
  {
    name: "Roman Empire",
    type: "imperial",
    color: "hsl(var(--imperial))",
    displayName: "Roman Empire",
    leader: {
      name: "Romulus Augustulus",
      gender: "male",
      portrait: romanEmperor,
    },
    heresy: "Orthodox",
    relatives: ["Princess Flavia", "Duke Marcus", "General Maximus"],
  },
  {
    name: "Bagaudae of Gaul",
    type: "bagaudae",
    color: "hsl(var(--bagaudae))",
    displayName: "Bagaudae of Gaul",
    leader: {
      name: "Tibatto the Rebel",
      gender: "male",
      portrait: bagaudaeMaleRebel,
    },
    heresy: "Pelagian",
    relatives: ["Brigit the Fierce", "Young Caractacus", "Imogen"],
  },
  {
    name: "Bagaudae of Hispania",
    type: "bagaudae",
    color: "hsl(var(--bagaudae))",
    displayName: "Bagaudae of Hispania",
    leader: {
      name: "Basiliscus the Free",
      gender: "male",
      portrait: bagaudaeMaleRebel,
    },
    heresy: "Manichean",
    relatives: ["Sister Spartaca", "Cousin Rodrigo"],
  },
  {
    name: "Ostrogothic Kingdom",
    type: "barbarian",
    color: "hsl(var(--ostrogothic))",
    displayName: "Ostrogothic Kingdom",
    leader: {
      name: "Theodoric the Great",
      gender: "male",
      portrait: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Princess Amalasuntha", "Prince Athalaric", "Nephew Eutharic"],
  },
  {
    name: "Visigothic Kingdom",
    type: "barbarian",
    color: "hsl(var(--visigothic))",
    displayName: "Visigothic Kingdom",
    leader: {
      name: "Queen Brunhild",
      gender: "female",
      portrait: visigothicQueen,
    },
    heresy: "Arian",
    relatives: ["Prince Sigismund", "Lady Galswintha", "Duke Recared"],
  },
  {
    name: "Vandal Kingdom",
    type: "barbarian",
    color: "hsl(var(--vandal))",
    displayName: "Vandal Kingdom",
    leader: {
      name: "Huneric the Cruel",
      gender: "male",
      portrait: vandalChief,
    },
    heresy: "Arian",
    relatives: ["Princess Eudocia", "Brother Gunthamund"],
  },
  {
    name: "Burgundian Kingdom",
    type: "barbarian",
    color: "hsl(var(--burgundian))",
    displayName: "Burgundian Kingdom",
    leader: {
      name: "Gundobad the Wise",
      gender: "male",
      portrait: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Daughter Clotilde", "Son Sigismund", "Nephew Godomar"],
  },
  {
    name: "Kingdom of the Franks",
    type: "barbarian",
    color: "hsl(var(--frankish))",
    displayName: "Kingdom of the Franks",
    leader: {
      name: "Clovis the Conqueror",
      gender: "male",
      portrait: frankishKing,
    },
    heresy: "Filioque",
    relatives: ["Queen Clotilde", "Prince Clothar", "Princess Clotilde"],
  },
  {
    name: "Gepid Kingdom",
    type: "barbarian",
    color: "hsl(var(--gepid))",
    displayName: "Gepid Kingdom",
    leader: {
      name: "Ardaric the Faithful",
      gender: "male",
      portrait: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Son Gunderit", "Daughter Rosamunda"],
  },
  {
    name: "Heruli",
    type: "barbarian",
    color: "hsl(var(--heruli))",
    displayName: "Heruli",
    leader: {
      name: "Odoacer the King-Maker",
      gender: "male",
      portrait: barbarianKing,
    },
    heresy: "Arian",
    relatives: ["Brother Hunulf", "General Pierius"],
  },
  {
    name: "Suebian Confederation",
    type: "barbarian",
    color: "hsl(var(--suebian))",
    displayName: "Suebian Confederation",
    leader: {
      name: "Hermeric the Elder",
      gender: "male",
      portrait: barbarianKing,
    },
    heresy: "Heathen",
    relatives: ["Son Rechila", "Daughter Ingunde"],
  },
  {
    name: "Alans",
    type: "barbarian",
    color: "hsl(var(--alans))",
    displayName: "Alans",
    leader: {
      name: "Respendial the Horseman",
      gender: "male",
      portrait: barbarianKing,
    },
    heresy: "Heathen",
    relatives: ["Son Goar", "War-Chief Addac (Son)", "Shaman Sangiban"],
  },
  {
    name: "Hunnic Empire",
    type: "barbarian",
    color: "hsl(var(--hunnic))",
    displayName: "Hunnic Empire",
    leader: {
      name: "Dengizich the Fierce",
      gender: "male",
      portrait: hunnicWarlord,
    },
    heresy: "Heathen",
    relatives: ["Brother Ernakh", "Sister Kreka", "Nephew Mundo"],
  },
];

export const characterPortraits: CharacterPortrait[] = [
  {
    name: "Brunhild the Fierce",
    gender: "female",
    image: byzantineQueen,
  },
  {
    name: "Theodoric the Bold",
    gender: "male",
    image: byzantineChief,
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
    owner: "Bagaudae of Hispania",
    troops: 800,
    terrain: "mountains",
  },
  {
    name: "Mauretania",
    x: 15,
    y: 75,
    owner: "Bagaudae of Hispania",
    troops: 1000,
    terrain: "plains",
  },
  {
    name: "Germania",
    x: 35,
    y: 20,
    owner: "Kingdom of the Franks",
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
    owner: "Bagaudae of Gaul",
    troops: 1000,
    terrain: "forest",
  },
];

export const adjacentTerritories: Record<string, string[]> = {
  Britannia: ["Gallia", "Armorica"],
  Gallia: ["Britannia", "Aquitania", "Germania", "Hispania", "Armorica"],
  Aquitania: ["Gallia", "Hispania", "Mauretania"],
  Hispania: ["Gallia", "Aquitania", "Africa", "Mauretania"],
  germania: ["Gallia", "Pannonia", "Dacia"],
  Pannonia: ["Germania", "Dacia", "Thracia", "Italia"],
  Dacia: ["germania", "Pannonia", "Thracia"],
  Thracia: ["Pannonia", "Dacia", "Italia", "Syria"],
  Italia: ["Pannonia", "Thracia", "Africa"],
  Africa: ["Hispania", "Italia", "Aegyptus"],
  Aegyptus: ["Africa", "Syria"],
  Syria: ["Thracia", "Aegyptus"],
  Armorica: ["Britannia", "Gallia"],
  Mauretania: ["Aquitania", "Hispania"],
};
