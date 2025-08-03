import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Faction, Character } from "@/types/gameTypes";
import { Crown, Church } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Handshake, Grab } from "lucide-react";

import { playQuill, playCoinbag } from "@/lib/sounds";
import { getFaithColor } from "@/data/faiths";
import { factions } from "@/data/factions";
import { AsyncAvatarImage } from "@/components/game/AsyncAvatarImage";

type FactionDetailsProps = {
  faction: Faction;
  leader: Character;
  isPlayerFaction: boolean;
  factionFaiths: string[];
  player: Character;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
};

export function FactionDetails({
  faction,
  leader,
  isPlayerFaction,
  factionFaiths,
  player,
  setFactionAggressions,
  setFactionTreasures,
}: FactionDetailsProps) {
  const faith = factionFaiths[factions.indexOf(faction)];

  return (
    <Card className="w-80">
      <CardHeader className="pb-3 bg-muted/30">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14">
            <AsyncAvatarImage src={leader.image} alt={leader.name} />
            <AvatarFallback className="text-xs">
              {leader.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {isPlayerFaction && <Crown className="w-4 h-4 text-yellow-500" />}
              {leader.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              {faction.formalName}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 bg-muted/30">
        {/* Faith */}
        <div className="flex items-center gap-4">
          <Church className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Faith:</span>
          <Badge
            variant="outline"
            className={`${getFaithColor(faith)} text-xs`}
          >
            {faith}
          </Badge>
          {player.name !== leader.name && (
            <div className="flex items-center gap-3">
              <TributeDialog
                character={leader}
                player={player}
                setFactionTreasures={setFactionTreasures}
                setFactionAggressions={setFactionAggressions}
              />
              <ThreatDialog
                character={leader}
                player={player}
                setFactionAggressions={setFactionAggressions}
              />
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-sm leading-relaxed italic">{leader.biography}</p>
        </div>

        {isPlayerFaction && (
          <>
            <Separator />
            <div className="text-xs text-center text-muted-foreground italic">
              This is your faction
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

type TributeDialogProps = {
  character: Character;
  player: Character;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
};

export function TributeDialog({
  character,
  player,
  setFactionTreasures,
  setFactionAggressions,
}: TributeDialogProps) {
  const handlePayTribute = () => {
    setFactionTreasures((prev) =>
      prev.map((t, i) => (i === player.index ? Math.max(t - 200, 0) : t))
    );
    setFactionAggressions((prev) =>
      prev.map((a, i) => (i === character.index ? Math.max(a - 0.1, 0.1) : a))
    );
    const quillSound = playQuill();
    quillSound.addEventListener("ended", () => {
      playCoinbag();
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={handlePayTribute}
          className="relative group w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
          type="button"
          aria-label="Bribe"
        >
          <span className="absolute left-0 bottom-full mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-teal-600 font-serif italic">
            Bribe
          </span>
          <Handshake className="w-5 h-5 transition-transform duration-200 hover:scale-125" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm font-serif italic bg-muted">
        <DialogHeader>
          <DialogTitle className="justify-start">
            Dear {character.name},
          </DialogTitle>
        </DialogHeader>
        <p>
          Please accept this small token of my appreciation (200 gold solidi). I
          know it's not much, but the treasury is rather bare at the moment.
          Rest assured that more will follow just as soon as the raiding season
          is over. Keep up the good work!
        </p>
        <p>Yours sincerely,</p>
        <p>{player.name}</p>
      </DialogContent>
    </Dialog>
  );
}

type ThreatDialogProps = {
  character: Character;
  player: Character;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
};

export function ThreatDialog({
  character,
  player,
  setFactionAggressions,
}: ThreatDialogProps) {
  const their = character.gender === "male" ? "his" : "her";

  const handleProvoke = () => {
    setFactionAggressions((prev) =>
      prev.map((a, i) => (i === character.index ? Math.min(a + 0.2, 1) : a))
    );
    playQuill();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={handleProvoke}
          className="relative group w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
          type="button"
          aria-label="Provoke"
        >
          <span className="absolute left-0 bottom-full mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-amber-600 font-serif italic">
            Provoke
          </span>
          <Grab className="w-5 h-5 transition-transform duration-200 hover:scale-125" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm font-serif italic bg-muted">
        <DialogHeader>
          <DialogTitle className="justify-start">
            My dear {character.name},
          </DialogTitle>
        </DialogHeader>
        <p>
          It saddens me that a ruler such as yourself, one with so much promise
          and so much to give, a gentle soul, not suited to the rigors of war,
          should risk not only {their} own life but also the lives of {their}{" "}
          people by seeking power. You do know that all who oppose me must die?
        </p>
        <p>Yours sincerely,</p>
        <p>{player.name}</p>
      </DialogContent>
    </Dialog>
  );
}
