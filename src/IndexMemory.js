import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IndexMemory.css';

const IndexMemory = () => {
  const [roundCount, setRound] = useState(0)
  const [correctSquares, setCorrect] = useState([])
  const [userSquares, setUser] = useState([])
  const navigate = useNavigate();

  if (correctSquares.length == 0) {

  } else if (correctSquares.length == userSquares.length) {

  }
  const handleGoBack = () => {
    navigate('/');
  };

  const handleClick = (e) => {
    setUser(userSquares.concat(e.target.id))
  }
  return (
    <div>
      <h1 className="title">Sequence Memory</h1>
      <div className='index-button-container'>
        <button className="home-button" onClick={handleGoBack}>Home</button>
        <button className='index-button' onClick={handleClick} id={1}></button>
        <button className='index-button' onClick={handleClick} id={2}></button>
        <button className='index-button' onClick={handleClick} id={3}></button>
        <button className='index-button' onClick={handleClick} id={4}></button>
        <button className='index-button' onClick={handleClick} id={5}></button>
        <button className='index-button' onClick={handleClick} id={6}></button>
        <button className='index-button' onClick={handleClick} id={7}></button>
        <button className='index-button' onClick={handleClick} id={8}></button>
        <button className='index-button' onClick={handleClick} id={9}></button>
        <button className='index-button' onClick={handleClick} id={10}></button>
        <button className='index-button' onClick={handleClick} id={11}></button>
        <button className='index-button' onClick={handleClick} id={12}></button>
        <button className='index-button' onClick={handleClick} id={13}></button>
        <button className='index-button' onClick={handleClick} id={14}></button>
        <button className='index-button' onClick={handleClick} id={15}></button>
        <button className='index-button' onClick={handleClick} id={16}></button>
        <button className='index-button' onClick={handleClick} id={17}></button>
        <button className='index-button' onClick={handleClick} id={18}></button>
        <button className='index-button' onClick={handleClick} id={19}></button>
        <button className='index-button' onClick={handleClick} id={20}></button>
        <button className='index-button' onClick={handleClick} id={21}></button>
        <button className='index-button' onClick={handleClick} id={22}></button>
        <button className='index-button' onClick={handleClick} id={23}></button>
        <button className='index-button' onClick={handleClick} id={24}></button>
        <button className='index-button' onClick={handleClick} id={25}></button>
      </div>
    </div>
  );
};

export default IndexMemory;