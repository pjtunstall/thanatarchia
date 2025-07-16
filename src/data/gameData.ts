import { Chronicler } from "@/types/gameTypes";
import chroniclerMonk from "@/assets/chronicler-monk-male.jpg";
import chroniclerScribe from "@/assets/chronicler-scribe-male.jpg";
import chroniclerMosaic from "@/assets/chronicler-mosaic-female.jpg";
import chroniclerScholar from "@/assets/chronicler-scholar-male.jpg";
import chroniclerNun from "@/assets/chronicler-nun-female.jpg";

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
  return 476 + Math.floor((turn - 1) / 4);
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

export const chroniclers: Chronicler[] = [
  {
    name: "John of Colchis",
    bias: "friendly",
    style: "credulous",
    gender: "male",
    image: chroniclerScribe,
    biography:
      "A devout ascetic, who seeks martyrdom at every opportunity, John has escaped death on multiple occasions only through the timely intervention of his disciples. He takes the Bible literally, but considers life largely allegorical. When not too delirious from fasting, John's hobbies are exegesis and speaking in voices. (He does a good Attila.) Rumor has it that he once accidentally excommunicated himself in an 'excess of piety' and was only brought back into the fold by special decree of the Pope.",
  },
  {
    name: "Eudaemonia of Rheims",
    bias: "hostile",
    style: "jaded",
    gender: "female",
    image: chroniclerMosaic,
    biography:
      "World-weary poet, Eudaemonia 'the Jackdaw' of Rheims, casts a jaded eye over this twilight of civilization. She puts her classical education to good use, penning ransom notes for local tyrants. They're always in impeccable hexameters, although she fears the allusions to Cicero may me lost on some warlords.",
  },
  {
    name: "Athaloc of Smyrna",
    bias: "hostile",
    style: "scholastic",
    gender: "male",
    image: chroniclerScholar,
    biography:
      "Tireless denouncer of those fools who proclaim that Christ is of two natures but not in two natures, when clearly He is in but not of. Preposterous! And the Spirit? Don't even go there...",
  },
  {
    name: "Priscilla of Byzantium",
    bias: "hostile",
    style: "disdainful",
    gender: "female",
    image: chroniclerNun,
    biography:
      "A former imperial court lady turned nun after a scandal involving the Emperor's favorite horse and a misunderstanding about inheritance laws. Maintains that everything was better 'in Constantinople', despite having fled the city in disgrace.",
  },
];

export const initialReport = (adviserName: string): string => {
  switch (adviserName) {
    case "John of Colchis":
      return '"The enemies of God outnumber us, my Lord. Let us die now opposing them and gain the martyr\'s reward!"';
    case "Priscilla of Byzantium":
      return '"Sire, we must be Byzantine in cunning. Strategy is the way to victory."';
    case "Eudaemonia of Rheims":
      return '"No virtue is so great that it can endure danger, unless it is also joined by great prudence."';
    case "Athaloc of Smyrna":
      return '"One cannot put it better than Vegetius, sire: All that is advantageous to the enemy is disadvantageous to you, and all that is useful to you, damages the enemy."';
    default:
      return '"Our forces are weak, my liege. I advise patience."';
  }
};

export const battleChronicle = (
  chronicler: Chronicler,
  success: boolean,
  winners: string,
  losers: string,
  territory: string
): string => {
  let playerFaction: string;
  let enemy: string;
  if (success) {
    playerFaction = winners;
    enemy = losers;
  } else {
    enemy = winners;
    playerFaction = losers;
  }

  switch (chronicler.name) {
    case "John of Colchis":
      if (chronicler.bias === "friendly") {
        if (success) {
          return `"Our Savior has blessed the ${playerFaction} with victory over the ${enemy} in ${territory}."`;
        } else {
          return `"After a heroic struggle, the ${playerFaction} failed to liberate ${territory} from the ${enemy}"`;
        }
      } else {
        if (success) {
          return `"Like the wolf upon the flock, the ${playerFaction}, have fallen upon the ${enemy} with great slaughter in ${territory}."`;
        } else {
          return `"At this time, the ${playerFaction} made an unprovoked attack on the ${enemy} in ${territory}, but were driven back with dreadful losses."`;
        }
      }
    case "Priscilla of Byzantium":
      if (chronicler.bias === "friendly") {
        return `${winners}`;
      } else {
        return "";
      }
    case "Eudaemonia of Rheims":
      if (chronicler.bias === "friendly") {
        return `${winners}`;
      } else {
        return "";
      }
    case "Athaloc of Smyrna":
      if (chronicler.bias === "friendly") {
        return ``;
      } else {
        return "";
      }
  }
};
