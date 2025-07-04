import {
  HistoricalFaction,
  CharacterPortrait,
  Chronicler,
  Territory,
} from "@/types/GameTypes";
import byzantineQueen from "@/assets/byzantine-queen-portrait.jpg";
import byzantineChief from "@/assets/byzantine-chief-portrait.jpg";

export const historicalFactions: HistoricalFaction[] = [
  { name: "Roman Empire", type: "imperial", color: "hsl(var(--imperial))", displayName: "Roman Empire" },
  { name: "Bagaudae of Gaul", type: "bagaudae", color: "hsl(var(--bagaudae))", displayName: "Bagaudae of Gaul" },
  { name: "Bagaudae of Hispania", type: "bagaudae", color: "hsl(var(--bagaudae))", displayName: "Bagaudae of Hispania" },
  { name: "Ostrogothic Kingdom", type: "barbarian", color: "hsl(var(--ostrogothic))", displayName: "Ostrogothic Kingdom" },
  { name: "Visigothic Kingdom", type: "barbarian", color: "hsl(var(--visigothic))", displayName: "Visigothic Kingdom" },
  { name: "Vandal Kingdom", type: "barbarian", color: "hsl(var(--vandal))", displayName: "Vandal Kingdom" },
  { name: "Burgundian Kingdom", type: "barbarian", color: "hsl(var(--burgundian))", displayName: "Burgundian Kingdom" },
  { name: "Kingdom of the Franks", type: "barbarian", color: "hsl(var(--frankish))", displayName: "Kingdom of the Franks" },
  { name: "Gepid Kingdom", type: "barbarian", color: "hsl(var(--gepid))", displayName: "Gepid Kingdom" },
  { name: "Heruli", type: "barbarian", color: "hsl(var(--heruli))", displayName: "Heruli" },
  { name: "Suebian Confederation", type: "barbarian", color: "hsl(var(--suebian))", displayName: "Suebian Confederation" },
  { name: "Alans", type: "barbarian", color: "hsl(var(--alans))", displayName: "Alans" },
  { name: "Hunnic Empire", type: "barbarian", color: "hsl(var(--hunnic))", displayName: "Hunnic Empire" },
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
  { name: "Marcellus of Ravenna", bias: "friendly", style: "sycophantic" },
  { name: "Theodoric the Scribe", bias: "hostile", style: "Germanic disdain" },
  {
    name: "Hieronymus of Alexandria",
    bias: "hostile",
    style: "scholarly condescension",
  },
  {
    name: "Priscilla of Byzantium",
    bias: "hostile",
    style: "imperial superiority",
  },
];

export const initialTerritories: Territory[] = [
  {
    id: "britannia",
    name: "Britannia",
    x: 5,
    y: 10,
    owner: "Roman Empire",
    troops: 900,
    terrain: "plains",
  },
  {
    id: "gallia",
    name: "Gallia",
    x: 35,
    y: 25,
    owner: "player",
    troops: 1200,
    terrain: "forest",
  },
  {
    id: "aquitania",
    name: "Aquitania",
    x: 25,
    y: 40,
    owner: "player",
    troops: 800,
    terrain: "plains",
  },
  {
    id: "hispania",
    name: "Hispania",
    x: 15,
    y: 55,
    owner: "Visigothic Kingdom",
    troops: 1100,
    terrain: "mountains",
  },
  {
    id: "germania",
    name: "Germania Magna",
    x: 50,
    y: 25,
    owner: "Kingdom of the Franks",
    troops: 1500,
    terrain: "forest",
  },
  {
    id: "pannonia",
    name: "Pannonia",
    x: 60,
    y: 45,
    owner: "Ostrogothic Kingdom",
    troops: 1800,
    terrain: "plains",
  },
  {
    id: "dacia",
    name: "Dacia",
    x: 70,
    y: 40,
    owner: "Gepid Kingdom",
    troops: 1300,
    terrain: "mountains",
  },
  {
    id: "thracia",
    name: "Thracia",
    x: 75,
    y: 55,
    owner: "Hunnic Empire",
    troops: 1600,
    terrain: "plains",
  },
  {
    id: "italia",
    name: "Italia",
    x: 55,
    y: 60,
    owner: "Roman Empire",
    troops: 2200,
    terrain: "plains",
  },
  {
    id: "africa",
    name: "Africa Proconsularis",
    x: 40,
    y: 80,
    owner: "Vandal Kingdom",
    troops: 1000,
    terrain: "plains",
  },
  {
    id: "aegyptus",
    name: "Aegyptus",
    x: 70,
    y: 75,
    owner: "Roman Empire",
    troops: 1400,
    terrain: "river",
  },
  {
    id: "syria",
    name: "Syria",
    x: 80,
    y: 70,
    owner: "Bagaudae of Gaul",
    troops: 1700,
    terrain: "plains",
  },
];

export const adjacentTerritories: Record<string, string[]> = {
  britannia: ["gallia"],
  gallia: ["britannia", "aquitania", "germania", "hispania"],
  aquitania: ["gallia", "hispania"],
  hispania: ["gallia", "aquitania", "africa"],
  germania: ["gallia", "pannonia", "dacia"],
  pannonia: ["germania", "dacia", "thracia", "italia"],
  dacia: ["germania", "pannonia", "thracia"],
  thracia: ["pannonia", "dacia", "italia", "syria"],
  italia: ["pannonia", "thracia", "africa"],
  africa: ["hispania", "italia", "aegyptus"],
  aegyptus: ["africa", "syria"],
  syria: ["thracia", "aegyptus"],
};
