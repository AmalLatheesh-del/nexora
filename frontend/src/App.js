import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import Notes from './components/Notes';
import QuickLaunch from './components/QuickLaunch';
import Settings from './components/Settings';
import UserProfile from './components/UserProfile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [activeView, setActiveView] = useState('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const { currentUser } = useAuth();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskManager />;
      case 'notes':
        return <Notes />;
      case 'launch':
        return <QuickLaunch />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <UserProfile />;
      default:
        return <Dashboard />;
    }
  };

  // Show auth screen if not logged in and trying to access protected features
  if (showAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {authMode === 'login' ? (
          <Login
            onSwitchToSignup={() => setAuthMode('signup')}
            onLoginSuccess={() => setShowAuth(false)}
          />
        ) : (
          <Signup
            onSwitchToLogin={() => setAuthMode('login')}
            onSignupSuccess={() => setShowAuth(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        activeView={activeView}
        setActiveView={setActiveView}
        currentUser={currentUser}
        onShowAuth={() => setShowAuth(true)}
      />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
