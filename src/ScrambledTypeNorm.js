// API Used: https://github.com/lukePeavey/quotable
import {useState, useEffect} from 'react'
import axios from 'axios'

import './ScrambledType.css'

const ScrambledTypeNorm = () => {
  const keyboardKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", 
                        "j", "k", "l", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", '-'];

  const [scrambledKeys, setScrambled] = useState([...keyboardKeys])
  const [displayText, setDisplayText] = useState('')
  const [curIndex, setCurIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTaken(timeTaken => timeTaken - 1)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get('https://api.quotable.io/random?maxLength=40')
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

  if (timeTaken > -1) {
    return (
      <div>
        <h1 className='text'>{timeTaken}</h1>
        <h1 className='text'>
          {displayText.split('').map((char, index) => (
            <span key={index} className={index === curIndex ? 'highlight' : ''}>{char}</span>
          ))}
        </h1>
        <div className="keyboard">
          {scrambledKeys.map(key => <button key={key} onClick={() => handleKeyPress(key)}>{key}</button>)}
        </div>
      </div>
    )
  } else {
    return (
      <div className='text'>
        You Lose
      </div>
    )
  }
}

export default ScrambledTypeNorm