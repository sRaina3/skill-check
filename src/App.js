import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const navigate = useNavigate();

  const handleGameButtonClick = () => {
    navigate('/SequenceMemory');
  };

  const handleNormalMode = () => {

  }

  const handleChallengeMode = () => {

  }

  return (
    <div className="title-screen">
      <h1 className="title-text">Choose a Game</h1>
      <button className="game-button" onClick={handleGameButtonClick}>Sequence Memory</button>
      <div>
        <h1 className="title-text">Select Mode</h1>
        <button className="mode-button normal" onClick={handleNormalMode}>Normal</button>
        <button className="mode-button challenge" onClick={handleChallengeMode}>Challenge</button>
      </div>
    </div>
  )
}

export default App;
