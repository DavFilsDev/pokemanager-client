import React from 'react';
import type { RandomOpponent } from '../../types/battle.types';
import TypeBadge from '../pokemon/TypeBadge';
import Button from '../common/Button';

interface OpponentSelectorProps {
  opponents: RandomOpponent[];
  selectedOpponent?: RandomOpponent | null;
  onSelect: (opponent: RandomOpponent) => void;
  onRefresh: () => void;
  loading?: boolean;
}

const OpponentSelector: React.FC<OpponentSelectorProps> = ({
  opponents,
  selectedOpponent,
  onSelect,
  onRefresh,
  loading = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Choisis ton adversaire</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          loading={loading}
        >
          🔄 Nouveaux adversaires
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opponents.map((opponent) => (
          <div
            key={opponent.id}
            className={`
              bg-white rounded-lg shadow-md p-4 cursor-pointer
              transition-all duration-200 hover:shadow-lg
              ${selectedOpponent?.id === opponent.id 
                ? 'border-4 border-yellow-400 scale-105' 
                : 'border-2 border-transparent hover:border-blue-300'
              }
            `}
            onClick={() => onSelect(opponent)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold capitalize">{opponent.name}</h4>
                <p className="text-sm text-gray-500">Niveau {opponent.level}</p>
              </div>
              <TypeBadge type={opponent.type} size="sm" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-sm mt-3">
              <div>
                <span className="block font-semibold text-blue-600">Atk</span>
                <span>{opponent.attack}</span>
              </div>
              <div>
                <span className="block font-semibold text-green-600">Def</span>
                <span>{opponent.defense}</span>
              </div>
              <div>
                <span className="block font-semibold text-purple-600">Vit</span>
                <span>{opponent.speed}</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t">
              <div className="flex justify-between text-sm">
                <span>PV: {opponent.hp}</span>
                <span className="text-xs text-gray-400">ID: #{opponent.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpponentSelector;