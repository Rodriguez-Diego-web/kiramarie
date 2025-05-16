import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { HelmetProvider } from 'react-helmet-async'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider> 
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </HelmetProvider> 
  </React.StrictMode>
);

reportWebVitals();
