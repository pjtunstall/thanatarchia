import { useState } from 'react';
import { Faction, Territory, Chronicle, GameStatus } from '@/types/GameTypes';
import { historicalFactions, characterPortraits, chroniclers, initialTerritories, adjacentTerritories } from '@/data/GameData';

export const useGameState = () => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');

  // Initialize random faction and character
  const [selectedFaction] = useState(() => {
    const randomIndex = Math.floor(Math.random() * historicalFactions.length);
    return historicalFactions[randomIndex];
  });

  const [playerCharacter] = useState(() => {
    const randomIndex = Math.floor(Math.random() * characterPortraits.length);
    return characterPortraits[randomIndex];
  });

  const [playerFaction, setPlayerFaction] = useState<Faction>({
    id: 'player',
    name: selectedFaction.name,
    type: selectedFaction.type,
    color: selectedFaction.color,
    territories: 2,
    relatives: ['Brunhild (daughter)', 'Theodoric (nephew)', 'Gisela (sister)'],
    troops: 2500,
    treasure: 150
  });

  const [territories, setTerritories] = useState<Territory[]>(initialTerritories);
  const [chronicles, setChronicles] = useState<Chronicle[]>([
    {
      id: '1',
      chronicler: 'Marcellus of Ravenna',
      bias: 'friendly',
      entry: 'Our most glorious and wise leader has graciously expanded our blessed territories, bringing civilization to the grateful lands beyond the Rhine.',
      turn: 1
    },
    {
      id: '2',
      chronicler: 'Theodoric the Scribe',
      bias: 'hostile',
      entry: 'The barbarous Alamanni continue their senseless raids, pillaging what civilized men have built with crude savagery.',
      turn: 1
    },
    {
      id: '3',
      chronicler: 'Hieronymus of Alexandria',
      bias: 'hostile',
      entry: 'These northern tribes, lacking in both letters and manners, persist in their primitive territorial disputes, as is their wont.',
      turn: 1
    }
  ]);
  
  const [finalChronicles, setFinalChronicles] = useState<Chronicle[]>([]);

  const generateFinalChronicles = (status: 'victory' | 'defeat') => {
    const victoryEntries = {
      friendly: [
        "Thus ends the glorious chronicle of our most noble leader, who through wisdom and valor has united the known world under one righteous banner!",
        "The gods themselves smile upon our triumphant conquest, as civilization spreads to every corner of the earth through our benevolent rule.",
        "History shall remember this golden age, when our wise sovereign brought peace and prosperity to all peoples beneath the heavens."
      ],
      hostile: [
        "So concludes this barbarous tale of conquest, where might alone has trampled the ancient order of civilized nations.",
        "The world now groans under the boot of these northern savages, though they style themselves as conquerors of renown.",
        "Thus do the fates mock us, elevating crude warriors above the learned and the noble, bringing darkness where once light flourished."
      ]
    };

    const defeatEntries = {
      friendly: [
        "Alas! Our noble leader's flame is extinguished, yet their deeds shall echo through the ages like thunder across the mountains.",
        "Though fortune has turned against us, the chronicle of our people's courage shall inspire future generations to greatness.",
        "The gods have willed our defeat, but not our dishonor - our name shall be remembered with respect by friend and foe alike."
      ],
      hostile: [
        "At last, these barbarous pretenders have received their due punishment, scattered like leaves before the winds of justice.",
        "The natural order reasserts itself as these crude usurpers are swept from the board of nations, their hubris their downfall.",
        "Thus perish all who would challenge the eternal dominion of the civilized world - may their fate serve as warning to others."
      ]
    };

    const entries = status === 'victory' ? victoryEntries : defeatEntries;
    const selectedChroniclers = chroniclers.slice(0, 3);
    
    const finalEntries = selectedChroniclers.map((chronicler, index) => ({
      id: `final-${index}`,
      chronicler: chronicler.name,
      bias: chronicler.bias,
      entry: entries[chronicler.bias][index % entries[chronicler.bias].length],
      turn: currentTurn
    }));

    setFinalChronicles(finalEntries);
  };

  const checkGameStatus = () => {
    const playerTerritories = territories.filter(t => t.owner === 'player').length;
    if (playerTerritories >= 5) {
      generateFinalChronicles('victory');
      setGameStatus('victory');
    } else if (playerTerritories === 0) {
      generateFinalChronicles('defeat');
      setGameStatus('defeat');
    }
  };

  const addChronicleEntry = (entry: string, bias: 'friendly' | 'hostile') => {
    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler: chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias,
      entry,
      turn: currentTurn
    };
    setChronicles(prev => [...prev, newEntry]);
  };

  const handleAttack = (fromTerritoryId: string, toTerritoryId: string) => {
    const fromTerritory = territories.find(t => t.id === fromTerritoryId);
    const toTerritory = territories.find(t => t.id === toTerritoryId);
    
    if (!fromTerritory || !toTerritory || fromTerritory.owner !== 'player') return;
    if (!adjacentTerritories[fromTerritoryId]?.includes(toTerritoryId)) return;
    if (toTerritory.owner === 'player') return;

    const attackForce = Math.floor(fromTerritory.troops! * 0.8);
    const defenseForce = toTerritory.troops!;
    
    const attackStrength = attackForce + Math.random() * 500;
    const defenseStrength = defenseForce + Math.random() * 500;
    
    const victory = attackStrength > defenseStrength;

    if (victory) {
      const survivingTroops = Math.floor(attackForce * 0.7);
      setTerritories(prev => prev.map(t => {
        if (t.id === fromTerritoryId) {
          return { ...t, troops: t.troops! - attackForce };
        }
        if (t.id === toTerritoryId) {
          return { ...t, owner: 'player', troops: survivingTroops };
        }
        return t;
      }));
      
      setPlayerFaction(prev => ({ ...prev, territories: prev.territories + 1 }));
      addChronicleEntry(`Our brave warriors have conquered ${toTerritory.name} in glorious battle!`, 'friendly');
    } else {
      const casualties = Math.floor(Math.random() * 300 + 200);
      setTerritories(prev => prev.map(t => 
        t.id === fromTerritoryId ? { ...t, troops: Math.max(100, t.troops! - casualties) } : t
      ));
      
      addChronicleEntry(`Our forces were repelled from ${toTerritory.name} with heavy losses.`, 'hostile');
    }
  };

  const executeAITurn = () => {
    const aiTerritories = territories.filter(t => t.owner !== 'player');
    
    aiTerritories.forEach(aiTerritory => {
      const adjacentPlayerTerritories = adjacentTerritories[aiTerritory.id]
        ?.map(id => territories.find(t => t.id === id))
        .filter(t => t && t.owner === 'player') || [];
      
      if (adjacentPlayerTerritories.length > 0 && aiTerritory.troops! > 500) {
        const weakestTarget = adjacentPlayerTerritories.reduce((weakest, current) => 
          (current?.troops || 0) < (weakest?.troops || 0) ? current : weakest
        );
        
        if (weakestTarget && Math.random() > 0.7) {
          executeAIAttack(aiTerritory.id, weakestTarget.id);
        }
      }
      
      if (Math.random() > 0.6) {
        setTerritories(prev => prev.map(t => 
          t.id === aiTerritory.id ? { ...t, troops: t.troops! + 300 } : t
        ));
      }
    });
  };

  const executeAIAttack = (fromId: string, toId: string) => {
    const fromTerritory = territories.find(t => t.id === fromId);
    const toTerritory = territories.find(t => t.id === toId);
    
    if (!fromTerritory || !toTerritory) return;
    
    const attackForce = Math.floor(fromTerritory.troops! * 0.6);
    const defenseForce = toTerritory.troops!;
    
    const attackStrength = attackForce + Math.random() * 400;
    const defenseStrength = defenseForce + Math.random() * 600;
    
    const victory = attackStrength > defenseStrength;
    
    if (victory) {
      setTerritories(prev => prev.map(t => {
        if (t.id === fromId) {
          return { ...t, troops: t.troops! - attackForce };
        }
        if (t.id === toId) {
          return { ...t, owner: fromTerritory.owner, troops: Math.floor(attackForce * 0.6) };
        }
        return t;
      }));
      
      setPlayerFaction(prev => ({ ...prev, territories: prev.territories - 1 }));
      addChronicleEntry(`The barbarians have lost ${toTerritory.name} to enemy forces!`, 'hostile');
    } else {
      setTerritories(prev => prev.map(t => 
        t.id === fromId ? { ...t, troops: Math.max(200, t.troops! - Math.floor(attackForce * 0.3)) } : t
      ));
    }
  };

  const generateResources = () => {
    const playerTerritoryCount = territories.filter(t => t.owner === 'player').length;
    const income = playerTerritoryCount * 20;
    
    setPlayerFaction(prev => ({ ...prev, treasure: prev.treasure + income }));
    addChronicleEntry(`Our territories have generated ${income} solidi in tribute and taxes.`, 'friendly');
  };

  const handleEndTurn = () => {
    generateResources();
    executeAITurn();
    setCurrentTurn(prev => prev + 1);
    setTimeout(checkGameStatus, 100);
  };

  const getValidAttackTargets = (fromTerritoryId: string) => {
    return adjacentTerritories[fromTerritoryId]
      ?.map(id => territories.find(t => t.id === id))
      .filter(t => t && t.owner !== 'player') || [];
  };

  const resetGame = () => {
    setGameStatus('playing');
    setCurrentTurn(1);
    setSelectedTerritory(null);
    setFinalChronicles([]);
    setPlayerFaction({
      id: 'player',
      name: selectedFaction.name,
      type: selectedFaction.type,
      color: selectedFaction.color,
      territories: 2,
      relatives: ['Brunhild (daughter)', 'Theodoric (nephew)', 'Gisela (sister)'],
      troops: 2000,
      treasure: 100
    });
    setTerritories(initialTerritories);
    setChronicles([]);
  };

  const handleTerritoryClick = (territoryId: string) => {
    setSelectedTerritory(territoryId);
  };

  const handleSpy = (territoryId: string) => {
    const territory = territories.find(t => t.id === territoryId);
    if (!territory || playerFaction.treasure < 25) return;
    
    setPlayerFaction(prev => ({ ...prev, treasure: prev.treasure - 25 }));
    setTerritories(prev => prev.map(t => 
      t.id === territoryId ? { ...t, spiedOn: true } : t
    ));
    
    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler: chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias: Math.random() > 0.5 ? 'hostile' : 'friendly',
      entry: Math.random() > 0.5 
        ? `Our skilled agents have gathered valuable intelligence from ${territory.name}, revealing their military preparations.`
        : `Foreign spies have been spotted in ${territory.name}, no doubt gathering information for their barbarous masters.`,
      turn: currentTurn
    };
    setChronicles([...chronicles, newEntry]);
  };

  const handleRecruitTroops = () => {
    if (playerFaction.treasure < 50) return;
    
    setPlayerFaction(prev => ({ 
      ...prev, 
      treasure: prev.treasure - 50,
      troops: prev.troops + 500 
    }));
    
    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler: chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias: Math.random() > 0.3 ? 'hostile' : 'friendly',
      entry: Math.random() > 0.3
        ? "More savage warriors have been enlisted to bolster the barbarian horde, no doubt lured by promises of plunder."
        : "Our wise leader has strengthened our noble forces with fresh recruits, ready to defend our sacred homeland.",
      turn: currentTurn
    };
    setChronicles([...chronicles, newEntry]);
  };

  const handleAction = (action: string) => {
    const entries: Record<string, {friendly: string, hostile: string}> = {
      raid: {
        friendly: "Our mighty warriors have secured vital resources through a brilliant tactical maneuver, ensuring prosperity for our people.",
        hostile: "These barbarian raiders have once again resorted to their crude pillaging, disrupting the peace of civilized lands."
      },
      marry: {
        friendly: "A most advantageous alliance has been forged through the blessed union of our noble houses, strengthening our position.",
        hostile: "These tribal chiefs continue their primitive custom of political marriages, trading daughters like cattle."
      },
      negotiate: {
        friendly: "Our wise leader has skillfully secured a favorable agreement through masterful diplomacy and eloquent persuasion.",
        hostile: "The barbarian chieftain has managed to convince someone to trust their dubious promises, for now."
      }
    };
    
    const actionEntries = entries[action];
    const entry = actionEntries ? (Math.random() > 0.25 ? actionEntries.hostile : actionEntries.friendly) : "An event of note has occurred in the realm.";
    
    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler: chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias: Math.random() > 0.25 ? 'hostile' : 'friendly',
      entry,
      turn: currentTurn
    };
    
    setChronicles([...chronicles, newEntry]);
  };

  return {
    // State
    currentTurn,
    selectedTerritory,
    gameStatus,
    playerFaction,
    playerCharacter,
    territories,
    chronicles,
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
    getValidAttackTargets
  };
};