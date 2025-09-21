import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// Simple hydration without complex context
const container = document.getElementById('root');
if (container) {
  ReactDOM.hydrateRoot(
    container,
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
