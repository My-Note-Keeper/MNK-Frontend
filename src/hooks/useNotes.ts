import { useEffect, useState } from 'react';
import type { INote } from '../types/NoteType';
import NoteAPI from '../services/Note';
import toast from 'react-hot-toast';

const useNotes = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  const handleAddNote = async (newNote: INote) => {
    try {
      const created = await NoteAPI.create({
        title: newNote.title,
        content: newNote.content,
      });
      setNotes(prev => [created, ...prev]);
      toast.success('Note created successfully');
    } catch (err) {
      console.error('Failed to create note:', err);
      toast.error('Failed adding note');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await NoteAPI.delete(id);
      setNotes(prev => prev.filter(note => note.id !== id));
      toast.success('Note deleted successfully');
    } catch {
      toast.error('Failed deleting note');
    }
  };

  const handleEditNote = async (updatedNote: INote) => {
    try {
      const savedNote = await NoteAPI.update(updatedNote.id, {
        title: updatedNote.title,
        content: updatedNote.content,
      });
      setNotes(prev => prev.map(note => (note.id === savedNote.id ? savedNote : note)));
      toast.success('Note updated successfully');
    } catch {
      toast.error('Failed updating note');
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await NoteAPI.getAll();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  return {
    notes,
    setNotes,
    deleteNote: handleDeleteNote,
    editNote: handleEditNote,
    addNote: handleAddNote,
  };
};

export default useNotes;
