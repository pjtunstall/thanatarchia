import { ReactNode, MouseEvent } from "react";

type WaxSealButtonProps = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: "attack" | "reinforce" | "default";
  className?: string;
};

export function WaxSealButton({
  children,
  onClick,
  disabled = false,
  variant = "default",
  className = "",
}: WaxSealButtonProps) {
  const colors = {
    attack: { primary: "#8B0000", secondary: "#DC143C", shadow: "#660000" },
    reinforce: { primary: "#006400", secondary: "#228B22", shadow: "#004400" },
    default: { primary: "#8B4513", secondary: "#D2B48C", shadow: "#654321" },
  };

  const color = colors[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
          relative w-full py-1 px-2 rounded-full border-2 transition-all duration-200 ${className}
          ${disabled ? "opacity-50" : "hover:scale-[1.02] cursor-pointer"}
        `}
      style={{
        cursor: disabled ? "default" : "pointer",
        background: `radial-gradient(circle at 30% 30%, ${color.secondary}, ${color.primary})`,
        borderColor: color.shadow,
        boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 2px rgba(255, 255, 255, 0.3),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2)
          `,
      }}
    >
      <span
        className="text-white text-xs font-bold flex items-center gap-1"
        style={{
          textShadow: "1px 1px 0 #00000080",
        }}
      >
        {children}
      </span>
    </button>
  );
}
