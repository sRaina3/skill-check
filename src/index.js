import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Game from './SequenceMemory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/Game" element={<Game />} />
    </Routes>
  </Router>
);
