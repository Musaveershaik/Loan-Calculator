import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useCurrencyContext } from '../contexts/CurrencyContext';

const ExchangeRates = () => {
  const { 
    selectedCurrency, 
    setSelectedCurrency, 
    exchangeRates, 
    loading, 
    error 
  } = useCurrencyContext();
  
  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    setPage(0);
  };

  // Filter currencies based on search term
  const filteredCurrencies = Object.keys(exchangeRates)
    .filter(currency => 
      currency.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Live Exchange Rates
      </Typography>
      
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Current base currency: <strong>{selectedCurrency}</strong>
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="base-currency-label">Base Currency</InputLabel>
          <Select
            labelId="base-currency-label"
            id="base-currency-select"
            value={selectedCurrency}
            label="Base Currency"
            onChange={handleCurrencyChange}
            disabled={loading}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="JPY">JPY</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
            <MenuItem value="AUD">AUD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Search Currency"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 200 }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="exchange rates table">
              <TableHead>
                <TableRow>
                  <TableCell>Currency</TableCell>
                  <TableCell align="right">Exchange Rate (1 {selectedCurrency} equals)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCurrencies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((currency) => (
                    <TableRow key={currency} hover>
                      <TableCell component="th" scope="row">
                        {currency}
                      </TableCell>
                      <TableCell align="right">
                        {exchangeRates[currency].toFixed(6)}
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredCurrencies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No currencies found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredCurrencies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Container>
  );
};

export default ExchangeRates;