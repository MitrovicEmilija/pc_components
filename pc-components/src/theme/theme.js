import { createTheme } from '@mui/material/styles';
import '@fontsource/crimson-text'; 

const theme = createTheme({
    typography: {
      fontFamily: 'Crimson Text, Open Sans, Helvetica, Arial, sans-serif', 
      h1: {
        fontFamily: 'Crimson Text', 
        fontWeight: 700,
      },
      h2: {
        fontFamily: 'Crimson Text',
      },
      body1: {
        fontFamily: 'Crimson Text',
      },
    },
  });

export default theme;
