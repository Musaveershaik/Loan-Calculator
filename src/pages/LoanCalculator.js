import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  TablePagination,
  Card,
  CardContent,
  Slider,
  InputAdornment,
  Chip,
  Stack,
  Divider,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useEmiCalculator from '../hooks/useEmiCalculator';
import { useCurrencyContext } from '../contexts/CurrencyContext';

const LoanCalculator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    emi,
    calculateEmi,
    resetCalculation,
    showResult,
    amortizationSchedule,
  } = useEmiCalculator();

  const { 
    selectedCurrency, 
    setSelectedCurrency, 
    exchangeRates,
    loading: ratesLoading
  } = useCurrencyContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFullTable, setShowFullTable] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleResetTable = () => {
    resetCalculation();
  };

  const toggleShowFullTable = () => {
    setShowFullTable(!showFullTable);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Calculate loan statistics
  const calculateTotalPayment = () => {
    if (!amortizationSchedule.length) return 0;
    return amortizationSchedule.reduce((sum, row) => sum + row.emi, 0);
  };

  const calculateTotalInterest = () => {
    if (!amortizationSchedule.length) return 0;
    return amortizationSchedule.reduce((sum, row) => sum + row.interest, 0);
  };

  // Summary cards
  const summaryCards = [
    {
      title: "Total Payment",
      value: formatCurrency(calculateTotalPayment()),
      color: theme.palette.primary.main
    },
    {
      title: "Total Interest",
      value: formatCurrency(calculateTotalInterest()),
      color: theme.palette.secondary.main
    },
    {
      title: "Monthly EMI",
      value: formatCurrency(emi),
      color: theme.palette.success.main
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            color: theme.palette.text.primary
          }}
        >
          Loan EMI Calculator
        </Typography>
        <Typography 
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Calculate your monthly loan payments with our simple EMI calculator. Adjust loan amount, interest rate, and term to get instant results.
        </Typography>
      </Box>

      <Card 
        elevation={0} 
        sx={{ 
          mb: 4, 
          borderRadius: 3, 
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <CardContent sx={{
            p: { xs: 2, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }}>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Loan Amount
              </Typography>
              <TextField
                fullWidth
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {selectedCurrency}
                    </InputAdornment>
                  ),
                  inputProps: { min: 0 }
                }}
                sx={{ mb: 1 }}
              />
              <Slider
                value={loanAmount}
                onChange={(e, newValue) => setLoanAmount(newValue)}
                min={0}
                max={1000000}
                step={100}
                aria-label="Loan Amount"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${selectedCurrency} ${value.toLocaleString()}`}
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">0</Typography>
                <Typography variant="caption" color="text.secondary">1,000,000</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Interest Rate (%)
              </Typography>
              <TextField
                fullWidth
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                type="number"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  inputProps: { min: 0, step: 0.1 }
                }}
                sx={{ mb: 1 }}
              />
              <Slider
                value={interestRate}
                onChange={(e, newValue) => setInterestRate(newValue)}
                min={1}
                max={20}
                step={0.1}
                aria-label="Interest Rate"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">1%</Typography>
                <Typography variant="caption" color="text.secondary">20%</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Loan Term (Years)
              </Typography>
              <TextField
                fullWidth
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value) || 0)}
                type="number"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Years</InputAdornment>,
                  inputProps: { min: 1, max: 30 }
                }}
                sx={{ mb: 1 }}
              />
              <Slider
                value={loanTerm}
                onChange={(e, newValue) => setLoanTerm(newValue)}
                min={1}
                max={50}
                step={1}
                aria-label="Loan Term"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} ${value === 1 ? 'Year' : 'Years'}`}
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">1 Year</Typography>
                <Typography variant="caption" color="text.secondary">50 Years</Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="contained" 
              startIcon={<CalculateIcon />}
              onClick={calculateEmi}
              disableElevation
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Calculate
            </Button>
          </Box>
        </CardContent>
      </Card>

      {showResult && (
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {summaryCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      backgroundColor: card.color
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ mr: 1 }}>
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedCurrency}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Amortization Schedule
              </Typography>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="currency-select-label">Currency</InputLabel>
                <Select
                  labelId="currency-select-label"
                  id="currency-select"
                  value={selectedCurrency}
                  label="Currency"
                  onChange={handleCurrencyChange}
                  disabled={ratesLoading}
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
            </Box>

            <Button 
              variant="outlined" 
              size="small"
              startIcon={<RefreshIcon />}
              onClick={handleResetTable}
              sx={{ 
                borderRadius: 2,
              }}
            >
              Reset
            </Button>
          </Box>

          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <TableContainer>
              <Table aria-label="amortization table" size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                    <TableCell>Month</TableCell>
                    <TableCell>Principal</TableCell>
                    <TableCell>Interest</TableCell>
                    <TableCell>Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortizationSchedule
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow 
                        key={row.month}
                        sx={{ 
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover
                          }
                        }}
                      >
                        <TableCell>{row.month}</TableCell>
                        <TableCell>{formatCurrency(row.principal)} {selectedCurrency}</TableCell>
                        <TableCell>{formatCurrency(row.interest)} {selectedCurrency}</TableCell>
                        <TableCell>{formatCurrency(row.balance)} {selectedCurrency}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 60]}
                component="div"
                count={amortizationSchedule.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Note: This is an estimation based on constant interest rate. Actual payments may vary.
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default LoanCalculator;