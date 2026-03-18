import React, { useState, useEffect } from 'react';
import type { Pokemon } from '../../types/pokemon.types';
import type { RandomOpponent, BattleTurn } from '../../types/battle.types';
import Button from '../common/Button';
import TypeBadge from '../pokemon/TypeBadge';

interface BattleArenaProps {
  playerPokemon: Pokemon;
  opponent: RandomOpponent;
  onAttack: () => void;
  onRun: () => void;
  isBattling: boolean;
  battleLog?: string[];
  currentTurn?: BattleTurn | null;
}

const BattleArena: React.FC<BattleArenaProps> = ({
  playerPokemon,
  opponent,
  onAttack,
  onRun,
  isBattling,
  battleLog = [],
  currentTurn
}) => {
  const [playerHp, setPlayerHp] = useState(playerPokemon.hp);
  const [opponentHp, setOpponentHp] = useState(opponent.hp);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    setPlayerHp(playerPokemon.hp);
  }, [playerPokemon]);

  useEffect(() => {
    setOpponentHp(opponent.hp);
  }, [opponent]);

  useEffect(() => {
    if (currentTurn) {
      if (currentTurn.attackerId === playerPokemon.id) {
        setOpponentHp(prev => Math.max(0, currentTurn.defenderHpRemaining));
      } else {
        setPlayerHp(prev => Math.max(0, currentTurn.defenderHpRemaining));
      }
    }
  }, [currentTurn, playerPokemon.id]);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 rounded-2xl p-6 shadow-xl">
      {/* Zone de combat */}
      <div className="relative min-h-[400px]">
        {/* Pokémon du joueur (gauche) */}
        <div className="absolute bottom-0 left-0 w-1/2">
          <div className="relative">
            {/* Barre de vie du joueur */}
            <div className="absolute -top-16 left-4 bg-white rounded-lg p-2 shadow-md w-48">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{playerPokemon.nickname || playerPokemon.name}</span>
                <span className="text-sm">N{playerPokemon.level}</span>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>PV</span>
                <span>{playerHp}/{playerPokemon.maxHp}</span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill bg-green-500"
                  style={{ width: `${(playerHp / playerPokemon.maxHp) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Image du Pokémon (à remplacer par de vraies images) */}
            <div className="w-48 h-48 bg-yellow-200 rounded-full flex items-center justify-center text-6xl transform scale-x-[-1]">
              🐕
            </div>
          </div>
        </div>

        {/* Pokémon adverse (droite) */}
        <div className="absolute top-0 right-0 w-1/2">
          <div className="relative">
            {/* Barre de vie adverse */}
            <div className="absolute -top-16 right-4 bg-white rounded-lg p-2 shadow-md w-48">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{opponent.name}</span>
                <TypeBadge type={opponent.type} size="sm" />
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>PV</span>
                <span>{opponentHp}/{opponent.hp}</span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill bg-green-500"
                  style={{ width: `${(opponentHp / opponent.hp) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Image du Pokémon adverse */}
            <div className="w-48 h-48 bg-red-200 rounded-full flex items-center justify-center text-6xl ml-auto">
              🐱
            </div>
          </div>
        </div>

        {/* Effets d'attaque */}
        {currentTurn && (
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none
              ${currentTurn.attackerId === playerPokemon.id ? 'animate-battle-shake' : ''}`}
          >
            <div className="text-4xl font-bold text-red-600 animate-ping">
              {currentTurn.damage}
            </div>
          </div>
        )}
      </div>

      {/* Contrôles de combat */}
      <div className="mt-8 flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <Button
            variant="danger"
            size="lg"
            onClick={onAttack}
            disabled={isBattling || playerHp <= 0 || opponentHp <= 0}
            loading={isBattling}
          >
            Attaquer ⚔️
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={onRun}
            disabled={isBattling}
          >
            Fuir 🏃
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setShowLog(!showLog)}
          >
            {showLog ? 'Masquer' : 'Voir'} les logs 📜
          </Button>
        </div>

        {/* Battle Log */}
        {showLog && battleLog.length > 0 && (
          <div className="w-full max-h-48 overflow-y-auto bg-black bg-opacity-80 text-green-400 p-4 rounded-lg font-mono text-sm">
            {battleLog.map((log, index) => (
              <div key={index} className="mb-1">
                &gt; {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleArena;