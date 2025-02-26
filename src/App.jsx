import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./game.jsx";
import Leaderboard from "./leaderboard.jsx";

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </div>
  );
} 
