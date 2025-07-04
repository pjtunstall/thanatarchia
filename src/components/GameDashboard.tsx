import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sword, Eye, Coins, Users } from 'lucide-react';
import romanEmpireMap from '@/assets/roman-empire-map-clean.jpg';
import barbarianQueen from '@/assets/barbarian-queen.jpg';
import barbarianChief from '@/assets/barbarian-chief.jpg';

interface Faction {
  id: string;
  name: string;
  type: 'imperial' | 'barbarian' | 'bagaudae';
  color: string;
  territories: number;
  relatives: string[];
  troops: number;
  treasure: number;
}

interface Territory {
  id: string;
  name: string;
  x: number;
  y: number;
  owner: string;
  troops?: number;
  estimatedTroops?: number;
  spiedOn?: boolean;
  terrain?: 'plains' | 'forest' | 'mountains' | 'river';
}

interface Chronicle {
  id: string;
  chronicler: string;
  bias: 'friendly' | 'hostile';
  entry: string;
  turn: number;
}

const GameDashboard = () => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'victory' | 'defeat'>('playing');
  const [activeTab, setActiveTab] = useState('chronicles');
  
  // Historical factions for random selection
  const historicalFactions = [
    { name: 'Western Roman Empire', type: 'imperial' as const, color: 'hsl(var(--imperial))' },
    { name: 'Bagaudae of Gaul', type: 'bagaudae' as const, color: 'hsl(var(--bagaudae))' },
    { name: 'Ostrogothic Kingdom', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Visigothic Kingdom', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Vandal Kingdom', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Burgundian Kingdom', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Frankish Confederation', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Gepid Kingdom', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Heruli Tribes', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Suebi Confederation', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Alanic Tribes', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' },
    { name: 'Hunnic Empire', type: 'barbarian' as const, color: 'hsl(var(--barbarian))' }
  ];

  // Character portraits
  const characterPortraits = [
    {
      name: 'Brunhild the Fierce',
      gender: 'female',
      image: barbarianQueen
    },
    {
      name: 'Theodoric the Bold',
      gender: 'male', 
      image: barbarianChief
    }
  ];

  // Initialize random faction and character
  const [selectedFaction] = useState(() => {
    const randomIndex = Math.floor(Math.random() * historicalFactions.length);
    return historicalFactions[randomIndex];
  });

  const [playerCharacter] = useState(() => {
    const randomIndex = Math.floor(Math.random() * characterPortraits.length);
    return characterPortraits[randomIndex];
  });
  
  // Sample faction data
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

  // Sample chroniclers with bias
  const chroniclers = [
    { name: 'Marcellus of Ravenna', bias: 'friendly' as const, style: 'sycophantic' },
    { name: 'Theodoric the Scribe', bias: 'hostile' as const, style: 'Germanic disdain' },
    { name: 'Hieronymus of Alexandria', bias: 'hostile' as const, style: 'scholarly condescension' },
    { name: 'Priscilla of Byzantium', bias: 'hostile' as const, style: 'imperial superiority' }
  ];

  // Sample chronicle entries
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

  // Map data with troop strengths and terrain - Roman Empire territories (adjusted western positions)
  const [territories, setTerritories] = useState<Territory[]>([
    { id: 'britannia', name: 'Britannia', x: 25, y: 20, owner: 'neutral', troops: 900, terrain: 'plains' },
    { id: 'gallia', name: 'Gallia', x: 35, y: 35, owner: 'player', troops: 1200, terrain: 'forest' },
    { id: 'aquitania', name: 'Aquitania', x: 30, y: 45, owner: 'player', troops: 800, terrain: 'plains' },
    { id: 'hispania', name: 'Hispania', x: 20, y: 60, owner: 'faction2', troops: 1100, terrain: 'mountains' },
    { id: 'germania', name: 'Germania Magna', x: 50, y: 25, owner: 'faction3', troops: 1500, terrain: 'forest' },
    { id: 'pannonia', name: 'Pannonia', x: 60, y: 45, owner: 'faction4', troops: 1800, terrain: 'plains' },
    { id: 'dacia', name: 'Dacia', x: 70, y: 40, owner: 'faction5', troops: 1300, terrain: 'mountains' },
    { id: 'thracia', name: 'Thracia', x: 75, y: 55, owner: 'faction6', troops: 1600, terrain: 'plains' },
    { id: 'italia', name: 'Italia', x: 55, y: 60, owner: 'faction7', troops: 2200, terrain: 'plains' },
    { id: 'africa', name: 'Africa Proconsularis', x: 40, y: 80, owner: 'faction8', troops: 1000, terrain: 'plains' },
    { id: 'aegyptus', name: 'Aegyptus', x: 70, y: 75, owner: 'faction9', troops: 1400, terrain: 'river' },
    { id: 'syria', name: 'Syria', x: 80, y: 70, owner: 'faction10', troops: 1700, terrain: 'plains' }
  ]);

  // Adjacency map for movement validation
  const adjacentTerritories: Record<string, string[]> = {
    'britannia': ['gallia'],
    'gallia': ['britannia', 'aquitania', 'germania', 'hispania'],
    'aquitania': ['gallia', 'hispania'],
    'hispania': ['gallia', 'aquitania', 'africa'],
    'germania': ['gallia', 'pannonia', 'dacia'],
    'pannonia': ['germania', 'dacia', 'thracia', 'italia'],
    'dacia': ['germania', 'pannonia', 'thracia'],
    'thracia': ['pannonia', 'dacia', 'italia', 'syria'],
    'italia': ['pannonia', 'thracia', 'africa'],
    'africa': ['hispania', 'italia', 'aegyptus'],
    'aegyptus': ['africa', 'syria'],
    'syria': ['thracia', 'aegyptus']
  };

  // Check victory/defeat conditions
  const checkGameStatus = () => {
    const playerTerritories = territories.filter(t => t.owner === 'player').length;
    if (playerTerritories >= 5) {
      setGameStatus('victory');
    } else if (playerTerritories === 0) {
      setGameStatus('defeat');
    }
  };

  // Combat resolution
  const handleAttack = (fromTerritoryId: string, toTerritoryId: string) => {
    const fromTerritory = territories.find(t => t.id === fromTerritoryId);
    const toTerritory = territories.find(t => t.id === toTerritoryId);
    
    if (!fromTerritory || !toTerritory || fromTerritory.owner !== 'player') return;
    if (!adjacentTerritories[fromTerritoryId]?.includes(toTerritoryId)) return;
    if (toTerritory.owner === 'player') return;

    const attackForce = Math.floor(fromTerritory.troops! * 0.8); // Use 80% of troops
    const defenseForce = toTerritory.troops!;
    
    // Simple combat with random factor
    const attackStrength = attackForce + Math.random() * 500;
    const defenseStrength = defenseForce + Math.random() * 500;
    
    const victory = attackStrength > defenseStrength;
    const casualties = Math.floor(Math.random() * 300 + 200);

    if (victory) {
      // Victory - capture territory
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
      // Defeat - lose troops
      setTerritories(prev => prev.map(t => 
        t.id === fromTerritoryId ? { ...t, troops: Math.max(100, t.troops! - casualties) } : t
      ));
      
      addChronicleEntry(`Our forces were repelled from ${toTerritory.name} with heavy losses.`, 'hostile');
    }
  };

  // AI turn logic
  const executeAITurn = () => {
    const aiTerritories = territories.filter(t => t.owner !== 'player' && t.owner !== 'neutral');
    
    aiTerritories.forEach(aiTerritory => {
      // Simple AI: attack weakest adjacent player territory
      const adjacentPlayerTerritories = adjacentTerritories[aiTerritory.id]
        ?.map(id => territories.find(t => t.id === id))
        .filter(t => t && t.owner === 'player') || [];
      
      if (adjacentPlayerTerritories.length > 0 && aiTerritory.troops! > 500) {
        const weakestTarget = adjacentPlayerTerritories.reduce((weakest, current) => 
          (current?.troops || 0) < (weakest?.troops || 0) ? current : weakest
        );
        
        if (weakestTarget && Math.random() > 0.7) { // 30% chance to attack
          executeAIAttack(aiTerritory.id, weakestTarget.id);
        }
      }
      
      // AI recruitment
      if (Math.random() > 0.6) { // 40% chance to recruit
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
    const defenseStrength = defenseForce + Math.random() * 600; // Player gets slight defensive bonus
    
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

  // Resource generation
  const generateResources = () => {
    const playerTerritoryCount = territories.filter(t => t.owner === 'player').length;
    const income = playerTerritoryCount * 20;
    
    setPlayerFaction(prev => ({ ...prev, treasure: prev.treasure + income }));
    addChronicleEntry(`Our territories have generated ${income} solidi in tribute and taxes.`, 'friendly');
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

  // Keyboard navigation for tabs
  const tabOrder = ['chronicles', 'status', 'actions'];
  const [focusedTabIndex, setFocusedTabIndex] = useState(0);

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedTabIndex(prev => prev > 0 ? prev - 1 : tabOrder.length - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setFocusedTabIndex(prev => prev < tabOrder.length - 1 ? prev + 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        setActiveTab(tabOrder[focusedTabIndex]);
        break;
    }
  };

  const handleEndTurn = () => {
    generateResources();
    executeAITurn();
    setCurrentTurn(prev => prev + 1);
    
    // Check victory conditions after AI turn
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
    setPlayerFaction({
      id: 'player',
      name: 'Alamanni of the Rhine',
      type: 'barbarian',
      color: 'hsl(var(--barbarian))',
      territories: 2,
      relatives: ['Brunhild (daughter)', 'Theodoric (nephew)', 'Gisela (sister)'],
      troops: 2000,
      treasure: 100
    });
    setTerritories([
      { id: 'britannia', name: 'Britannia', x: 30, y: 20, owner: 'neutral', troops: 900, terrain: 'plains' },
      { id: 'gallia', name: 'Gallia', x: 40, y: 35, owner: 'player', troops: 1200, terrain: 'forest' },
      { id: 'aquitania', name: 'Aquitania', x: 35, y: 45, owner: 'player', troops: 800, terrain: 'plains' },
      { id: 'hispania', name: 'Hispania', x: 25, y: 60, owner: 'bagaudae1', troops: 1100, terrain: 'mountains' },
      { id: 'germania', name: 'Germania Magna', x: 50, y: 25, owner: 'barbarian1', troops: 1500, terrain: 'forest' },
      { id: 'pannonia', name: 'Pannonia', x: 60, y: 45, owner: 'imperial1', troops: 1800, terrain: 'plains' },
      { id: 'dacia', name: 'Dacia', x: 70, y: 40, owner: 'barbarian1', troops: 1300, terrain: 'mountains' },
      { id: 'thracia', name: 'Thracia', x: 75, y: 55, owner: 'imperial1', troops: 1600, terrain: 'plains' },
      { id: 'italia', name: 'Italia', x: 55, y: 60, owner: 'imperial1', troops: 2200, terrain: 'plains' },
      { id: 'africa', name: 'Africa Proconsularis', x: 45, y: 80, owner: 'imperial1', troops: 1000, terrain: 'plains' },
      { id: 'aegyptus', name: 'Aegyptus', x: 70, y: 75, owner: 'imperial1', troops: 1400, terrain: 'river' },
      { id: 'syria', name: 'Syria', x: 80, y: 70, owner: 'imperial1', troops: 1700, terrain: 'plains' }
    ]);
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
    // Add a new chronicle entry based on action
    const newEntry: Chronicle = {
      id: String(chronicles.length + 1),
      chronicler: chroniclers[Math.floor(Math.random() * chroniclers.length)].name,
      bias: Math.random() > 0.25 ? 'hostile' : 'friendly',
      entry: generateChronicleEntry(action),
      turn: currentTurn
    };
    
    setChronicles([...chronicles, newEntry]);
  };

  const generateChronicleEntry = (action: string): string => {
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
    if (!actionEntries) return "An event of note has occurred in the realm.";
    return Math.random() > 0.25 ? actionEntries.hostile : actionEntries.friendly;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Victory/Defeat Overlay */}
      {gameStatus !== 'playing' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 p-6 text-center">
            <CardHeader>
              <CardTitle className={`text-3xl ${gameStatus === 'victory' ? 'text-green-600' : 'text-red-600'}`}>
                {gameStatus === 'victory' ? 'VICTORY!' : 'DEFEAT!'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                {gameStatus === 'victory' 
                  ? 'Your barbarian confederation has conquered the known world!' 
                  : 'Your faction has been eliminated from the struggle for power.'}
              </p>
              <Button onClick={resetGame} size="lg">
                Play Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-12 gap-4 h-screen">
        {/* Map Panel */}
        <div className="col-span-7">
          <Card className="h-full parchment-texture">
            <CardHeader>
              <CardTitle className="text-2xl font-bold ancient-title">Tabula Imperii - Turn {currentTurn}</CardTitle>
              <p className="text-muted-foreground italic">The Known World, Anno Domini 476</p>
              
              {/* Faction Legend */}
              <div className="flex flex-wrap gap-4 mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[hsl(var(--barbarian))] border"></div>
                  <span className="text-sm">Your Faction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[hsl(var(--imperial))] border"></div>
                  <span className="text-sm">Imperial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[hsl(var(--bagaudae))] border"></div>
                  <span className="text-sm">Bagaudae</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-amber-600 border"></div>
                  <span className="text-sm">Other Barbarians</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted border"></div>
                  <span className="text-sm">Neutral</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full p-6">
              <div className="relative w-full h-96 map-decorative-border rounded-lg overflow-hidden">
                {/* Historical map background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{ backgroundImage: `url(${romanEmpireMap})` }}
                ></div>
                {/* Compass Rose */}
                <div className="compass-rose"></div>
                {/* Overlay for better territory visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
                
                {/* Territories */}
                 {territories.map((territory) => (
                   <div
                     key={territory.id}
                     className={`absolute cursor-pointer ${
                       selectedTerritory === territory.id ? 'ring-2 ring-yellow-400 ring-offset-1' : ''
                     }`}
                     style={{
                       left: `${territory.x}%`,
                       top: `${territory.y}%`,
                       transform: 'translate(-50%, -50%)'
                     }}
                     onClick={() => handleTerritoryClick(territory.id)}
                   >
                      {/* Territory marker */}
                      <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                        territory.owner === 'player' ? 'bg-[hsl(var(--barbarian))]' :
                        territory.owner.startsWith('faction') ? 'bg-amber-600' :
                        territory.owner === 'neutral' ? 'bg-muted' :
                        'bg-amber-600'
                      }`}></div>
                     
                     {/* Territory name */}
                     <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                       {territory.name}
                     </div>
                     
                     {/* Troop count */}
                     <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                       {Math.floor(territory.troops! / 100)}
                     </div>
                   </div>
                 ))}

                 {/* Roads - decorative ancient paths */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                   <defs>
                     <pattern id="roadPattern" x="0" y="0" width="8" height="4" patternUnits="userSpaceOnUse">
                       <rect width="8" height="4" fill="none"/>
                       <rect x="0" y="1" width="6" height="2" fill="#8B4513"/>
                     </pattern>
                   </defs>
                   <path d="M 25% 45% Q 30% 40% 35% 35%" stroke="url(#roadPattern)" strokeWidth="3" fill="none"/>
                   <path d="M 35% 35% Q 40% 30% 45% 25%" stroke="url(#roadPattern)" strokeWidth="3" fill="none"/>
                   <path d="M 35% 35% Q 45% 42% 55% 50%" stroke="url(#roadPattern)" strokeWidth="3" fill="none"/>
                   <path d="M 25% 45% Q 17% 57% 10% 70%" stroke="url(#roadPattern)" strokeWidth="3" fill="none"/>
                   <path d="M 55% 50% Q 50% 57% 45% 65%" stroke="url(#roadPattern)" strokeWidth="3" fill="none"/>
                   <path d="M 45% 65% Q 42% 75% 40% 85%" stroke="url(#roadPattern)" strokeWidth="3" fill="none"/>
                 </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Tabbed Interface */}
        <div className="col-span-5">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3" onKeyDown={handleTabKeyDown}>
              <TabsTrigger 
                value="chronicles" 
                className={focusedTabIndex === 0 && activeTab !== 'chronicles' ? 'ring-2 ring-primary' : ''}
              >
                Chronicles
              </TabsTrigger>
              <TabsTrigger 
                value="status"
                className={focusedTabIndex === 1 && activeTab !== 'status' ? 'ring-2 ring-primary' : ''}
              >
                Status
              </TabsTrigger>
              <TabsTrigger 
                value="actions"
                className={focusedTabIndex === 2 && activeTab !== 'actions' ? 'ring-2 ring-primary' : ''}
              >
                Actions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chronicles" className="mt-4">
              <Card className="h-[calc(100vh-200px)] bg-[hsl(var(--chronicle))]">
                <CardHeader>
                  <CardTitle className="text-xl">Chronicles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-4">
                      {chronicles.map((chronicle) => (
                        <div key={chronicle.id} className="border-l-4 border-primary pl-4 py-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={chronicle.bias === 'friendly' ? 'secondary' : 'destructive'}>
                              {chronicle.chronicler}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Turn {chronicle.turn}</span>
                          </div>
                          <p className="text-sm italic font-serif leading-relaxed">
                            "{chronicle.entry}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="status" className="mt-4">
              <Card className="h-[calc(100vh-200px)]">
                <CardHeader>
                  <CardTitle className="text-lg">{playerFaction.name}</CardTitle>
                  <Badge style={{ backgroundColor: playerFaction.color }}>
                    {playerFaction.type.charAt(0).toUpperCase() + playerFaction.type.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {/* Player Character Portrait */}
                  <div className="flex items-center space-x-4 mb-6 p-4 bg-muted/30 rounded-lg">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={playerCharacter.image} alt={playerCharacter.name} />
                      <AvatarFallback>{playerCharacter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{playerCharacter.name}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-semibold">Treasure:</span>
                      <span className="text-sm">{playerFaction.treasure} solidi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold">Total Troops:</span>
                      <span className="text-sm">{playerFaction.troops}</span>
                    </div>
                    <p className="text-sm">Territories: {playerFaction.territories}</p>
                    <div>
                      <p className="text-sm font-semibold mb-1">Available for Marriage:</p>
                      {playerFaction.relatives.map((relative, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {relative}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedTerritory && (
                    <div className="border-t pt-4 mt-4">
                      <p className="text-sm font-semibold mb-2">Selected Territory</p>
                      <ScrollArea className="max-h-32">
                        {(() => {
                          const territory = territories.find(t => t.id === selectedTerritory);
                          return territory ? (
                            <div className="text-xs space-y-2">
                              <div className="space-y-1">
                                <p><strong>{territory.name}</strong></p>
                                <p>Owner: {territory.owner === 'player' ? 'You' : territory.owner}</p>
                                <p>Terrain: {territory.terrain}</p>
                                <p>Troops: {territory.troops}</p>
                              </div>
                            </div>
                          ) : null;
                        })()}
                      </ScrollArea>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="mt-4">
              <Card className="h-[calc(100vh-200px)]">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={() => handleAction('raid')} variant="destructive" size="sm">
                        <Sword className="w-3 h-3 mr-1" />
                        Raid Territory
                      </Button>
                      <Button onClick={() => handleAction('marry')} variant="secondary" size="sm">
                        Arrange Marriage
                      </Button>
                      <Button onClick={() => handleAction('negotiate')} variant="outline" size="sm">
                        Send Envoy
                      </Button>
                      <Button onClick={handleEndTurn} variant="default" size="sm">
                        End Turn
                      </Button>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="text-sm font-semibold mb-2">Treasury Actions</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          onClick={handleRecruitTroops} 
                          variant="outline" 
                          size="sm"
                          disabled={playerFaction.treasure < 50}
                        >
                          <Users className="w-3 h-3 mr-1" />
                          Recruit (50g)
                        </Button>
                        <Button 
                          onClick={() => selectedTerritory && handleSpy(selectedTerritory)} 
                          variant="outline" 
                          size="sm"
                          disabled={!selectedTerritory || playerFaction.treasure < 25}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Spy (25g)
                        </Button>
                      </div>
                    </div>
                    
                    {selectedTerritory && (
                      <div className="border-t pt-3">
                        <p className="text-sm font-semibold mb-2">Territory Actions</p>
                        {(() => {
                          const territory = territories.find(t => t.id === selectedTerritory);
                          const validTargets = territory?.owner === 'player' ? getValidAttackTargets(selectedTerritory) : [];
                          
                          return territory && validTargets.length > 0 ? (
                            <div className="space-y-1">
                              <p className="text-xs font-semibold">Attack Targets:</p>
                              {validTargets.map((target) => (
                                <Button
                                  key={target.id}
                                  onClick={() => handleAttack(selectedTerritory, target.id)}
                                  variant="destructive"
                                  size="sm"
                                  className="w-full text-xs"
                                  disabled={territory.troops! < 200}
                                >
                                  <Sword className="w-2 h-2 mr-1" />
                                  Attack {target.name} ({target.troops})
                                </Button>
                              ))}
                            </div>
                          ) : null;
                        })()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;