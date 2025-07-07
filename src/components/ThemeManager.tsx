import { useEffect } from "react";
import { getSeason } from "@/data/GameData";

interface Props {
  currentTurn: number;
}

// It seems that going outside of the App to manipulate `document` directly is necessary to allow the background color to extend all the way to the bottom of the page and not just cover the area initially visible before scrolling. `useEffect` is used so that this direct DOM manipulation occurs after, and outside of, React's rendering process.
function ThemeManager({ currentTurn }: Props) {
  useEffect(() => {
    const season = getSeason(currentTurn);
    const classes = [
      "theme-spring",
      "theme-summer",
      "theme-autumn",
      "theme-winter",
    ];

    document.documentElement.classList.remove(...classes);
    document.documentElement.classList.add(`theme-${season}`);
  }, [currentTurn]);

  return null;
}

export default ThemeManager;

// function ThemeManager({ currentTurn }: Props) {
//   useEffect(() => {
//     const season = getSeason(currentTurn);
//     const isDark = season === "winter" || season === "autumn";
//     document.documentElement.classList.toggle("dark", isDark);
//   }, [currentTurn]);

//   return null;
// }
