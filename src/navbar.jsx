import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export default function Navbar({ toggleDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg border-b-2 border-blue-500"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-2xl font-bold tracking-widest neon-text">
        Reaction Timer
      </h1>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navbar Links - Visible on larger screens */}
      <div className="hidden lg:flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="neon-link">
            Home
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/leaderboard" className="neon-link">
            Leaderboard
          </Link>
        </motion.div>

        <motion.button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 rounded-lg neon-btn"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 15px rgba(0, 0, 255, 1)",
          }}
          whileTap={{ scale: 0.9 }}
        >
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="5" stroke="#C8BCF6" stroke-width="1.5"/>
<path d="M12 19.5V22" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 2V4.5" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4.5 12L2 12" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 12L19.5 12" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M17.3033 6.69678L19.0711 4.92901" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4.92894 19.071L6.69671 17.3033" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M17.3033 17.3032L19.0711 19.071" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4.92896 4.92896L6.69672 6.69672" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
</svg> 
        </motion.button>
      </div>

      {/* Mobile Menu - Visible on small screens */}
<div
  className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} absolute top-20 right-0 w-1/2 bg-gray-900 text-white p-4`}
>
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="mb-4"
  >
    <Link to="/" className="neon-link">
      Home
    </Link>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="mb-4"
  >
    <Link to="/leaderboard" className="neon-link">
      Leaderboard
    </Link>
  </motion.div>

  <motion.button
  onClick={toggleDarkMode}
  className="px-4 py-2 bg-blue-500 rounded-lg neon-btn flex items-center justify-center"
  whileHover={{
    scale: 1.1,
    boxShadow: "0px 0px 15px rgba(0, 0, 255, 1)",
  }}
  whileTap={{ scale: 0.9 }}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="5" stroke="#C8BCF6" stroke-width="1.5"/>
<path d="M12 19.5V22" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 2V4.5" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4.5 12L2 12" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 12L19.5 12" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M17.3033 6.69678L19.0711 4.92901" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4.92894 19.071L6.69671 17.3033" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M17.3033 17.3032L19.0711 19.071" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4.92896 4.92896L6.69672 6.69672" stroke="#C8BCF6" stroke-width="1.5" stroke-linecap="round"/>
</svg>

</motion.button>
</div>

    </motion.nav>
  );
}
