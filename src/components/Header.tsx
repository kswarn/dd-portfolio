import { useState } from "react";
import MenuOverlay from "./MenuOverlay";

import { PaperPlaneTiltIcon, List } from "@phosphor-icons/react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/50">
      <div className="max-w-8xl mx-auto cursor-pointer px-4 md:px-8 lg:px-8 py-4 md:py-6 flex justify-between items-center">
        <a
          href="/"
          className="text-xl md:text-2xl font-bold flex gap-1 md:gap-2 text-[#40764c] transition-colors custom-font"
          title="Swarna Kadagadkai"
        >
          <span>Swarna Kadagadkai</span>
          {/* <span className="sm:hidden">Swarna Kadag</span> */}
          <PaperPlaneTiltIcon
            size={20}
            color="#ffbdbd"
            weight="bold"
            className="flex-shrink-0"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center cursor-pointer gap-1 text-gray-900 transition-colors"
            aria-label="Open menu"
          >
            <span className="text-base lg:text-lg cursor-pointer hover:underline hover:underline-offset-8">
              My Work
            </span>
          </button>
          <span className="text-base lg:text-lg cursor-pointer transition-colors">
            <a
              href="/about"
              className="hover:underline hover:underline-offset-8"
            >
              About me
            </a>
          </span>
          <span className="text-base lg:text-lg cursor-pointer transition-colors">
            <a
              href="https://drive.google.com/file/d/19t2Ydk-noAOPMKNtOpbmKnReZN1EzG4A/view?usp=sharing"
              target="_blank"
              className="hover:underline hover:underline-offset-8"
            >
              Resume
            </a>
          </span>

          <a
            href="mailto:contact@swarna.design"
            className="flex bg-[#ffbdbd] hover:text-[#40764c] rounded-full px-4 py-2 items-center cursor-pointer gap-2 transition-colors"
          >
            <span className="text-base lg:text-lg text-gray-900 hover:text-[#40764c] font-medium">
              Get in touch
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex items-center justify-center p-2 text-gray-900 hover:text-gray-700 transition-colors"
          aria-label="Open menu"
        >
          <List size={24} weight="bold" />
        </button>
      </div>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;
