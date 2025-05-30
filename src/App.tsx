import { alpha, AppBar, Box, Grid, InputBase, styled, Toolbar, Typography } from '@mui/material';
import './App.css';
import { Search as SearchIcon } from 'lucide-react';
import Note from '../components/Note';
import type { note } from '../types/note';
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

const notes: note[] = [
  {
    id: 1,
    title: 'Note 1',
    content: 'This is note 1',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Note 2',
    content: 'This is note 2',
    createdAt: new Date(),
  },
  {
    id: 3,
    title: 'Note 3',
    content: 'This is note 3',
    createdAt: new Date(),
  },
  {
    id: 4,
    title: 'Note 4',
    content: 'This is note 4',
    createdAt: new Date(),
  },
  {
    id: 5,
    title: 'Note 5',
    content: 'This is note 5',
    createdAt: new Date(),
  },
];

function App() {
  return (
    <Box>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Note Keeper</Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </AppBar>
      <Grid container>
        {notes.map(note => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note.id}>
           <Note note={note} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
