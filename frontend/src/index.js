import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// ❌ YE LINE REMOVE KAREIN: import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ❌ YE Router HATA DIYA */}
    <App />
  </React.StrictMode>
);