import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './SideBar';

interface LayoutProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
        <Sidebar />
        <main className="ml-64 pt-20 p-8">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;