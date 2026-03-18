import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon.types';
import type { BattleResult } from '../types/battle.types';
import { pokemonService } from '../services/pokemonService';
import { battleService } from '../services/battleService';
import PokemonStats from '../components/pokemon/PokemonStats';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import BattleLog from '../components/battle/BattleLog';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [battleHistory, setBattleHistory] = useState<BattleResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (id) {
      loadPokemon();
      loadBattleHistory();
    }
  }, [id]);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonService.getById(id!);
      setPokemon(data);
      setNickname(data.nickname || '');
    } catch (err) {
      setError('Impossible de charger le Pokémon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadBattleHistory = async () => {
    try {
      const data = await battleService.getPokemonBattleHistory(id!);
      setBattleHistory(data);
    } catch (err) {
      console.error('Erreur chargement historique:', err);
    }
  };

  const handleUpdateNickname = async () => {
    if (!pokemon) return;

    try {
      await pokemonService.update(pokemon.id, { nickname });
      await loadPokemon();
      setIsEditing(false);
    } catch (err) {
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async () => {
    if (!pokemon) return;

    if (window.confirm(`Es-tu sûr de vouloir relâcher ${pokemon.nickname || pokemon.name} ?`)) {
      try {
        await pokemonService.delete(pokemon.id);
        navigate('/collection');
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleLevelUp = async () => {
    if (!pokemon) return;

    try {
      const updated = await pokemonService.levelUp(pokemon.id);
      setPokemon(updated);
    } catch (err) {
      alert('Erreur lors du level up');
    }
  };

  if (loading) {
    return <Loading text="Chargement du Pokémon..." fullScreen />;
  }

  if (error || !pokemon) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Error message={error || 'Pokémon non trouvé'} />
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => navigate('/collection')}>
            Retour à la collection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate('/collection')}>
          ← Retour à la collection
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche: Stats du Pokémon */}
        <div className="lg:col-span-2">
          <PokemonStats pokemon={pokemon} />

          {/* Actions */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="primary"
                onClick={() => navigate('/battle')}
              >
                ⚔️ Combattre
              </Button>
              
              <Button
                variant="success"
                onClick={handleLevelUp}
              >
                📈 Level Up
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => setIsEditing(!isEditing)}
              >
                ✏️ Changer surnom
              </Button>
              
              <Button
                variant="danger"
                onClick={handleDelete}
              >
                🏮 Relâcher
              </Button>
            </div>

            {/* Éditer surnom */}
            {isEditing && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium mb-2">
                  Nouveau surnom
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder="Surnom..."
                  />
                  <Button variant="primary" onClick={handleUpdateNickname}>
                    Sauvegarder
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Colonne droite: Historique des combats */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Historique des combats
            </h3>
            
            {battleHistory.length > 0 ? (
              <BattleLog battles={battleHistory} />
            ) : (
              <p className="text-gray-500 text-center py-8">
                Aucun combat enregistré
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;