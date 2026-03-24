import React, { useState, useEffect } from 'react';
import { type Pokemon, PokemonType, type UpdatePokemonDTO } from '../../types/pokemon.types';
import Button from '../common/Button';
import TypeBadge from './TypeBadge';

interface PokemonUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: UpdatePokemonDTO) => Promise<void>;
  pokemon: Pokemon | null;
  loading?: boolean;
}

const PokemonUpdateModal: React.FC<PokemonUpdateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  pokemon,
  loading = false
}) => {
  const [formData, setFormData] = useState<UpdatePokemonDTO>({
    name: '',
    type: PokemonType.NORMAL,
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    nickname: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UpdatePokemonDTO, string>>>({});

  useEffect(() => {
    if (pokemon) {
      setFormData({
        name: pokemon.name,
        type: pokemon.type,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        nickname: pokemon.nickname || '',
      });
    }
  }, [pokemon]);

  if (!isOpen || !pokemon) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UpdatePokemonDTO, string>> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'The name is required';
    }

    if (formData.hp && (formData.hp < 1 || formData.hp > 255)) {
      newErrors.hp = 'HP values must be between 1 and 255';
    }

    if (formData.attack && (formData.attack < 1 || formData.attack > 255)) {
      newErrors.attack = "The attack must be between 1 and 255";
    }

    if (formData.defense && (formData.defense < 1 || formData.defense > 255)) {
      newErrors.defense = 'The defense value must be between 1 and 255';
    }

    if (formData.speed && (formData.speed < 1 || formData.speed > 255)) {
      newErrors.speed = 'The speed must be between 1 and 255';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(pokemon.id, formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'type' ? value :
        name === 'hp' || name === 'attack' || name === 'defense' || name === 'speed'
          ? Number(value) : value
    }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-center p-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Update Pokémon
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium mb-2">Pokémon Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Pikachu"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Surnom */}
            <div>
              <label className="block text-sm font-medium mb-2">Nickname (optional)</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Pika"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {Object.values(PokemonType).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type }))}
                    className={`p-2 rounded-lg transition-all ${
                      formData.type === type
                        ? 'ring-2 ring-blue-500 scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <TypeBadge type={type} size="sm" />
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">HP ({formData.hp})</label>
                <input
                  type="range"
                  name="hp"
                  min="1"
                  max="255"
                  value={formData.hp}
                  onChange={handleChange}
                  className="w-full"
                />
                {errors.hp && <p className="mt-1 text-sm text-red-500">{errors.hp}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Attack ({formData.attack})</label>
                <input
                  type="range"
                  name="attack"
                  min="1"
                  max="255"
                  value={formData.attack}
                  onChange={handleChange}
                  className="w-full"
                />
                {errors.attack && <p className="mt-1 text-sm text-red-500">{errors.attack}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Defense ({formData.defense})</label>
                <input
                  type="range"
                  name="defense"
                  min="1"
                  max="255"
                  value={formData.defense}
                  onChange={handleChange}
                  className="w-full"
                />
                {errors.defense && <p className="mt-1 text-sm text-red-500">{errors.defense}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Speed ({formData.speed})</label>
                <input
                  type="range"
                  name="speed"
                  min="1"
                  max="255"
                  value={formData.speed}
                  onChange={handleChange}
                  className="w-full"
                />
                {errors.speed && <p className="mt-1 text-sm text-red-500">{errors.speed}</p>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="flex items-center justify-center gap-2
                          w-48
                          bg-blue-600/20 dark:bg-blue-500/20
                          text-blue-600 dark:text-blue-400
                          backdrop-blur-md
                          border border-blue-300/30 dark:border-blue-500/30
                          shadow-lg hover:shadow-xl
                          hover:bg-blue-600/30 dark:hover:bg-blue-500/30
                          transition-all duration-300"
              >
                Update
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                className="flex items-center gap-2
                          bg-white/10 dark:bg-white/5
                          backdrop-blur-md
                          border border-white/20 dark:border-white/10
                          shadow-lg hover:shadow-xl
                          hover:bg-white/20 dark:hover:bg-white/10
                          transition-all duration-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PokemonUpdateModal;