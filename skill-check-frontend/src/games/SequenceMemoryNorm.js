import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import userService from '../services/UserService';
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
  }, []);

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
    const curBut = Math.ceil(Math.random() * 9)
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
        //TODO: Update Score
        const updatedUser = JSON.parse(JSON.stringify(userAccount))
        updatedUser.seqNScore = roundCount - 1
        userService.updateUser(updatedUser)
          .then(user => {
            console.log("update successful, new highscore: " + user.seqNScore)
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
      //TODO: Update Score
      const updatedUser = JSON.parse(JSON.stringify(userAccount))
      updatedUser.seqNScore = roundCount - 1
      userService.updateUser(updatedUser)
        .then(user => {
          console.log("update successful, new highscore: " + user.seqNScore)
        })
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
      <div className="highscore">Highscore: {userAccount.seqNScore}</div>
      <div className='seq-button-norm-container'>
        <button className="seq-norm-button" style={clickedSquare === 1 ? {backgroundColor: clickedSquareCol} : {}} id={1} onClick={handleClick}></button>
        <button className="seq-norm-button" style={clickedSquare === 2 ? {backgroundColor: clickedSquareCol} : {}} id={2} onClick={handleClick}></button>
        <button className="seq-norm-button" style={clickedSquare === 3 ? {backgroundColor: clickedSquareCol} : {}} id={3} onClick={handleClick}></button>
        <button className="seq-norm-button" style={clickedSquare === 4 ? {backgroundColor: clickedSquareCol} : {}} id={4} onClick={handleClick}></button>
        <button className="seq-norm-button" style={clickedSquare === 5 ? {backgroundColor: clickedSquareCol} : {}} id={5} onClick={handleClick}></button>
        <button className="seq-norm-button" style={clickedSquare === 6 ? {backgroundColor: clickedSquareCol} : {}} id={6} onClick={handleClick}></button>
        <button className="seq-norm-button" style={clickedSquare === 7 ? {backgroundColor: clickedSquareCol} : {}} id={7} onClick={handleClick}></button>
        <button className="seq-norm-button" style={clickedSquare === 8 ? {backgroundColor: clickedSquareCol} : {}} id={8} onClick={handleClick}></button>
        <button className="seq-norm-button" style={clickedSquare === 9 ? {backgroundColor: clickedSquareCol} : {}} id={9} onClick={handleClick}></button>
      </div>
    </div>
  );
};

export default SequenceMemoryNorm;