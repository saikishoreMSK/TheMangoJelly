// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: '#FF9800',
        light: '#FFB74D',
        dark: '#F57C00',
      },
    secondary: {
      main: '#388E3C', 
    },
    background: {
      default: '#FFFFFF', 
      paper: '#F7F7F7', 
    },
    text: {
      primary: '#000000', 
      secondary: '#333333', 
    },
    // Dark mode colors
    dark: {
      default: '#121212', 
      paper: '#1E1E1E', 
      text: {
        primary: '#FFFFFF', 
        secondary: '#B0BEC5', 
      },
    },
  },
});

export default theme;
