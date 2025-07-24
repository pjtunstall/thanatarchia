import chroniclerMonk from "@/assets/chronicler-monk-male.jpg";
import chroniclerScribe from "@/assets/chronicler-scribe-male.jpg";
import chroniclerMosaic from "@/assets/chronicler-mosaic-female.jpg";
import chroniclerScholar from "@/assets/chronicler-scholar-male.jpg";
import chroniclerNun from "@/assets/chronicler-nun-female.jpg";

import { Character } from "@/types/gameTypes";

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

export const battleChronicle = (
  chronicler: Character,
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
