import { PokemonType } from './pokemon.types';

export interface RandomOpponent {
  id: string;
  name: string;
  type: PokemonType;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  level: number;
  imageUrl: string;
}

export interface BattleResult {
  id: string;
  winnerId: string;
  loserId: string;
  winnerName: string;
  loserName: string;
  xpGained: number;
  battleLog: string[];
  date: Date;
}