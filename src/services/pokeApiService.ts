import { pokeApi } from './api';
import type { PokeApiPokemon, PokeApiResponse } from '../types/api.types';
import { PokemonType } from '../types/pokemon.types';

const mapPokeApiType = (typeName: string): PokemonType => {
  const typeMap: Record<string, PokemonType> = {
    normal: PokemonType.NORMAL,
    fire: PokemonType.FIRE,
    water: PokemonType.WATER,
    grass: PokemonType.GRASS,
    electric: PokemonType.ELECTRIC,
    ice: PokemonType.ICE,
    fighting: PokemonType.FIGHTING,
    poison: PokemonType.POISON,
    ground: PokemonType.GROUND,
    flying: PokemonType.FLYING,
    psychic: PokemonType.PSYCHIC,
    bug: PokemonType.BUG,
    rock: PokemonType.ROCK,
    ghost: PokemonType.GHOST,
    dark: PokemonType.DARK,
    dragon: PokemonType.DRAGON,
    steel: PokemonType.STEEL,
    fairy: PokemonType.FAIRY,
  };
  
  return typeMap[typeName] || PokemonType.NORMAL;
};

export const pokeApiService = {
  getPokemonList: async (limit: number = 20, offset: number = 0): Promise<PokeApiResponse> => {
    const response = await pokeApi.get<PokeApiResponse>('/pokemon', {
      params: { limit, offset }
    });
    return response.data;
  },

  getPokemon: async (identifier: string | number): Promise<PokeApiPokemon> => {
    const response = await pokeApi.get<PokeApiPokemon>(`/pokemon/${identifier}`);
    return response.data;
  },

  getRandomPokemon: async (count: number = 1): Promise<PokeApiPokemon[]> => {
    const promises = [];
    const totalPokemon = 898;
    
    for (let i = 0; i < count; i++) {
      const randomId = Math.floor(Math.random() * totalPokemon) + 1;
      promises.push(pokeApiService.getPokemon(randomId));
    }
    
    return Promise.all(promises);
  },

  getRandomOpponent: async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const pokemon = await pokeApiService.getPokemon(randomId);
    
    const level = Math.floor(Math.random() * 50) + 1;
    
    return {
      id: pokemon.id,
      name: pokemon.name,
      type: mapPokeApiType(pokemon.types[0].type.name),
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      level,
      imageUrl: pokemon.sprites.other['official-artwork'].front_default
    };
  },

  searchPokemon: async (query: string): Promise<PokeApiPokemon[]> => {
    try {
      const pokemon = await pokeApiService.getPokemon(query.toLowerCase());
      return [pokemon];
    } catch {
      const list = await pokeApiService.getPokemonList(100, 0);
      const filtered = list.results.filter(p => 
        p.name.includes(query.toLowerCase())
      );
      
      const promises = filtered.slice(0, 10).map(p => 
        pokeApiService.getPokemon(p.name)
      );
      
      return Promise.all(promises);
    }
  },

  getTypes: async (): Promise<string[]> => {
    const response = await pokeApi.get('/type');
    return response.data.results.map((t: any) => t.name);
  }
};