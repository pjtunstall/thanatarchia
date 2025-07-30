import chroniclerScribe from "@/assets/chroniclers/chronicler-scribe-male.jpg";
import chroniclerPoet from "@/assets/chroniclers/chronicler-poet-female.jpg";
import chroniclerScholar from "@/assets/chroniclers/chronicler-scholar-male.jpg";
import chroniclerNun from "@/assets/chroniclers/chronicler-nun-female.jpg";
import chroniclerBard from "@/assets/chroniclers/chronicler-bard-female.jpg";

import { Character, ChatEntry, Gender, Faction } from "@/types/gameTypes";
import { getDate } from "@/lib/time";
import { uninitialBold } from "@/lib/utils";

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
        "O blessed turmoil! O what troubled times! I feel such a strange warming of the heart. Does this mean... Can it really be? COME ON APOCALYPSE! (Now, what would be better: to die by impaling or by fire? Or by an angel's flaming sword? But would that count as martyrdom? I must pray for more answers...)",
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
  {
    name: "Eudaemonia of Rheims",
    gender: "female" as Gender,
    image: chroniclerPoet,
    biography:
      "World-weary poet, Eudaemonia 'the Jackdaw' of Rheims, casts a jaded eye over this twilight of civilization. She puts her classical education to good use, penning ransom notes for local tyrants. They're always in impeccable hexameters, although she fears the allusions to Cicero may me lost on some warlords.",
  },
];

const agilu: Character = {
  name: "Agilu Agisildsdaughter",
  gender: "female",
  image: chroniclerBard,
  biography:
    "Vandal 'slam-bard', Agilu, keeps it real on the streets of Carthage. She's been among Romans and Rugians, rulers so lavish. She's been among heathens and heroes when hard fights went down. She sings of Attila the Open-Handed. She'll sing of you too. 'Peerless and bold.' (Payment in gold.)",
};

export const chroniclersAfterTheIncident = [...chroniclers.slice(0, 3), agilu];

type battleChronicleProps = {
  chronicler: Character;
  bias: string;
  success: boolean;
  winners: string;
  losers: string;
  territoryName: string;
  leaderCharacter: Character;
};

export const battleChronicle = ({
  chronicler,
  bias,
  success,
  winners,
  losers,
  territoryName,
  leaderCharacter,
}: battleChronicleProps): string => {
  let territory = uninitialBold(territoryName);
  let attackers: string;
  let attacker: string;
  let defenders: string;
  let defender: string;
  if (success) {
    attackers = uninitialBold(winners);
    attacker = uninitialBold(winners.slice(0, -1));
    defenders = uninitialBold(losers);
    defender = uninitialBold(losers.slice(0, -1));
  } else {
    defenders = uninitialBold(winners);
    defender = uninitialBold(winners.slice(0, -1));
    attackers = uninitialBold(losers);
    attacker = uninitialBold(losers.slice(0, -1));
  }
  const leader = uninitialBold(leaderCharacter.name);
  const their = leaderCharacter.gender === "male" ? "his" : "her";

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
          let msg = `Today, God saw fit to punish the ${attackers} for their impudent assault on the ${defenders} in ${territory}.`;
          if (attackers !== "Romans" && defenders !== "Romans") {
            msg += " One senses Byzantine training at work here.";
          }
          return msg;
        }
      }
    case "Eudaemonia of Rheims":
      if (bias === "friendly") {
        if (success) {
          return Math.random() < 0.5
            ? `They say that the ${attackers} took ${territory} from the ${defenders} today. One feels obliged to offer one's congratulations, although I doubt my contribution will be heard much above the belches of the victory feast, or such 'panegyrics' as their bards declaim.`
            : `In an act of almost divine benificence, our great leader, ${leader}, has chosen to expand ${attacker} territory, bringing civilization to the grateful folk of ${territory}. (Those that survive ${their} wrath, of course. And the ensuing famine. And the ensuing plague.)`;
        } else {
          return `Another season, another chronicle. Let's get it over with. The such-and-such (${attackers})—ahem, our beloved protectors, the ${attackers}—failed to gain whatever it's called (${territory}) from the so-and-sos (${defenders}). And the shadows lengthen.`;
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
          return `A reckless ${attacker} incursion into ${territory} has been repulsed by the ${defenders}. Indeed lack of faith begets folly: the dull wit that engenders sin finding a natural counterpart in such doltish stratagems.`;
        }
      }
    case "Agilu Agisildsdaughter":
      // Only the hostile case needs implementing unless, atsome point, I decide to let this Easter-egg character also be an adviser.
      if (success) {
        return `In battle have fallen many brave ${defenders}, defending their homes in ${territory} land. ${attackers}, in blood, their blades have reddened. A dark day indeed as the sun goes down.`;
      } else {
        return `Today the raven will dine on ${attackers}. The great ${defenders} won glory in ${territory} land. The ${leaderCharacter.gender} === "male" ? "lord" : "lady" of ${attacker} won't be laughing now.`;
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
    case "Agilu Agisildsdaughter":
      return `Flock now to the ${faction} fighters aplenty. Lavish the largess of their leader, I'm told.`;
  }
}

type endChronicleProps = {
  chronicler: Character;
  bias: string;
  success: boolean;
  player: Character;
  faction: Faction;
};

