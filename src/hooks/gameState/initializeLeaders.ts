import { Faction, Character } from "@/types/gameTypes";
import { randomItem } from "@/data/gameData";
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
  randomOstrogothName,
  randomVisigothName,
} from "@/data/leaders.ts";

export function initializeLeaders(factions: Faction[]): Character[] {
  return factions.map((faction) => {
    const leader =
      Math.random() < 0.5 ? faction.leader.male : faction.leader.female;

    switch (faction.name) {
      case "Ostrogoths":
        leader.name = randomOstrogothName(leader.gender);
        break;
      case "Visigoths":
        leader.name = randomVisigothName(leader.gender);
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

function writeBiography(leader: Character, faction: Faction): string {
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

  let subjectPronoun: string;
  let possessivePronoun: string;

  if (leader.gender === "male") {
    subjectPronoun = "He";
    possessivePronoun = "his";
  } else {
    subjectPronoun = "She";
    possessivePronoun = "her";
  }

  const fullName = leader.name;
  const firstName = fullName.split(" ")[0];

  let famedFor: string;
  if (Math.random() < 0.5) {
    famedFor = `${title} ${firstName} is renowned for ${possessivePronoun} ${quality} and patronage of ${benefactor}.`;
  } else {
    const threat =
      Math.random() < 0.5
        ? `—and YOU if you don't play your cards right.`
        : `—and YOU if you have a problem with that?`;
    famedFor = `${title} ${firstName} is widely respected for ${possessivePronoun} persecution of ${victim1}, ${victim2}${threat}`;
  }

  return `${fullName}, by the grace of God, ${title} of the ${
    faction.name
  }, was unanimously elected after ${scapegoat} tragically ${action} ${possessivePronoun} ${relative} with a ${adjective} ${weapon}. (Particularly harrowing for young ${firstName}, as ${subjectPronoun.toLowerCase()} was the only witness.) ${famedFor}`;
}
