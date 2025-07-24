import { factions as initialFactions } from "@/data/factions.ts";
import {
  territories as initialTerritories,
  neighbors,
} from "@/data/territories.ts";

export const factions = initialFactions;
export const territories = initialTerritories;
export const adjacentTerritories = neighbors;

export const costOfSpying = 25;
export const costOfRecruiting = 50;
