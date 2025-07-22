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
    style: "credulous",
    gender: "male",
    image: chroniclerScribe,
    biography:
      "A devout ascetic, who seeks martyrdom at every opportunity, John has escaped death on multiple occasions only through the timely intervention of his disciples. He takes the Bible literally, but considers life largely allegorical. When not too delirious from fasting, John's hobbies are exegesis and speaking in voices. (He does a good Attila.) Rumor has it that he once accidentally excommunicated himself in an 'excess of piety' and was only brought back into the fold by special decree of the Pope.",
  },
  {
    name: "Eudaemonia of Rheims",
    style: "jaded",
    gender: "female",
    image: chroniclerMosaic,
    biography:
      "World-weary poet, Eudaemonia 'the Jackdaw' of Rheims, casts a jaded eye over this twilight of civilization. She puts her classical education to good use, penning ransom notes for local tyrants. They're always in impeccable hexameters, although she fears the allusions to Cicero may me lost on some warlords.",
  },
  {
    name: "Athaloc of Smyrna",
    style: "scholastic",
    gender: "male",
    image: chroniclerScholar,
    biography:
      "Tireless denouncer of those fools who proclaim that Christ is of two natures but not in two natures, when clearly He is in but not of. Preposterous! And the Spirit? Don't even go there...",
  },
  {
    name: "Priscilla of Byzantium",
    style: "disdainful",
    gender: "female",
    image: chroniclerNun,
    biography:
      "A former imperial court lady turned nun after a scandal involving the Emperor's favorite horse and a misunderstanding about inheritance laws. Maintains that everything was better 'in Constantinople', despite having fled the city in disgrace.",
  },
];

export const initialAdvice = (adviserName: string): string => {
  switch (adviserName) {
    case "John of Colchis":
      return '"Our foes outnumber us, my Liege. Let us die now opposing them and gain the martyr\'s reward!"';
    case "Priscilla of Byzantium":
      return '"Sire, we must be Byzantine in cunning. Strategy is the way to victory."';
    case "Eudaemonia of Rheims":
      return '"No virtue is so great that it can endure danger, unless it is also joined by great prudence."';
    case "Athaloc of Smyrna":
      return '"One cannot put it better than Vegetius, Sire: All that is advantageous to the enemy is disadvantageous to you, and all that is useful to you, damages the enemy."';
    default:
      return '"Our forces are weak, my Liege. I advise patience."';
  }
};

export const battleChronicle = (
  chronicler: Chronicler,
  bias: string,
  success: boolean,
  winners: string,
  losers: string,
  territory: string
): string => {
  let attackers: string;
  let defenders: string;
  if (success) {
    attackers = winners;
    defenders = losers;
  } else {
    defenders = winners;
    attackers = losers;
  }

  switch (chronicler.name) {
    case "John of Colchis":
      if (bias === "friendly") {
        if (success) {
          return `"Our brave ${attackers} have saved ${territory} from the tyrany of the ${defenders}."`;
        } else {
          return `"In spite of a heroic struggle, our gallant ${attackers} yet to free ${territory} from ${defenders.slice(
            0,
            -1
          )} occupation."`;
        }
      } else {
        if (success) {
          return `"Like the wolf upon the fold, the treacherous ${attackers}, have fallen upon the ${defenders} with great slaughter in ${territory}."`;
        } else {
          return `"At this time, the ${attackers} made an unprovoked attack on the ${defenders} in ${territory}, but were driven back with dreadful losses."`;
        }
      }
    case "Priscilla of Byzantium":
      if (bias === "friendly") {
        if (success) {
          return `A plucky band of ${attackers}, masterfully led, as if by Constantine himself reborn, have seized ${territory} from the ${defenders}.`;
        } else {
          return `Alas, though they took the fight to the enemy time and again, the ${attackers} have failed to take ${territory} from the ${defenders}.`;
        }
      } else {
        if (success) {
          return `In this year, a great throng of the barbarous ${attackers} descended upon ${territory}, overwhelming the ${defenders} there.`;
        } else {
          return `Today, God saw fit to punish the ${attackers} for their impudent assault on the ${defenders} in ${territory}. One senses imperial training at work here.`;
        }
      }
    case "Eudaemonia of Rheims":
      if (bias === "friendly") {
        if (success) {
          return `They say that the ${attackers} took ${territory} from the ${defenders} today. One feels obliged to offer one's congratulations, although I doubt my contribution will be heard much above the belches of the victory feast, or such 'panegyrics' as their bards declaim.`;
        } else {
          return `Another season, another chronicle. Let's get it over with. The such-and-such (${attackers})--ahem, our beloved protectors, the ${attackers}...--failed to gain whatever it's called (${territory}) from the so-and-sos (${defenders}). And the shadows lengthen.`;
        }
      } else {
        if (success) {
          return `How tedious! The names of these uncouth tribes flow on like endless rain: their meaningless triumphs and defeats of equal insignificance. I run my finger over the parchment's roughness as the dying light briefly catches the page. I suppose we must do our duty and record here that the ${attackers} took ${territory} from the ${defenders}.`;
        } else {
          return `The glimmer of a smile almost touches one's face. News reached us today that the ${attackers} failed to wrest ${territory} from the ${defenders}. But it is a cheap pleasure. I might swap the names or swap them back, for all the difference it would make to history.`;
        }
      }
    case "Athaloc of Smyrna":
      if (bias === "friendly") {
        if (success) {
          return `On this day occurred a tremendous clash of arms that will echo down the years. A small band of ${attackers} utterly routed a force of ${defenders}, easily ten times their number, bringing all ${territory} under their benevolent control.`;
        } else {
          return `Little of note happened this season. One gathers that a small band of ${attackers} made a lighning raid on ${territory}, taking the ${defenders} quite by surprise, and escaping before those doctrine-mangling dullards knew what hit them.`;
        }
      } else {
        if (success) {
          return `Inconceivable! Though it strains credulity, we must note the reports coming out of ${territory} of an engagement in which those perfidious knaves, the ${attackers}, routed the ${defenders}.`;
        } else {
          return `A reckless ${attackers.slice(
            0,
            -1
          )} incursion into ${territory} has been repulsed by the ${defenders}. Indeed lack of faith begets folly: the dull wits of the sinners finding a natural counterpart in their doltish strategems.`;
        }
      }
  }
};
