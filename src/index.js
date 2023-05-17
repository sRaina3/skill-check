import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import SequenceMemoryChal from './SequenceMemoryChal';
import SequenceMemoryNorm from './SequenceMemoryNorm';
import ScrambledTypeNorm from './ScrambledTypeNorm';
import Login from './Login'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/SequenceMemoryChal" element={<SequenceMemoryChal />} />
      <Route path="/SequenceMemoryNorm" element={<SequenceMemoryNorm />} />
      <Route path="/ScrambledTypeNorm" element={<ScrambledTypeNorm />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </Router>
);
