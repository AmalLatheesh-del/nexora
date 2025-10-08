import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

// Tasks Service
export const tasksService = {
  // Get all tasks for a user
  async getTasks(userId) {
    try {
      const tasksRef = collection(db, 'users', userId, 'tasks');
      const q = query(tasksRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  },

  // Add a new task
  async addTask(userId, task) {
    try {
      const taskRef = doc(collection(db, 'users', userId, 'tasks'));
      await setDoc(taskRef, {
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return taskRef.id;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  // Update a task
  async updateTask(userId, taskId, updates) {
    try {
      const taskRef = doc(db, 'users', userId, 'tasks', taskId);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  async deleteTask(userId, taskId) {
    try {
      const taskRef = doc(db, 'users', userId, 'tasks', taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Real-time listener for tasks
  subscribeToTasks(userId, callback) {
    const tasksRef = collection(db, 'users', userId, 'tasks');
    const q = query(tasksRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(tasks);
    });
  }
};

// Notes Service
export const notesService = {
  // Get all notes for a user
  async getNotes(userId) {
    try {
      const notesRef = collection(db, 'users', userId, 'notes');
      const q = query(notesRef, orderBy('updatedAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting notes:', error);
      throw error;
    }
  },

  // Add a new note
  async addNote(userId, note) {
    try {
      const noteRef = doc(collection(db, 'users', userId, 'notes'));
      await setDoc(noteRef, {
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return noteRef.id;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  // Update a note
  async updateNote(userId, noteId, updates) {
    try {
      const noteRef = doc(db, 'users', userId, 'notes', noteId);
      await updateDoc(noteRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  // Delete a note
  async deleteNote(userId, noteId) {
    try {
      const noteRef = doc(db, 'users', userId, 'notes', noteId);
      await deleteDoc(noteRef);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  // Real-time listener for notes
  subscribeToNotes(userId, callback) {
    const notesRef = collection(db, 'users', userId, 'notes');
    const q = query(notesRef, orderBy('updatedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(notes);
    });
  }
};

// Quick Launch Apps Service
export const appsService = {
  // Get all apps for a user
  async getApps(userId) {
    try {
      const appsRef = collection(db, 'users', userId, 'apps');
      const snapshot = await getDocs(appsRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting apps:', error);
      throw error;
    }
  },

  // Save apps
  async saveApps(userId, apps) {
    try {
      const appsRef = doc(db, 'users', userId, 'settings', 'quickLaunchApps');
      await setDoc(appsRef, { apps, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error('Error saving apps:', error);
      throw error;
    }
  }
};

// User Settings Service
export const settingsService = {
  // Get user settings
  async getSettings(userId) {
    try {
      const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
      const snapshot = await getDoc(settingsRef);
      return snapshot.exists() ? snapshot.data() : null;
    } catch (error) {
      console.error('Error getting settings:', error);
      throw error;
    }
  },

  // Update user settings
  async updateSettings(userId, settings) {
    try {
      const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
      await setDoc(settingsRef, {
        ...settings,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
};
