import React, { useState } from 'react';
import type { PokemonType, CreatePokemonDTO } from '../../types/pokemon.types';
import Button from '../common/Button';
import TypeBadge from './TypeBadge';

interface PokemonFormProps {
  onSubmit: (data: CreatePokemonDTO) => void;
  initialData?: Partial<CreatePokemonDTO>;
  isLoading?: boolean;
}

const PokemonForm: React.FC<PokemonFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreatePokemonDTO>({
    name: initialData?.name || '',
    type: initialData?.type || PokemonType.NORMAL,
    hp: initialData?.hp || 50,
    attack: initialData?.attack || 50,
    defense: initialData?.defense || 50,
    speed: initialData?.speed || 50,
    nickname: initialData?.nickname || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreatePokemonDTO, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreatePokemonDTO, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (formData.hp < 1 || formData.hp > 255) {
      newErrors.hp = 'Les HP doivent être entre 1 et 255';
    }

    if (formData.attack < 1 || formData.attack > 255) {
      newErrors.attack = "L'attaque doit être entre 1 et 255";
    }

    if (formData.defense < 1 || formData.defense > 255) {
      newErrors.defense = 'La défense doit être entre 1 et 255';
    }

    if (formData.speed < 1 || formData.speed > 255) {
      newErrors.speed = 'La vitesse doit être entre 1 et 255';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom du Pokémon *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ex: Pikachu"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Surnom (optionnel) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Surnom (optionnel)
        </label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ex: Pika"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(PokemonType).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type }))}
              className={`p-2 rounded-lg border-2 transition-all ${
                formData.type === type
                  ? 'border-blue-500 scale-105'
                  : 'border-transparent hover:border-gray-300'
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HP ({formData.hp})
          </label>
          <input
            type="range"
            name="hp"
            min="1"
            max="255"
            value={formData.hp}
            onChange={handleChange}
            className="w-full"
          />
          {errors.hp && <p className="mt-1 text-sm text-red-600">{errors.hp}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attaque ({formData.attack})
          </label>
          <input
            type="range"
            name="attack"
            min="1"
            max="255"
            value={formData.attack}
            onChange={handleChange}
            className="w-full"
          />
          {errors.attack && <p className="mt-1 text-sm text-red-600">{errors.attack}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Défense ({formData.defense})
          </label>
          <input
            type="range"
            name="defense"
            min="1"
            max="255"
            value={formData.defense}
            onChange={handleChange}
            className="w-full"
          />
          {errors.defense && <p className="mt-1 text-sm text-red-600">{errors.defense}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vitesse ({formData.speed})
          </label>
          <input
            type="range"
            name="speed"
            min="1"
            max="255"
            value={formData.speed}
            onChange={handleChange}
            className="w-full"
          />
          {errors.speed && <p className="mt-1 text-sm text-red-600">{errors.speed}</p>}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
      >
        Créer le Pokémon
      </Button>
    </form>
  );
};

export default PokemonForm;