import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { Character } from "@/types/gameTypes";

type CharacterProfileProps = {
  character: Character;
};

export function CharacterProfile({ character }: CharacterProfileProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border gap-4">
      <CharacterDialog character={character} size="lg" />
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
};

export function CharacterDialog({
  character,
  size = "sm",
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
