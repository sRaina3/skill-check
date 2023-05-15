// API Used: https://github.com/lukePeavey/quotable
import {useState, useEffect} from 'react'
import axios from 'axios'

import './ScrambledType.css'

const ScrambledTypeNorm = () => {
  const keyboardKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", 
                        "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];

  const [scrambledKeys, setScrambled] = useState([...keyboardKeys])
  const [displayText, setDisplayText] = useState()

  useEffect(() => {
    axios
      .get('https://api.quotable.io/random')
      .then(response => {
        console.log('Got response')
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
  }

  return (
    <div className='text'>
      <h1>{displayText}</h1>
      <div className="keyboard">
        {scrambledKeys.map(key => <button key={key} onClick={() => handleKeyPress(key)}>{key}</button>)}
      </div>
    </div>
  )
}

export default ScrambledTypeNorm