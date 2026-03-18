import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon.types';
import type { RandomOpponent, BattleResult } from '../types/battle.types';
import { pokemonService } from '../services/pokemonService';
import { battleService } from '../services/battleService';
import { pokeApiService } from '../services/pokeApiService';
import PokemonCard from '../components/pokemon/PokemonCard';
import BattleArena from '../components/battle/BattleArena';
import OpponentSelector from '../components/battle/OpponentSelector';
import BattleLog from '../components/battle/BattleLog';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const BattlePage: React.FC = () => {
  const navigate = useNavigate();
  
  // États
  const [myPokemon, setMyPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [opponents, setOpponents] = useState<RandomOpponent[]>([]);
  const [selectedOpponent, setSelectedOpponent] = useState<RandomOpponent | null>(null);
  const [battleHistory, setBattleHistory] = useState<BattleResult[]>([]);
  const [currentBattle, setCurrentBattle] = useState<BattleResult | null>(null);
  
  // États UI
  const [loading, setLoading] = useState({
    pokemon: true,
    opponents: false,
    battle: false,
    history: true
  });
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'select' | 'battle' | 'result'>('select');

  // Charger les données initiales
  useEffect(() => {
    loadMyPokemon();
    loadBattleHistory();
  }, []);

  const loadMyPokemon = async () => {
    try {
      setLoading(prev => ({ ...prev, pokemon: true }));
      const data = await pokemonService.getAll();
      setMyPokemon(data);
    } catch (err) {
      setError('Impossible de charger tes Pokémon');
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, pokemon: false }));
    }
  };

  const loadBattleHistory = async () => {
    try {
      setLoading(prev => ({ ...prev, history: true }));
      const data = await battleService.getBattleHistory();
      setBattleHistory(data);
    } catch (err) {
      console.error('Erreur chargement historique:', err);
    } finally {
      setLoading(prev => ({ ...prev, history: false }));
    }
  };

  const loadOpponents = async () => {
    try {
      setLoading(prev => ({ ...prev, opponents: true }));
      const data = await pokeApiService.getRandomOpponent(6);
      setOpponents(data);
    } catch (err) {
      setError('Impossible de charger les adversaires');
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, opponents: false }));
    }
  };

  const handleStartBattle = () => {
    if (!selectedPokemon || !selectedOpponent) {
      alert('Choisis ton Pokémon et un adversaire !');
      return;
    }
    loadOpponents(); // Rafraîchir les adversaires
    setStep('battle');
  };

  const handleAttack = async () => {
    if (!selectedPokemon) return;

    try {
      setLoading(prev => ({ ...prev, battle: true }));
      const result = await battleService.battleRandom(selectedPokemon.id);
      setCurrentBattle(result);
      
      // Mettre à jour l'historique
      setBattleHistory(prev => [result, ...prev]);
      
      // Mettre à jour le Pokémon sélectionné (nouveau niveau/XP)
      const updatedPokemon = await pokemonService.getById(selectedPokemon.id);
      setSelectedPokemon(updatedPokemon);
      
      // Mettre à jour la liste des Pokémon
      setMyPokemon(prev => 
        prev.map(p => p.id === updatedPokemon.id ? updatedPokemon : p)
      );
      
      setStep('result');
    } catch (err) {
      setError('Erreur pendant le combat');
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, battle: false }));
    }
  };

  const handleRun = () => {
    setStep('select');
    setSelectedOpponent(null);
  };

  const handleBattleAgain = () => {
    setStep('select');
    setSelectedOpponent(null);
    setCurrentBattle(null);
    loadOpponents();
  };

  // Rendu conditionnel
  if (loading.pokemon) {
    return <Loading text="Chargement de tes Pokémon..." fullScreen />;
  }

  if (myPokemon.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold mb-4">Aucun Pokémon disponible</h2>
        <p className="text-gray-600 mb-8">
          Tu n'as pas encore de Pokémon pour combattre. Crée ton premier Pokémon !
        </p>
        <Button variant="primary" onClick={() => navigate('/create')}>
          Créer un Pokémon
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Arène de Combat ⚔️</h1>

      {error && (
        <Error 
          message={error} 
          onRetry={() => {
            setError(null);
            loadMyPokemon();
          }} 
        />
      )}

      {/* Sélection du Pokémon */}
      {step === 'select' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              1. Choisis ton Pokémon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myPokemon.map(pokemon => (
                <div
                  key={pokemon.id}
                  onClick={() => setSelectedPokemon(pokemon)}
                  className={`cursor-pointer transition-all ${
                    selectedPokemon?.id === pokemon.id
                      ? 'scale-105 ring-4 ring-yellow-400'
                      : 'hover:scale-102'
                  }`}
                >
                  <PokemonCard pokemon={pokemon} />
                </div>
              ))}
            </div>
          </div>

          {selectedPokemon && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                2. Choisis ton adversaire
              </h2>
              <OpponentSelector
                opponents={opponents}
                selectedOpponent={selectedOpponent}
                onSelect={setSelectedOpponent}
                onRefresh={loadOpponents}
                loading={loading.opponents}
              />
            </div>
          )}

          {selectedPokemon && selectedOpponent && (
            <div className="flex justify-center mt-8">
              <Button
                variant="danger"
                size="lg"
                onClick={handleStartBattle}
              >
                Commencer le combat ! ⚔️
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Combat */}
      {step === 'battle' && selectedPokemon && selectedOpponent && (
        <BattleArena
          playerPokemon={selectedPokemon}
          opponent={selectedOpponent}
          onAttack={handleAttack}
          onRun={handleRun}
          isBattling={loading.battle}
          battleLog={currentBattle?.battleLog}
        />
      )}

      {/* Résultat */}
      {step === 'result' && currentBattle && (
        <div className="text-center py-8">
          <div className="mb-8">
            <div className="text-6xl mb-4">
              {currentBattle.winnerId === selectedPokemon?.id ? '🏆' : '😢'}
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {currentBattle.winnerId === selectedPokemon?.id
                ? 'Victoire !'
                : 'Défaite...'}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              {currentBattle.winnerName} a gagné le combat !
            </p>
            <p className="text-lg text-green-600">
              +{currentBattle.xpGained} XP gagnés
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={handleBattleAgain}>
              Nouveau combat
            </Button>
            <Button variant="secondary" onClick={() => navigate('/collection')}>
              Voir ma collection
            </Button>
          </div>
        </div>
      )}

      {/* Historique des combats */}
      {!loading.history && battleHistory.length > 0 && (
        <div className="mt-12">
          <BattleLog
            battles={battleHistory}
            onClear={async () => {
              if (window.confirm('Effacer tout l\'historique ?')) {
                await battleService.clearHistory();
                setBattleHistory([]);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BattlePage;