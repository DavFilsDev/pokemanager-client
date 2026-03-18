// src/components/pokemon/PokemonStats.tsx

import React from 'react';
import type { Pokemon } from '../../types/pokemon.types';
import TypeBadge from './TypeBadge';
import { formatDate } from '../../utils/formatters';

interface PokemonStatsProps {
  pokemon: Pokemon;
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ pokemon }) => {
  const stats = [
    { label: 'HP', value: pokemon.hp, max: pokemon.maxHp, color: 'bg-green-500' },
    { label: 'Attaque', value: pokemon.attack, max: 255, color: 'bg-red-500' },
    { label: 'Défense', value: pokemon.defense, max: 255, color: 'bg-blue-500' },
    { label: 'Vitesse', value: pokemon.speed, max: 255, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* En-tête */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {pokemon.nickname || pokemon.name}
          </h2>
          <p className="text-gray-500">
            {pokemon.nickname && `(${pokemon.name})`}
          </p>
        </div>
        <TypeBadge type={pokemon.type} size="lg" />
      </div>

      {/* Niveau et XP */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Niveau {pokemon.level}</span>
          <span className="text-sm text-gray-500">
            XP: {pokemon.xp}/{pokemon.xpToNextLevel}
          </span>
        </div>
        <div className="stat-bar h-3">
          <div
            className="stat-bar-fill"
            style={{ width: `${(pokemon.xp / pokemon.xpToNextLevel) * 100}%` }}
          />
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="space-y-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{stat.label}</span>
              <span>{stat.value}/{stat.max}</span>
            </div>
            <div className="stat-bar">
              <div
                className={`stat-bar-fill ${stat.color}`}
                style={{ width: `${(stat.value / stat.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Record de combat */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <span className="block text-2xl font-bold text-green-600">
            {pokemon.battlesWon}
          </span>
          <span className="text-sm text-gray-600">Victoires</span>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <span className="block text-2xl font-bold text-red-600">
            {pokemon.battlesLost}
          </span>
          <span className="text-sm text-gray-600">Défaites</span>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="text-sm text-gray-500 border-t pt-4">
        <p>Créé le: {formatDate(pokemon.createdAt)}</p>
        <p>ID: {pokemon.id}</p>
      </div>
    </div>
  );
};

export default PokemonStats;