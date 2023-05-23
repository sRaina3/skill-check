import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import userService from '../services/UserService';
import Instruction from '../services/Instruction';
import './SequenceMemory.css';

const SequenceMemoryNorm = () => {
  const [roundCount, setRound] = useState(0)
  const [correctSquares, setCorrect] = useState([])
  const [userSquares, setUser] = useState([])
  const [clickedSquareCol, setClicked] = useState('white')
  const [clickedSquare, setClickedSq] = useState(0)
  const [roundChange, setRoundChange] = useState(true)
  const [userAccount, setUserAccount] = useState({username: 'Guest'})

  useEffect(() => {
    // Retrieve the user account from local storage if logged in
    const storedUserAccount = localStorage.getItem('userAccount');
    if (storedUserAccount) {
      setUserAccount(JSON.parse(storedUserAccount));
    }
  }, [roundCount]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };


  const handleTryAgain = () => {
    setCorrect([])
    setUser([])
    setRound(0)
    setRoundChange(true)
  }

  const handleClick = (e) => {
    setUser(userSquares.concat(parseInt(e.target.id)))
    setClicked('green');
    setClickedSq(parseInt(e.target.id))
    setTimeout(() => setClicked('white'), 300);
  }

  if (clickedSquareCol === 'white' && roundChange) {
    setRoundChange(false)
    let curBut = Math.ceil(Math.random() * 9)
    while (curBut === correctSquares[correctSquares.length-1]) {
      curBut = Math.ceil(Math.random() * 9)
    }
    setCorrect(correctSquares.concat(curBut))
    setClicked('green');
    setClickedSq(curBut)
    setTimeout(() => setClicked('white'), 300);
    setRound(roundCount + 1)
  } else if (correctSquares.length === userSquares.length) {
    if (correctSquares[userSquares.length-1] === userSquares[userSquares.length-1]) {
      setUser([])
      setRoundChange(true)
    } else {
      if (roundCount - 1 > userAccount.seqNScore) {
        const updatedUser = JSON.parse(JSON.stringify(userAccount))
        console.log(updatedUser)
        updatedUser.seqNScore = roundCount - 1
        userService.updateUser(updatedUser)
          .then(user => {
            localStorage.setItem('userAccount', JSON.stringify(updatedUser));
          })
      }
      return (
        <div>
          <h1 className='title'>You Lost</h1>
          <button className="home-button" onClick={handleTryAgain}>Try Again</button>
        </div>
      )
    }
  } else if (correctSquares[userSquares.length-1] !== userSquares[userSquares.length-1]) {
    if (roundCount - 1 > userAccount.seqNScore) {
      const updatedUser = JSON.parse(JSON.stringify(userAccount))
      updatedUser.seqNScore = roundCount - 1
      console.log(updatedUser)
      userService.updateUser(updatedUser)
        .then(user => {
          localStorage.setItem('userAccount', JSON.stringify(updatedUser));
        })
        .catch(error => console.log(error))
    }
    return (
      <div>
        <h1 className='title'>You Lost</h1>
        <button className="home-button" onClick={handleTryAgain}>Try Again</button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="title">Sequence Memory</h1>
      <h1 className="title">Score: {roundCount - 1}</h1>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <Instruction />
      <div className="highscore">{userAccount.username === 'Guest' ? 'Login to Save Score' : `Highscore:  ${userAccount.seqNScore}`}</div>
      <div className='seq-button-norm-container'>
        {[1,2,3,4,5,6,7,8,9].map(e => <button className="seq-norm-button" 
          style={clickedSquare === e ? {backgroundColor: clickedSquareCol} : {}} 
          id={e} key={e} onClick={handleClick}></button>
        )}
      </div>
    </div>
  );
};

export default SequenceMemoryNorm;