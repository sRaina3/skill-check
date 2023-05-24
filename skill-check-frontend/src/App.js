import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('normal')
  const [userAccount, setUserAccount] = useState({username: 'Guest'})
  
  useEffect(() => {
    // Retrieve the user account from local storage if logged in
    const storedUserAccount = localStorage.getItem('userAccount');
    if (storedUserAccount) {
      setUserAccount(JSON.parse(storedUserAccount));
    }
  }, []);

  const handleSignUp = () => {
    navigate('/Signup')
  }

  const handleLogin = () => {
    navigate('/Login')
  }

  const handleLogOut = () => {
    localStorage.removeItem('userAccount');
    setUserAccount({username: 'Guest'}  )
  }

  const handleSeq = () => {
    if (difficulty === 'normal') {
      navigate('/SequenceMemoryNorm')
    } else {
      navigate('/SequenceMemoryChal')
    }
  };

  const handleType = () => {
    if (difficulty === 'normal') {
      navigate('/ScrambledTypeNorm')
    } else {
      navigate('/ScrambledTypeChal')
    }
  }

  const handleNormalMode = () => {
    setDifficulty('normal')
  }

  const handleChallengeMode = () => {
    setDifficulty('challenge')
  }

  if (userAccount.username === 'Guest') {
    return (
      <div>
        <div className="corner-text">Welcome {userAccount.username}!</div>
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
      </div>
    )
  } else {
    return (
      <div>
        <div className="corner-text">Welcome {userAccount.username}!</div>
        <div className="coin-display">Balance: ${Number(userAccount.skillCoins.toFixed(3))}</div>
        <div className="title-screen">
          <h1 className="title-text">Choose a Game</h1>
          <button className="signup-button" onClick={handleLogOut}>Log Out</button>
          <button className="game-button" onClick={handleSeq}>Sequence Memory</button>
          <button className="game-button" onClick={handleType}>Scrambled Type Test</button>
          <div>
            <h1 className="title-text">Select Mode</h1>
            <button className={`mode-button normal ${difficulty === 'normal' ? 'fiery-border' : ''}`} onClick={handleNormalMode}>Normal</button>
            <button className={`mode-button challenge ${difficulty === 'challenge' ? 'fiery-border' : ''}`} onClick={handleChallengeMode}>Challenge</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
