"use client"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#62ab45', // Change this to your primary color
    },
    secondary: {
      main: '#dc004e', // Change this to your secondary color
    },
    background: {
      default: '#f5f5f5', // Change this to your default background color
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  }
});

export default theme;
