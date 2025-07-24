import { factions as initialFactions } from "@/data/factions.ts";
import {
  territories as initialTerritories,
  neighbors,
} from "@/data/territories.ts";

export const factions = initialFactions;
export const territories = initialTerritories;
export const adjacentTerritories = neighbors;

export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const costOfSpying = 25;
export const costOfRecruiting = 50;

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
  return 499 + Math.floor((turn - 1) / 4);
};

export const getFaithColor = (faith: string): string => {
  switch (faith) {
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
