// API Used: https://github.com/lukePeavey/quotable
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import userService from '../services/UserService';
import Instruction from '../services/Instruction';
import './ScrambledType.css'

const ScrambledTypeNorm = () => {
  const keyboardKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h",
                     "j", "k", "l", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", '-', '"', "1", "2", 
                     "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", 
                     "(", ")", "_", "+", "=", "{", "}", "[", "]", "|", ":", ";", "<", ">", "?", "~", "`"];

  const [scrambledKeys, setScrambled] = useState([...keyboardKeys])
  const [displayText, setDisplayText] = useState('')
  const [curIndex, setCurIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(100)
  const [userAccount, setUserAccount] = useState({username: 'Guest'})

  useEffect(() => {
    // Retrieve the user account from local storage if logged in
    const storedUserAccount = localStorage.getItem('userAccount');
    if (storedUserAccount) {
      setUserAccount(JSON.parse(storedUserAccount));
    }
  }, [displayText]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    setCurIndex(0)
    setTimeTaken(100)
    axios
      .get('https://api.quotable.io/random?maxLength=35')
      .then(response => {
        console.log(response.data.content)
        setDisplayText(response.data.content.toLowerCase())
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (curIndex < displayText.length) {
        setTimeTaken(timeTaken => timeTaken - 1)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [curIndex, displayText]);

  useEffect(() => {
    axios
      .get('https://api.quotable.io/random?maxLength=35')
      .then(response => {
        console.log(response.data.content)
        setDisplayText(response.data.content.toLowerCase())
      })
  }, [])

  // Fisher-Yates Shuffle Algo
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleKeyPress = (key) => {
    shuffleArray(keyboardKeys);
    setScrambled([...keyboardKeys]);
    if (key === displayText[curIndex]) { 
      setCurIndex(curIndex + 1)
    }
  }

  if (displayText.length !== 0 && curIndex >= displayText.length) {
    const updatedUser = JSON.parse(JSON.stringify(userAccount))
    updatedUser.skillCoins += ((timeTaken * displayText.length) ** 3.05) / 100000000
    if (timeTaken * displayText.length > userAccount.scramCScore) {
      updatedUser.scramCScore = timeTaken * displayText.length
    }
    userService.updateUser(updatedUser)
      .then(user => {
        localStorage.setItem('userAccount', JSON.stringify(updatedUser));
      })
    return (
      <div className='text'>
        <h1 className='coin-display'>+ {Number((((timeTaken * displayText.length) ** 3.05) / 100000000).toFixed(3))} Skill Coins</h1>
        <button className="home-button" onClick={handleTryAgain}>Play Again</button>
        <h1 className='score-display'>You Won with {timeTaken} seconds left!</h1>
      </div>
    )
  } else if (timeTaken > -1) {
    return (
      <div>
        <button className="home-button" onClick={handleGoBack}>Home</button>
        <Instruction />
        <div className="highscore">{userAccount.username === 'Guest' ? 'Login to Save Score' : `Highscore:  ${userAccount.scramCScore}`}</div>
        <h1 className='text'>{timeTaken}</h1>
        <h1 className='text'>
          {displayText.split('').map((char, index) => (
            <span key={index} className={index === curIndex ? 'highlight' : ''}>{char}</span>
          ))}
        </h1>
        <div className="keyboardChal">
          {scrambledKeys.map(key => <button key={key} onClick={() => handleKeyPress(key)}>{key}</button>)}
        </div>
        <div className="spacebar">
          <button key={' '} onClick={() => handleKeyPress(' ')}> </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='text'>
        <button className="home-button" onClick={handleTryAgain}>Try Again</button>
        You Lose
      </div>
    )
  }
}

export default ScrambledTypeNorm