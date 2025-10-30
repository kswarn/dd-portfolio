import { useState } from "react";
import MenuOverlay from "./MenuOverlay";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/50">
      <div className="max-w-8xl mx-auto px-8 py-6 flex justify-between items-center">
        <a
          href="/"
          className="text-xl font-medium text-gray-900 transition-colors"
        >
          Swarna Kadagadkai
        </a>
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center cursor-pointer gap-2 text-gray-900transition-colors"
          aria-label="Open menu"
        >
          <div className="w-6 h-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-lg font-medium">Menu</span>
        </button>
      </div>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;
