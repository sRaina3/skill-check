import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SequenceMemory.css';

const SequenceMemory = () => {
  const [roundCount, setRound] = useState(0)
  const [correctSquares, setCorrect] = useState([])
  const [userSquares, setUser] = useState([])
  const [clickedSquareCol, setClicked] = useState('white')
  const [clickedSquare, setClickedSq] = useState(0)
  const [roundChange, setRoundChange] = useState(true)

  const navigate = useNavigate();

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

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

  delay(300).then(() => {
    if (roundChange) {
      setRoundChange(false)
      const curBut = Math.ceil(Math.random() * 25)
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
        return (
          <div>
            <h1 className='title'>You Lost</h1>
            <button className="home-button" onClick={handleTryAgain}>Try Again</button>
          </div>
        )
      }
    } else if (correctSquares[userSquares.length-1] !== userSquares[userSquares.length-1]) {
      return (
        <div>
          <h1 className='title'>You Lost</h1>
          <button className="home-button" onClick={handleTryAgain}>Try Again</button>
        </div>
      )
    }
  })
  return (
    <div>
      <h1 className="title">Sequence Memory</h1>
      <h1 className="title">Round Count: {roundCount}</h1>
      <div className='seq-button-container'>
        <button className="home-button" onClick={handleGoBack}>Home</button>
        <button className="seq-button" style={clickedSquare === 1 ? {backgroundColor: clickedSquareCol} : {}} id={1} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 2 ? {backgroundColor: clickedSquareCol} : {}} id={2} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 3 ? {backgroundColor: clickedSquareCol} : {}} id={3} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 4 ? {backgroundColor: clickedSquareCol} : {}} id={4} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 5 ? {backgroundColor: clickedSquareCol} : {}} id={5} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 6 ? {backgroundColor: clickedSquareCol} : {}} id={6} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 7 ? {backgroundColor: clickedSquareCol} : {}} id={7} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 8 ? {backgroundColor: clickedSquareCol} : {}} id={8} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 9 ? {backgroundColor: clickedSquareCol} : {}} id={9} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 10 ? {backgroundColor: clickedSquareCol} : {}} id={10} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 11 ? {backgroundColor: clickedSquareCol} : {}} id={11} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 12 ? {backgroundColor: clickedSquareCol} : {}} id={12} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 13 ? {backgroundColor: clickedSquareCol} : {}} id={13} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 14 ? {backgroundColor: clickedSquareCol} : {}} id={14} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 15 ? {backgroundColor: clickedSquareCol} : {}} id={15} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 16 ? {backgroundColor: clickedSquareCol} : {}} id={16} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 17 ? {backgroundColor: clickedSquareCol} : {}} id={17} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 18 ? {backgroundColor: clickedSquareCol} : {}} id={18} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 19 ? {backgroundColor: clickedSquareCol} : {}} id={19} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 20 ? {backgroundColor: clickedSquareCol} : {}} id={20} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 21 ? {backgroundColor: clickedSquareCol} : {}} id={21} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 22 ? {backgroundColor: clickedSquareCol} : {}} id={22} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 23 ? {backgroundColor: clickedSquareCol} : {}} id={23} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 24 ? {backgroundColor: clickedSquareCol} : {}} id={24} onClick={handleClick}></button>
        <button className="seq-button" style={clickedSquare === 25 ? {backgroundColor: clickedSquareCol} : {}} id={25} onClick={handleClick}></button>
      </div>
    </div>
  );
};

export default SequenceMemory;