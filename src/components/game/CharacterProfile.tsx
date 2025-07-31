import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Handshake, Grab } from "lucide-react";
import { cn } from "@/lib/utils";

import { Character } from "@/types/gameTypes";

type CharacterProfileProps = {
  character: Character;
  playerName?: string;
};

export function CharacterProfile({
  character,
  playerName = "",
}: CharacterProfileProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border gap-4">
      <CharacterDialog
        character={character}
        size="lg"
        playerName={playerName}
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
  size?: "sm" | "lg";
  playerName?: string;
};

export function CharacterDialog({
  character,
  size = "sm",
  playerName = "",
}: CharacterDialogProps) {
  const triggerSize = size === "lg" ? "w-16 h-16" : "w-12 h-12";

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
            {playerName !== "" && (
              <div className="flex items-center gap-2">
                <TributeDialog character={character} playerName={playerName} />
                <ThreatDialog character={character} playerName={playerName} />
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

function TributeDialog({
  character,
  playerName,
}: {
  character: Character;
  playerName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group">
          <span className="absolute left-0 bottom-full mb-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-teal-600 font-serif italic">
            Bestow Tribute
          </span>
          <div className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
            <Handshake className="w-5 h-5 transition-transform duration-200 hover:scale-125" />
          </div>
        </div>
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
        <p>{playerName}</p>
      </DialogContent>
    </Dialog>
  );
}

function ThreatDialog({
  character,
  playerName,
}: {
  character: Character;
  playerName: string;
}) {
  const their = character.gender === "male" ? "his" : "her";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group">
          <span className="absolute right-0 top-full mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-amber-600 font-serif italic">
            Provoke
          </span>
          <div className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
            <Grab className="w-5 h-5 transition-transform duration-200 hover:scale-125" />
          </div>
        </div>
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
          should risk ${their} own life and those of ${their} people by seeking
          power. You must know that all who oppose me die?
        </p>
        <p>Yours sincerely,</p>
        <p>{playerName}</p>
      </DialogContent>
    </Dialog>
  );
}
