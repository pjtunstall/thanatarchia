import { Faction, Character } from "@/types/gameTypes";
import { randomItem } from "@/lib/utils";
import {
  actions,
  benefactors,
  weapons,
  victims1,
  victims2,
  qualities,
  relatives,
  adjectives,
  scapegoats,
  epithets,
  randomLombardName,
  randomRomanName,
  randomOstrogothName,
  randomVisigothName,
  randomVandalName,
  randomGepidName,
} from "@/data/leaders.ts";

export function initializeLeaders(factions: Faction[]): Character[] {
  return factions.map((faction) => {
    const leaderTemplate =
      Math.random() < 0.5 ? faction.leader.male : faction.leader.female;
    const leader = { ...leaderTemplate };

    switch (faction.name) {
      case "Gepids":
        leader.name = randomGepidName(leader.gender);
        break;
      case "Lombards":
        leader.name = randomLombardName(leader.gender);
        break;
      case "Romans":
        leader.name = randomRomanName(leader.gender);
        break;
      case "Ostrogoths":
        leader.name = randomOstrogothName(leader.gender);
        break;
      case "Visigoths":
        leader.name = randomVisigothName(leader.gender);
        break;
      case "Vandals":
        leader.name = randomVandalName(leader.gender);
        break;
    }

    if (faction.name !== "Romans") {
      const epithet = randomItem(epithets);
      leader.name = `${leader.name} the ${epithet}`;
    }

    leader.biography = writeBiography(leader, faction);

    return leader;
  });
}

function getPronouns(gender: string) {
  if (gender === "male") {
    return { They: "He", they: "he", their: "his", them: "him" };
  } else {
    return { They: "She", they: "she", their: "her", them: "her" };
  }
}

function writeBiography(leader: Character, faction: Faction): string {
  const { They, they, their } = getPronouns(leader.gender);

  if (faction.name === "Bagaudae") {
    return `The Dread Bagauda, ${leader.name}, is a name spoken in hushed tones by patricians and landowners everywhere. More than once, slaves have flocked to ${their} call. Some say ${they}'s a myth, a story told to frighten children. But you don't want to bet on that.`;
  }

  let title: string;
  if (faction.type === "imperial") {
    title = leader.gender === "male" ? "Emperor" : "Empress";
  } else {
    title = leader.gender === "male" ? "King" : "Queen";
  }

  const scapegoat = randomItem(scapegoats);
  const action = randomItem(actions);
  const relative = randomItem(relatives);
  const adjective = randomItem(adjectives);
  const weapon = randomItem(weapons);

  const quality = randomItem(qualities);

  const benefactor = randomItem(benefactors);
  const victim1 = randomItem(victims1);
  const victim2 = randomItem(victims2);

  const fullName = leader.name;
  const firstName = fullName.split(" ")[0];

  let famedFor: string;
  if (Math.random() < 0.5) {
    famedFor = `${title} ${firstName} is renowned for ${their} ${quality} and how much ${they} cares for ${benefactor}.`;
  } else {
    const threat =
      Math.random() < 0.5
        ? `—and YOU if you don't play your cards right.`
        : `—and YOU if you have a problem with that?`;
    famedFor = `${title} ${firstName} is widely respected for ${their} persecution of ${victim1}, ${victim2}${threat}`;
  }

  return `${fullName}, by the grace of God, ${title} of the ${
    faction.name
  }, was unanimously elected after ${scapegoat} tragically ${action} ${their} ${relative} with a ${adjective} ${weapon}. (Particularly harrowing for young ${firstName}, as ${They.toLowerCase()} was the only witness.) ${famedFor}`;
}
