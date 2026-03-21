import React from 'react';
import { PokemonType } from '../../types/pokemon.types';

interface TypeBadgeProps {
  type: PokemonType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getTypeColor = (type: PokemonType): string => {
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

const getTypeTextColor = (type: PokemonType): string => {
  const darkTypes: PokemonType[] = [
    PokemonType.DARK,
    PokemonType.DRAGON,
    PokemonType.FIGHTING,
    PokemonType.GHOST,
    PokemonType.ROCK,
    PokemonType.STEEL,
  ];
  
  return darkTypes.includes(type) ? 'text-white' : 'text-gray-900';
};

const getTypeSize = (size: 'sm' | 'md' | 'lg'): string => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  return sizes[size];
};

const formatTypeName = (type: PokemonType): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size = 'md', className = '' }) => {
  const colorClass = getTypeColor(type);
  const textColorClass = getTypeTextColor(type);
  const sizeClass = getTypeSize(size);
  
  return (
    <span
      className={`inline-block ${colorClass} ${textColorClass} ${sizeClass} rounded-full font-semibold text-center ${className}`}
    >
      {formatTypeName(type)}
    </span>
  );
};

export default TypeBadge;