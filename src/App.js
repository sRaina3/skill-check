import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import './App.css';
import Login from './Login';

const App = ({user}) => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('normal')
  const [userAccount, setUserAccount] = useState({name: 'Guest', password: ''})
  if (user != null) {
    setUserAccount(user)
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
      <p className="corner-text">Welcome {userAccount.name}!</p>
      <h1 className="title-text">Choose a Game</h1>
      <Login userAccSetter={setUserAccount}/>
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
