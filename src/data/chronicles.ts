import chroniclerMonk from "@/assets/chronicler-monk-male.jpg";
import chroniclerScribe from "@/assets/chronicler-scribe-male.jpg";
import chroniclerMosaic from "@/assets/chronicler-mosaic-female.jpg";
import chroniclerScholar from "@/assets/chronicler-scholar-male.jpg";
import chroniclerNun from "@/assets/chronicler-nun-female.jpg";

import { Character, ChatEntry } from "@/types/gameTypes";
import { getDate } from "@/lib/time";

function getChroniclerByName(chroniclerName: string): Character {
  return chroniclers.find((c) => c.name === chroniclerName);
}

export function initialChronicles(): ChatEntry[] {
  const initialDate = getDate(1);

  return [
    {
      author: getChroniclerByName("Priscilla of Byzantium"),
      date: initialDate,
      statement:
        "I never knew the old Ravenna before the Gothic Wars. Constantinople suited me better...",
    },
    {
      author: getChroniclerByName("Eudaemonia of Rheims"),
      date: initialDate,
      statement:
        "The barbarous Alamanni continue their senseless raids, pillaging what civilized men have built with crude savagery.",
    },
    {
      author: getChroniclerByName("Athaloc of Smyrna"),
      date: initialDate,
      statement:
        "The latter days are surely upon us when the heretic and the apostate, little better than the pagan, establish realms amidst the ruins.",
    },
    {
      author: getChroniclerByName("John of Colchis"),
      date: initialDate,
      statement:
        "O blessed turmoil! O what troubled times! I feel such a strange warming of the heart. Does this mean... Can it really be? COME ON APOCALYPSE! Would it be better to die by impaling or fire? Or by an angel's flaming sword? But would that count as martyrdom? I must pray for more answers...",
    },
  ];
}

export const chroniclers: Character[] = [
  {
    name: "John of Colchis",
    gender: "male",
    image: chroniclerScribe,
    biography:
      "A devout ascetic, who seeks martyrdom at every opportunity, John has escaped death on multiple occasions only through the timely intervention of his disciples. He takes the Bible literally, but considers life largely allegorical. When not too delirious from fasting, John's hobbies are exegesis and speaking in voices. (He does a good Attila.) Rumor has it that he once accidentally excommunicated himself in an 'excess of piety' and was only brought back into the fold by special decree of the Pope.",
  },
  {
    name: "Eudaemonia of Rheims",
    gender: "female",
    image: chroniclerMosaic,
    biography:
      "World-weary poet, Eudaemonia 'the Jackdaw' of Rheims, casts a jaded eye over this twilight of civilization. She puts her classical education to good use, penning ransom notes for local tyrants. They're always in impeccable hexameters, although she fears the allusions to Cicero may me lost on some warlords.",
  },
  {
    name: "Athaloc of Smyrna",
    gender: "male",
    image: chroniclerScholar,
    biography:
      "Tireless denouncer of those fools who proclaim that Christ is of two natures but not in two natures, when clearly He is in but not of. Preposterous! And the Spirit? Don't even go there...",
  },
  {
    name: "Priscilla of Byzantium",
    gender: "female",
    image: chroniclerNun,
    biography:
      "A former imperial court lady turned nun after a scandal involving the Emperor's favorite horse and a misunderstanding about inheritance laws. Maintains that everything was better 'in Constantinople', despite having fled the city in disgrace.",
  },
];

function uninitialBold(text: string) {
  return `<span style="font-style: normal;"><strong>${text}</strong></span>`;
}

