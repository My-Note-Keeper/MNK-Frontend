import { Box } from '@mui/material';
import type { note } from '../types/note';

interface NoteProps {
  note: note;
}

const Note = ({ note }: NoteProps) => {
  return (
    <Box>
      <Box key={note.id}>
        <Box>{note.title}</Box>
        <Box>{note.content}</Box>
        <Box>{note.createdAt.toLocaleString()}</Box>
      </Box>
    </Box>
  );
};

export default Note;
