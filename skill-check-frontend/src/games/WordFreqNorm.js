// API Used: https://www.datamuse.com/api/
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import userService from '../services/UserService'
import Instruction from '../services/Instruction'
import './WordFreq.css'

import Inst from '../images/WordFreq.png'
import roundPassed from '../audio/roundPassed.mp3'
import failed from '../audio/failed.mp3'

const WordFreqNorm = () => {
  const navigate = useNavigate();

  const [wordOne, setWordOne] = useState()
  const [wordTwo, setWordTwo] = useState()
  const [freqOne, setFreqOne] = useState()
  const [freqTwo, setFreqTwo] = useState()
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameReset, setGameReset] = useState(0)
  const [userAccount, setUserAccount] = useState({username: 'Guest'})

  const [roundPassedSound] = useState(new Audio(roundPassed));
  const [failedSound] = useState(new Audio(failed));

  useEffect(() => {
    // Retrieve the user account from local storage if logged in
    const storedUserAccount = localStorage.getItem('userAccount');
    if (storedUserAccount) {
      setUserAccount(JSON.parse(storedUserAccount));
    }
  }, [gameOver]);

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
            setFreqTwo(freq)
          })
      })
  }, [gameReset]);

  const handleTryAgain = () => {
    setGameOver(false)
    setGameReset(gameReset+1)
    setScore(0)
  }

  const handleHigherClick = () => {
    if (freqTwo >= freqOne) {
      roundPassedSound.play()
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
            setFreqTwo(freq)
          })
      })
    } else {
      failedSound.play()
      const updatedUser = JSON.parse(JSON.stringify(userAccount))
      updatedUser.skillCoins += (score ** 2.5) / 100
      if (score > userAccount.wordfreqNScore) {
        updatedUser.wordfreqNScore = score
      }
      if (updatedUser.username !== 'Guest') {
        userService.updateUser(updatedUser)
          .then(user => {
            localStorage.setItem('userAccount', JSON.stringify(updatedUser));
          })
      }
      setGameOver(true)
    }
  }

  const handleLowerClick = () => {
    if (freqTwo <= freqOne) {
      roundPassedSound.play()
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
            setFreqTwo(freq)
          })
      })
    } else {
      failedSound.play()
      const updatedUser = JSON.parse(JSON.stringify(userAccount))
      updatedUser.skillCoins += (score ** 2.4) / 100
      if (score > userAccount.wordfreqNScore) {
        updatedUser.wordfreqNScore = score
      }
      if (updatedUser.username !== 'Guest') {
        userService.updateUser(updatedUser)
          .then(user => {
            localStorage.setItem('userAccount', JSON.stringify(updatedUser));
          })
      }
      setGameOver(true)
    }
  }

  if (gameOver) {
    return (
      <div>
        <h1 className='coin-display'>+ {Number((((score) ** 2.5) / 100).toFixed(3))} Skill Coins</h1>
        <h1 className='score-display-wordfreq'>Score: {score}</h1>
        <button className="home-button" onClick={handleTryAgain}>Try Again</button>
        <Instruction content={Inst}/>
        <div className="highscore">{userAccount.username === 'Guest' ? 'Login to Save Score' : `Highscore:  ${userAccount.wordfreqNScore}`}</div>
        <div className="word-box-left">{wordOne}</div>
        <div className="has-left-text">has</div>
        <div className="freq-one">{freqOne}</div>
        <div className="freq-left-text">occurances per 1 million words</div> 

        <div className="word-box-right">{wordTwo}</div>
        <div className="has-right-text">has</div>
        <div className="freq-two">{freqTwo}</div>
        <div className="freq-rightlose-text">occurances per 1 million words</div>
      </div>
    )
  } else {
    return (
      <div>
        <button className="home-button" onClick={handleGoBack}>Home</button>
        <h1 className="title">Score: {score}</h1>
        <Instruction content={Inst}/>
        <div className="highscore">{userAccount.username === 'Guest' ? 'Login to Save Score' : `Highscore:  ${userAccount.wordfreqNScore}`}</div>
        <div className="word-box-left">{wordOne}</div>
        <div className="has-left-text">has</div>
        <div className="freq-one">{freqOne}</div>
        <div className="freq-left-text">occurances per 1 million words</div> 
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
}

export default WordFreqNorm