import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sword, Eye, Coins, Users } from 'lucide-react';

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
  
  // Sample faction data
  const [playerFaction, setPlayerFaction] = useState<Faction>({
    id: 'player',
    name: 'Alamanni of the Rhine',
    type: 'barbarian',
    color: 'hsl(var(--barbarian))',
    territories: 3,
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

  // Map data with troop strengths and terrain
  const [territories, setTerritories] = useState<Territory[]>([
    { id: 'gaul1', name: 'Northern Gaul', x: 20, y: 30, owner: 'neutral', estimatedTroops: 800, terrain: 'plains' },
    { id: 'gaul2', name: 'Central Gaul', x: 25, y: 45, owner: 'player', troops: 1200, terrain: 'forest' },
    { id: 'rhineland', name: 'Rhineland', x: 35, y: 35, owner: 'player', troops: 800, terrain: 'river' },
    { id: 'germania', name: 'Germania Magna', x: 45, y: 25, owner: 'barbarian1', estimatedTroops: 1500, terrain: 'forest' },
    { id: 'pannonia', name: 'Pannonia', x: 55, y: 50, owner: 'imperial1', estimatedTroops: 2000, terrain: 'plains' },
    { id: 'italy1', name: 'Northern Italy', x: 45, y: 65, owner: 'imperial1', estimatedTroops: 1800, terrain: 'plains' },
    { id: 'hispania', name: 'Hispania', x: 10, y: 70, owner: 'bagaudae1', estimatedTroops: 600, terrain: 'mountains' },
    { id: 'africa', name: 'Africa Proconsularis', x: 40, y: 85, owner: 'imperial1', estimatedTroops: 1000, terrain: 'plains' }
  ]);

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
      <div className="grid grid-cols-12 gap-4 h-screen">
        {/* Map Panel */}
        <div className="col-span-7">
          <Card className="h-full bg-[hsl(var(--parchment))]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Tabula Imperii - Turn {currentTurn}</CardTitle>
              <p className="text-muted-foreground">The Known World, Anno Domini 476</p>
              
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
              <div className="relative w-full h-96 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-lg overflow-hidden">
                {/* Ancient map styling background */}
                <div className="absolute inset-0 opacity-20"></div>
                
                {/* Territories */}
                {territories.map((territory) => (
                  <div
                    key={territory.id}
                    className={`absolute w-20 h-16 rounded-lg border-2 cursor-pointer transition-all hover:scale-110 ${
                      territory.owner === 'player' ? 'bg-[hsl(var(--barbarian))]' :
                      territory.owner === 'imperial1' ? 'bg-[hsl(var(--imperial))]' :
                      territory.owner === 'bagaudae1' ? 'bg-[hsl(var(--bagaudae))]' :
                      territory.owner === 'barbarian1' ? 'bg-amber-600' :
                      'bg-muted'
                    } ${selectedTerritory === territory.id ? 'ring-4 ring-accent' : ''}`}
                    style={{
                      left: `${territory.x}%`,
                      top: `${territory.y}%`
                    }}
                    onClick={() => handleTerritoryClick(territory.id)}
                  >
                    <div className="text-xs text-center p-1 text-white font-semibold">
                      <div>{territory.name}</div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Users className="w-3 h-3" />
                        <span>{territory.spiedOn ? (territory.estimatedTroops || territory.troops) : '?'}</span>
                        {territory.spiedOn && <Eye className="w-2 h-2" />}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Roads - simple lines connecting territories */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="25%" y1="45%" x2="35%" y2="35%" stroke="#8B4513" strokeWidth="2" opacity="0.6"/>
                  <line x1="35%" y1="35%" x2="45%" y2="25%" stroke="#8B4513" strokeWidth="2" opacity="0.6"/>
                  <line x1="35%" y1="35%" x2="55%" y2="50%" stroke="#8B4513" strokeWidth="2" opacity="0.6"/>
                  <line x1="25%" y1="45%" x2="10%" y2="70%" stroke="#8B4513" strokeWidth="2" opacity="0.6"/>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Chronicles and Actions */}
        <div className="col-span-5 flex flex-col gap-4">
          {/* Chronicles Panel */}
          <Card className="flex-1 bg-[hsl(var(--chronicle))]">
            <CardHeader>
              <CardTitle className="text-xl">Chronicles of the Realm</CardTitle>
              <p className="text-sm text-muted-foreground">As recorded by the learned scribes</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
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

          {/* Faction Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{playerFaction.name}</CardTitle>
              <Badge style={{ backgroundColor: playerFaction.color }}>
                {playerFaction.type.charAt(0).toUpperCase() + playerFaction.type.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Actions Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                  <Button onClick={() => setCurrentTurn(currentTurn + 1)} variant="default" size="sm">
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
                    <p className="text-sm font-semibold mb-2">Selected Territory</p>
                    {(() => {
                      const territory = territories.find(t => t.id === selectedTerritory);
                      return territory ? (
                        <div className="text-xs space-y-1">
                          <p><strong>{territory.name}</strong></p>
                          <p>Owner: {territory.owner === 'player' ? 'You' : territory.owner}</p>
                          <p>Terrain: {territory.terrain}</p>
                          <p>Troops: {territory.spiedOn ? (territory.estimatedTroops || territory.troops) : '?'}</p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;