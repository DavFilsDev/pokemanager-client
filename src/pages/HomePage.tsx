import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-bounce">
            🎮 PokéManager
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Crée, collectionne et fais combattre tes Pokémon personnalisés !
            Apprends à manipuler les API tout en t'amusant.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" variant="primary">
                Créer un Pokémon
              </Button>
            </Link>
            <Link to="/collection">
              <Button size="lg" variant="secondary">
                Voir ma collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fonctionnalités
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Crée tes Pokémon</h3>
              <p className="text-gray-600">
                Personnalise tes Pokémon avec leurs stats et types
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold mb-2">Combats</h3>
              <p className="text-gray-600">
                Affronte des Pokémon aléatoires de l'API officielle
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Gagne de l'XP</h3>
              <p className="text-gray-600">
                Fais monter tes Pokémon en niveau et améliore leurs stats
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Commence maintenant !
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/battle">
              <Button variant="danger" size="lg" fullWidth>
                ⚔️ Combat rapide
              </Button>
            </Link>
            <Link to="/collection">
              <Button variant="primary" size="lg" fullWidth>
                📋 Voir ma collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;