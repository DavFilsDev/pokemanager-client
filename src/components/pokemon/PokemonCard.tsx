import React from 'react';
import type { Pokemon } from '../../types/pokemon.types';
import Card from '../common/Card';
import TypeBadge from './TypeBadge';
import { getTypeColor } from '../../utils/formatters';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
  showStats?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onClick,
  showStats = true
}) => {
  const xpPercentage = (pokemon.xp / pokemon.xpToNextLevel) * 100;

  return (
    <Card onClick={onClick} hoverable className="relative overflow-hidden">
      {/* Background color based on type */}
      <div
        className={`absolute inset-0 opacity-10 ${getTypeColor(pokemon.type)}`}
      />
      
      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {pokemon.nickname || pokemon.name}
            </h3>
            <p className="text-sm text-gray-500">Niveau {pokemon.level}</p>
          </div>
          <TypeBadge type={pokemon.type} />
        </div>

        {/* Stats */}
        {showStats && (
          <div className="space-y-3">
            {/* HP Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>HP</span>
                <span>{pokemon.hp}/{pokemon.maxHp}</span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(pokemon.hp / pokemon.maxHp) * 100}%` }}
                />
              </div>
            </div>

            {/* XP Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>XP</span>
                <span>{pokemon.xp}/{pokemon.xpToNextLevel}</span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>

            {/* Battle Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <span className="block font-bold text-blue-600">Atk</span>
                <span>{pokemon.attack}</span>
              </div>
              <div>
                <span className="block font-bold text-green-600">Def</span>
                <span>{pokemon.defense}</span>
              </div>
              <div>
                <span className="block font-bold text-purple-600">Vit</span>
                <span>{pokemon.speed}</span>
              </div>
            </div>

            {/* Battle Record */}
            <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
              <span>Victoires: {pokemon.battlesWon}</span>
              <span>Défaites: {pokemon.battlesLost}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PokemonCard;