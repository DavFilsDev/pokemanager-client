import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon.types';
import { pokemonService } from '../services/pokemonService';
import PokemonList from '../components/pokemon/PokemonList';
import Button from '../components/common/Button';
import type { PokemonFilters } from '../types/api.types';

const CollectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PokemonFilters>({});
  const [stats, setStats] = useState<any>(null);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonService.getAll(filters);
      setPokemon(data);
      
      // Charger les stats
      const collectionStats = await pokemonService.getCollectionStats();
      setStats(collectionStats);
    } catch (err) {
      setError('Impossible de charger ta collection');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemon();
  }, [filters]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Es-tu sûr de vouloir relâcher ce Pokémon ?')) {
      try {
        await pokemonService.delete(id);
        await loadPokemon(); // Recharger la liste
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  stats = {
    total: pokemon.length,
    averageLevel: pokemon.reduce((acc, p) => acc + p.level, 0) / pokemon.length || 0,
    totalBattles: pokemon.reduce((acc, p) => acc + p.battlesWon + p.battlesLost, 0),
    strongest: pokemon.sort((a, b) => b.attack - a.attack)[0]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">
          Ma Collection Pokémon
        </h1>
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => navigate('/create')}
          >
            + Nouveau Pokémon
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/battle')}
          >
            ⚔️ Combattre
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      {!loading && !error && pokemon.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-blue-600">
              {stats.total}
            </span>
            <span className="text-sm text-gray-600">Total Pokémon</span>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-green-600">
              {stats.averageLevel.toFixed(1)}
            </span>
            <span className="text-sm text-gray-600">Niveau moyen</span>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-purple-600">
              {stats.totalBattles}
            </span>
            <span className="text-sm text-gray-600">Combats total</span>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-yellow-600">
              {stats.strongest?.name || '-'}
            </span>
            <span className="text-sm text-gray-600">Plus fort</span>
          </div>
        </div>
      )}

      {/* Liste des Pokémon */}
      <PokemonList
        pokemon={pokemon}
        loading={loading}
        error={error}
        onRetry={loadPokemon}
        onPokemonClick={(pokemon) => navigate(`/pokemon/${pokemon.id}`)}
      />
    </div>
  );
};

export default CollectionPage;