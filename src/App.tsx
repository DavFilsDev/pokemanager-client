import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CollectionPage from './pages/CollectionPage';
import BattlePage from './pages/BattlePage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />}>
          <Route path="/" element={<CollectionPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;