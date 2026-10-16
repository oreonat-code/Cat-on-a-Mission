import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../../design/colors/tokens.css';
import App from './App.jsx';
import './styles/paper-colors.css';
import './styles/base.css';
import './styles/components.css';
// Last, so the dashboard and login body styles win over the Papers base styles.
import './base.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
