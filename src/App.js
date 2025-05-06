import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Import custom theme and context
import { useThemeContext } from './contexts/ThemeContext';
import { CurrencyProvider } from './contexts/CurrencyContext';

// Import components
import Header from './components/Header';
import LoanCalculator from './pages/LoanCalculator';
import ExchangeRates from './pages/ExchangeRates';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  const { theme } = useThemeContext();

  return (
    <CurrencyProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
              <Routes>
                <Route path="/" element={<LoanCalculator />} />
                <Route path="/exchange-rates" element={<ExchangeRates />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </CurrencyProvider>
  );
}

export default App;