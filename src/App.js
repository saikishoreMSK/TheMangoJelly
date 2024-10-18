// src/App.js
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Chat from './components/Chat';
import CircularLoader from './components/CircularLoader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {loading ? <CircularLoader /> : <Chat />}
    </ThemeProvider>
  );
}

export default App;
