import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CharacterPortrait } from "@/types/GameTypes";

export const CharacterDialog: React.FC<{ character: CharacterPortrait }> = ({
  character,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar>
          <AvatarImage src={character.image} alt={character.name} />
          <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold">{character.name}</h2>
          <img
            src={character.image}
            alt={character.name}
            className="mx-auto w-24 h-24 rounded-full object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
