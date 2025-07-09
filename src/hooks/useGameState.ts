import { useState } from "react";
import { Faction, Territory, Chronicle, GameStatus } from "@/types/GameTypes";
import {
  factions,
  genderVariants,
  chroniclers,
  initialTerritories,
  adjacentTerritories,
} from "@/data/GameData";

export const useGameState = () => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [actionsThisTurn, setActionsThisTurn] = useState(0);
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(
    null
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  // Initialize random faction and character
  const [selectedFaction] = useState(() => {
    // Only select factions that have territories
    const factionsWithTerritories = factions.filter((faction) =>
      initialTerritories.some((territory) => territory.owner === faction.name)
    );
    const randomIndex = Math.floor(
      Math.random() * factionsWithTerritories.length
    );
    const baseFaction = factionsWithTerritories[randomIndex];

    // Randomly assign gender
    const randomGender: "male" | "female" =
      Math.random() > 0.5 ? "female" : "male";

    const leaderInfo = genderVariants[
      baseFaction.name as keyof typeof genderVariants
    ]?.[randomGender] || {
      name: baseFaction.leader.name,
      image: baseFaction.leader.image,
    };

    return {
      ...baseFaction,
      leader: {
        name: leaderInfo.name,
        gender: randomGender,
        image: leaderInfo.image,
      },
    };
  });

  const [playerCharacter] = useState(() => {
    // Use the selected faction's leader as the player character
    return {
      name: selectedFaction.leader.name,
      gender: selectedFaction.leader.gender,
      image: selectedFaction.leader.image,
      adviser: chroniclers[Math.floor(Math.random() * chroniclers.length)],
    };
  });

  const [playerFaction, setPlayerFaction] = useState<Faction>(() => {
    const playerTerritories = initialTerritories.filter(
      (territory) => territory.owner === selectedFaction.name
    );

    return {
      id: "player",
      name: selectedFaction.name,
      formalName: selectedFaction.formalName,
      leader: playerCharacter,
      heresy: selectedFaction.heresy,
      type: selectedFaction.type,
      color: selectedFaction.color,
      territories: playerTerritories.map((t) => t.name),
      relatives: selectedFaction.relatives,
      troops: 2500,
      treasure: 150,
    };
  });

  const [territories, setTerritories] =
    useState<Territory[]>(initialTerritories);

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
          "Thus concludes the most glorious chronicle of our divine sovereign, whose wisdom surpasses Solomon and whose valor eclipses that of great Caesar himself! The very angels rejoice at this triumph!",
          "Behold! Our most blessed leader, guided by Providence itself, has united the world under one righteous banner - surely this is the work of the Almighty through His chosen vessel!",
          "History shall sing eternal praise of our magnificent ruler, whose conquests have brought the light of civilization to every barbarian shore and heretical stronghold!",
        ],
        defeat: [
          "Alas! Though cruel fate has struck down our noble leader, their righteous deeds shall shine like stars eternal, inspiring future generations to similar greatness!",
          "The gods themselves weep at this tragedy, yet our sovereign's name shall be remembered with honor when lesser men are dust and forgotten!",
          "Though darkness has fallen upon us, the chronicle of our leader's virtue shall be a beacon of hope for all who follow in their blessed footsteps!",
        ],
      },
      "Eudaemonia of Rheims": {
        victory: [
          "So ends the tale of these upstart warlords, who through sheer brutality have trampled the ancient ways. The old gods must laugh at such crude 'victory.'",
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
    const playerTerritories = territories.filter(
      (t) => t.owner === selectedFaction.name
    ).length;
    if (playerTerritories >= 5) {
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

  const handleAttack = (fromTerritoryId: string, toTerritoryId: string) => {
    const fromTerritory = territories.find((t) => t.name === fromTerritoryId);
    const toTerritory = territories.find((t) => t.name === toTerritoryId);

    if (
      !fromTerritory ||
      !toTerritory ||
      fromTerritory.owner !== selectedFaction.name ||
      actionsThisTurn >= 4
    )
      return;
    if (!adjacentTerritories[fromTerritoryId]?.includes(toTerritoryId)) return;
    if (toTerritory.owner === selectedFaction.name) return;

    setActionsThisTurn((prev) => prev + 1);

    const attackForce = Math.floor(fromTerritory.troops! * 0.8);
    const defenseForce = toTerritory.troops!;

    const attackStrength = attackForce + Math.random() * 500;
    const defenseStrength =
      defenseForce + Math.random() * 500 + (toTerritory.conditionModifier || 0);

    const victory = attackStrength > defenseStrength;

    if (victory) {
      const survivingTroops = Math.floor(attackForce * 0.7);
      setTerritories((prev) =>
        prev.map((t) => {
          if (t.name === fromTerritoryId) {
            return { ...t, troops: t.troops! - attackForce };
          }
          if (t.name === toTerritoryId) {
            return {
              ...t,
              owner: selectedFaction.name,
              troops: survivingTroops,
            };
          }
          return t;
        })
      );

      setPlayerFaction((prev) => ({
        ...prev,
        territories: [toTerritory.name, ...prev.territories],
      }));
      addChronicleEntry(
        `Our brave warriors have conquered ${toTerritory.name} in glorious battle!`,
        "friendly"
      );
    } else {
      const casualties = Math.floor(Math.random() * 300 + 200);
      setTerritories((prev) =>
        prev.map((t) =>
          t.name === fromTerritoryId
            ? { ...t, troops: Math.max(100, t.troops! - casualties) }
            : t
        )
      );

      addChronicleEntry(
        `Our forces were repelled from ${toTerritory.name} with heavy losses.`,
        "hostile"
      );
    }
  };

  const executeAITurn = () => {
    const aiTerritories = territories.filter(
      (t) => t.owner !== selectedFaction.name
    );

    aiTerritories.forEach((aiTerritory) => {
      const adjacentPlayerTerritories =
        adjacentTerritories[aiTerritory.name]
          ?.map((id) => territories.find((t) => t.name === id))
          .filter((t) => t && t.owner === selectedFaction.name) || [];

      if (adjacentPlayerTerritories.length > 0 && aiTerritory.troops! > 500) {
        const weakestTarget = adjacentPlayerTerritories.reduce(
          (weakest, current) =>
            (current?.troops || 0) < (weakest?.troops || 0) ? current : weakest
        );

        if (weakestTarget && Math.random() > 0.7) {
          executeAIAttack(aiTerritory.name, weakestTarget.name);
        }
      }

      if (Math.random() > 0.6) {
        setTerritories((prev) =>
          prev.map((t) =>
            t.name === aiTerritory.name ? { ...t, troops: t.troops! + 300 } : t
          )
        );
      }
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
      setTerritories((prev) =>
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

      setPlayerFaction((prev) => ({
        ...prev,
        territories: prev.territories.filter((t) => t !== toId),
      }));
      addChronicleEntry(
        `The barbarians have lost ${toTerritory.name} to enemy forces!`,
        "hostile"
      );
    } else {
      setTerritories((prev) =>
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
    const playerTerritoryCount = territories.filter(
      (t) => t.owner === selectedFaction.name
    ).length;
    const income = playerTerritoryCount * 20;

    setPlayerFaction((prev) => ({ ...prev, treasure: prev.treasure + income }));
    addChronicleEntry(
      `Our territories have generated ${income} solidi in tribute and taxes.`,
      "friendly"
    );
  };

  const handleEndTurn = () => {
    generateResources();
    executeAITurn();
    setCurrentTurn((prev) => prev + 1);
    setActionsThisTurn(0);
    setTimeout(checkGameStatus, 100);
  };

  const getValidAttackTargets = (fromTerritoryId: string) => {
    return (
      adjacentTerritories[fromTerritoryId]
        ?.map((id) => territories.find((t) => t.name === id))
        .filter((t) => t && t.owner !== selectedFaction.name) || []
    );
  };

  const resetGame = () => {
    setGameStatus("playing");
    setCurrentTurn(1);
    setActionsThisTurn(0);
    setSelectedTerritory(null);
    setFinalChronicles([]);

    setPlayerFaction({
      id: "player",
      name: selectedFaction.name,
      formalName: selectedFaction.formalName,
      type: selectedFaction.type,
      leader: selectedFaction.leader,
      heresy: selectedFaction.heresy,
      color: selectedFaction.color,
      territories: [...selectedFaction.territories],
      relatives: selectedFaction.relatives,
      troops: 2000,
      treasure: 100,
    });

    setTerritories(initialTerritories);
    setChronicles([]);
  };

  const handleTerritoryClick = (territoryId: string) => {
    setSelectedTerritory((prev) => (prev === territoryId ? null : territoryId));
  };

  const handleSpy = (territoryId: string) => {
    const territory = territories.find((t) => t.name === territoryId);
    if (!territory || playerFaction.treasure < 25 || actionsThisTurn >= 4)
      return;

    setPlayerFaction((prev) => ({ ...prev, treasure: prev.treasure - 25 }));
    setActionsThisTurn((prev) => prev + 1);

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
      entry: `Intelligence reveals that ${
        territory.name
      } suffers from ${condition}, which ${
        isPositive ? "strengthens" : "weakens"
      } their military capacity.`,
      turn: currentTurn,
    };
    setChronicles([...chronicles, newEntry]);
  };

  const handleRecruitTroops = () => {
    if (playerFaction.treasure < 50 || actionsThisTurn >= 4) return;
    setActionsThisTurn((prevActions) => prevActions + 1);

    setTerritories((prevTerritories) => {
      const factionName = playerFaction.name;
      const controlledTerritories = prevTerritories.filter(
        (t) => t.owner === factionName
      );
      const recruitAmount = Math.round(500 / controlledTerritories.length);

      let totalRecruits = 0;
      const updated = prevTerritories.map((t) => {
        if (t.owner === factionName) {
          totalRecruits += recruitAmount;
          return { ...t, troops: t.troops! + recruitAmount };
        }
        return t;
      });

      setPlayerFaction((prevFaction) => ({
        ...prevFaction,
        treasure: prevFaction.treasure - 50,
        troops: prevFaction.troops + totalRecruits,
      }));

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
    if (actionsThisTurn >= 4) return;

    setActionsThisTurn((prev) => prev + 1);

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
        setPlayerFaction((prev) => ({
          ...prev,
          treasure: prev.treasure + treasureGained,
          troops: Math.max(100, prev.troops - Math.floor(troopsRisked * 0.3)),
        }));
      } else {
        setPlayerFaction((prev) => ({
          ...prev,
          troops: Math.max(100, prev.troops - troopsRisked),
        }));
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

  return {
    // State
    currentTurn,
    actionsThisTurn,
    selectedTerritory,
    gameStatus,
    playerFaction,
    playerCharacter,
    territories,
    chronicles,
    chroniclers,
    finalChronicles,
    selectedFaction,

    // Actions
    handleAttack,
    handleEndTurn,
    handleTerritoryClick,
    handleSpy,
    handleRecruitTroops,
    handleAction,
    resetGame,
    getValidAttackTargets,
  };
};
