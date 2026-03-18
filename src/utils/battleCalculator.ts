import type { Pokemon } from '../types/pokemon.types';
import type { BattleTurn, BattleSimulation } from '../types/battle.types';

const TYPE_EFFECTIVENESS: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};

export const calculateDamage = (
  attacker: Pokemon,
  defender: Pokemon
): number => {
  const level = attacker.level;
  const attack = attacker.attack;
  const defense = defender.defense;
  
  let damage = Math.floor(((2 * level / 5 + 2) * attack / defense) / 5 + 2);
  
  const random = 0.85 + Math.random() * 0.3;
  damage = Math.floor(damage * random);
  
  const effectiveness = TYPE_EFFECTIVENESS[attacker.type]?.[defender.type] || 1;
  damage = Math.floor(damage * effectiveness);
  
  return Math.max(1, damage);
};

export const simulateBattle = (
  pokemon1: Pokemon,
  pokemon2: Pokemon
): BattleSimulation => {
  const turns: BattleTurn[] = [];
  let turnNumber = 1;
  
  const p1 = { ...pokemon1, currentHp: pokemon1.maxHp };
  const p2 = { ...pokemon2, currentHp: pokemon2.maxHp };
  
  let attacker = p1.speed >= p2.speed ? p1 : p2;
  let defender = p1.speed >= p2.speed ? p2 : p1;
  
  while (p1.currentHp > 0 && p2.currentHp > 0 && turnNumber <= 100) {
    const damage = calculateDamage(attacker as Pokemon, defender as Pokemon);
    defender.currentHp -= damage;
    
    turns.push({
      turnNumber,
      attackerId: attacker.id,
      defenderId: defender.id,
      damage,
      defenderHpRemaining: Math.max(0, defender.currentHp),
      message: `${attacker.name} inflige ${damage} dégâts à ${defender.name}!`
    });
    
    if (defender.currentHp <= 0) {
      break;
    }
    
    [attacker, defender] = [defender, attacker];
    turnNumber++;
  }
  
  const winner = p1.currentHp > 0 ? pokemon1 : pokemon2;
  const loser = p1.currentHp > 0 ? pokemon2 : pokemon1;
  
  return {
    attacker: winner,
    defender: loser,
    turns,
    winner,
    loser
  };
};

export const calculateXpGain = (
  winner: Pokemon,
  loser: Pokemon
): number => {
  const baseXp = 20;
  const levelDifference = loser.level - winner.level;
  const levelMultiplier = levelDifference > 0 ? 1 + levelDifference * 0.1 : 1;
  
  return Math.floor(baseXp * levelMultiplier);
};

export const calculateXpToNextLevel = (level: number): number => {
  return level * 100;
};

export const canLevelUp = (pokemon: Pokemon): boolean => {
  return pokemon.xp >= calculateXpToNextLevel(pokemon.level);
};