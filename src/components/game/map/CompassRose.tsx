export function CompassRose() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute z-10 right-4 top-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#d6c2a1"
        stroke="#6b5537"
        strokeWidth="4"
      />

      {/* Main compass star with 8 points */}
      <g fill="#8b7047">
        <polygon points="50,5 55,45 50,50 45,45" />
        <polygon points="79,21 55,45 50,50 45,45" />
        <polygon points="95,50 55,55 50,50 55,45" />
        <polygon points="79,79 55,55 50,50 55,45" />
        <polygon points="50,95 45,55 50,50 55,55" />
        <polygon points="21,79 45,55 50,50 45,45" />
        <polygon points="5,50 45,45 50,50 45,55" />
        <polygon points="21,21 45,45 50,50 55,45" />
      </g>

      {/* Primary directions - larger lozenges */}
      <g fill="#3c2915">
        <polygon points="50,8 53,47 50,86 47,47" />
        <polygon points="92,50 53,53 8,50 47,47" />
      </g>

      {/* Center circle */}
      <circle cx="50" cy="50" r="4" fill="#3c2915" />
      <circle cx="50" cy="50" r="2" fill="#d6c2a1" />

      {/* Direction labels */}
      <g
        fontSize="6"
        className="sm:font-[8px] md:font-[10px]"
        fontWeight="bold"
        fill="#3c2915"
        textAnchor="middle"
      >
        <text x="50" y="12">
          N
        </text>
        <text x="88" y="54">
          E
        </text>
        <text x="50" y="97">
          S
        </text>
        <text x="12" y="54">
          W
        </text>
      </g>
    </svg>
  );
}
