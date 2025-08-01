import { factions as initialFactions } from "@/data/factions.ts";
import {
  territories as initialTerritories,
  neighbors,
} from "@/data/territories.ts";

export const factions = initialFactions;
export const territories = initialTerritories;
export const adjacentTerritories = neighbors;

export const costOfSpying = 500;
export const costOfRecruiting = 3000;
export const troopUnit = 500;

export const tabs = ["chronicles", "status", "actions"];
