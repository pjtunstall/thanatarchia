import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Character } from "@/types/gameTypes";
import { chroniclers, chroniclersAfterTheIncident } from "@/data/chronicles";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function uninitialBold(text: string) {
  return `<span style="font-style: normal;"><strong>${text}</strong></span>`;
}
