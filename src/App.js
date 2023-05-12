import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('normal')

  const handleGameButtonClick = () => {
    if (difficulty === 'normal') {
      navigate('/SequenceMemoryNorm');
    } else {
      navigate('/SequenceMemoryChal');
    }
  };

  const handleNormalMode = () => {
    setDifficulty('normal')
  }

  const handleChallengeMode = () => {
    setDifficulty('challenge')
  }

  return (
    <div className="title-screen">
      <h1 className="title-text">Choose a Game</h1>
      <button className="game-button" onClick={handleGameButtonClick}>Sequence Memory</button>
      <div>
        <h1 className="title-text">Select Mode</h1>
        <button className={`mode-button normal ${difficulty === 'normal' ? 'fiery-border' : ''}`} onClick={handleNormalMode}>Normal</button>
        <button className={`mode-button challenge ${difficulty === 'challenge' ? 'fiery-border' : ''}`} onClick={handleChallengeMode}>Challenge</button>
      </div>
    </div>
  )
}

export default App;
