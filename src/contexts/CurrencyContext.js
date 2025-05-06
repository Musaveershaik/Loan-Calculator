import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the currency context
const CurrencyContext = createContext();

// Currency provider component
export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API key should be stored in environment variables in a real app
  const API_KEY = 'b1edd35e142564452a3e7d8d';
  
  // Fetch exchange rates when currency changes
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${selectedCurrency}`
        );
        
        if (response.data.result === 'success') {
          setExchangeRates(response.data.conversion_rates);
          setError(null);
        } else {
          setError('Failed to fetch exchange rates');
        }
      } catch (err) {
        setError('API Error: ' + (err.response?.data?.error || err.message));
        console.error('Exchange rate API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency]);

  // Convert amount from one currency to another
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    // If exchange rates not loaded yet, return original amount
    if (loading || !exchangeRates || Object.keys(exchangeRates).length === 0) {
      return amount;
    }

    // If same currency, no conversion needed
    if (fromCurrency === toCurrency) {
      return amount;
    }

    // Calculate conversion
    const rate = exchangeRates[toCurrency];
    if (!rate) {
      console.error(`Exchange rate for ${toCurrency} not found`);
      return amount;
    }

    return amount * rate;
  };

  const value = {
    selectedCurrency,
    setSelectedCurrency,
    exchangeRates,
    loading,
    error,
    convertCurrency,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

// Custom hook to use the currency context
export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;