'use client';

import {
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { Trash2, Pen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { note } from '../types/note';

interface NoteProps {
  note: note;
  index: number;
  handleEdit: (note: note) => void;
  handleDelete: (id: number) => void;
}

const colors = ['#fde68a', '#fca5a5', '#a5b4fc', '#6ee7b7', '#f9a8d4', '#c4b5fd', '#fdba74'];

const Note = ({ note, index, handleEdit, handleDelete }: NoteProps) => {
  const [hovered, setHovered] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [randomColor, setRandomColor] = useState('');
  const [editData, setEditData] = useState<note>(note);

  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(color);
  }, []);

  const handleNoteDelete = () => {
    handleDelete(note.id);
    setOpenDelete(false);
  };

  const handleEditSubmit = () => {
    console.log('Edited note:', editData);
    handleEdit(editData);
    setOpenEdit(false);
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'relative',
            backgroundColor: randomColor,
            borderRadius: 16,
            padding: 16,
            height: 132,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Edit Icon */}
          {hovered && (
            <IconButton
              size="small"
              onClick={() => setOpenEdit(true)}
              sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
            >
              <Pen size={16} />
            </IconButton>
          )}

          {/* Delete Icon */}
          {hovered && (
            <IconButton
              size="small"
              onClick={() => setOpenDelete(true)}
              sx={{ position: 'absolute', bottom: 8, right: 8, zIndex: 1 }}
            >
              <Trash2 size={16} />
            </IconButton>
          )}

          <Typography variant="h6" fontWeight="bold">
            {note.title}
          </Typography>
          <Typography sx={{ mt: 1 }}>{note.content}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            {note.createdAt.toLocaleString()}
          </Typography>
        </motion.div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this note?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button color="error" onClick={handleNoteDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={editData?.title}
            onChange={e => setEditData({ ...editData!, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Content"
            value={editData?.content}
            multiline
            rows={4}
            onChange={e => setEditData({ ...editData!, content: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Note;
