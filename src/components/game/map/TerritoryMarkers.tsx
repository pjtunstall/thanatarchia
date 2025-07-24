import { Territory } from "@/types/gameTypes";

type TerritoryMarkersProps = {
  selectedTerritory: string;
  territories: Territory[];
};

export function TerritoryMarkers({
  selectedTerritory,
  territories,
  factionLookup,
  onTerritoryClick,
  isUnderAttack,
  scheduledAttacks,
}) {
  return (
    <>
      {territories.map((territory) => (
        <div
          key={territory.name}
          className={`absolute cursor-pointer transition-transform duration-200 rounded-full ${
            selectedTerritory === territory.name
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
            className={`w-6 h-6 rounded-full border-2 shadow-lg flex items-center justify-center text-white text-l font-bold
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
            }}
          >
            {factionLookup[territory.owner]?.symbol ?? "⚔"}
          </div>

          <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {territory.name}
          </div>
        </div>
      ))}
    </>
  );
}
