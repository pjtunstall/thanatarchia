import { useEffect } from "react";
import { getSeason } from "@/data/GameData";

interface Props {
  currentTurn: number;
}

function ThemeManager({ currentTurn }: Props) {
  useEffect(() => {
    const season = getSeason(currentTurn);
    const isDark = season === "winter" || season === "autumn";
    document.documentElement.classList.toggle("dark", isDark);
  }, [currentTurn]);

  return null;
}

// function ThemeManager({ currentTurn }: Props) {
//   useEffect(() => {
//     const season = getSeason(currentTurn);
//     const classes = [
//       "theme-spring",
//       "theme-summer",
//       "theme-autumn",
//       "theme-winter",
//     ];

//     // Remove any existing season class
//     document.documentElement.classList.remove(...classes);

//     // Add current season class
//     document.documentElement.classList.add(`theme-${season}`);
//   }, [currentTurn]);

//   return null;
// }

export default ThemeManager;
