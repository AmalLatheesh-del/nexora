import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  CheckSquare, 
  FileText, 
  Rocket, 
  Settings, 
  Sun, 
  Moon,
  User,
  LogIn
} from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode, activeView, setActiveView, currentUser, onShowAuth }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'launch', label: 'Quick Launch', icon: Rocket },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-purple-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-primary-700 bg-clip-text text-transparent">
              Nexora
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeView === item.id
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Profile / Login */}
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <motion.button
                onClick={() => setActiveView('profile')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 via-purple-500 to-primary-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {currentUser.displayName?.split(' ')[0] || 'User'}
                </span>
              </motion.button>
            ) : (
              <motion.button
                onClick={onShowAuth}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn size={18} />
                <span className="hidden md:inline">Sign In</span>
              </motion.button>
            )}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
