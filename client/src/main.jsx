import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AdventureProvider } from './lib/adventure.jsx';
import '../../design/colors/tokens.css';
import './styles/paper-colors.css';
import './styles/base.css';
import './styles/components.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdventureProvider><App /></AdventureProvider>
  </BrowserRouter>
);
