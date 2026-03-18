import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import BattlePage from './pages/BattlePage';
import CreatePokemonPage from './pages/CreatePokemonPage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import Navigation from './components/layout/Navigation';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/battle" element={<BattlePage />} />
            <Route path="/create" element={<CreatePokemonPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white mt-12 py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 PokéManager - Projet d'apprentissage API</p>
            <p className="text-sm text-gray-400 mt-2">
              Données Pokémon fournies par PokeAPI
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;