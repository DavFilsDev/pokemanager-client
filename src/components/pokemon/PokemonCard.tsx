import React from 'react';
import type { Pokemon } from '../../types/pokemon.types';
import { GiSwordman, GiShield, GiRunning } from 'react-icons/gi';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    ice: 'bg-cyan-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-600',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    dark: 'bg-gray-800',
    dragon: 'bg-indigo-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  return colors[type] || 'bg-gray-400';
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const xpPercentage = (pokemon.xp / pokemon.xpToNextLevel) * 100;

  return (
    <div className="glass-card p-5 hover:scale-105 transition-transform cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold">{pokemon.nickname || pokemon.name}</h3>
          <p className="text-sm text-gray-500">Niveau {pokemon.level}</p>
        </div>
        <span className={`${getTypeColor(pokemon.type)} px-2 py-1 rounded-lg text-xs text-white font-medium`}>
          {pokemon.type}
        </span>
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
          <GiRunning className="w-4 h-4 text-purple-500" />
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