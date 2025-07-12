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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <p className="text-xl text-gray-600 mb-4 uncial">
          Vae mihi! Paginam non invenit
        </p>
        <p className="text-xl text-gray-600 mb-4">
          Οὐαί μοι! Ἡ σελίς οὐχ εὑρέθη
        </p>
        <p className="text-xl text-gray-600 mb-4">
          𐍅𐌰𐌹 𐌼𐌹𐍃! 𐍃𐍄𐌰𐌸 𐌽𐌹 𐌱𐌹𐌲𐌹𐍄𐌰𐌽𐍃 𐍅𐌰𐍂𐌸
        </p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
