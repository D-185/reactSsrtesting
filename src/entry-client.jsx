import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import helmetAsync from 'react-helmet-async';
const { HelmetProvider } = helmetAsync;
import App from './App';

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
