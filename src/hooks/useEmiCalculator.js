import { useState, useCallback } from 'react';
import { useCurrencyContext } from '../contexts/CurrencyContext';

const useEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [emi, setEmi] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  
  const { selectedCurrency, convertCurrency } = useCurrencyContext();

  // Calculate EMI using formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
  const calculateEmi = useCallback(() => {
    if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
      const principal = parseFloat(loanAmount);
      const ratePerMonth = parseFloat(interestRate) / 12 / 100;
      const totalMonths = parseFloat(loanTerm) * 12;
      
      const emiValue = 
        (principal * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths)) /
        (Math.pow(1 + ratePerMonth, totalMonths) - 1);
      
      setEmi(emiValue);
      generateAmortizationSchedule(principal, ratePerMonth, totalMonths, emiValue);
      setShowResult(true);
    } else {
      setEmi(0);
      setAmortizationSchedule([]);
      setShowResult(false);
    }
  }, [loanAmount, interestRate, loanTerm]);

  // Generate full amortization schedule
  const generateAmortizationSchedule = useCallback((principal, ratePerMonth, totalMonths, emiValue) => {
    let schedule = [];
    let balance = principal;
    
    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * ratePerMonth;
      const principalPaid = emiValue - interest;
      balance -= principalPaid;
      
      // Handle rounding errors in the final payment
      if (month === totalMonths) {
        if (Math.abs(balance) < 1) {
          balance = 0;
        }
      }
      
      schedule.push({
        month,
        emi: emiValue,
        principal: principalPaid,
        interest,
        balance: Math.max(0, balance),
      });
    }
    
    setAmortizationSchedule(schedule);
  }, []);

  // Reset calculation
  const resetCalculation = useCallback(() => {
    setShowResult(false);
    setAmortizationSchedule([]);
  }, []);

  return {
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
  };
};

export default useEmiCalculator;