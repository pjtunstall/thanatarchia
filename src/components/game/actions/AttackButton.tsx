import { Button } from "@/components/ui/button";
import { Sword } from "lucide-react";
import { Territory } from "@/types/gameTypes";

type AttackButtonProps = {
  from: string;
  targets: Territory[];
  onAttack: (from: string, to: string) => void;
  disabled: boolean;
};

export const AttackButton: React.FC<AttackButtonProps> = ({
  from,
  targets,
  onAttack,
  disabled,
}) => {
  if (targets.length === 0) return null;

  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold">Attack Targets:</p>
      {targets.map((t) => (
        <Button
          key={`attack-${t.name}`}
          onClick={() => onAttack(from, t.name)}
          variant="destructive"
          size="sm"
          className="w-full text-xs"
          disabled={disabled}
        >
          <Sword className="w-2 h-2 mr-1" />
          Attack {t.name} ({t.troops})
        </Button>
      ))}
    </div>
  );
};
