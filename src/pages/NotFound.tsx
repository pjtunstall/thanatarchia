import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oh no! Page not found</p>
        <p className="text-xl text-gray-400 mb-4 uncial">
          Vae mihi! Pagina non inventa est
        </p>
        <p className="text-xl text-red-600 mb-4">
          Οὐαί μοι! Ὁ τόπος οὐχ εὑρέθη
        </p>
        <p className="text-xl text-yellow-600 mb-4">
          𐍅𐌰𐌹 𐌼𐌹𐍃! 𐍃𐍄𐌰𐌸 𐌽𐌹 𐌱𐌹𐌲𐌹𐍄𐌰𐌽𐍃 𐍅𐌰𐍂𐌸
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 text-lg font-serif text-yellow-100 bg-amber-800 border-2 border-amber-600 rounded-xl shadow-md hover:bg-amber-700 hover:text-white transition duration-150"
        >
          ⮐ Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
