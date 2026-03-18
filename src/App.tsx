import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-pokemon-blue text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center md:text-left">
            PokéManager
          </h1>
          <p className="text-center md:text-left text-blue-100 mt-2">
            Gérez votre collection Pokémon et participez à des combats !
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Bienvenue dans PokéManager
          </h2>
          <p className="text-gray-600 mb-8">
            Commencez par créer votre premier Pokémon ou explorez votre collection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Créer un Pokémon
            </button>
            <button className="btn-secondary">
              Voir ma collection
            </button>
          </div>
        </div>

        {/* Section d'exemple avec une carte Pokémon */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Aperçu d'une carte Pokémon
          </h3>
          <div className="max-w-sm mx-auto pokemon-card">
            <div className="flex justify-between items-start mb-2">
              <span className="text-lg font-bold">Pikachu</span>
              <span className="type-badge type-electric">Électrik</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Niveau 5</span>
                  <span>XP: 0/100</span>
                </div>
                <div className="stat-bar">
                  <div className="stat-bar-fill" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <span className="font-bold">PV</span>
                  <p>35</p>
                </div>
                <div>
                  <span className="font-bold">Atk</span>
                  <p>55</p>
                </div>
                <div>
                  <span className="font-bold">Def</span>
                  <p>40</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 PokéManager - Projet d'apprentissage API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;