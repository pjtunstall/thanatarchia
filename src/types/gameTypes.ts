export type Faction = {
  name: string;
  formalName: string;
  capital: string;
  type: "imperial" | "barbarian" | "bagaudae";
  color: string;
  symbol: string;
  territories: string[];
  relatives: string[];
  troops: number;
  treasure: number;
  leader: {
    male: Character;
    female: Character;
  };
  faith:
    | "Chalcedonian"
    | "Arian"
    | "Pagan"
    | "Manichean"
    | "Pelagian"
    | "Miaphysite"
    | "Dyophysite"
    | "Nestorian"
    | "Donatist";
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
};

export type GameStatus = "playing" | "victory" | "defeat";

export type Gender = "male" | "female";

export type AttackOrder = {
  from: string;
  to: string;
  troops: number;
};
