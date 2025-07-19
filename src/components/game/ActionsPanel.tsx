import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Chronicler, AttackOrder } from "@/types/gameTypes";
import { SelectedTerritoryInfo } from "@/components/game/SelectedTerritoryInfo";
import { adjacentTerritories, chroniclers } from "@/data/gameData";
import { Faction, Territory } from "@/types/gameTypes";
import { BasicActions } from "@/components/game/actions/BasicActions";
import { TreasuryActions } from "@/components/game/actions/TreasuryActions";
import { AttackButton } from "@/components/game/actions/AttackButton";
import { ReinforceButton } from "@/components/game/actions/ReinforceButton";
import { factions } from "@/data/factions";

type ActionsPanelProps = {
  playerFaction: Faction;
  playerIndex: number;
  adviserIndex: number;
  factionTreasures: number[];
  territories: Territory[];
  selectedTerritory: string | null;
  scheduledAttacks: AttackOrder[];
  setScheduledAttacks: React.Dispatch<React.SetStateAction<AttackOrder[]>>;
  onAction: (action: string) => void;
  onEndTurn: () => void;
  onRecruit: () => void;
  onSpy: (territoryId: string) => void;
  onAttack: (
    fromTerritoryId: string,
    toTerritoryId: string,
    adviserIndex: number
  ) => {
    victory: boolean;
    chronicle: string;
    chronicler: Chronicler;
    stats: string;
  };
  onReinforce: (fromTerritoryId: string, toTerritoryId: string) => void;
  getValidAttackTargets: (fromTerritoryId: string) => Territory[];
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  currentChronicler: Chronicler;
  setCurrentChronicler: React.Dispatch<React.SetStateAction<Chronicler>>;
  battleMessage: string;
  setBattleMessage: React.Dispatch<React.SetStateAction<string>>;
  stats: string;
  setStats: React.Dispatch<React.SetStateAction<string>>;
};

export const ActionsPanel: React.FC<ActionsPanelProps> = (props) => {
  const {
    playerFaction,
    playerIndex,
    adviserIndex,
    factionTreasures,
    selectedTerritory,
    scheduledAttacks,
    setScheduledAttacks,
    territories,
    getValidAttackTargets,
    success,
    setSuccess,
    currentChronicler,
    setCurrentChronicler,
    battleMessage,
    setBattleMessage,
    stats,
    setStats,
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

  const handleAttack = (from: string, to: string): void => {
    const result = props.onAttack(from, to, adviserIndex);
    setSuccess(result.victory);
    setBattleMessage(result.chronicle);
    setStats(result.stats);
    setCurrentChronicler(result.chronicler);
  };

  return (
    <>
      <Card className="max-h-full overflow-auto">
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <BasicActions
              onAction={props.onAction}
              onEndTurn={props.onEndTurn}
            />
            <div className="border-t pt-3">
              <p className="text-sm font-semibold mb-2">Treasury Actions</p>
              <TreasuryActions
                playerTreasure={factionTreasures[playerIndex]}
                selectedTerritory={selectedTerritory}
                onRecruit={props.onRecruit}
                onSpy={props.onSpy}
              />

              {selectedTerritory && (
                <>
                  <SelectedTerritoryInfo
                    territories={territories}
                    selectedTerritory={selectedTerritory}
                    playerFactionName={factions[playerIndex].name}
                    scheduledAttacks={scheduledAttacks}
                    setScheduledAttacks={setScheduledAttacks}
                  />
                  <div className="border-t pt-3 space-y-2">
                    <AttackButton
                      from={selectedTerritory}
                      targets={validAttackTargets}
                      onAttack={handleAttack}
                      disabled={selected?.troops! < 1}
                    />
                    <ReinforceButton
                      from={selectedTerritory}
                      targets={validReinforceTargets}
                      onReinforce={props.onReinforce}
                      disabled={selected?.troops! < 1}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
