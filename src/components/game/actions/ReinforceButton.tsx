import { Button } from "@/components/ui/button";
import { ShieldPlus } from "lucide-react";
import { Territory } from "@/types/GameTypes";

interface Props {
  from: string;
  targets: Territory[];
  onReinforce: (from: string, to: string) => void;
  disabled: boolean;
}

const ReinforceButton: React.FC<Props> = ({
  from,
  targets,
  onReinforce,
  disabled,
}) => {
  if (targets.length === 0) return null;

  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold">Reinforce Targets:</p>
      {targets.map((t) => (
        <Button
          key={`reinforce-${t.name}`}
          onClick={() => onReinforce(from, t.name)}
          variant="default"
          size="sm"
          className="w-full text-xs bg-green-500 hover:bg-green-600 text-white"
          disabled={disabled}
        >
          <ShieldPlus className="w-2 h-2 mr-1" />
          Reinforce {t.name} ({t.troops})
        </Button>
      ))}
    </div>
  );
};

export default ReinforceButton;
