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
  const [score, setScore] = useState(0)
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
        axios.get(`https://api.datamuse.com/words?sp=${word[0].word}&md=f&max=1`)
          .then(response => {
            const string = response.data[0].tags[0]
            const freq = Number(Number(string.substring(2, string.length)).toFixed(3))
            console.log("freq 1: " + freq)
            setFreqOne(freq)
          })
      })
    userService.getRandomWord()
      .then(word => {
        setWordTwo(word[0].word)
        axios.get(`https://api.datamuse.com/words?sp=${word[0].word}&md=f&max=1`)
          .then(response => {
            const string = response.data[0].tags[0]
            const freq = Number(Number(string.substring(2, string.length)).toFixed(3))
            console.log("freq 2: " + freq)
            setFreqTwo(freq)
          })
      })
  }, []);

  const handleHigherClick = () => {
    if (freqTwo >= freqOne) {
      setScore(score + 1)
      setWordOne(wordTwo)
      setFreqOne(freqTwo)
      userService.getRandomWord()
      .then(word => {
        setWordTwo(word[0].word)
        axios.get(`https://api.datamuse.com/words?sp=${word[0].word}&md=f&max=1`)
          .then(response => {
            const string = response.data[0].tags[0]
            const freq = Number(Number(string.substring(2, string.length)).toFixed(3))
            console.log("freq 2: " + freq)
            setFreqTwo(freq)
          })
      })
    }
  }

  const handleLowerClick = () => {
    if (freqTwo <= freqOne) {
      setScore(score + 1)
      setWordOne(wordTwo)
      setFreqOne(freqTwo)
      userService.getRandomWord()
      .then(word => {
        setWordTwo(word[0].word)
        axios.get(`https://api.datamuse.com/words?sp=${word[0].word}&md=f&max=1`)
          .then(response => {
            const string = response.data[0].tags[0]
            const freq = Number(Number(string.substring(2, string.length)).toFixed(3))
            console.log("freq 2: " + freq)
            setFreqTwo(freq)
          })
      })
    }
  }

  return (
    <div>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <h1 className="title">Score: {score}</h1>
      <Instruction/>
      <div className="highscore">{userAccount.username === 'Guest' ? 'Login to Save Score' : `Highscore:  ${userAccount.scramNScore}`}</div>
      <div className="word-box-left">{wordOne}</div>
      <div className="has-left-text">has</div>
      <div className="freq-one">{freqOne}</div>
      <div className="freq-left-text">use frequency per 1 million words</div> 
      <div>
        <div className="word-box-right">{wordTwo}</div>
        <div className="has-right-text">has</div>
        <button className="higher-button" onClick={handleHigherClick}>Higher</button>
        <button className="lower-button" onClick={handleLowerClick}>Lower</button>
        <div className="freq-right-text">use frequency than <span className="underline">{wordOne}</span></div>
      </div>
    </div>
  )
}

export default WordFreqNorm