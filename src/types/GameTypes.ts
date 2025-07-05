export interface Faction {
  id: string;
  name: string;
  type: "imperial" | "barbarian" | "bagaudae";
  color: string;
  territories: number;
  relatives: string[];
  troops: number;
  treasure: number;
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

export interface HistoricalFaction {
  name: string;
  type: "imperial" | "barbarian" | "bagaudae";
  color: string;
  displayName: string;
  leader: {
    name: string;
    gender: "male" | "female";
    portrait: string;
  };
  heresy:
    | "Orthodox"
    | "Arian"
    | "Filioque"
    | "Heathen"
    | "Manichean"
    | "Pelagian";
  relatives: string[];
}

export interface CharacterPortrait {
  name: string;
  gender: "male" | "female";
  image: string;
}

export interface Chronicler {
  name: string;
  bias: "friendly" | "hostile";
  style: string;
  gender: "male" | "female";
  portrait: string;
  biography: string;
}

export type GameStatus = "playing" | "victory" | "defeat";
