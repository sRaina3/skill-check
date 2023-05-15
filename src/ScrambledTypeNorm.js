import {useState} from 'react'

const ScrambledTypeNorm = () => {
  const keyboardKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", 
                        "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];

  const [scrambledKeys, setScrambled] = useState(...keyboardKeys)

  // Fisher-Yates Shuffle Algo
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div>

    </div>
  )
}

export default ScrambledTypeNorm