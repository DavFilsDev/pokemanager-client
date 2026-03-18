import axios from 'axios';
import type { ApiError } from '../types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const POKEAPI_URL = import.meta.env.VITE_POKEAPI_URL || 'https://pokeapi.co/api/v2';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const pokeApi = axios.create({
  baseURL: POKEAPI_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
});

pokeApi.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(`🌐 [PokeAPI] ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Une erreur est survenue',
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };
    
    if (import.meta.env.DEV) {
      console.error('[API Error]', apiError);
    }
    
    return Promise.reject(apiError);
  }
);

pokeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('[PokeAPI Error]', error.message);
    }
    return Promise.reject(error);
  }
);