export const battleChronicle = (
  chronicler: Character,
  bias: string,
  success: boolean,
  winners: string,
  losers: string,
  territoryName: string,
  leaderCharacter: Character
): string => {
  let territory = uninitialBold(territoryName);
  let attackers: string;
  let attacker: string;
  let defenders: string;
  let defender: string;
  if (success) {
    attackers = uninitialBold(winners);
    defenders = uninitialBold(losers);
  } else {
    defenders = uninitialBold(winners);
    attackers = uninitialBold(losers);
  }
  attacker = uninitialBold(attackers.slice(0, -1));
  defender = uninitialBold(defenders.slice(0, -1));
  const leader = uninitialBold(leaderCharacter.name);

  switch (chronicler.name) {
    case "John of Colchis":
      if (bias === "friendly") {
        if (success) {
          return Math.random() < 0.5
            ? `Our brave ${attackers} have saved ${territory} from the tyrany of the ${defenders}.`
            : `Our might leader, ${leader}, has graciously chosen to expand ${attacker} territory, bringing civilization to the grateful folk of ${territory}.`;
        } else {
          return `In spite of a heroic struggle, our gallant ${attackers} have yet to free ${territory} from ${defender} occupation.`;
        }
      } else {
        if (success) {
          return `Like the wolf upon the fold, the treacherous ${attackers}, have fallen upon the ${defenders} with great slaughter in ${territory}.`;
        } else {
          return `At this time, the ${attackers} made an unprovoked attack on the ${defenders} in ${territory}, but were driven back with dreadful losses.`;
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
          return `In this year, a great rabble of ${attackers} descended upon ${territory}, overwhelming the ${defenders} there.`;
        } else {
          return `Today, God saw fit to punish the ${attackers} for their impudent assault on the ${defenders} in ${territory}. One senses Byzantine training at work here.`;
        }
      }
    case "Eudaemonia of Rheims":
      if (bias === "friendly") {
        if (success) {
          return Math.random() < 0.5
            ? `They say that the ${attackers} took ${territory} from the ${defenders} today. One feels obliged to offer one's congratulations, although I doubt my contribution will be heard much above the belches of the victory feast, or such 'panegyrics' as their bards declaim.`
            : `In an act of almost divine benificence, our great leader, ${leader}, has chosen to expand ${attacker} territory, bringing civilization to the grateful folk of ${territory}. (Those that survive his wrath, of course. And the ensuing famine. And the ensuing plague.)`;
        } else {
          return `Another season, another chronicle. Let's get it over with. The such-and-such (${attackers})--ahem, our beloved protectors, the ${attackers}...--failed to gain whatever it's called (${territory}) from the so-and-sos (${defenders}). And the shadows lengthen.`;
        }
      } else {
        if (success) {
          return Math.random() > 0.5
            ? `It is said that the ${attackers} scored a fabulous win against the ${defenders} at this time. How the starving folk of ${territory} must rejoice at their liberation.`
            : `How tedious! The names of these factions flow on like endless rain: their meaningless triumphs and defeats of equal insignificance. I run my finger over the parchment's roughness as the dying light briefly catches the page. I suppose we must do our duty and record here that the ${attackers} took ${territory} from the ${defenders}.`;
        } else {
          return `The glimmer of a smile almost touches one's face. News reached us today that the ${attackers} failed to wrest ${territory} from the ${defenders}. But it is a cheap pleasure. I might swap the names or swap them back, for all the difference it would make to the suffering people.`;
        }
      }
    case "Athaloc of Smyrna":
      if (bias === "friendly") {
        if (success) {
          return `On this day occurred a tremendous clash of arms that will echo down the years. A small band of ${attackers} utterly routed a force of ${defenders}, easily ten times their number, bringing all ${territory} under their benevolent control.`;
        } else {
          return `Little of note happened this season. One gathers that a small band of ${attackers} made a lighning raid on ${territory}, taking the ${defenders} quite by surprise, and escaping before those doctrine-mangling dullards knew what hit them. They'll spin it as a ${defender} triumph, of course.`;
        }
      } else {
        if (success) {
          return `Inconceivable! Though it strains credulity, we must note the reports coming out of ${territory} of an engagement in which those perfidious knaves, the ${attackers}, routed the ${defenders}.`;
        } else {
          return `A reckless ${attacker} incursion into ${territory} has been repulsed by the ${defenders}. Indeed lack of faith begets folly: the dull wit that begets sin finding a natural counterpart in such doltish stratagems.`;
        }
      }
  }
};

export function recruitChronicle(
  author: Character,
  bias: string,
  territoryName: string,
  factionName: string,
  leaderCharacter: Character
): string {
  const territory = uninitialBold(territoryName);
  const faction = uninitialBold(factionName);
  const adjective = faction.slice(0, -1);
  const leader = uninitialBold(leaderCharacter.name);
  const pronoun = leaderCharacter.gender === "male" ? "his" : "her";

  switch (author.name) {
    case "John of Colchis":
      if (bias === "friendly") {
        return `Our wise leader has strengthened the garrisons of ${territory}.`;
      } else {
        return `Yet more brutish ${faction} have been stationed in ${territory}.`;
      }
    case "Priscilla of Byzantium":
      if (bias === "friendly") {
        return `In a wise move, ${leader} has built up ${pronoun} forces along the borders of ${territory}.`;
      } else {
        return `More savage warriors have been enlisted in ${territory} to bolster the ${adjective} horde, no doubt lured by promises of plunder.`;
      }
    case "Eudaemonia of Rheims":
      if (bias === "friendly") {
        return `${territory} rejoices, no doubt, at the build up of ${adjective} forces there.`;
      } else {
        return `The ${faction} are recruiting again. They say it is for the defense of ${territory}.`;
      }
    case "Athaloc of Smyrna":
      if (bias === "friendly") {
        return `${territory} breathes a sigh of relief as ${leader} augments the ${adjective} defenses there.`;
      } else {
        return Math.random() < 0.5
          ? `${territory} groans under new taxation as ${leader} strengthens ${pronoun} forces.`
          : `In ${territory}, slaves and vagabonds are lured to join the ${faction}, while decent folk must foot the bill.`;
      }
  }
}
