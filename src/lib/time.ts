import { Season } from "@/types/gameTypes";

const seasons: Season[] = ["spring", "summer", "autumn", "winter"];

export function getDate(turn: number): string {
  const year = getYear(turn);
  const season = getSeason(turn);
  return `${season} ${year}`;
}

export function getSeason(turn: number): Season {
  return seasons[(turn - 1) % 4];
}

export function getYear(turn: number): number {
  return 499 + Math.floor((turn - 1) / 4);
}
