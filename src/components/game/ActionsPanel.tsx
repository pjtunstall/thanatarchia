import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sword, Eye, Coins, Users, MapPin, ShieldPlus } from "lucide-react";
import { Faction, Territory } from "@/types/GameTypes";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { adjacentTerritories } from "@/data/GameData";

interface ActionsPanelProps {
  playerFaction: Faction;
  territories: Territory[];
  selectedTerritory: string | null;
  selectedFaction: { name: string };
  actionsRemaining: number;
  onAction: (action: string) => void;
  onEndTurn: () => void;
  onRecruitTroops: () => void;
  onSpy: (territoryId: string) => void;
  onAttack: (fromTerritoryId: string, toTerritoryId: string) => void;
  onReinforce: (fromTerritoryId: string, toTerritoryId: string) => void;
  getValidAttackTargets: (fromTerritoryId: string) => Territory[];
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({
  playerFaction,
  territories,
  selectedTerritory,
  selectedFaction,
  actionsRemaining,
  onAction,
  onEndTurn,
  onRecruitTroops,
  onSpy,
  onAttack,
  onReinforce,
  getValidAttackTargets,
}) => {
  return (
    <Card className="max-h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Actions remaining: {actionsRemaining}/4
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => onAction("raid")}
              variant="destructive"
              size="sm"
              disabled={actionsRemaining <= 0}
            >
              <Sword className="w-3 h-3 mr-1" />
              Raid Territory
            </Button>
            <Button
              onClick={() => onAction("marry")}
              variant="secondary"
              size="sm"
              disabled={actionsRemaining <= 0}
            >
              Arrange Marriage
            </Button>
            <Button
              onClick={() => onAction("negotiate")}
              variant="outline"
              size="sm"
              disabled={actionsRemaining <= 0}
            >
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
                disabled={playerFaction.treasure < 50 || actionsRemaining <= 0}
              >
                <Users className="w-3 h-3 mr-1" />
                Recruit (50 solidi)
              </Button>
              <Button
                onClick={() => selectedTerritory && onSpy(selectedTerritory)}
                variant="outline"
                size="sm"
                disabled={
                  !selectedTerritory ||
                  playerFaction.treasure < 25 ||
                  actionsRemaining <= 0
                }
              >
                <Eye className="w-3 h-3 mr-1" />
                Spy (25 solidi)
              </Button>
            </div>

            {selectedTerritory && (
              <div className="border-t pt-3 space-y-2">
                {(() => {
                  const territory = territories.find(
                    (t) => t.name === selectedTerritory
                  );

                  const validAttackTargets =
                    territory?.owner === selectedFaction.name
                      ? getValidAttackTargets(selectedTerritory)
                      : [];

                  const validReinforceTargets =
                    territory?.owner === selectedFaction.name
                      ? adjacentTerritories[selectedTerritory]
                          .map((adj) => territories.find((t) => t.name === adj))
                          .filter(
                            (t): t is Territory =>
                              !!t &&
                              t.owner === selectedFaction.name &&
                              t.name !== selectedTerritory
                          )
                      : [];

                  return (
                    <>
                      {validAttackTargets.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs font-semibold">
                            Attack Targets:
                          </p>
                          {validAttackTargets.map((target) => (
                            <Button
                              key={`attack-${target.name}`}
                              onClick={() =>
                                onAttack(selectedTerritory, target.name)
                              }
                              variant="destructive"
                              size="sm"
                              className="w-full text-xs"
                              disabled={
                                territory.troops! < 200 || actionsRemaining <= 0
                              }
                            >
                              <Sword className="w-2 h-2 mr-1" />
                              Attack {target.name} ({target.troops})
                            </Button>
                          ))}
                        </div>
                      )}

                      {validReinforceTargets.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs font-semibold">
                            Reinforce Targets:
                          </p>
                          {validReinforceTargets.map((target) => (
                            <Button
                              key={`reinforce-${target.name}`}
                              onClick={() =>
                                onReinforce(selectedTerritory, target.name)
                              }
                              variant="default"
                              size="sm"
                              className="w-full text-xs bg-green-500 hover:bg-green-600 text-white"
                              disabled={
                                territory.troops! < 100 || actionsRemaining <= 0
                              }
                            >
                              <ShieldPlus className="w-2 h-2 mr-1" />
                              Reinforce {target.name} ({target.troops})
                            </Button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {selectedTerritory && (
              <SelectedTerritoryInfo
                territories={territories}
                selectedTerritory={selectedTerritory}
                selectedFaction={playerFaction}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionsPanel;
