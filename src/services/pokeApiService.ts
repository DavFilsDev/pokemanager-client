import { pokeApi } from './api';
import type { PokeApiPokemon, PokeApiResponse } from '../types/api.types';
import { PokemonType } from '../types/pokemon.types';
import type { RandomOpponent } from '../types/battle.types';

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

// Interface pour un adversaire formaté
interface FormattedOpponent {
  id: string;  // Changé de number à string pour correspondre à RandomOpponent
  name: string;
  type: PokemonType;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  level: number;
  imageUrl: string;
}

export const pokeApiService = {
  // Récupérer la liste des Pokémon (avec pagination)
  getPokemonList: async (limit: number = 20, offset: number = 0): Promise<PokeApiResponse> => {
    const response = await pokeApi.get<PokeApiResponse>('/pokemon', {
      params: { limit, offset }
    });
    return response.data;
  },

  // Récupérer un Pokémon par son nom ou ID
  getPokemon: async (identifier: string | number): Promise<PokeApiPokemon> => {
    const response = await pokeApi.get<PokeApiPokemon>(`/pokemon/${identifier}`);
    return response.data;
  },

  // Récupérer plusieurs Pokémon aléatoires (retourne les données brutes PokeAPI)
  getRandomPokemon: async (count: number = 1): Promise<PokeApiPokemon[]> => {
    const promises = [];
    const totalPokemon = 898; // Nombre total de Pokémon (générations 1-8)
    
    for (let i = 0; i < count; i++) {
      const randomId = Math.floor(Math.random() * totalPokemon) + 1;
      promises.push(pokeApiService.getPokemon(randomId));
    }
    
    return Promise.all(promises);
  },

  // Récupérer un adversaire formaté pour le combat (retourne un objet formaté)
  getRandomOpponent: async (): Promise<FormattedOpponent> => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const pokemon = await pokeApiService.getPokemon(randomId);
    
    // Niveau aléatoire entre 1 et 50
    const level = Math.floor(Math.random() * 50) + 1;
    
    return {
      id: `api-${pokemon.id}`,  // Convertir en string avec préfixe pour éviter les conflits
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

  // NOUVELLE MÉTHODE: Récupérer plusieurs adversaires formatés
  getAvailableOpponents: async (count: number = 5): Promise<FormattedOpponent[]> => {
    const promises = [];
    for (let i = 0; i < count; i++) {
      promises.push(pokeApiService.getRandomOpponent());
    }
    return Promise.all(promises);
  },

  // Rechercher des Pokémon par nom
  searchPokemon: async (query: string): Promise<PokeApiPokemon[]> => {
    try {
      // Essayer de récupérer directement par le nom
      const pokemon = await pokeApiService.getPokemon(query.toLowerCase());
      return [pokemon];
    } catch {
      // Si ça échoue, chercher dans la liste
      const list = await pokeApiService.getPokemonList(100, 0);
      const filtered = list.results.filter(p => 
        p.name.includes(query.toLowerCase())
      );
      
      // Récupérer les détails des Pokémon filtrés
      const promises = filtered.slice(0, 10).map(p => 
        pokeApiService.getPokemon(p.name)
      );
      
      return Promise.all(promises);
    }
  },

  // Récupérer les types disponibles
  getTypes: async (): Promise<string[]> => {
    const response = await pokeApi.get('/type');
    return response.data.results.map((t: any) => t.name);
  }
};

// Exporter le type pour l'utiliser ailleurs si nécessaire
export type { FormattedOpponent };