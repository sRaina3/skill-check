import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IndexMemory.css';

const IndexMemory = () => {
  const [correctSquares, setCorrect] = useState([])
  const [userSquares, setUser] = useState([])
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleClick = () => {
    setUser(userSquares.concat(1))
  }

  console.log("here")
  return (
    <div>
      <h1 className="title">Sequence Memory</h1>
      <div className='index-button-container'>
        <button className="home-button" onClick={handleGoBack}>Home</button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
        <button className='index-button' onClick={handleClick}></button>
      </div>
    </div>
  );
};

export default IndexMemory;