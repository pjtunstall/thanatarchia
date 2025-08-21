import { Character, ChatEntry } from "@/types/gameTypes";
import { costOfRecruiting, costOfSpying } from "@/data/gameData";

export function howChat(adviser: Character, player: Character): ChatEntry[] {
  const adviserName = adviser.name;
  let lordOrLady: string;
  if (player.gender === "male") {
    lordOrLady = "Lord";
  } else {
    lordOrLady = "Lady";
  }

  return [
    {
      author: player,
      statement: `How do I play this 'game', ${adviserName}?`,
    },
    {
      author: adviser,
      statement: `Well, my ${lordOrLady}, first find your territory. If you look at the Status section of your state records, you'll see the name of your people and the color of their emblem. There you will also see a list of the territories you own. These are the dots on the map in your color.`,
    },
    {
      author: player,
      statement: `Ok, ${adviserName}, then what?`,
    },
    {
      author: adviser,
      statement: `Select any territory on the map and you'll see its neighbors. Choose your own to see more choices. Click elsewhere on the map to return to the Help menu. Now, in Actions, with your territory chosen, you'll find some options. If you can afford it, you can recruit in this territory.`,
    },
    {
      author: player,
      statement: `How will I know if I can afford it?`,
    },
    {
      author: adviser,
      statement: `It will be unavailable if you can't. Status shows how much treasure you have. Recruitment costs ${costOfRecruiting} solidi.`,
    },
    {
      author: player,
      statement: `What about spying? What does that do?`,
    },
    {
      author: adviser,
      statement: `Spying will set you back ${costOfSpying} solidi. It can tell you the strength of a rival garrison. To spy, you must have an enemy territory selected.`,
    },
    {
      author: player,
      statement: `Who are my enemies?`,
    },
    {
      author: adviser,
      statement: `Everyone, my ${lordOrLady}.`,
    },
    {
      author: player,
      statement: `How so?`,
    },
    {
      author: adviser,
      statement: `That is the game you play, my ${lordOrLady}. They hate you for what you do and for what you fail to do.`,
    },
    {
      author: player,
      statement: `Is there any way out?`,
    },
    {
      author: adviser,
      statement: `Several, your Majesty. Generally quite plainful. You'll find them all too easily.`,
    },
    {
      author: player,
      statement: `Let's get on with it then.`,
    },
    {
      author: adviser,
      statement: `If you select a territory you own and go to Actions, there will be a choice to attack. Click on the Attack bar to see neighboring territories. The Up chevron at the right of a neighboring land's name is to assign more troops to attack it. The Down chevron returns them to your pool of available troops.`,
    },
    {
      author: player,
      statement: `But I did attack and nothing happened!`,
    },
    {
      author: adviser,
      statement: `Ha, no, sorry, I should have said: that is merely to assign troops to an attack. You can schedule one or more attacks in a turn, but they will only be executed when you click End Turn.`,
    },
    {
      author: player,
      statement: `And Reinforce?`,
    },
    {
      author: adviser,
      statement: `As you capture more territories, you'll be able to send troops between them. Again, the Up chevron moves troops the neighboring territory; the Down chevron brings them back to the selected territory. But reinforments happen immediately. So you can perform any number of them in a turn.`,
    },
    {
      author: player,
      statement: `What about Religion?`,
    },
    {
      author: adviser,
      statement: `A fraught topic, my Liege. Least said, soonest mended.`,
    },
    {
      author: player,
      statement: `Is there anything else I should know.`,
    },
    {
      author: adviser,
      statement: `Much, your Majesty. But you will learn. In parting, might I recommend you take a look at the Chronicles from time to time? Most of them are badly written and contain fraudulent or heretical nonsense, but still, you may gain some insight if you read between the lines. Clear?`,
    },
    {
      author: player,
      statement: `As mud, ${adviserName}. But thanks...`,
    },
  ];
}
