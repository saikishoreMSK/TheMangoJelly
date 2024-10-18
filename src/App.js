// src/App.js
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your theme
import Chat from './components/Chat';
import CircularLoader from './components/CircularLoader'; // Import the CircularLoader

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or loading process
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000); // Adjust the time as needed

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {loading ? <CircularLoader /> : <Chat />} {/* Show CircularLoader or Chat based on loading state */}
    </ThemeProvider>
  );
}

export default App;
