import { Territory } from "@/types/gameTypes";

type TerritoryMarkersProps = {
  selectedTerritoryName: string;
  territories: Territory[];
  factionLookup: Record<string, { color: string; symbol: string }>;
  onTerritoryClick: (name: string) => void;
  isUnderAttack: (territory: Territory, scheduledAttacks: any[]) => boolean;
  scheduledAttacks: any[];
};

export function TerritoryMarkers({
  selectedTerritoryName,
  territories,
  factionLookup,
  onTerritoryClick,
  isUnderAttack,
  scheduledAttacks,
}: TerritoryMarkersProps) {
  return (
    <>
      {territories.map((territory) => (
        <div
          key={territory.name}
          className={`absolute cursor-pointer transition-transform duration-200 rounded-full ${
            selectedTerritoryName === territory.name
              ? "ring-2 ring-red-400 ring-offset-1 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
              : ""
          }`}
          style={{
            left: `${territory.x}%`,
            top: `${territory.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onTerritoryClick(territory.name);
          }}
        >
          <div
            className={`
              rounded-full border-2 shadow-lg flex items-center justify-center text-white font-bold
              transition-transform duration-200 hover:scale-125
              ${
                isUnderAttack(territory, scheduledAttacks)
                  ? "ring-white animate-pulse"
                  : ""
              }
            `}
            style={{
              backgroundColor: factionLookup[territory.owner]?.color ?? "gray",
              fontFamily: `'Segoe UI Symbol', 'Apple Color Emoji', 'Noto Color Emoji', 'Twemoji Mozilla', 'Symbola', sans-serif`,
              lineHeight: 1,
              width: "clamp(16px, 2.5vw, 24px)",
              height: "clamp(16px, 2.5vw, 24px)",
              fontSize: "clamp(10px, 1.5vw, 16px)",
            }}
          >
            {factionLookup[territory.owner]?.symbol ?? "⚔"}
          </div>

          <div className="absolute top-[130%] left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">
            {territory.name}
          </div>
        </div>
      ))}
    </>
  );
}
