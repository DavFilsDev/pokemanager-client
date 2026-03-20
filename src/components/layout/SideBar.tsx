import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiCollection } from 'react-icons/hi';
import { GiSwordman } from 'react-icons/gi';
import { AiOutlineLineChart } from 'react-icons/ai';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/collection', icon: HiCollection, label: 'Collection' },
    { to: '/battle', icon: GiSwordman, label: 'Battle' },
    { to: '/statistics', icon: AiOutlineLineChart, label: 'Statistics' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 pt-20 glass-morphism border-r border-gray-200 dark:border-gray-700">
      <nav className="px-4 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-item mb-2 ${isActive ? 'sidebar-item-active' : ''}`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;