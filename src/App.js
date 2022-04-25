import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notes from '../src/pages/Notes'
import Create from '../src/pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
            <Routes>
              <Route exact path='/' element={<Notes />} />
              <Route path='/create' element={<Create />} />
            </Routes>
        </Layout>    
      </Router>
    </ThemeProvider>
  );
}

export default App;
