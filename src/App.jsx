import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const AppContent = () => {
  const location = useLocation();
  
  return (
    <div>
      <Header isSSR={false} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

const App = ({ url, pageName }) => {
  // If we're on the server, render the specific page
  if (typeof window === 'undefined') {
    const renderPage = () => {
      switch (pageName) {
        case 'Dashboard':
          return <Dashboard />;
        case 'Profile':
          return <Profile />;
        case 'Settings':
          return <Settings />;
        default:
          return <Dashboard />;
      }
    };

    return (
      <div>
        <Header isSSR={true} />
        {renderPage()}
      </div>
    );
  }

  // Client-side rendering with router
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
