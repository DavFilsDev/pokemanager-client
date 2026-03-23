import React from 'react';
import { CgPokemon } from 'react-icons/cg';
import { FiMoon, FiSun } from 'react-icons/fi';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="glass-morphism fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <CgPokemon className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PokéManager
            </h1>
          </div>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-xl glass-morphism hover:scale-105 transition-transform"
        >
          {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;