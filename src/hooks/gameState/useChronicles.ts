import { useState, useCallback } from "react";

import { ChatEntry, Character, BattleReport } from "@/types/gameTypes";
import { chroniclers, initialChronicles } from "@/data/chronicles";
import { getDate } from "@/lib/time";

export function useChronicles() {
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
    resetChronicles,
    setAdviserIndex,
    setHasChangedFromEudaemonia,
  };
}
