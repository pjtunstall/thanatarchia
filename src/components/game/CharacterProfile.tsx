import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Handshake, Grab } from "lucide-react";
import { cn } from "@/lib/utils";

import { Character } from "@/types/gameTypes";
import { playCoinbag } from "@/components/game/actions/TreasuryActions";

const quill = new Audio("/sfx/quill.mp3");
function playQuill(): HTMLAudioElement {
  const audio = quill.cloneNode(true) as HTMLAudioElement;
  audio.play();
  return audio;
}

const raven = new Audio("/sfx/raven.mp3");
export function playRaven(): HTMLAudioElement {
  const audio = raven.cloneNode(true) as HTMLAudioElement;
  audio.play();
  return audio;
}

type CharacterProfileProps = {
  character: Character;
  player: Character;
  playerIndex?: number;
  setFactionAggressions?: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures?: React.Dispatch<React.SetStateAction<number[]>>;
};

export function CharacterProfile({
  character,
  player,
  playerIndex,
  setFactionAggressions,
  setFactionTreasures,
}: CharacterProfileProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border gap-4">
      <CharacterDialog
        character={character}
        size="lg"
        player={player}
        playerIndex={playerIndex}
        setFactionAggressions={setFactionAggressions}
        setFactionTreasures={setFactionTreasures}
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-lg">{character.name}</h3>
        </div>
      </div>
    </div>
  );
}

type CharacterDialogProps = {
  character: Character;
  player: Character;
  playerIndex: number;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
  size?: "sm" | "lg";
};

export function CharacterDialog({
  character,
  size = "sm",
  player,
  playerIndex,
  setFactionAggressions,
  setFactionTreasures,
}: CharacterDialogProps) {
  const triggerSize = size === "lg" ? "w-16 h-16" : "w-12 h-12";

  if (!player) {
    player = character;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar
          className={cn(
            triggerSize,
            "relative cursor-pointer transition-transform duration-200 hover:scale-125 hover:z-10"
          )}
        >
          <AvatarImage src={character.image} alt={character.name} />
          <AvatarFallback className="text-xs">
            {character.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={character.image} alt={character.name} />
                <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-lg font-semibold">{character.name}</span>
            </div>
            {player.name !== character.name && (
              <div className="flex items-center gap-2">
                <TributeDialog
                  character={character}
                  player={player}
                  playerIndex={playerIndex}
                  setFactionTreasures={setFactionTreasures}
                  setFactionAggressions={setFactionAggressions}
                />
                <ThreatDialog
                  character={character}
                  player={player}
                  playerIndex={playerIndex}
                  setFactionAggressions={setFactionAggressions}
                />
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed italic">
            {character.biography}
          </p>
        </div>
        <DialogClose className="absolute right-4 top-4" />
      </DialogContent>
    </Dialog>
  );
}

type TributeDialogProps = {
  character: Character;
  player: Character;
  playerIndex: number;
  setFactionTreasures: React.Dispatch<React.SetStateAction<number[]>>;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
};

function TributeDialog({
  character,
  player,
  playerIndex,
  setFactionTreasures,
  setFactionAggressions,
}: TributeDialogProps) {
  const handlePayTribute = () => {
    setFactionTreasures((prev) =>
      prev.map((t, i) => (i === playerIndex ? Math.max(t - 200, 0) : t))
    );
    setFactionAggressions((prev) =>
      prev.map((a, i) => (i === playerIndex ? Math.max(a - 0.1, 0.1) : a))
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
          aria-label="Pay Tribute"
        >
          <span className="absolute left-0 bottom-full mb-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-teal-600 font-serif italic">
            Pay Tribute (200 solidi)
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
          Please accept this small token of my appreciation. I know it's not
          much, but the treasury is rather empty at the moment. Rest assured
          that more will follow just as soon as the raiding season is over. Keep
          up the good work!
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
  playerIndex: number;
  setFactionAggressions: React.Dispatch<React.SetStateAction<number[]>>;
};

function ThreatDialog({
  character,
  player,
  playerIndex,
  setFactionAggressions,
}: ThreatDialogProps) {
  const their = character.gender === "male" ? "his" : "her";

  const handleProvoke = () => {
    setFactionAggressions((prev) =>
      prev.map((a, i) => (i === playerIndex ? Math.min(a + 0.2, 1) : a))
    );
    const quillSound = playQuill();
    quillSound.addEventListener("ended", () => {
      playRaven();
    });
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
          <span className="absolute right-0 top-full mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-amber-600 font-serif italic">
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
