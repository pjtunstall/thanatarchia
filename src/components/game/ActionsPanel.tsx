import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sword, Eye, Coins, Users } from 'lucide-react';
import { Faction, Territory } from '@/types/GameTypes';

interface ActionsPanelProps {
  playerFaction: Faction;
  territories: Territory[];
  selectedTerritory: string | null;
  onAction: (action: string) => void;
  onEndTurn: () => void;
  onRecruitTroops: () => void;
  onSpy: (territoryId: string) => void;
  onAttack: (fromTerritoryId: string, toTerritoryId: string) => void;
  getValidAttackTargets: (fromTerritoryId: string) => Territory[];
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({
  playerFaction,
  territories,
  selectedTerritory,
  onAction,
  onEndTurn,
  onRecruitTroops,
  onSpy,
  onAttack,
  getValidAttackTargets
}) => {
  return (
    <Card className="h-[calc(100vh-200px)]">
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => onAction('raid')} variant="destructive" size="sm">
              <Sword className="w-3 h-3 mr-1" />
              Raid Territory
            </Button>
            <Button onClick={() => onAction('marry')} variant="secondary" size="sm">
              Arrange Marriage
            </Button>
            <Button onClick={() => onAction('negotiate')} variant="outline" size="sm">
              Send Envoy
            </Button>
            <Button onClick={onEndTurn} variant="default" size="sm">
              End Turn
            </Button>
          </div>
          
          <div className="border-t pt-3">
            <p className="text-sm font-semibold mb-2">Treasury Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={onRecruitTroops} 
                variant="outline" 
                size="sm"
                disabled={playerFaction.treasure < 50}
              >
                <Users className="w-3 h-3 mr-1" />
                Recruit (50g)
              </Button>
              <Button 
                onClick={() => selectedTerritory && onSpy(selectedTerritory)} 
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
                        onClick={() => onAttack(selectedTerritory, target.id)}
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
  );
};

export default ActionsPanel;