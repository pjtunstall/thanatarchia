export interface Faction {
  name: string;
  formalName: string;
  type: "imperial" | "barbarian" | "bagaudae";
  color: string;
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
    | "Donatist"
    | "Gnostic";
}

export interface Territory {
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
}

export interface Chronicle {
  id: string;
  chronicler: string;
  bias: "friendly" | "hostile";
  entry: string;
  turn: number;
}

export interface Character {
  name: string;
  gender: Gender;
  image: string;
  biography: string;
}

export type Chronicler = Character & {
  bias: "friendly" | "hostile";
  style: string;
};

export type GameStatus = "playing" | "victory" | "defeat";

type Gender = "male" | "female";

type LeaderInfo = {
  name: string;
  image: string;
};

export type GenderVariants = {
  [factionName: string]: {
    [gender in Gender]: LeaderInfo;
  };
};
