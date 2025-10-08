import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Shield, Cloud, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [syncing, setSyncing] = useState(false);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await logout();
      } catch (error) {
        console.error('Failed to log out:', error);
      }
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync
    setTimeout(() => {
      setSyncing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and preferences
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-purple-500 to-primary-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">
                {currentUser?.displayName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentUser?.displayName || 'User'}</h2>
              <p className="text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <User className="text-primary-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Display Name</p>
                <p className="font-medium">{currentUser?.displayName || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Mail className="text-primary-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{currentUser?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Shield className="text-primary-500" size={20} />
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-medium flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Verified</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cloud Sync */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Cloud className="text-primary-500" size={24} />
              <div>
                <h3 className="text-xl font-semibold">Cloud Sync</h3>
                <p className="text-sm text-gray-500">Your data is synced across devices</p>
              </div>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="btn-primary"
            >
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tasks Synced</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Notes Synced</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Apps Synced</p>
            </div>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
