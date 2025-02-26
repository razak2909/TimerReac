import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar.jsx";

export default function Game() {
  const [gameState, setGameState] = useState("start");
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(localStorage.getItem("bestTime") || null);
  const [delay, setDelay] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("bg-gray-900");
    document.body.classList.toggle("bg-white");
    document.body.classList.toggle("text-black");
    document.body.classList.toggle("text-white");
  };

  const startGame = () => {
    setGameState("wait");
    setError("");

    const randomDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    setDelay(randomDelay);

    setTimeout(() => {
      setStartTime(Date.now());
      setGameState("reaction");
    }, randomDelay);
  };

  const handleClick = () => {
    if (gameState === "wait") {
      setGameState("start");
      setError("Too Soon! Try Again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else if (gameState === "reaction") {
      const timeTaken = Date.now() - startTime;
      setReactionTime(timeTaken);
      setGameState("result");

      // Store reaction times in localStorage
      const storedTimes = JSON.parse(localStorage.getItem("reactionTimes")) || [];
      storedTimes.push(timeTaken);
      localStorage.setItem("reactionTimes", JSON.stringify(storedTimes));

      if (!bestTime || timeTaken < bestTime) {
        setBestTime(timeTaken);
        localStorage.setItem("bestTime", timeTaken);
      }
    }
  };

  return (
    <div className={`h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Navbar toggleDarkMode={toggleDarkMode} />

      <div className="flex flex-col items-center justify-center h-full">
        {gameState === "start" && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6">Reaction Timer Challenge</h1>
            <motion.button
  className="px-8 py-4 text-xl bg-transparent border-2 border-blue-500 text-blue-500 rounded-lg transition m-2 relative overflow-hidden"
  onClick={startGame}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ 
    opacity: 1, 
    scale: 1, 
    boxShadow: [
      "0px 0px 0px rgba(0, 0, 255, 0)", 
      "0px 0px 8px rgba(0, 0, 255, 0.8)", 
      "0px 0px 15px rgba(0, 0, 255, 0.5)", 
      "0px 0px 8px rgba(0, 0, 255, 0.8)", 
      "0px 0px 0px rgba(0, 0, 255, 0)"
    ] 
  }}
  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} // Smooth pulsating glow
  whileHover={{ 
    scale: 1.1, 
    boxShadow: "0px 0px 25px rgba(0, 0, 255, 1)", 
    backgroundColor: "rgba(0, 0, 255, 0.1)", 
    borderColor: "rgba(0, 0, 255, 1)", 
    color: "white" 
  }} // Intense glow + subtle background on hover
  whileTap={{ scale: 0.95, boxShadow: "0px 0px 12px rgba(0, 0, 255, 1)" }} // Dims slightly when clicked
>
  Start Game
</motion.button>

            {/* <motion.button
              className="px-8 py-4 text-xl bg-green-500 rounded-lg hover:bg-green-600 transition m-2"
              onClick={() => navigate("/leaderboard")}
            >
              Leaderboard
            </motion.button> */}
          </motion.div>
        )}

        {gameState === "wait" && (
        

         <motion.div
  className="text-4xl font-bold text-beige"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ 
    opacity: [0, 1, 0.5, 1, 0],  // Loading fade in-out effect
    scale: [1, 1.2, 1],  // Pulsating effect
    textShadow: [
      "0px 0px 10px #F5F5DC", 
      "0px 0px 20px #FFF5E1", 
      "0px 0px 10px #F5F5DC"
    ], // Beige glow
    rotate: [0, -3, 3, -3, 3, 0] // Slight shaking effect
  }}
  transition={{ 
    duration: 1.5, 
    repeat: Infinity, 
    repeatType: "loop", 
    ease: "easeInOut" 
  }}
>
  Get Ready...
</motion.div>

         
        )}

        {gameState === "reaction" && (
          <motion.div
            className="w-full h-full flex items-center justify-center font-bold text-4xl cursor-pointer"
            onClick={handleClick}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            Click Now!
          </motion.div>
        )}

        {gameState === "result" && (
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold">Your Reaction Time: {reactionTime}ms</h2>
            {bestTime && bestTime === reactionTime && (
              <motion.p className="text-green-400 text-xl" initial={{ scale: 0.8 }} animate={{ scale: 1.1 }} transition={{ yoyo: Infinity, duration: 0.8 }}>
                New Best Score!
              </motion.p>
            )}
            <div className="flex justify-center items-center gap-6 mt-6">
  <motion.button
    className="px-8 py-4 text-xl bg-blue-500 text-white rounded-lg transition-all relative overflow-hidden"
    onClick={() => setGameState("start")}
    whileHover={{
      scale: 1.1,
      backgroundColor: "#3b82f6",
      boxShadow: "0px 0px 15px #3b82f6",
    }}
    whileTap={{
      scale: 0.9,
      boxShadow: "0px 0px 25px #2563eb",
    }}
  >
    Try Again
  </motion.button>

  <motion.button
    className="px-8 py-4 text-xl bg-blue-500 text-white rounded-lg transition-all relative overflow-hidden"
    onClick={() => navigate("/leaderboard")}
    whileHover={{
      scale: 1.1,
      backgroundColor: "#3b82f6",
      boxShadow: "0px 0px 15px #3b82f6",
    }}
    whileTap={{
      scale: 0.9,
      boxShadow: "0px 0px 25px #2563eb",
    }}
  >
    Leaderboard
  </motion.button>
</div>

          </motion.div>
        )}

        {error && (
          <motion.p className="text-red-500 font-bold mt-4 text-xl" initial={{ x: 0 }} animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}>
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
}
