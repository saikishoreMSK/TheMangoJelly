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
      main: '#388E3C', // Darker secondary color for better contrast
    },
    background: {
      default: '#FFFFFF', // Light mode background color
      paper: '#F7F7F7', // Slightly darker paper background for better contrast
    },
    text: {
      primary: '#000000', // Dark text color for better readability
      secondary: '#333333', // Darker secondary text color
    },
    // Dark mode colors
    dark: {
      default: '#121212', // Dark background for dark mode
      paper: '#1E1E1E', // Darker paper background for dark mode
      text: {
        primary: '#FFFFFF', // Light text for dark mode
        secondary: '#B0BEC5', // Light secondary text for dark mode
      },
    },
  },
});

export default theme;
