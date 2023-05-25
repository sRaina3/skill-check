// API Used: https://www.datamuse.com/api/
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import userService from '../services/UserService'
import Instruction from '../services/Instruction'

const WordFreqNorm = () => {
  const navigate = useNavigate();

  const [comparedWords, setComparedWords] = useState([])
  const [userAccount, setUserAccount] = useState({username: 'Guest'})

  useEffect(() => {
    // Retrieve the user account from local storage if logged in
    const storedUserAccount = localStorage.getItem('userAccount');
    if (storedUserAccount) {
      setUserAccount(JSON.parse(storedUserAccount));
    }
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  useEffect(() => {
    userService.getRandomWord()
      .then(word => {
        console.log(word)
      })
    userService.getRandomWord()
      .then(word => {
        console.log(word)
      })
  }, []);

  return (
    <div>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <Instruction/>
        <div className="highscore">{userAccount.username === 'Guest' ? 'Login to Save Score' : `Highscore:  ${userAccount.scramNScore}`}</div>
    </div>
  )
}

export default WordFreqNorm