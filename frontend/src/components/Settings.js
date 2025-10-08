import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Download, 
  Upload, 
  Trash2,
  Database,
  Bell,
  Lock,
  Palette,
  Info
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : true;
  });

  const exportData = () => {
    const data = {
      tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
      quickLaunchApps: JSON.parse(localStorage.getItem('quickLaunchApps') || '[]'),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hack4ease-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.tasks) localStorage.setItem('tasks', JSON.stringify(data.tasks));
          if (data.notes) localStorage.setItem('notes', JSON.stringify(data.notes));
          if (data.quickLaunchApps) localStorage.setItem('quickLaunchApps', JSON.stringify(data.quickLaunchApps));
          alert('Data imported successfully! Please refresh the page.');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('tasks');
      localStorage.removeItem('notes');
      localStorage.removeItem('quickLaunchApps');
      alert('All data cleared! Please refresh the page.');
    }
  };

  const toggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notifications', JSON.stringify(newValue));
  };

  const getStorageSize = () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return (total / 1024).toFixed(2); // KB
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your preferences and data
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Database className="text-primary-500" size={24} />
            <h2 className="text-2xl font-semibold">Data Management</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div>
                <h3 className="font-medium">Storage Used</h3>
                <p className="text-sm text-gray-500">Local browser storage</p>
              </div>
              <div className="text-2xl font-bold text-primary-500">
                {getStorageSize()} KB
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={exportData}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Download size={18} />
                <span>Export Data</span>
              </button>

              <label className="btn-secondary flex items-center justify-center space-x-2 cursor-pointer">
                <Upload size={18} />
                <span>Import Data</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>

              <button
                onClick={clearAllData}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trash2 size={18} />
                <span>Clear All Data</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="text-primary-500" size={24} />
            <h2 className="text-2xl font-semibold">Notifications</h2>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <h3 className="font-medium">Enable Notifications</h3>
              <p className="text-sm text-gray-500">Get notified about focus timer completion</p>
            </div>
            <button
              onClick={toggleNotifications}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                notifications ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  notifications ? 'transform translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="text-primary-500" size={24} />
            <h2 className="text-2xl font-semibold">Appearance</h2>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="font-medium mb-2">Theme</h3>
            <p className="text-sm text-gray-500 mb-3">
              Use the theme toggle in the navigation bar to switch between light and dark mode
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-center">
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-2"></div>
                <span className="text-sm font-medium">Light Mode</span>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border-2 border-gray-600 text-center">
                <div className="w-12 h-12 bg-gray-900 border-2 border-gray-600 rounded-lg mx-auto mb-2"></div>
                <span className="text-sm font-medium text-white">Dark Mode</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="text-primary-500" size={24} />
            <h2 className="text-2xl font-semibold">Privacy & Security</h2>
          </div>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>All data is stored locally in your browser</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>No data is sent to external servers</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Your information remains private and secure</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-yellow-500 mt-0.5">⚠</span>
              <span>Clearing browser data will delete all your information</span>
            </p>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Info className="text-primary-500" size={24} />
            <h2 className="text-2xl font-semibold">About Nexora</h2>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Version:</strong> 1.0.0
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Description:</strong> Your personal command center for daily productivity
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              A modern, elegant hub that centralizes all your daily productivity tools in one place.
            </p>
            <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-800">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Real-time clock and calendar</li>
                <li>Weather information</li>
                <li>Task management with priorities</li>
                <li>Notes with markdown support</li>
                <li>Quick launch for favorite apps</li>
                <li>Focus timer and ambient sounds</li>
                <li>Daily motivational quotes</li>
                <li>Dark mode support</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
