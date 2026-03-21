import React from 'react';
import type { Pokemon } from '../../types/pokemon.types';
import { GiSwordman, GiShield } from 'react-icons/gi';
import { IoFlashOutline } from 'react-icons/io5';
import TypeBadge from './TypeBadge';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const xpPercentage = (pokemon.xp / pokemon.xpToNextLevel) * 100;

  return (
    <div className="glass-card p-5 hover:scale-105 transition-transform cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold">{pokemon.nickname || pokemon.name}</h3>
          <p className="text-sm text-gray-500">Niveau {pokemon.level}</p>
        </div>
        <TypeBadge type={pokemon.type} size="sm" />
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span>XP</span>
          <span>{pokemon.xp}/{pokemon.xpToNextLevel}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${xpPercentage}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="flex items-center justify-center gap-1">
          <GiSwordman className="w-4 h-4 text-red-500" />
          <span>{pokemon.attack}</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <GiShield className="w-4 h-4 text-green-500" />
          <span>{pokemon.defense}</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <IoFlashOutline className="w-4 h-4 text-purple-500" />
          <span>{pokemon.speed}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500">
        <span>Victoires: {pokemon.battlesWon}</span>
        <span className="ml-3">Défaites: {pokemon.battlesLost}</span>
      </div>
    </div>
  );
};

export default PokemonCard;