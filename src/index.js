import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import IndexMemory from './IndexMemory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/IndexMemory" element={<IndexMemory />} />
    </Routes>
  </Router>
);
