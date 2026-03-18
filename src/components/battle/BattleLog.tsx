import React from 'react';
import type { BattleResult } from '../../types/battle.types';
import { formatDate } from '../../utils/formatters';

interface BattleLogProps {
  battles: BattleResult[];
  onClear?: () => void;
}

const BattleLog: React.FC<BattleLogProps> = ({ battles, onClear }) => {
  if (battles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun combat enregistré</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Historique des combats</h3>
        {onClear && (
          <button
            onClick={onClear}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Effacer l'historique
          </button>
        )}
      </div>

      <div className="space-y-3">
        {battles.map((battle) => (
          <div
            key={battle.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{battle.winnerName}</span>
                <span className="text-gray-400">vs</span>
                <span>{battle.loserName}</span>
              </div>
              <span className="text-xs text-gray-500">
                {formatDate(battle.date)}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-600">+{battle.xpGained} XP</span>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => {
                  const logElement = document.getElementById(`log-${battle.id}`);
                  if (logElement) {
                    logElement.classList.toggle('hidden');
                  }
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Voir détails
              </button>
            </div>

            <div id={`log-${battle.id}`} className="hidden mt-3">
              <div className="bg-gray-50 p-3 rounded-lg text-sm font-mono">
                {battle.battleLog.map((log, index) => (
                  <p key={index} className="mb-1 text-gray-700">
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleLog;