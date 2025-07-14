// import { useCallback, useState } from "react";

// import { initializeLeaders } from "@/hooks/gameState/initializeLeaders";
// import { factions, adjacentTerritories } from "@/data/gameData";
// import { useGameCore } from "@/hooks/gameState/useGameCore";
// import { useCombat } from "@/hooks/gameState/useCombat";
// import { useChronicles } from "@/hooks/gameState/useChronicles";

// export const useGameState = () => {
//   const gameCore = useGameCore();
//   const chronicles = useChronicles(gameCore.currentTurn);
//   const combat = useCombat({
//     territories: gameCore.territories,
//     playerIndex: gameCore.playerIndex,
//     adjacentTerritories,
//     factionTerritories: gameCore.factionTerritories,
//     factions,
//     factionTreasures: gameCore.factionTreasures,
//     updateTerritories: gameCore.updateTerritories,
//     setFactionTreasures: gameCore.setFactionTreasures,
//     addChronicleEntry: chronicles.addChronicleEntry,
//     onTurnEnd: () => {
//       generateResources();
//       combat.executeAITurn();
//       gameCore.setCurrentTurn((prev) => prev + 1);
//       gameCore.setSelectedTerritory(null);
//       gameCore.checkGameStatus();
//     },
//   });

//   // Initialize faction leaders
//   const [factionLeaders, setFactionLeaders] = useState(
//     initializeLeaders(factions)
//   );

//   // Resource generation
//   const generateResources = useCallback(() => {
//     gameCore.setFactionTreasures((prev) => {
//       const updated = prev.map((t, i) => {
//         const income = gameCore.factionTerritories[i].length * 20;
//         if (i === gameCore.playerIndex) {
//           chronicles.addChronicleEntry(
//             `Our territories have generated ${income} solidi in tribute and taxes.`,
//             "friendly"
//           );
//         }
//         return t + income;
//       });
//       return updated;
//     });
//   }, [
//     gameCore.factionTerritories,
//     gameCore.playerIndex,
//     chronicles.addChronicleEntry,
//   ]);

//   // Reset game
//   const resetGame = useCallback(() => {
//     gameCore.resetGame();
//     chronicles.resetChronicles();
//     setFactionLeaders(initializeLeaders(factions));
//   }, [gameCore.resetGame, chronicles.resetChronicles]);

//   return {
//     // Core state
//     ...gameCore,
//     factionLeaders,

//     // Chronicles
//     ...chronicles,

//     // Combat
//     ...combat,

//     // Actions
//     resetGame,
//     // ... other actions
//   };
// };

import { useState, useEffect } from "react";

import { Territory, Chronicle, GameStatus } from "@/types/gameTypes";
import {
  factions,
  chroniclers,
  costOfSpying,
  costOfRecruiting,
  territories as initialTerritories,
  adjacentTerritories,
} from "@/data/gameData";
import { initializeLeaders } from "@/hooks/gameState/initializeLeaders";

