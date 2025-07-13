import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CharacterPortrait } from "@/types/GameTypes";
import { cn } from "@/lib/utils"; // or use `classnames` if preferred

interface CharacterDialogProps {
  character: CharacterPortrait;
  size?: "sm" | "lg";
}

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
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src={character.image} alt={character.name} />
              <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {character.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed italic">
            {character.biography}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
