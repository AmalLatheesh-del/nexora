import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { tasksService, notesService } from '../services/firestoreService';

export const useFirestoreSync = () => {
  const { currentUser } = useAuth();
  const [syncing, setSyncing] = useState(false);

  // Sync tasks to Firestore
  const syncTasks = async (tasks) => {
    if (!currentUser) return;
    
    try {
      setSyncing(true);
      // Implementation would sync local tasks to Firestore
      console.log('Syncing tasks to cloud...');
    } catch (error) {
      console.error('Error syncing tasks:', error);
    } finally {
      setSyncing(false);
    }
  };

  // Sync notes to Firestore
  const syncNotes = async (notes) => {
    if (!currentUser) return;
    
    try {
      setSyncing(true);
      // Implementation would sync local notes to Firestore
      console.log('Syncing notes to cloud...');
    } catch (error) {
      console.error('Error syncing notes:', error);
    } finally {
      setSyncing(false);
    }
  };

  // Load data from Firestore
  const loadFromCloud = async () => {
    if (!currentUser) return { tasks: [], notes: [] };
    
    try {
      const tasks = await tasksService.getTasks(currentUser.uid);
      const notes = await notesService.getNotes(currentUser.uid);
      return { tasks, notes };
    } catch (error) {
      console.error('Error loading from cloud:', error);
      return { tasks: [], notes: [] };
    }
  };

  return {
    syncing,
    syncTasks,
    syncNotes,
    loadFromCloud
  };
};
