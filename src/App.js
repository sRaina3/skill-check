import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const navigate = useNavigate();

  const handleGameButtonClick = () => {
    navigate('/Game');
  };

  return (
    <div className="title-screen">
      <h1 className="title">Choose a Game</h1>
      <button className="game-button" onClick={handleGameButtonClick}>Sequence Memory</button> 
    </div>
  )
}

export default App;
