import {
  alpha,
  AppBar,
  Container,
  Grid,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import './App.css';
import { Search as SearchIcon } from 'lucide-react';
import Note from '../components/Note';
import type { note } from '../types/note';
import { useEffect, useState } from 'react';
import AddNote from '../components/AddNote';
import NoteAPI from '../services/Note';
import toast from 'react-hot-toast';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  const [notes, setNotes] = useState<note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<note[]>(notes);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await NoteAPI.getAll();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const handleDeleteNote = async (id: string) => {
    try {
      await NoteAPI.delete(id);
      setNotes(prev => prev.filter(note => note.id !== id));
      toast.success('Note deleted successfully');
    } catch (err) {
      console.error('Failed to delete note:', err);
      toast.error('Failed deleting note');
    }
  };

  const handleEditNote = async (updatedNote: note) => {
    try {
      const savedNote = await NoteAPI.update(updatedNote.id, {
        title: updatedNote.title,
        content: updatedNote.content,
      });
      setNotes(prev => prev.map(note => (note.id === savedNote.id ? savedNote : note)));
      toast.success('Note updated successfully');
    } catch (err) {
      console.error('Failed to update note:', err);
      toast.error('Failed updating note');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') return setFilteredNotes(notes);
    else {
      setFilteredNotes(
        notes.filter(note => note.title.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    }
  };

  const handleAddNote = async (newNote: note) => {
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

  return (
    <Container maxWidth="xl">
      <AppBar position="fixed" color="primary" sx={{ borderTopLeftRadius:0, borderTopRightRadius: 0}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Note Keeper</Typography>
          <Search onChange={handleSearch}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} sx={{ mt: 15 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <AddNote onAdd={newNote => handleAddNote(newNote)} />
        </Grid>

        {filteredNotes.map((note, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note.id}>
            <Note
              note={note}
              index={i}
              handleEdit={handleEditNote}
              handleDelete={handleDeleteNote}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
