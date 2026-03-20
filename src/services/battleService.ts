import { api } from './api';
import type { BattleResult, RandomOpponent, BattleStats } from '../types/battle.types';

export const battleService = {
  battleRandom: async (pokemonId: string): Promise<BattleResult> => {
    const response = await api.post<BattleResult>(`/battle/random/${pokemonId}`);
    return response.data;
  },

  battleTrain: async (pokemon1Id: string, pokemon2Id: string): Promise<BattleResult> => {
    const response = await api.post<BattleResult>('/battle/train', {
      pokemon1Id,
      pokemon2Id
    });
    return response.data;
  },

  getRandomOpponent: async (): Promise<RandomOpponent> => {
    const response = await api.get<RandomOpponent>('/battle/random-opponent');
    return response.data;
  },

  getAvailableOpponents: async (count: number = 5): Promise<RandomOpponent[]> => {
    const response = await api.get<RandomOpponent[]>('/battle/available-opponents', {
      params: { count }
    });
    return response.data;
  },

  getBattleHistory: async (): Promise<BattleResult[]> => {
    const response = await api.get<BattleResult[]>('/battle/history');
    return response.data;
  },

  getPokemonBattleHistory: async (pokemonId: string): Promise<BattleResult[]> => {
    const response = await api.get<BattleResult[]>(`/battle/history/${pokemonId}`);
    return response.data;
  },

  getPokemonBattleStats: async (pokemonId: string): Promise<BattleStats> => {
    const response = await api.get<BattleStats>(`/battle/stats/${pokemonId}`);
    return response.data;
  },

  clearHistory: async (): Promise<void> => {
    await api.delete('/battle/history');
  }
};