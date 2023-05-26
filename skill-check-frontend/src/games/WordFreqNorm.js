// API Used: https://www.datamuse.com/api/
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import userService from '../services/UserService'
import Instruction from '../services/Instruction'
import './WordFreq.css'

const WordFreqNorm = () => {
  const navigate = useNavigate();

  const [wordOne, setWordOne] = useState()
  const [wordTwo, setWordTwo] = useState()
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
        console.log(word[0].word)
        setWordOne(word[0].word)
      })
    userService.getRandomWord()
      .then(word => {
        console.log(word[0].word)
        setWordTwo(word[0].word)
      })
  }, []);

  return (
    <div>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <Instruction/>
      <div className="highscore">{userAccount.username === 'Guest' ? 'Login to Save Score' : `Highscore:  ${userAccount.scramNScore}`}</div>
      <div className="word-box-left">{wordOne}</div>
      <div className="word-box-right">{wordTwo}</div>
    </div>
  )
}

export default WordFreqNorm