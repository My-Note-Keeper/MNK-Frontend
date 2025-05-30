'use client';

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
  Box,
} from '@mui/material';
import { Plus } from 'lucide-react';
import type { note } from '../../types/note';
import { useState } from 'react';

interface AddNoteProps {
  onAdd: (newNote: note) => void;
}

const AddNote = ({ onAdd }: AddNoteProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    const newNote: note = {
      id: Date.now().toString(), // simple unique ID
      title,
      content,
      createdAt: new Date().toLocaleDateString(),
    };
    onAdd(newNote);
    setTitle('');
    setContent('');
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 160,
          borderRadius: 4,
          border: '2px dashed #ccc',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#999',
            backgroundColor: '#f5f5f5',
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Tooltip title="Add Note">
          <IconButton>
            <Plus size={32} />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add New Note</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            disabled={!title.trim() || !content.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNote;
