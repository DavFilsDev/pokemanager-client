import React from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';

const StatisticsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Statistiques</h1>
      <div className="glass-card p-12 text-center">
        <AiOutlineLineChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">Les statistiques arrivent bientôt !</p>
      </div>
    </div>
  );
};

export default StatisticsPage;