import { useState, useCallback } from "react";

import { ChatEntry, Character, BattleReport } from "@/types/gameTypes";
import { chroniclers, initialChronicles } from "@/data/chronicles";
import { getDate } from "@/lib/time";

export function useChronicles(currentTurn: number) {
  const [chronicles, setChronicles] = useState<ChatEntry[]>(initialChronicles);
  const [adviserIndex, setAdviserIndex] = useState(
    Math.floor(Math.random() * chroniclers.length)
  );
  const [hasChangedFromEudaemonia, setHasChangedFromEudaemonia] =
    useState(false);

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
    (author: Character, statement: string, turn: number) => {
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
        const options = finalChronicleStatements[author.name]?.[status];
        const statement =
          options?.[Math.floor(Math.random() * options.length)] ??
          `${author} remains silent on these matters.`;

        return {
          author,
          date: getDate(currentTurn),
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
    hasChangedFromEudaemonia,
    enqueueBattleMessage,
    dequeueBattleMessage,
    addChronicleEntry,
    generateFinalChronicles,
    resetChronicles,
    setAdviserIndex,
    setHasChangedFromEudaemonia,
  };
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
