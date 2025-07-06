export interface Faction {
  id?: string;
  name: string;
  formalName: string;
  type: "imperial" | "barbarian" | "bagaudae";
  color: string;
  territories: number;
  relatives: string[];
  troops: number;
  treasure: number;
  leader: {
    name: string;
    gender: "male" | "female";
    image: string;
  };
  heresy:
    | "Chalcedonian"
    | "Arian"
    | "Pagan"
    | "Manichean"
    | "Pelagian"
    | "Miaphysite";
}

export interface Territory {
  name: string;
  x: number;
  y: number;
  owner: string;
  troops?: number;
  estimatedTroops?: number;
  spiedOn?: boolean;
  terrain?: "plains" | "forest" | "mountains" | "river";
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

export interface CharacterPortrait {
  name: string;
  gender: "male" | "female";
  image: string;
  adviser?: Chronicler;
}

export interface Chronicler {
  name: string;
  bias: "friendly" | "hostile";
  style: string;
  gender: "male" | "female";
  image: string;
  biography: string;
}

export type GameStatus = "playing" | "victory" | "defeat";
