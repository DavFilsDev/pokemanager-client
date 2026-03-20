import type { Pokemon, PokemonType } from './pokemon.types';

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

export interface BattleSimulation {
  attacker: Pokemon;
  defender: Pokemon;
  turns: BattleTurn[];
  winner: Pokemon;
  loser: Pokemon;
}

export interface BattleTurn {
  turnNumber: number;
  attackerId: string;
  defenderId: string;
  damage: number;
  defenderHpRemaining: number;
  message: string;
}

export interface RandomOpponent {
  id: number;
  name: string;
  type: PokemonType;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  imageUrl: string;
  level: number;
}

export interface BattleHistory {
  battles: BattleResult[];
  totalBattles: number;
  wins: number;
  losses: number;
}

export interface BattleStats {
  pokemonId: string;
  pokemonName: string;
  totalBattles: number;
  wins: number;
  losses: number;
  winRate: number;
  totalXpGained: number;
}