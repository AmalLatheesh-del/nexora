import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X,
  CheckCircle2,
  Circle,
  Filter
} from 'lucide-react';

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'medium'
      };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: editText } : task
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const setPriority = (id, priority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  const priorityColors = {
    high: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700',
    low: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organize your tasks and boost your productivity
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center"
        >
          <div className="text-3xl font-bold text-primary-500">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card text-center"
        >
          <div className="text-3xl font-bold text-yellow-500">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card text-center"
        >
          <div className="text-3xl font-bold text-green-500">{stats.completed}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </motion.div>
      </div>

      {/* Add Task */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="input-field flex-1"
          />
          <button
            onClick={addTask}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add</span>
          </button>
        </div>
      </motion.div>

      {/* Filter */}
      <div className="flex items-center space-x-2 mb-4">
        <Filter size={18} className="text-gray-500" />
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'active'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'completed'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`card border-2 ${priorityColors[task.priority]}`}
            >
              <div className="flex items-center space-x-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-400" size={24} />
                  )}
                </button>

                {/* Task Content */}
                <div className="flex-1">
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      className="input-field"
                      autoFocus
                    />
                  ) : (
                    <div>
                      <p className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.text}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setPriority(task.id, 'high')}
                            className={`text-xs px-2 py-1 rounded ${
                              task.priority === 'high'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            High
                          </button>
                          <button
                            onClick={() => setPriority(task.id, 'medium')}
                            className={`text-xs px-2 py-1 rounded ${
                              task.priority === 'medium'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            Med
                          </button>
                          <button
                            onClick={() => setPriority(task.id, 'low')}
                            className={`text-xs px-2 py-1 rounded ${
                              task.priority === 'low'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            Low
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {editingId === task.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(task)}
                        className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            <Circle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No tasks found</p>
            <p className="text-sm">Add a new task to get started!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