export const useGameState = () => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(
    null
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [factionLeaders, setFactionLeaders] = useState(
    initializeLeaders(factions)
  );
  const [territories, setTerritories] =
    useState<Territory[]>(initialTerritories);
  const [factionTerritories, setFactionTerritories] = useState<string[][]>(
    factions.map((f) => f.territories)
  );
  const [factionTroops, setFactionTroops] = useState<number[]>(
    factions.map((f) =>
      territories
        .filter((t) => f.territories.includes(t.name))
        .reduce((sum, t) => sum + t.troops, 0)
    )
  );
  const [factionTreasures, setFactionTreasure] = useState<number[]>(
    factions.map((f) => f.treasure)
  );

  const [playerIndex, setPlayerIndex] = useState(
    randomPlayerIndex(factionTerritories)
  );

  const [adviserIndex, setAdviserIndex] = useState(
    Math.floor(Math.random() * chroniclers.length)
  );

  const [chronicles, setChronicles] = useState<Chronicle[]>([
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
      // "How tedious it is to observe these western provinces squabble like children, when true civilization still flourishes in the blessed capital of Constantinople.",
      turn: 1,
    },
  ]);

  const [finalChronicles, setFinalChronicles] = useState<Chronicle[]>([]);

  const generateFinalChronicles = (status: "victory" | "defeat") => {
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

    const finalEntries = chroniclers.map((chronicler) => ({
      id: `final-${chronicler.name}`,
      chronicler: chronicler.name,
      bias: chronicler.bias,
      entry:
        chroniclerEntries[chronicler.name as keyof typeof chroniclerEntries]?.[
          status
        ]?.[Math.floor(Math.random() * 3)] ||
        `The chronicler ${chronicler.name} remains silent on these matters.`,
      turn: currentTurn,
    }));

    setFinalChronicles(finalEntries);
  };

  const checkGameStatus = () => {
    const playerTerritories = factionTerritories[playerIndex].length;
    if (playerTerritories >= 9) {
      generateFinalChronicles("victory");
      setGameStatus("victory");
    } else if (playerTerritories === 0) {
      generateFinalChronicles("defeat");
      setGameStatus("defeat");
    }
  };

  const addChronicleEntry = (entry: string, bias: "friendly" | "hostile") => {
    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler:
        chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias,
      entry,
      turn: currentTurn,
    };
    setChronicles((prev) => [...prev, newEntry]);
  };

  const updateTerritories = (updater: (prev: Territory[]) => Territory[]) => {
    setTerritories((prev) => {
      const updated = updater(prev);

      setFactionTroops(
        factions.map((faction) =>
          updated
            .filter((t) => t.owner === faction.name)
            .reduce((sum, t) => sum + (t.troops || 0), 0)
        )
      );

      setFactionTerritories(
        factions.map((faction) =>
          updated
            .filter((territory) => territory.owner === faction.name)
            .map((territory) => territory.name)
        )
      );

      return updated;
    });
  };

  const handleReinforce = (
    fromTerritoryName: string,
    toTerritoryName: string
  ) => {
    const fromTerritory = territories.find((t) => t.name === fromTerritoryName);
    const toTerritory = territories.find((t) => t.name === toTerritoryName);

    if (
      !fromTerritory ||
      !toTerritory ||
      fromTerritory.owner !== factions[playerIndex].name ||
      toTerritory.owner !== factions[playerIndex].name ||
      !adjacentTerritories[fromTerritoryName]?.includes(toTerritoryName)
    )
      return;

    const reinforcements = Math.min(500, fromTerritory.troops);

    updateTerritories((prev) =>
      prev.map((t) => {
        if (t.name === fromTerritoryName) {
          return { ...t, troops: t.troops - reinforcements };
        }
        if (t.name === toTerritoryName) {
          return { ...t, troops: t.troops + reinforcements };
        }
        return t;
      })
    );
  };

  const handleAttack = (fromTerritoryName: string, toTerritoryName: string) => {
    const fromTerritory = territories.find((t) => t.name === fromTerritoryName);
    const toTerritory = territories.find((t) => t.name === toTerritoryName);

    if (
      fromTerritory.owner !== factions[playerIndex].name ||
      toTerritory.owner === factions[playerIndex].name ||
      !adjacentTerritories[fromTerritoryName]?.includes(toTerritoryName)
    ) {
      return;
    }

    const attackForce = Math.floor(fromTerritory.troops! * 0.8);
    const defenseForce = toTerritory.troops!;

    const attackStrength = attackForce + Math.random() * 500;
    const defenseStrength =
      defenseForce + Math.random() * 500 + (toTerritory.conditionModifier || 0);

    const victory = attackStrength > defenseStrength;

    if (victory) {
      const survivingTroops =
        defenseForce === 0
          ? attackForce
          : Math.floor(attackForce - defenseForce * 0.6);
      updateTerritories((prev) =>
        prev.map((t) => {
          if (t.name === fromTerritoryName) {
            return { ...t, troops: t.troops! - attackForce };
          }
          if (t.name === toTerritoryName) {
            return {
              ...t,
              owner: factions[playerIndex].name,
              troops: survivingTroops,
            };
          }
          return t;
        })
      );

      addChronicleEntry(
        `Our brave warriors have conquered ${toTerritory.name} in glorious battle!`,
        "friendly"
      );
    } else {
      const casualties = Math.floor(Math.random() * 300 + 200);
      updateTerritories((prev) =>
        prev.map((t) =>
          t.name === fromTerritoryName
            ? { ...t, troops: Math.max(0, t.troops! - casualties) }
            : t
        )
      );

      addChronicleEntry(
        `Our forces were repelled from ${toTerritory.name} with heavy losses.`,
        "hostile"
      );
    }

    handleEndTurn();
  };

  const executeAITurn = () => {
    // For each AI faction
    factions.forEach((faction, i) => {
      if (i === playerIndex) return;

      aiRecruitTroops(i);

      // Get AI faction's territories from factionTerritories[i]
      const aiTerritoryNames = factionTerritories[i];

      // For each territory owned by this AI faction
      aiTerritoryNames.forEach((aiTerritoryName) => {
        const aiTerritory = territories.find((t) => t.name === aiTerritoryName);
        if (!aiTerritory) return;

        // Find adjacent territories to this AI territory by name (from your adjacency map)
        const adjacentNames = adjacentTerritories[aiTerritoryName] || [];

        // Filter those adjacent territories owned by the player
        const adjacentPlayerTerritories = adjacentNames
          .map((name) => territories.find((t) => t.name === name))
          .filter((t) => t && t.owner === factions[playerIndex].name);

        if (adjacentPlayerTerritories.length === 0) return;

        // Only consider attacking if AI territory has enough troops
        if (aiTerritory.troops && aiTerritory.troops > 500) {
          // Find weakest adjacent player territory to attack
          const weakestTarget = adjacentPlayerTerritories.reduce(
            (weakest, current) =>
              (current!.troops ?? Infinity) < (weakest!.troops ?? Infinity)
                ? current
                : weakest
          );

          if (weakestTarget && Math.random() > 0.7) {
            executeAIAttack(aiTerritoryName, weakestTarget.name);
          }
        }
      });
    });
  };

  const aiRecruitTroops = (i: number) => {
    if (factionTreasures[i] < costOfRecruiting) return;
    const recruitsPerTerritory = Math.round(500 / factionTerritories[i].length);
    const totalRecruits = recruitsPerTerritory * factions[i].territories.length;

    setTerritories((prevTerritories) => {
      const factionName = factions[i].name;
      const updated = prevTerritories.map((t) => {
        if (t.owner === factionName) {
          return { ...t, troops: t.troops! + recruitsPerTerritory };
        }
        return t;
      });

      setFactionTreasure((prev) => {
        const updated = [...prev];
        updated[i] -= costOfRecruiting;
        return updated;
      });

      setFactionTroops((prev) => {
        const updated = [...prev];
        updated[i] += totalRecruits;
        return updated;
      });

      return updated;
    });
  };

  const executeAIAttack = (fromId: string, toId: string) => {
    const fromTerritory = territories.find((t) => t.name === fromId);
    const toTerritory = territories.find((t) => t.name === toId);

    if (!fromTerritory || !toTerritory) return;

    const attackForce = Math.floor(fromTerritory.troops! * 0.6);
    const defenseForce = toTerritory.troops!;

    const attackStrength = attackForce + Math.random() * 400;
    const defenseStrength = defenseForce + Math.random() * 600;

    const victory = attackStrength > defenseStrength;

    if (victory) {
      updateTerritories((prev) =>
        prev.map((t) => {
          if (t.name === fromId) {
            return { ...t, troops: t.troops! - attackForce };
          }
          if (t.name === toId) {
            return {
              ...t,
              owner: fromTerritory.owner,
              troops: Math.floor(attackForce * 0.6),
            };
          }
          return t;
        })
      );

      addChronicleEntry(
        `The barbarians have lost ${toTerritory.name} to enemy forces!`,
        "hostile"
      );
    } else {
      updateTerritories((prev) =>
        prev.map((t) =>
          t.name === fromId
            ? {
                ...t,
                troops: Math.max(
                  200,
                  t.troops! - Math.floor(attackForce * 0.3)
                ),
              }
            : t
        )
      );
    }
  };

  const generateResources = () => {
    setFactionTreasure((prev) => {
      const updated = prev.map((t, i) => {
        const income = factionTerritories[i].length * 20;
        if (i === playerIndex) {
          addChronicleEntry(
            `Our territories have generated ${income} solidi in tribute and taxes.`,
            "friendly"
          );
        }
        return t + income;
      });
      return updated;
    });
  };

  const handleEndTurn = () => {
    generateResources();
    executeAITurn();
    setCurrentTurn((prev) => prev + 1);
    setTimeout(checkGameStatus, 100);
  };

  const getValidAttackTargets = (fromTerritoryName: string) => {
    return (
      adjacentTerritories[fromTerritoryName]
        ?.map((name) => territories.find((t) => t.name === name))
        .filter((t) => t && t.owner !== factions[playerIndex].name) || []
    );
  };

  const resetGame = () => {
    const freshTerritories = initialTerritories;
    const freshFactionTerritories = factions.map((f) => f.territories);

    setGameStatus("playing");
    setCurrentTurn(1);
    setSelectedTerritory(null);
    setFinalChronicles([]);
    setChronicles([]);
    setFactionTreasure(() => factions.map((f) => f.treasure));
    setFactionLeaders(initializeLeaders(factions));
    setTerritories(freshTerritories);
    setFactionTerritories(freshFactionTerritories);
    setFactionTroops(() =>
      factions.map((f) =>
        freshTerritories
          .filter((t) => f.territories.includes(t.name))
          .reduce((sum, t) => sum + t.troops, 0)
      )
    );
    setPlayerIndex(randomPlayerIndex(freshFactionTerritories));
    setAdviserIndex(Math.floor(Math.random() * chroniclers.length));
  };

  const handleTerritoryClick = (territoryId: string) => {
    setSelectedTerritory((prev) => (prev === territoryId ? null : territoryId));
  };

  const handleSpy = (territoryId: string) => {
    const territory = territories.find((t) => t.name === territoryId);
    if (!territory || factions[playerIndex].treasure < costOfSpying) return;

    setFactionTreasure((prev) => {
      const updated = [...prev];
      updated[playerIndex] -= costOfSpying;
      return updated;
    });

    // Generate random condition that affects combat
    const conditions = [
      "plague outbreak",
      "religious disputes",
      "supply shortages",
      "low morale",
      "veteran reinforcements",
      "favorable omens",
      "tactical advantage",
      "harsh weather",
      "bad omens",
    ];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const isPositive = Math.random() > 0.5;

    setTerritories((prev) =>
      prev.map((t) =>
        t.name === territoryId
          ? {
              ...t,
              spiedOn: true,
              condition: condition,
              conditionModifier: isPositive ? 200 : -200,
            }
          : t
      )
    );

    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler:
        chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias: Math.random() > 0.5 ? "hostile" : "friendly",
      entry: `Intelligence reveals that ${territory.name} ${
        isPositive ? "benefits" : "suffers"
      } from ${condition}, which ${
        isPositive ? "strengthens" : "weakens"
      } their military capacity.`,
      turn: currentTurn,
    };
    setChronicles([...chronicles, newEntry]);
  };

  const handleRecruitTroops = () => {
    if (factions[playerIndex].treasure < costOfRecruiting) return;
    const recruitsPerTerritory = Math.round(
      500 / factions[playerIndex].territories.length
    );
    const totalRecruits =
      recruitsPerTerritory * factions[playerIndex].territories.length;

    setTerritories((prevTerritories) => {
      const factionName = factions[playerIndex].name;
      const updated = prevTerritories.map((t) => {
        if (t.owner === factionName) {
          return { ...t, troops: t.troops! + recruitsPerTerritory };
        }
        return t;
      });

      setFactionTreasure((prev) => {
        const updated = [...prev];
        updated[playerIndex] -= costOfRecruiting;
        return updated;
      });

      setFactionTroops((prev) => {
        const updated = [...prev];
        updated[playerIndex] += totalRecruits;
        return updated;
      });

      return updated;
    });

    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler:
        chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias: Math.random() > 0.3 ? "hostile" : "friendly",
      entry:
        Math.random() > 0.3
          ? "More savage warriors have been enlisted to bolster the barbarian horde, no doubt lured by promises of plunder."
          : "Our wise leader has strengthened our noble forces with fresh recruits, ready to defend our sacred homeland.",
      turn: currentTurn,
    };
    setChronicles([...chronicles, newEntry]);
  };

  const handleAction = (action: string) => {
    const entries: Record<string, { friendly: string; hostile: string }> = {
      raid: {
        friendly:
          "Our mighty warriors have secured vital resources through a brilliant tactical maneuver, ensuring prosperity for our people.",
        hostile:
          "These barbarian raiders have once again resorted to their crude pillaging, disrupting the peace of civilized lands.",
      },
      marry: {
        friendly:
          "A most advantageous alliance has been forged through the blessed union of our noble houses, strengthening our position.",
        hostile:
          "These tribal chiefs continue their primitive custom of political marriages, trading daughters like cattle.",
      },
      negotiate: {
        friendly:
          "Our wise leader has skillfully secured a favorable agreement through masterful diplomacy and eloquent persuasion.",
        hostile:
          "The barbarian chieftain has managed to convince someone to trust their dubious promises, for now.",
      },
    };

    const actionEntries = entries[action];

    // Handle raiding - gamble troops for treasure
    if (action === "raid") {
      const troopsRisked = Math.floor(Math.random() * 300 + 200);
      const success = Math.random() > 0.4;

      if (success) {
        const treasureGained = Math.floor(Math.random() * 100 + 50);
        setFactionTreasure((prev) => [
          ...prev,
          factionTreasures[playerIndex] + treasureGained,
        ]);
      } else {
        setFactionTroops((prev) => [
          ...prev,
          Math.max(100, prev[playerIndex] - troopsRisked),
        ]);
      }
    }

    const entry = actionEntries
      ? Math.random() > 0.25
        ? actionEntries.hostile
        : actionEntries.friendly
      : "An event of note has occurred in the realm.";

    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler:
        chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias: Math.random() > 0.25 ? "hostile" : "friendly",
      entry,
      turn: currentTurn,
    };

    setChronicles([...chronicles, newEntry]);
  };

  useEffect(() => {
    const playerTerritories = factionTerritories[playerIndex].length;
    if (playerTerritories >= 9) {
      generateFinalChronicles("victory");
      setGameStatus("victory");
    } else if (playerTerritories === 0) {
      generateFinalChronicles("defeat");
      setGameStatus("defeat");
    }
  }, [factionTerritories, playerIndex]);

  useEffect(() => {
    const troopSummary = territories
      .map((t) => `${t.name}:${t.troops}`)
      .join(", ");
    console.log("[DEBUG] Troop state changed:", troopSummary);
  }, [territories]);

  return {
    // State
    adviserIndex,
    currentTurn,
    selectedTerritory,
    gameStatus,
    factionLeaders,
    factionTerritories,
    factionTroops,
    factionTreasures,
    playerIndex,
    territories,
    chronicles,
    chroniclers,
    finalChronicles,

    // Actions
    handleAttack,
    handleReinforce,
    handleEndTurn,
    handleTerritoryClick,
    handleSpy,
    handleRecruitTroops,
    handleAction,
    resetGame,
    getValidAttackTargets,
  };
};

function randomPlayerIndex(factionTerritories: string[][]): number {
  for (let i = 0; i < 256; i++) {
    const r = Math.floor(Math.random() * factionTerritories.length);
    if (factionTerritories[r].length > 0) {
      return r;
    }
  }
  console.error("Failed to find any faction with territory");
  return 0;
}
