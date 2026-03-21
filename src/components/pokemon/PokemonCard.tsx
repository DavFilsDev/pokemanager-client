import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { GiSwordman, GiShield } from 'react-icons/gi';
import { IoFlashOutline } from 'react-icons/io5';
import type { Pokemon, UpdatePokemonDTO } from '../../types/pokemon.types';
import { pokemonService } from '../../services/pokemonService';
import TypeBadge from './TypeBadge';
import PokemonUpdateModal from './PokemonUpdateModal';
import Button from '../common/Button';

interface PokemonCardProps {
  pokemon: Pokemon;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onUpdate, onDelete }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const xpPercentage = (pokemon.xp / pokemon.xpToNextLevel) * 100;

  const handleDelete = async () => {
    if (window.confirm(`Es-tu sûr de vouloir supprimer ${pokemon.nickname || pokemon.name} ?`)) {
      try {
        setIsDeleting(true);
        await pokemonService.delete(pokemon.id);
        if (onDelete) onDelete();
      } catch (error) {
        console.error('Delete error:', error);
        alert('Erreur lors de la suppression');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpdate = async (id: string, data: UpdatePokemonDTO) => {
    try {
      setIsUpdating(true);
      await pokemonService.update(id, data);
      if (onUpdate) onUpdate();
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Update error:', error);
      alert('Erreur lors de la mise à jour');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-[1.02]">
        {/* Actions buttons - visible on hover */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            title="Modifier"
          >
            <FiEdit2 className="w-4 h-4 text-blue-500" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            title="Supprimer"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiTrash2 className="w-4 h-4 text-red-500" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 pr-16">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {pokemon.nickname || pokemon.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Niveau {pokemon.level}
              </p>
            </div>
            <TypeBadge type={pokemon.type} size="sm" />
          </div>

          {/* XP Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
              <span>XP</span>
              <span>{pokemon.xp}/{pokemon.xpToNextLevel}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300">
              <GiSwordman className="w-4 h-4 text-red-500" />
              <span>{pokemon.attack}</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300">
              <GiShield className="w-4 h-4 text-green-500" />
              <span>{pokemon.defense}</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300">
              <IoFlashOutline className="w-4 h-4 text-purple-500" />
              <span>{pokemon.speed}</span>
            </div>
          </div>

          {/* Battle Record */}
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>🏆 Victoires: {pokemon.battlesWon}</span>
            <span>💔 Défaites: {pokemon.battlesLost}</span>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <PokemonUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        pokemon={pokemon}
        loading={isUpdating}
      />
    </>
  );
};

export default PokemonCard;