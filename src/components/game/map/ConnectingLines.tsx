import { Territory } from "@/types/gameTypes";
import { adjacentTerritories } from "@/data/gameData";

type ConnectingLinesProps = {
  territories: Territory[];
  selectedTerritoryName: string;
};

export function ConnectingLines({
  territories,
  selectedTerritoryName,
}: ConnectingLinesProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 20 10"
          refX="20"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 20 5 L 0 10 z" fill="red" />
        </marker>

        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2.5"
            floodColor="red"
            floodOpacity="1"
          />
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="4"
            floodColor="red"
            floodOpacity="0.7"
          />
        </filter>
      </defs>

      {selectedTerritoryName &&
        adjacentTerritories[selectedTerritoryName]?.map((adj) => {
          const from = territories.find(
            (t) => t.name === selectedTerritoryName
          );
          const to = territories.find((t) => t.name === adj);
          if (!from || !to) return null;

          return (
            <line
              key={adj}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="red"
              strokeWidth="0.8"
              markerEnd="url(#arrow)"
              filter="url(#glow)"
            />
          );
        })}
    </svg>
  );
}
