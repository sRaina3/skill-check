import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import SequenceMemoryChal from './games/SequenceMemoryChal';
import SequenceMemoryNorm from './games/SequenceMemoryNorm';
import ScrambledTypeNorm from './games/ScrambledTypeNorm';
import ScrambledTypeChal from './games/ScrambledTypeChal';
import WordFreqNorm from './games/WordFreqNorm';
import Login from './Login';
import SignUp from './Signup'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename="/skill-check">
    <Routes>
      <Route path="*" element={<App/>} />
      <Route path="/SequenceMemoryChal" element={<SequenceMemoryChal />} />
      <Route path="/SequenceMemoryNorm" element={<SequenceMemoryNorm />} />
      <Route path="/ScrambledTypeNorm" element={<ScrambledTypeNorm />} />
      <Route path="/ScrambledTypeChal" element={<ScrambledTypeChal />} />
      <Route path="/WordFreqNorm" element={<WordFreqNorm/>} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </Router>
);
