import React from 'react';
import type { Pokemon } from '../../types/pokemon.types';
import PokemonCard from './PokemonCard';
import Loading from '../common/Loading';
import Error from '../common/Error';

interface PokemonListProps {
  pokemon: Pokemon[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onPokemonClick?: (pokemon: Pokemon) => void;
  emptyMessage?: string;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemon,
  loading = false,
  error = null,
  onRetry,
  onPokemonClick,
  emptyMessage = "Aucun Pokémon dans ta collection"
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading text="Chargement des Pokémon..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <Error message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😢</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500">
          Commence par créer ton premier Pokémon !
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          onClick={() => onPokemonClick?.(p)}
        />
      ))}
    </div>
  );
};

export default PokemonList;