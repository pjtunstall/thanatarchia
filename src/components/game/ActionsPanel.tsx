import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { adjacentTerritories } from "@/data/gameData";
import { Faction, Territory } from "@/types/gameTypes";
import { BasicActions } from "@/components/game/actions/BasicActions";
import { TreasuryActions } from "@/components/game/actions/TreasuryActions";
import { AttackButton } from "@/components/game/actions/AttackButton";
import { ReinforceButton } from "@/components/game/actions/ReinforceButton";

interface ActionsPanelProps {
  playerFaction: Faction;
  territories: Territory[];
  selectedTerritory: string | null;
  onAction: (action: string) => void;
  onEndTurn: () => void;
  onRecruitTroops: () => void;
  onSpy: (territoryId: string) => void;
  onAttack: (fromTerritoryId: string, toTerritoryId: string) => void;
  onReinforce: (fromTerritoryId: string, toTerritoryId: string) => void;
  getValidAttackTargets: (fromTerritoryId: string) => Territory[];
}

export const ActionsPanel: React.FC<ActionsPanelProps> = (props) => {
  const {
    playerFaction,
    selectedTerritory,
    territories,
    getValidAttackTargets,
  } = props;

  const selected = selectedTerritory
    ? territories.find((t) => t.name === selectedTerritory)
    : null;

  const validAttackTargets =
    selected?.owner === playerFaction.name && selectedTerritory
      ? getValidAttackTargets(selectedTerritory)
      : [];

  const validReinforceTargets =
    selected?.owner === playerFaction.name && selectedTerritory
      ? adjacentTerritories[selectedTerritory]
          .map((adj) => territories.find((t) => t.name === adj))
          .filter(
            (t): t is Territory =>
              !!t &&
              t.owner === playerFaction.name &&
              t.name !== selectedTerritory
          )
      : [];

  return (
    <Card className="max-h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <BasicActions onAction={props.onAction} onEndTurn={props.onEndTurn} />
          <div className="border-t pt-3">
            <p className="text-sm font-semibold mb-2">Treasury Actions</p>
            <TreasuryActions
              playerFaction={playerFaction}
              selectedTerritory={selectedTerritory}
              onRecruitTroops={props.onRecruitTroops}
              onSpy={props.onSpy}
            />

            {selectedTerritory && (
              <>
                <SelectedTerritoryInfo
                  territories={territories}
                  selectedTerritory={selectedTerritory}
                  selectedFaction={playerFaction}
                />
                <div className="border-t pt-3 space-y-2">
                  <AttackButton
                    from={selectedTerritory}
                    targets={validAttackTargets}
                    onAttack={props.onAttack}
                    disabled={selected?.troops! < 200}
                  />
                  <ReinforceButton
                    from={selectedTerritory}
                    targets={validReinforceTargets}
                    onReinforce={props.onReinforce}
                    disabled={selected?.troops! < 100}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
