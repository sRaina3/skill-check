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
  const [freqOne, setFreqOne] = useState()
  const [freqTwo, setFreqTwo] = useState()
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
        setWordOne(word[0].word)
      })
    userService.getRandomWord()
      .then(word => {
        setWordTwo(word[0].word)
      })
  }, []);

  return (
    <div>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <Instruction/>
      <div className="highscore">{userAccount.username === 'Guest' ? 'Login to Save Score' : `Highscore:  ${userAccount.scramNScore}`}</div>
      <div className="word-box-left">{wordOne}</div>
      <div className="has-left-text">has</div>
      <div className="freq-left-text">use frequency per 1 million words</div> 
      <div>
        <div className="word-box-right">{wordTwo}</div>
        <div className="has-right-text">has</div>
        <button className="higher-button">Higher</button>
        <button className="lower-button">Lower</button>
        <div className="freq-right-text">use frequency than <span className="underline">{wordOne}</span></div>
      </div>
    </div>
  )
}

export default WordFreqNorm