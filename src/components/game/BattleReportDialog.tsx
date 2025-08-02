import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { Character, BattleReport } from "@/types/gameTypes";
import { factions } from "@/data/factions";
import { chroniclers } from "@/data/chronicles";
import { CharacterDialog } from "@/components/game/CharacterProfile";
import { playRaven, playWolf } from "@/lib/sounds";

type BattleReportDialogProps = {
  battleMessage: BattleReport | null;
  dequeueBattleMessage: () => void;
  playerIndex: number;
  adviserIndex: number;
  setFactionAggressions: (aggressions: number[]) => void;
  setFactionTreasures: (treasures: number[]) => void;
};

export function BattleReportDialog({
  battleMessage,
  playerIndex,
  adviserIndex,
  dequeueBattleMessage,
  setFactionAggressions,
  setFactionTreasures,
}: BattleReportDialogProps) {
  if (!battleMessage) return null;

  Math.random() < 0.7 ? playRaven() : playWolf();

  const badgeColor =
    battleMessage.author.name === chroniclers[adviserIndex].name
      ? factions[playerIndex].color
      : null;

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) dequeueBattleMessage();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <BattleReportContent
          chronicler={battleMessage.author}
          chronicle={battleMessage.message}
          stats={battleMessage.stats}
          success={battleMessage.success}
          badgeColor={badgeColor}
          playerIndex={playerIndex}
          setFactionAggressions={setFactionAggressions}
          setFactionTreasures={setFactionTreasures}
        />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}

type BattleReportContentProps = {
  chronicler: Character;
  chronicle: string;
  stats: string;
  success: boolean;
  badgeColor: string;
  playerIndex: number;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
};

function BattleReportContent({
  chronicler,
  chronicle,
  stats,
  success,
  badgeColor,
  playerIndex,
  setFactionAggressions,
  setFactionTreasures,
}: BattleReportContentProps) {
  const image =
    Math.random() < 0.5
      ? "src/assets/battle.jpg"
      : "src/assets/battle-mosaic.jpg";

  return (
    <div className="relative">
      <div className="float-left w-1/2 max-w-[300px] mr-6 mb-4">
        <img
          src={image}
          alt="Battle scene"
          className="w-full h-auto max-h-[300px] rounded object-cover mb-4"
        />
        <p
          className="text-sm font-serif leading-relaxed text-gray-500"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {stats}
        </p>
      </div>

      <div className="space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {success ? "Huzzah!" : "Alas!"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 mb-2">
          <CharacterDialog character={chronicler} />
          <Badge
            variant="secondary"
            style={badgeColor ? { backgroundColor: badgeColor } : undefined}
          >
            {chronicler.name}
          </Badge>
        </div>

        <p
          className="text-sm italic font-serif leading-relaxed"
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{
            __html: `"${chronicle}"`,
          }}
        />
      </div>
    </div>
  );
}
