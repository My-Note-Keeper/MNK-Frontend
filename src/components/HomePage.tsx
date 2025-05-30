import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import Note from './Note';
import AddNote from './AddNote';
import useNotes from '../hooks/useNotes';
import { Search, SearchIconWrapper, StyledInputBase } from '../constants/searchStyles';

function Home() {
  const { notes, addNote, editNote, deleteNote } = useNotes();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = useMemo(() => {
    if (!searchTerm) return notes;
    return notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, notes]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container maxWidth="xl">
      <AppBar
        position="fixed"
        color="primary"
        sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
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
          <AddNote onAdd={newNote => addNote(newNote)} />
        </Grid>

        {filteredNotes.map((note, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note.id}>
            <Note note={note} index={i} handleEdit={editNote} handleDelete={deleteNote} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
