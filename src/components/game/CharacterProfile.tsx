import { CharacterPortrait } from "@/types/GameTypes";
import { CharacterDialog } from "@/components/game/CharacterDialog";

interface PlayerCharacterProps {
  playerCharacter: CharacterPortrait;
}

export const CharacterProfile: React.FC<PlayerCharacterProps> = ({
  playerCharacter,
}) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
      <CharacterDialog character={playerCharacter} size="lg" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{playerCharacter.name}</h3>
      </div>
    </div>
  );
};
