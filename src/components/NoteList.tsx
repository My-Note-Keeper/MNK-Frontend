import type { INote } from '../types/NoteType';
import { Grid } from '@mui/material';
import Note from './Note';

interface INoteListProps {
  notes: INote[];
  editNote: (note: INote) => void;
  deleteNote: (id: string) => void;
}
const NoteList = ({ notes, editNote, deleteNote }: INoteListProps) => {
  return (
    <>
      {notes.map((note: INote, i: number) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note.id}>
          <Note note={note} index={i} handleEdit={editNote} handleDelete={deleteNote} />
        </Grid>
      ))}
    </>
  );
};

export default NoteList;
