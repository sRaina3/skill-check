import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SequenceMemory.css';

const Game = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  console.log("here")
  return (
    <div>
      <h1 className="title">Sequence Memory</h1>
      <button className="home-button" onClick={handleGoBack}>Home</button>
    </div>
  );
};

export default Game;