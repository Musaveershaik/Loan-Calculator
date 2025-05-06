import React from 'react';
import { Typography, Container, Divider, Link } from '@mui/material';
import {
  Checklist as ChecklistIcon,
  Star as StarIcon,
  Build as BuildIcon,
  Functions as FunctionsIcon,
  MonetizationOn as MonetizationOnIcon,
  Flag as FlagIcon
} from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        About This App
      </Typography>
      <Typography variant="body1" paragraph>
        This Loan Calculator App is a modern, single-page web application built using <b>React JS</b> and <b>Material UI</b>. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.
      </Typography>

      {/* Instructions */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        <ChecklistIcon fontSize="small" sx={{ mr: 1 }} />
        Instructions for Candidates
      </Typography>
      <ul>
        <li>Push the entire project to a public <b>GitHub repository</b>.</li>
        <li>Commit regularly with clear messages for each feature.</li>
        <li>Use the provided EMI formula.</li>
        <li>Use Context API for global state (e.g. theme).</li>
        <li>Create reusable custom React hooks.</li>
        <li>Integrate <b>ExchangeRate API</b> for currency conversion.</li>
        <li>Ensure the app is fully responsive and mobile-friendly.</li>
        <li>Implement both <b>light</b> and <b>dark mode</b>.</li>
        <li>Add a <b>404 Page</b> for unmatched routes.</li>
        <li>Deploy your app (e.g. Vercel, Netlify, GitHub Pages).</li>
      </ul>

      {/* Features */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        <StarIcon fontSize="small" sx={{ mr: 1 }} />
        Features
      </Typography>
      <ul>
        <li>EMI calculation using standard formulas</li>
        <li>Monthly amortization schedule</li>
        <li>Live currency conversion</li>
        <li>Light/Dark mode toggle</li>
        <li>Mobile responsive layout</li>
      </ul>

      {/* Technologies */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        <BuildIcon fontSize="small" sx={{ mr: 1 }} />
        Technologies Used
      </Typography>
      <ul>
        <li>React (Hooks, Routing, Context API)</li>
        <li>Material UI</li>
        <li>Axios for API calls</li>
        <li>Exchange Rate API</li>
      </ul>

      {/* EMI Formula */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        <FunctionsIcon fontSize="small" sx={{ mr: 1 }} />
        EMI Formula Used
      </Typography>
      <Typography variant="body1">
        EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Where:<br />
        P = Principal amount<br />
        r = Monthly interest rate<br />
        n = Loan tenure in months
      </Typography>

      {/* Currency Conversion API */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        <MonetizationOnIcon fontSize="small" sx={{ mr: 1 }} />
        Currency Conversion API
      </Typography>
      <Typography variant="body2" paragraph>
        This app uses <Link href="https://www.exchangerate-api.com" target="_blank">ExchangeRate-API</Link> for real-time exchange rates.
      </Typography>
      <Typography variant="caption">
        Endpoint Example: https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
      </Typography>

      {/* Purpose */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        <FlagIcon fontSize="small" sx={{ mr: 1 }} />
        Purpose of This App
      </Typography>
      <Typography variant="body2">
        This app is designed to assess skills in React fundamentals, hooks, API integration, routing, theme customization, responsiveness, and reusability of code.
      </Typography>
      </Container>
  );
};

export default About;
