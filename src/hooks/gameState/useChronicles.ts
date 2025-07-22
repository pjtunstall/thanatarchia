import { useState, useCallback } from "react";

import { chroniclers, getDate } from "@/data/gameData";
import { ChatEntry, Character, BattleReport } from "@/types/gameTypes";

export function useChronicles(currentTurn: number) {
  const [chronicles, setChronicles] = useState<ChatEntry[]>(initialChronicles);
  const [adviserIndex, setAdviserIndex] = useState(
    Math.floor(Math.random() * chroniclers.length)
  );

  const [battleMessageQueue, setBattleMessageQueue] = useState<BattleReport[]>(
    []
  );
  const battleMessage = battleMessageQueue[0] ?? null;

  const enqueueBattleMessage = (entry: BattleReport) => {
    setBattleMessageQueue((prev) => [...prev, entry]);
  };
  const dequeueBattleMessage = () => {
    setBattleMessageQueue((prev) => prev.slice(1));
  };

  const addChronicleEntry = useCallback(
    (author: Character, statement: string, turn) => {
      const newEntry: ChatEntry = {
        author,
        date: getDate(turn),
        statement,
      };
      setChronicles((prev) => [...prev, newEntry]);
    },
    []
  );

  const generateFinalChronicles = useCallback(
    (status: "victory" | "defeat", turn: number) => {
      const finalEntries: ChatEntry[] = chroniclers.map((chronicler, i) => {
        const author = chronicler;
        const tone = i === adviserIndex ? "friendly" : "hostile";
        const options = finalChronicleStatements[author.name]?.[status];
        const statement =
          options?.[Math.floor(Math.random() * options.length)] ??
          `${author} remains silent on these matters.`;

        return {
          author,
          date: getDate(turn),
          statement,
        };
      });

      setChronicles((prev) => [...prev, ...finalEntries]);
    },
    [adviserIndex]
  );

  const resetChronicles = useCallback(() => {
    setAdviserIndex(Math.floor(Math.random() * chroniclers.length));
    setChronicles(initialChronicles);
  }, []);

  return {
    chronicles,
    adviserIndex,
    battleMessage,
    battleMessageQueue,
    enqueueBattleMessage,
    dequeueBattleMessage,
    addChronicleEntry,
    generateFinalChronicles,
    resetChronicles,
  };
}

function getChroniclerByName(chroniclerName: string): Character {
  return chroniclers.find((c) => c.name === chroniclerName);
}

function initialChronicles(): ChatEntry[] {
  return [
    {
      author: getChroniclerByName("Priscilla of Byzantium"),
      date: getDate(1),
      statement:
        "I never knew the old Ravenna before the Gothic Wars. Constantinople suited me better...",
    },
    {
      author: getChroniclerByName("Eudaemonia of Rheims"),
      date: getDate(1),
      statement:
        "The barbarous Alamanni continue their senseless raids, pillaging what civilized men have built with crude savagery.",
    },
    {
      author: getChroniclerByName("Athaloc of Smyrna"),
      date: getDate(1),
      statement:
        "The latter days are surely upon us when the heretic and the apostate, little better than the pagan, establish realms amidst the ruins.",
    },
    {
      author: getChroniclerByName("John of Colchis"),
      date: getDate(1),
      statement:
        "Our most glorious and wise leader has graciously expanded our blessed territories, bringing civilization to the grateful lands beyond the Rhine.",
    },
    {
      author: getChroniclerByName("Priscilla of Byzantium"),
      date: getDate(1),
      statement:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit purus sit amet sapien placerat tincidunt. Sed pellentesque velit nunc, sit amet consectetur diam sagittis vitae. Aenean quis ullamcorper magna. Vivamus congue risus ac ante vestibulum, et laoreet elit condimentum. Nulla nec ligula metus. Morbi tristique erat vel enim pretium congue. Donec ut velit neque. Morbi gravida rhoncus ornare. Integer quis mi commodo, laoreet ligula a, elementum turpis. Suspendisse sit amet nulla nec arcu porttitor scelerisque id viverra est. Mauris mollis dolor quis lacus laoreet porta. Sed sagittis odio sapien, ut tincidunt erat dignissim nec. Curabitur quam orci, aliquam vitae cursus quis, ultricies a diam. Sed iaculis nulla fermentum, consectetur orci in, vestibulum ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
  ];
}

const finalChronicleStatements: Record<
  string,
  Record<"victory" | "defeat", string[]>
> = {
  "John of Colchis": {
    victory: [
      "Thus concludes the most glorious chronicle of our beloved sovereign...",
      "Behold! Our most blessed leader, guided by Providence...",
      "History shall sing eternal praise of our magnificent ruler...",
    ],
    defeat: [
      "Alas! Though cruel fate has struck down our noble leader...",
      "The angels themselves weep at this tragedy...",
      "Though darkness has fallen upon us...",
    ],
  },
  "Eudaemonia of Rheims": {
    victory: [
      "Thus culminate the conquests of an upstart warlord...",
      "These northern savages style themselves conquerors...",
      "Aye, they have won through treachery and numbers...",
    ],
    defeat: [
      "The ravens feast well today!",
      "Thus perish all who would claim dominion...",
      "Good riddance to these upstarts!",
    ],
  },
  "Athaloc of Smyrna": {
    victory: [
      "Most curious! These barbarian chieftains...",
      "One must note, with scholarly detachment...",
      "Fascinating how these unlettered tribes...",
    ],
    defeat: [
      "As anticipated by any student of Aristotelian logic...",
      "Most predictable! Their rejection of Chalcedonian Christology...",
      "The scholarly consensus proves correct once again...",
    ],
  },
  "Priscilla of Byzantium": {
    victory: [
      "How remarkable that these western barbarians...",
      "Most amusing! These Latin heretics...",
      "Truly the Lord works in mysterious ways...",
    ],
    defeat: [
      "Justice at last! These western heretics...",
      "The Pantocrator has spoken!",
      "Behold how the Almighty punishes those...",
    ],
  },
};
