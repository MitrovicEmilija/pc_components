import React from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import ListComponent from '../src/components/ListComponent';
import { Container, Typography } from '@mui/material';
import background from './assets/2214992.jpg';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

function App() {
  const appStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '100vh',
  };

  const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0)', 
    borderRadius: '8px',
    padding: '16px',
  };

  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline /> 
      <div style={appStyle}>
        <Container maxWidth="lg" sx={{ mt: 4, ...containerStyle }}>
          <Typography variant="h3" textAlign="center" gutterBottom color='white'>
            PC Components Manager
          </Typography>
          <FormComponent />
          <br />
          <ListComponent />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
