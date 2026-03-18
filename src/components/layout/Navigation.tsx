import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-pokemon-blue text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold mb-2 sm:mb-0">
            🎮 PokéManager
          </Link>
          
          <div className="flex gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${isActive('/')}`}
            >
              Accueil
            </Link>
            <Link
              to="/collection"
              className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${isActive('/collection')}`}
            >
              Collection
            </Link>
            <Link
              to="/battle"
              className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${isActive('/battle')}`}
            >
              Combat
            </Link>
            <Link
              to="/create"
              className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${isActive('/create')}`}
            >
              Créer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;