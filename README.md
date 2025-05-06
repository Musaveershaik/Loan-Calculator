# EMI Calculator

A modern, responsive EMI (Equated Monthly Installment) calculator built with React and Material UI. This application helps users calculate loan EMIs with real-time currency conversion capabilities.

## 🚀 Features

- **EMI Calculation**: Calculate loan EMIs using standard financial formulas
- **Dynamic Amortization Schedule**: View detailed monthly breakdown of payments
- **Real-time Currency Conversion**: Convert EMIs to different currencies using live exchange rates
- **Multi-currency Support**: Access exchange rates for 160+ currencies
- **Responsive Design**: Fully responsive UI that works on all screen sizes
- **Theme Support**: Toggle between light and dark modes
- **Mobile-friendly Navigation**: Collapsible header for better mobile experience

## 🛠️ Technologies Used

- **React**: Hooks, Routing, Context API
- **Material UI**: Styling and responsive components
- **Axios**: API calls
- **Exchange Rate API**: Real-time currency conversion

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js installed (v14 or higher)
- npm or yarn package manager
- An API key from [ExchangeRate-API](https://www.exchangerate-api.com/)

## 🔧 Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your ExchangeRate API key:
```
REACT_APP_EXCHANGE_RATE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## 💡 EMI Formula

The application uses the standard EMI formula:

```
EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
```

Where:
- P = Principal loan amount
- R = Monthly interest rate (annual rate/12/100)
- N = Loan duration in months

## 🔄 API Integration

The app integrates with the ExchangeRate-API for live currency conversion:

```
https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
```

Replace `YOUR_API_KEY` with your actual API key from ExchangeRate-API.

## 🎨 Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── utils/          # Utility functions
└── App.js          # Main application component
```

## 📱 Responsive Design

The application is built with Material UI's responsive components and follows a mobile-first approach. It includes:

- Responsive grid system
- Collapsible navigation for mobile devices
- Adaptive typography
- Flexible layouts

## 🌓 Theme Support

The application supports both light and dark modes using Material UI's theming system. Users can toggle between themes using the theme switcher in the header.

## 🐛 Error Handling

- 404 Not Found page for unmatched routes
- Error boundaries for graceful error handling
- Loading states for API calls
- Input validation for calculator fields