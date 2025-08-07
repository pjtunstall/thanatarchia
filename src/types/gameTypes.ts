export type Season = "autumn" | "winter" | "spring" | "summer";

export type GameStatus = "playing" | "victory" | "defeat";

export type Gender = "male" | "female";

export type Faction = {
  name: string;
  formalName: string;
  capital: string;
  type: "imperial" | "barbarian" | "bagaudae";
  color: string;
  symbol: string;
  territories: string[];
  troops: number;
  treasure: number;
  leader: {
    male: Character;
    female: Character;
  };
  faith:
    | "Arian"
    | "Chalcedonian"
    | "Donatist"
    | "Dyophysite"
    | "Gnostic"
    | "Pagan"
    | "Manichaean"
    | "Miaphysite"
    | "Pelagian"
    | "Nestorian";
};

export type FactionMiniInfo = { color: string; name: string; symbol: string };

export type Territory = {
  name: string;
  x: number;
  y: number;
  owner: string;
  troops?: number;
  estimatedTroops?: number;
  spiedOn?: boolean;
  terrain: "plains" | "forest" | "mountains" | "river";
  condition?: string;
  conditionModifier?: number;
};

export type BattleReport = {
  message: string;
  author: Character;
  success: boolean;
  stats: string;
};

export type ChatEntry = {
  author: Character;
  statement: string;
  date?: string;
};

export type Character = {
  name: string;
  gender: Gender;
  image: string;
  biography: string;
  index: number;
};

export type AttackOrder = {
  from: string;
  to: string;
  troops: number;
};
