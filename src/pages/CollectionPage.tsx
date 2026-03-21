import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import type { Pokemon, CreatePokemonDTO } from '../types/pokemon.types';
import { pokemonService } from '../services/pokemonService';
import PokemonCard from '../components/pokemon/PokemonCard';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import PokemonFormModal from '../components/pokemon/PokemonFormModal';

const CollectionPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    loadPokemon();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setFilteredPokemon(pokemon);
    }
  }, [searchQuery, pokemon]);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const data = await pokemonService.getAll();
      setPokemon(data);
      setFilteredPokemon(data);
    } catch (err) {
      setError('Impossible de charger la collection');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredPokemon(pokemon);
      setSearchParams({});
      return;
    }

    try {
      const results = await pokemonService.search({ name: query });
      setFilteredPokemon(results);
      setSearchParams({ search: query });
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleCreatePokemon = async (data: CreatePokemonDTO) => {
    try {
      setIsCreating(true);
      await pokemonService.create(data);
      await loadPokemon();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Create error:', err);
      alert('Erreur lors de la création du Pokémon');
    } finally {
      setIsCreating(false);
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
    <>
      <div>
        {/* Sub-header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Left section */}
          <div>
            <h1 className="text-3xl font-bold">Ma Collection</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {filteredPokemon.length} Pokémon dans ta collection
              {searchQuery && ` - Résultats pour "${searchQuery}"`}
            </p>
          </div>

          {/* Middle section - Search Bar */}
          <div className="flex-1 max-w-md">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Rechercher un Pokémon..."
              delay={300}
            />
          </div>

          {/* Right section - Create Button */}
          <div>
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Nouveau Pokémon
            </Button>
          </div>
        </div>

        {/* Content */}
        {filteredPokemon.length === 0 ? (
          <div className="text-center py-12 glass-card p-12">
            <p className="text-gray-500">
              {searchQuery
                ? `Aucun Pokémon trouvé pour "${searchQuery}"`
                : 'Aucun Pokémon dans ta collection'}
            </p>
            {!searchQuery && (
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                className="mt-4"
              >
                Créer ton premier Pokémon
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </div>

      {/* Modal de création - avec blur uniquement sur le contenu de la page */}
      <PokemonFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePokemon}
        loading={isCreating}
      />
    </>
  );
};

export default CollectionPage;