import { PokemonType } from '../types/pokemon.types';

export const formatPokemonType = (type: PokemonType): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatXp = (xp: number): string => {
  return xp.toLocaleString('fr-FR');
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};

export const getTypeColor = (type: PokemonType): string => {
  const colors: Record<PokemonType, string> = {
    [PokemonType.NORMAL]: 'bg-gray-400',
    [PokemonType.FIRE]: 'bg-orange-500',
    [PokemonType.WATER]: 'bg-blue-500',
    [PokemonType.GRASS]: 'bg-green-500',
    [PokemonType.ELECTRIC]: 'bg-yellow-400',
    [PokemonType.ICE]: 'bg-cyan-300',
    [PokemonType.FIGHTING]: 'bg-red-700',
    [PokemonType.POISON]: 'bg-purple-600',
    [PokemonType.GROUND]: 'bg-yellow-600',
    [PokemonType.FLYING]: 'bg-indigo-300',
    [PokemonType.PSYCHIC]: 'bg-pink-500',
    [PokemonType.BUG]: 'bg-lime-500',
    [PokemonType.ROCK]: 'bg-yellow-800',
    [PokemonType.GHOST]: 'bg-purple-800',
    [PokemonType.DARK]: 'bg-gray-800',
    [PokemonType.DRAGON]: 'bg-indigo-700',
    [PokemonType.STEEL]: 'bg-gray-500',
    [PokemonType.FAIRY]: 'bg-pink-300',
  };
  
  return colors[type] || 'bg-gray-400';
};

export const getTypeTextColor = (type: PokemonType): string => {
  const darkTypes: PokemonType[] = [
    PokemonType.DARK,
    PokemonType.DRAGON,
    PokemonType.FIGHTING,
    PokemonType.GHOST,
    PokemonType.ROCK
  ];
  
  return darkTypes.includes(type) ? 'text-white' : 'text-gray-900';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};