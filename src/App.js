import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('normal')

  const handleLogin = () => {
    navigate('/Login')
  }

  const handleSignUp = () => {
    navigate('/Signup')
  }

  const handleSeq = () => {
    if (difficulty === 'normal') {
      navigate('/SequenceMemoryNorm')
    } else {
      navigate('/SequenceMemoryChal')
    }
  };

  const handleType = () => {
    navigate('/ScrambledTypeNorm')
  }

  const handleNormalMode = () => {
    setDifficulty('normal')
  }

  const handleChallengeMode = () => {
    setDifficulty('challenge')
  }

  return (
    <div className="title-screen">
      <h1 className="title-text">Choose a Game</h1>
      <button className="login-button" onClick={handleLogin}>Log In</button>
      <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
      <button className="game-button" onClick={handleSeq}>Sequence Memory</button>
      <button className="game-button" onClick={handleType}>Scrambled Type Test</button>
      <div>
        <h1 className="title-text">Select Mode</h1>
        <button className={`mode-button normal ${difficulty === 'normal' ? 'fiery-border' : ''}`} onClick={handleNormalMode}>Normal</button>
        <button className={`mode-button challenge ${difficulty === 'challenge' ? 'fiery-border' : ''}`} onClick={handleChallengeMode}>Challenge</button>
      </div>
    </div>
  )
}

export default App;
