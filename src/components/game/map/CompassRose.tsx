export function CompassRose() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 20, right: 60, zIndex: 10 }}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#d6c2a1"
        stroke="#6b5537"
        strokeWidth="4"
      />
      <polygon points="50,5 52,50 50,95 48,50" fill="#3c2915" />
      <polygon
        points="50,5 58,50 95,50 58,52 50,95 42,52 5,50 42,50"
        fill="#8b7047"
      />
      <circle cx="50" cy="50" r="3" fill="#3c2915" />
      <text
        x="50"
        y="12"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#3c2915"
      >
        N
      </text>
      <text
        x="88"
        y="54"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#3c2915"
      >
        E
      </text>
      <text
        x="50"
        y="97"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#3c2915"
      >
        S
      </text>
      <text
        x="12"
        y="54"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#3c2915"
      >
        W
      </text>
    </svg>
  );
}
