import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CreatePokemonDTO } from '../types/pokemon.types';
import { pokemonService } from '../services/pokemonService';
import PokemonForm from '../components/pokemon/PokemonForm';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

const CreatePokemonPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreatePokemonDTO) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newPokemon = await pokemonService.create(data);
      
      // Rediriger vers la page de détail du nouveau Pokémon
      navigate(`/pokemon/${newPokemon.id}`);
    } catch (err) {
      setError('Erreur lors de la création du Pokémon');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Créer ton Pokémon ✨
          </h1>
          <p className="text-gray-600">
            Personnalise les statistiques de ton Pokémon et choisis son type
          </p>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <span className="text-xl mr-2">💡</span>
            Conseils de création
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Les stats vont de 1 à 255 (comme dans les vrais jeux)</li>
            <li>• Le type influence l'efficacité en combat</li>
            <li>• Tu pourras faire évoluer ton Pokémon en gagnant des combats</li>
            <li>• Le surnom est optionnel mais peut être personnalisé plus tard</li>
          </ul>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <PokemonForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {/* Navigation */}
          <div className="mt-6 pt-4 border-t text-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/collection')}
            >
              ← Retour à la collection
            </Button>
          </div>
        </div>

        {/* Aperçu des types */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Efficacité des types ⚔️</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Super efficace (x2)
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              Normal (x1)
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Pas très efficace (x0.5)
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
              Inefficace (x0)
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && <Loading fullScreen text="Création du Pokémon..." />}
    </div>
  );
};

export default CreatePokemonPage;