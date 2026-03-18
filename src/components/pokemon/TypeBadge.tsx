import React from 'react';
import { PokemonType } from '../../types/pokemon.types';
import { getTypeColor, formatPokemonType } from '../../utils/formatters';

interface TypeBadgeProps {
  type: PokemonType;
  size?: 'sm' | 'md';
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span
      className={`${getTypeColor(type)} ${sizeClasses[size]} rounded-full text-white font-semibold inline-block`}
    >
      {formatPokemonType(type)}
    </span>
  );
};

export default TypeBadge;