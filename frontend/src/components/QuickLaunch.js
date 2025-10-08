import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  ExternalLink,
  Mail,
  Youtube,
  MessageCircle,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Search
} from 'lucide-react';

const QuickLaunch = () => {
  const defaultApps = [
    { id: 1, name: 'Gmail', url: 'https://mail.google.com', icon: 'Mail', color: 'bg-red-500' },
    { id: 2, name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', color: 'bg-red-600' },
    { id: 3, name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'MessageCircle', color: 'bg-green-500' },
    { id: 4, name: 'GitHub', url: 'https://github.com', icon: 'Github', color: 'bg-gray-800' },
    { id: 5, name: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', color: 'bg-blue-400' },
    { id: 6, name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', color: 'bg-blue-700' },
  ];

  const [apps, setApps] = useState(() => {
    const saved = localStorage.getItem('quickLaunchApps');
    return saved ? JSON.parse(saved) : defaultApps;
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newApp, setNewApp] = useState({ name: '', url: '', icon: 'Globe', color: 'bg-primary-500' });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('quickLaunchApps', JSON.stringify(apps));
  }, [apps]);

  const iconComponents = {
    Mail, Youtube, MessageCircle, Github, Twitter, Linkedin, Globe, ExternalLink
  };

  const colorOptions = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-800'
  ];

  const addApp = () => {
    if (newApp.name && newApp.url) {
      const app = {
        id: Date.now(),
        ...newApp,
        url: newApp.url.startsWith('http') ? newApp.url : `https://${newApp.url}`
      };
      setApps([...apps, app]);
      setNewApp({ name: '', url: '', icon: 'Globe', color: 'bg-primary-500' });
      setShowAddForm(false);
    }
  };

  const deleteApp = (id) => {
    setApps(apps.filter(app => app.id !== id));
  };

  const openApp = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Quick Launch
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Access your favorite websites and apps instantly
        </p>
      </motion.div>

      {/* Search and Add */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps..."
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="card">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>Add New App</span>
          </button>
        </div>
      </div>

      {/* Add App Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card mb-6"
          >
            <h3 className="text-xl font-semibold mb-4">Add New App</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">App Name</label>
                <input
                  type="text"
                  value={newApp.name}
                  onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                  placeholder="e.g., Gmail"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="text"
                  value={newApp.url}
                  onChange={(e) => setNewApp({ ...newApp, url: e.target.value })}
                  placeholder="e.g., https://mail.google.com"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Icon</label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {Object.keys(iconComponents).map((iconName) => {
                    const IconComponent = iconComponents[iconName];
                    return (
                      <button
                        key={iconName}
                        onClick={() => setNewApp({ ...newApp, icon: iconName })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          newApp.icon === iconName
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <IconComponent size={20} className="mx-auto" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewApp({ ...newApp, color })}
                      className={`h-10 rounded-lg ${color} ${
                        newApp.color === color ? 'ring-4 ring-offset-2 ring-primary-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button onClick={addApp} className="btn-primary flex-1">
                  Add App
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewApp({ name: '', url: '', icon: 'Globe', color: 'bg-primary-500' });
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apps Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredApps.map((app) => {
            const IconComponent = iconComponents[app.icon] || Globe;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="card relative group cursor-pointer"
                onClick={() => openApp(app.url)}
              >
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteApp(app.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 size={14} />
                </button>

                {/* App Icon */}
                <div className={`${app.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-3 mx-auto`}>
                  <IconComponent size={32} className="text-white" />
                </div>

                {/* App Name */}
                <h3 className="text-center font-semibold truncate">{app.name}</h3>
                
                {/* External Link Indicator */}
                <div className="flex items-center justify-center mt-2 text-gray-400">
                  <ExternalLink size={14} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredApps.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-400"
        >
          <Globe size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-xl">No apps found</p>
          <p className="text-sm">Add your favorite apps to get started!</p>
        </motion.div>
      )}

      {/* Quick Access Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mt-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-800"
      >
        <h3 className="text-lg font-semibold mb-3">💡 Popular Apps to Add</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Google Drive</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Notion</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Spotify</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Slack</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Trello</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Figma</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Discord</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Reddit</div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickLaunch;
