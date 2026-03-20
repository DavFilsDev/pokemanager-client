import React from 'react';
import { GiSwordman } from 'react-icons/gi';

const BattlePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Arène de Combat</h1>
      <div className="glass-card p-12 text-center">
        <GiSwordman className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">Les combats arrivent bientôt !</p>
      </div>
    </div>
  );
};

export default BattlePage;