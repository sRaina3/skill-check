// API Used: https://github.com/lukePeavey/quotable
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import './ScrambledType.css'

const ScrambledTypeNorm = () => {
  const keyboardKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h",
                     "j", "k", "l", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", '-', '"', "1", "2", 
                     "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", 
                     "(", ")", "_", "+", "=", "{", "}", "[", "]", "|", ":", ";", "<", ">", "?", "~", "`"];

  const [scrambledKeys, setScrambled] = useState([...keyboardKeys])
  const [displayText, setDisplayText] = useState('')
  const [curIndex, setCurIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(60)

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    setCurIndex(0)
    setTimeTaken(60)
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
    return (
      <div className='text'>
        <button className="home-button" onClick={handleTryAgain}>Play Again</button>
        You Won with {timeTaken} seconds left!
      </div>
    )
  } else if (timeTaken > -1) {
    return (
      <div>
        <button className="home-button" onClick={handleGoBack}>Home</button>
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