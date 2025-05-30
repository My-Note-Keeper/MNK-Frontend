import Home from './components/HomePage';
import { Toaster } from 'react-hot-toast';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/index.ts';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <Home />
    </ThemeProvider>
  );
};

export default App;
