import React, { useState, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon.types';
import { pokemonService } from '../services/pokemonService';
import PokemonCard from '../components/pokemon/PokemonCard';
import Loading from '../components/common/Loading';

const CollectionPage: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const data = await pokemonService.getAll();
      setPokemon(data);
    } catch (err) {
      setError('Impossible de charger la collection');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button onClick={loadPokemon} className="btn-primary mt-4">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Ma Collection</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {pokemon.length} Pokémon dans ta collection
          </p>
        </div>
      </div>

      {pokemon.length === 0 ? (
        <div className="text-center py-12 glass-card p-12">
          <p className="text-gray-500">Aucun Pokémon dans ta collection</p>
          <button className="btn-primary mt-4">Créer ton premier Pokémon</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;