import { api } from './api';
import type { Pokemon, CreatePokemonDTO, UpdatePokemonDTO } from '../types/pokemon.types';
import type { ApiResponse, PokemonFilters } from '../types/api.types';

export const pokemonService = {
  getAll: async (filters?: PokemonFilters): Promise<Pokemon[]> => {
    const response = await api.get<Pokemon[]>('/pokemon', { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<Pokemon> => {
    const response = await api.get<Pokemon>(`/pokemon/${id}`);
    return response.data;
  },

  create: async (pokemon: CreatePokemonDTO): Promise<Pokemon> => {
    const response = await api.post<Pokemon>('/pokemon', pokemon);
    return response.data;
  },

  update: async (id: string, pokemon: UpdatePokemonDTO): Promise<Pokemon> => {
    const response = await api.put<Pokemon>(`/pokemon/${id}`, pokemon);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/pokemon/${id}`);
  },

  addXp: async (id: string, xp: number): Promise<Pokemon> => {
    const response = await api.put<Pokemon>(`/pokemon/${id}/add-xp`, { xp });
    return response.data;
  },

  levelUp: async (id: string): Promise<Pokemon> => {
    const response = await api.post<Pokemon>(`/pokemon/${id}/level-up`);
    return response.data;
  },

  search: async (query: string): Promise<Pokemon[]> => {
    const response = await api.get<Pokemon[]>('/pokemon/search', {
      params: { name: query }
    });
    return response.data;
  },

  getByType: async (type: string): Promise<Pokemon[]> => {
    const response = await api.get<Pokemon[]>('/pokemon/search', {
      params: { type }
    });
    return response.data;
  },

  getCollectionStats: async (): Promise<any> => {
    const response = await api.get('/stats/collection');
    return response.data;
  },

  getStrongest: async (limit: number = 5): Promise<Pokemon[]> => {
    const response = await api.get('/stats/strongest', {
      params: { limit }
    });
    return response.data;
  }
};