export const endChronicle = ({
  chronicler,
  bias,
  success,
  player,
  faction,
}: endChronicleProps): string => {
  let They: string;
  let they: string;
  let their: string;
  let them: string;
  let themselves: string;
  let monarch: string;

  if (player.gender === "male") {
    They = "He";
    they = "he";
    their = "his";
    them = "him";
    themselves = "himself";
    monarch = "King";
  } else {
    They = "She";
    they = "she";
    their = "her";
    them = "her";
    themselves = "herself";
    monarch = "Queen";
  }

  switch (chronicler.name) {
    case "John of Colchis":
      if (bias === "friendly") {
        if (success) {
          return `O happy day! After many trials, our beloved sovereign, ${player.name}, has established such a mighty realm that none may assail it. God bless you, ${player.name}!`;
        } else {
          return `Alas! Though cruel fate taken our noble leader, ${their} deeds will shine down the ages as an inspiration to all. It is said that ${they} died as ${they} lived, cut down in the thick of battle. In a way, surely, that is the greater victory. I wouldn't mind being cut down in the thick of battle, to be pieced by spears or hacked up with a big sword. Although... I must say, I am rather gravitating towards being torn apart by wild horses. I know some friends who were martyred that way in Scythia and it does sound rather exhilarating.`;
        }
      } else {
        if (success) {
          return `Hard times are upon us. ${player.name} has led the ${faction.name} to victory, carving out a realm by violence and persecution of God's children. We can only pray that ${they} will get their just deserts in the end.`;
        } else {
          return `Hallelluja! God has answered our prayers. The tyrant ${player.name} is dead. The people rejoice. I cannot describe how happy we are. Such songs of joy. Such exhultation. I saw ${their} body dragged through the streets by a jeering mob, stray dogs in tow, waiting their turn. Even the ${faction.name} cast stones. But this gets me thinking... I've always focused on the pain side of martyrdom, but actually there's a whole world of humiliation to explore. Note to self: say more prayers about this.`;
        }
      }
    case "Priscilla of Byzantium":
      if (bias === "friendly") {
        if (success) {
          return `Classic pincer move. ${They}'s a military genius. No doubt about it now: trained in Byzantium. Must have been.`;
        } else {
          return `Such a gallant effort. ${They} went down fighting, like true Romans, whatever their origins. Honestly, the only word that comes to mind is Byzantine. Ah Byzantium... Now, what was I talking about?`;
        }
      } else {
        if (success) {
          return `Bravo to ${monarch} ${
            player.name
          }! And what a stylish way to triumph, too. I always did like ${them}. Didn't I always say they were a good ${monarch}? You don't remember? Well I'm saying it now. But what a palaver, all these conquests. It's hard to keep track of them. I suppose we shall all be speaking ${faction.name.slice(
            0,
            -1
          )} now.`;
        } else {
          return `Ha, there goes ${player.name}, and good riddance, I say. I never did like ${them}. Didn't I always say there was something a bit off about ${them}? You don't remember? Well I'm saying it now.`;
        }
      }
    case "Eudaemonia of Rheims":
      if (bias === "friendly") {
        if (success) {
          return `Another year, another turn of the world's wheel. Another conqueror. Enjoy your hour, ${player.name}. I suppose that is your part in the clockwork.`;
        } else {
          return `In this year, we must bid our farewells to ${monarch} ${player.name}, who showed such promise. What a dashing figure they used to make on their steed. I wonder what they'll do with the statue.`;
        }
      } else {
        if (success) {
          return `Yet more lands have fallen to the ${
            faction.name
          }. They seem unstoppable now. The word emperor is being bandied about. I suppose we shall be enjoying a Pax ${faction.name.slice(
            0,
            -1
          )} now—which will be fantastic for those of us who don't get chopped into little pieces.`;
        } else {
          return `I picture ${player.name} sitting now on the porch of the villa ${they} received in the terms of surrender. It's magic hour. Late summer. The time when ripeness turns to rot. The neighbors have come over to hear the same old stories: the time when ${they} was a conqueror, the time ${they} nearly held the world in ${their} hands. What a character, they'll chuckle to themselves later. Now those hands hold a cup of Falernian wine, and another cup of Falernian wine... But the light is already fading on the Pontine slopes. Does anyone remember the ${faction.name}?`;
        }
      }
    case "Athaloc of Smyrna":
      if (bias === "friendly") {
        if (success) {
          return `Well, I think congratulations are in order. ${player.name} has done a absolutely stirling job of leading the ${faction.name} to victory. I for one will be raising a glass of water if I can find a moment between prayers.`;
        } else {
          return `Oh what a shame. It seems now certain that the reports are true. The ${faction.name} made a pretty decent last stand, by all accounts, and ${player.name} acquitted ${themselves} magnificantly. Hacked to bits, they say. I look forward to watching it when the mimes come round.`;
        }
      } else {
        if (success) {
          return `How curious! ${player.name} has read the classics but has not understood them. I doubt ${they} got much further than the first chapter of Vegetius. And yet, fascinating how these loutish ${faction.name} have eked out a realm after all.`;
        } else {
          return `Most predictable! Anyone acquainted with even the most basic hermeneutics could have seen this coming. The heretic ${faction.name} have finally had the good sense to surrender. Rumor has it, ${player.name}, tripped and fell on ${their} own spear while attempting to flee. I leave it to the reader to decide what credence to give that.`;
        }
      }
    case "Agilu Agisildsdaughter":
      // Never an adviser, hence never technically friendly, but she probably would celebrate success.
      if (success) {
        return `In storm of swords ${they} stole lives away, ${player.name} in battle play. I'll sing ${their} name, I'll bring bring ${them} fame. O how ${they}'ll cause ${their} enemies pain. Now pay your bard, your loyal minstrel—O $*!&, what rhymes with minstrel...`;
      } else {
        return `Haha, you're dead, ${player.name}. Blood, blood, blood, blood. Blood, blood, blood. Oooooo, wonderful blood! That'll be 12 solidi and sixpence.`;
      }
  }
};
