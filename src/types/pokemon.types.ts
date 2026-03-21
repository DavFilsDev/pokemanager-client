export enum PokemonType {
  NORMAL = 'normal',
  FIRE = 'fire',
  WATER = 'water',
  GRASS = 'grass',
  ELECTRIC = 'electric',
  ICE = 'ice',
  FIGHTING = 'fighting',
  POISON = 'poison',
  GROUND = 'ground',
  FLYING = 'flying',
  PSYCHIC = 'psychic',
  BUG = 'bug',
  ROCK = 'rock',
  GHOST = 'ghost',
  DARK = 'dark',
  DRAGON = 'dragon',
  STEEL = 'steel',
  FAIRY = 'fairy'
}

export interface Pokemon {
  id: string;
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  type: PokemonType;
  nickname?: string;
  createdAt: Date;
  battlesWon: number;
  battlesLost: number;
}

export interface CreatePokemonDTO {
  name: string;
  type: PokemonType;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  nickname?: string;
}

export interface UpdatePokemonDTO {
  name?: string;
  nickname?: string;
  level?: number;
  xp?: number;
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  type?: PokemonType;
  battlesWon?: number;
  battlesLost?: number;
}