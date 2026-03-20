import { api } from './api';
import type { Pokemon, CreatePokemonDTO } from '../types/pokemon.types';

export const pokemonService = {
  getAll: async (): Promise<Pokemon[]> => {
    const response = await api.get('/pokemon');
    return response.data;
  },

  getById: async (id: string): Promise<Pokemon> => {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  },

  create: async (data: CreatePokemonDTO): Promise<Pokemon> => {
    const response = await api.post('/pokemon', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Pokemon>): Promise<Pokemon> => {
    const response = await api.put(`/pokemon/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/pokemon/${id}`);
  },

  addXp: async (id: string, xp: number): Promise<Pokemon> => {
    const response = await api.put(`/pokemon/${id}/add-xp`, { xp });
    return response.data;
  },

  levelUp: async (id: string): Promise<Pokemon> => {
    const response = await api.post(`/pokemon/${id}/level-up`);
    return response.data;
  },

  updateNickname: async (id: string, nickname: string): Promise<Pokemon> => {
    const response = await api.post(`/pokemon/${id}/nickname`, { nickname });
    return response.data;
  },

  search: async (params: Record<string, string>): Promise<Pokemon[]> => {
    const response = await api.get('/pokemon/search', { params });
    return response.data;
  },
};