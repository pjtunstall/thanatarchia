export function CompassRose() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 20, right: 60, zIndex: 10 }}
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
        {/* North point */}
        <polygon points="50,5 55,45 50,50 45,45" />
        {/* Northeast point */}
        <polygon points="79,21 55,45 50,50 45,45" />
        {/* East point */}
        <polygon points="95,50 55,55 50,50 55,45" />
        {/* Southeast point */}
        <polygon points="79,79 55,55 50,50 55,45" />
        {/* South point */}
        <polygon points="50,95 45,55 50,50 55,55" />
        {/* Southwest point */}
        <polygon points="21,79 45,55 50,50 45,45" />
        {/* West point */}
        <polygon points="5,50 45,45 50,50 45,55" />
        {/* Northwest point */}
        <polygon points="21,21 45,45 50,50 55,45" />
      </g>

      {/* Primary directions - larger lozenges */}
      <g fill="#3c2915">
        {/* North-South lozenge */}
        <polygon points="50,8 53,47 50,86 47,47" />
        {/* East-West lozenge */}
        <polygon points="92,50 53,53 8,50 47,47" />
      </g>

      {/* Center circle */}
      <circle cx="50" cy="50" r="4" fill="#3c2915" />
      <circle cx="50" cy="50" r="2" fill="#d6c2a1" />

      {/* Direction labels */}
      <g fontSize="10" fontWeight="bold" fill="#3c2915" textAnchor="middle">
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
