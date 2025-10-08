import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  Eye, 
  EyeOff,
  FileText,
  Search
} from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '# New Note\n\nStart writing...',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setIsEditing(true);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const saveNote = () => {
    if (selectedNote) {
      setNotes(notes.map(note =>
        note.id === selectedNote.id
          ? { 
              ...note, 
              title: editTitle || 'Untitled Note',
              content: editContent,
              updatedAt: new Date().toISOString()
            }
          : note
      ));
      setSelectedNote({
        ...selectedNote,
        title: editTitle || 'Untitled Note',
        content: editContent,
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
    }
  };

  const startEdit = (note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(true);
    setShowPreview(false);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Notes & Journal
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Capture your thoughts with markdown support
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="lg:col-span-1">
          <div className="card mb-4">
            <button
              onClick={createNote}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>New Note</span>
            </button>
          </div>

          <div className="card mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => {
                    setSelectedNote(note);
                    setIsEditing(false);
                    setShowPreview(false);
                  }}
                  className={`card cursor-pointer transition-all ${
                    selectedNote?.id === note.id
                      ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate mb-1">{note.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {note.content.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="ml-2 p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredNotes.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">No notes found</p>
                <p className="text-sm">Create your first note!</p>
              </div>
            )}
          </div>
        </div>

        {/* Note Editor/Viewer */}
        <div className="lg:col-span-2">
          {selectedNote ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                {isEditing ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="input-field text-2xl font-bold"
                    placeholder="Note title..."
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{selectedNote.title}</h2>
                )}
                
                <div className="flex items-center space-x-2">
                  {isEditing && (
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
                      <span>{showPreview ? 'Edit' : 'Preview'}</span>
                    </button>
                  )}
                  
                  {isEditing ? (
                    <button
                      onClick={saveNote}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save size={18} />
                      <span>Save</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(selectedNote)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Edit2 size={18} />
                      <span>Edit</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="min-h-[500px]">
                {isEditing && !showPreview ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="input-field min-h-[500px] font-mono text-sm"
                    placeholder="Write your note in markdown..."
                  />
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{isEditing ? editContent : selectedNote.content}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Created: {new Date(selectedNote.createdAt).toLocaleString()}</span>
                  <span>Updated: {new Date(selectedNote.updatedAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Markdown Cheatsheet */}
              {isEditing && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm">Markdown Quick Reference:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <div># Heading 1</div>
                    <div>**Bold Text**</div>
                    <div>## Heading 2</div>
                    <div>*Italic Text*</div>
                    <div>- List Item</div>
                    <div>[Link](url)</div>
                    <div>`Code`</div>
                    <div>&gt; Quote</div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="card h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FileText size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">Select a note or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
