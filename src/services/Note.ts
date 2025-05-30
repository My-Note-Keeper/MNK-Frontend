// services/Note.ts

import type { INote } from '../types/NoteType';

class NoteService {
  private baseUrl = 'http://localhost:5000/notes';

  // GET /notes
  async getAll(): Promise<INote[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch notes');

    const data = await res.json();

    // Map _id from backend to id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((note: any) => ({
      id: note._id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
    }));
  }

  // POST /notes
  async create(note: Omit<INote, 'id' | 'createdAt'>): Promise<INote> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error('Failed to create note');

    const data = await res.json();
    return {
      id: data._id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
    };
  }

  // PUT /notes/:id
  async update(id: string, updatedNote: Partial<INote>): Promise<INote> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote),
    });
    if (!res.ok) throw new Error('Failed to update note');

    const data = await res.json();
    return {
      id: data._id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
    };
  }

  // DELETE /notes/:id
  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete note');
  }
}

const NoteAPI = new NoteService();
export default NoteAPI;
