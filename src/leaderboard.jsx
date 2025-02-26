import { useState, useEffect } from "react";
import Navbar from "./navbar.jsx";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("bg-gray-900");
    document.body.classList.toggle("bg-white");
    document.body.classList.toggle("text-black");
    document.body.classList.toggle("text-white");
  };

  useEffect(() => {
    // Get scores from localStorage
    const storedScores = JSON.parse(localStorage.getItem("reactionTimes")) || [];
    
    // Sort scores in ascending order (fastest first) & keep only top 5
    const topScores = storedScores.sort((a, b) => a - b).slice(0, 5);

    // Update state
    setScores(topScores);

    // Save only top 5 back to localStorage
    localStorage.setItem("reactionTimes", JSON.stringify(topScores));
  }, []);

  return (
    <div className={`h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
  <Navbar toggleDarkMode={toggleDarkMode} />
  <div className="flex flex-col items-center justify-center h-screen mt-[-50px]">
    <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
    {scores.length > 0 ? (
      <ul className="text-2xl text-center">
        {scores.map((time, index) => (
          <li key={index} className="mb-2">
            <span className="font-bold">#{index + 1}</span> - Reaction Time: <span className="font-bold">{time}ms</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-xl">No scores recorded yet.</p>
    )}
  </div>
</div>

  );
}
