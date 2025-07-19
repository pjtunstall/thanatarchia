import { useState, useCallback, useEffect } from "react";
import { Chronicle, ChronicleEntry } from "@/types/gameTypes";
import { chroniclers } from "@/data/gameData";

const initialChronicles: Chronicle[] = [
  {
    id: "1",
    chronicler: "John of Colchis",
    bias: "friendly",
    entry:
      "Our most glorious and wise leader has graciously expanded our blessed territories, bringing civilization to the grateful lands beyond the Rhine.",
    turn: 1,
  },
  {
    id: "2",
    chronicler: "Eudaemonia of Rheims",
    bias: "hostile",
    entry:
      "The barbarous Alamanni continue their senseless raids, pillaging what civilized men have built with crude savagery.",
    turn: 1,
  },
  {
    id: "3",
    chronicler: "Athaloc of Smyrna",
    bias: "hostile",
    entry:
      "These uncouth tribes, lacking in both letters and manners, persist in their primitive territorial disputes, as is their wont.",
    turn: 1,
  },
  {
    id: "4",
    chronicler: "Priscilla of Byzantium",
    bias: "hostile",
    entry:
      "I never knew the old Ravenna before the Gothic War. Constantinople suited me better...",
    turn: 1,
  },
];

export const useChronicles = (currentTurn: number) => {
  const [chronicles, setChronicles] = useState<Chronicle[]>(initialChronicles);
  const [finalChronicles, setFinalChronicles] = useState<Chronicle[]>([]);
  const [adviserIndex, setAdviserIndex] = useState(
    Math.floor(Math.random() * chroniclers.length)
  );

  const [battleMessageQueue, setBattleMessageQueue] = useState<
    ChronicleEntry[]
  >([]);
  const battleMessage = battleMessageQueue[0] ?? null;
  const enqueueBattleMessage = (entry: ChronicleEntry) => {
    setBattleMessageQueue((prev) => [...prev, entry]);
  };
  const dequeueBattleMessage = () => {
    setBattleMessageQueue((prev) => prev.slice(1));
  };

  const addChronicleEntry = useCallback(
    (entry: string, bias: "friendly" | "hostile") => {
      const newEntry: Chronicle = {
        id: String(Date.now()), // Use timestamp for unique IDs
        chronicler:
          chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
        bias,
        entry,
        turn: currentTurn,
      };
      setChronicles((prev) => [...prev, newEntry]);
    },
    [currentTurn]
  );

  const generateFinalChronicles = useCallback(
    (status: "victory" | "defeat") => {
      const chroniclerEntries = {
        "John of Colchis": {
          victory: [
            "Thus concludes the most glorious chronicle of our beloved sovereign, whose wisdom surpasses Solomon and whose valor eclipses that of great Caesar himself! The very angels rejoice at this triumph!",
            "Behold! Our most blessed leader, guided by Providence, has united the world under one righteous banner - surely this is the work of the Almighty through His chosen vessel!",
            "History shall sing eternal praise of our magnificent ruler, whose conquests have brought the light of civilization to every barbarian shore and heretical stronghold!",
          ],
          defeat: [
            "Alas! Though cruel fate has struck down our noble leader, their righteous deeds shall shine like stars eternal, inspiring future generations to similar greatness!",
            "The angels themselves weep at this tragedy, yet our sovereign's name shall be remembered with honor when lesser men are dust and forgotten!",
            "Though darkness has fallen upon us, the chronicle of our leader's virtue shall be a beacon of hope for all who follow in their blessed footsteps!",
          ],
        },
        "Eudaemonia of Rheims": {
          victory: [
            "Thus culminate the conquests of an upstart warlord, who through sheer brutality has trampled the ancient ways. The old gods must laugh at such crude 'victory.'",
            "These northern savages style themselves conquerors, yet they know nothing of true honor or the warrior's code - mere raiders grown fat on plunder.",
            "Aye, they have won through treachery and numbers, but what glory is there in defeating soft Romans and their heretical priests?",
          ],
          defeat: [
            "The ravens feast well today! These pretenders have met their doom as all oath-breakers must - the ancient laws are satisfied once more.",
            "Thus perish all who would claim dominion without first proving themselves in single combat - the gods have spoken through steel and blood!",
            "Good riddance to these upstarts! Now perhaps true warriors can restore the proper order, where strength of arm matters more than counting coins.",
          ],
        },
        "Athaloc of Smyrna": {
          victory: [
            "Most curious! These barbarian chieftains, despite their obvious theological ignorances regarding the homoousios, have demonstrated remarkable strategic acumen in their conquests.",
            "One must note, with scholarly detachment, that while these rulers clearly embrace the Arian heresy, their military successes suggest divine providence works in mysterious ways.",
            "Fascinating how these unlettered tribes, who doubtless confuse the hypostatic union with their pagan trinities, have nonetheless achieved what learned strategists deemed impossible!",
          ],
          defeat: [
            "As anticipated by any student of Aristotelian logic, these barbarians' theological deficiencies have manifested in their inevitable strategic failures - heresy begets defeat.",
            "Most predictable! Their rejection of Chalcedonian Christology naturally led to flawed reasoning in matters military - how can one expect victory from Arian sympathizers?",
            "The scholarly consensus proves correct once again: those who embrace the Miaphysite controversy and other doctrinal errors cannot hope to govern effectively.",
          ],
        },
        "Priscilla of Byzantium": {
          victory: [
            "How remarkable that these western barbarians, despite their crude Arian blasphemies and rejection of proper iconoclastic doctrine, have stumbled into success through sheer barbarous persistence!",
            "Most amusing! These Latin heretics, who stubbornly cling to their papal supremacy delusions and reject the Emperor's divine authority, have somehow prevailed through brute force alone.",
            "Truly the Lord works in mysterious ways, granting victory even to these schismatic Goths who refuse the true Chalcedonian faith and persist in their Miaphysite abominations!",
          ],
          defeat: [
            "Justice at last! These western heretics, with their barbarous rejection of proper Chalcedonian doctrine and their pope-worshipping superstitions, have received their due punishment!",
            "The Pantocrator has spoken! No good can come to those who embrace the Latin heresy and reject the authority of the true Roman Emperor in Constantinople!",
            "Behold how the Almighty punishes those who would deny the procession of the Spirit from the Father alone - let this be a lesson to all Arian sympathizers!",
          ],
        },
      };

      const finalEntries = chroniclers.map((chronicler, i) => ({
        id: `final-${chronicler.name}`,
        chronicler: chronicler.name,
        bias:
          i === adviserIndex
            ? "friendly"
            : ("hostile" as "friendly" | "hostile"),
        entry:
          chroniclerEntries[
            chronicler.name as keyof typeof chroniclerEntries
          ]?.[status]?.[Math.floor(Math.random() * 3)] ||
          `The chronicler ${chronicler.name} remains silent on these matters.`,
        turn: currentTurn,
      }));

      setFinalChronicles(finalEntries);
    },
    [currentTurn]
  );

  const resetChronicles = useCallback(() => {
    setChronicles(initialChronicles);
    setFinalChronicles([]);
    setAdviserIndex(Math.floor(Math.random() * chroniclers.length));
  }, []);

  return {
    chronicles,
    finalChronicles,
    adviserIndex,
    battleMessage,
    battleMessageQueue,
    enqueueBattleMessage,
    dequeueBattleMessage,
    addChronicleEntry,
    generateFinalChronicles,
    resetChronicles,
  };
};
