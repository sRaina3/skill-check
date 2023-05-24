import Popup from 'reactjs-popup';
import './Instruction.css'

const Instruction = ({content}) => {
  return (
    <Popup trigger={<button className="instruction-button"> How To Play </button>} modal nested >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <img src={content} alt="Instructions" style={{ width: '1000px', height: 'auto' }} />
        </div>
      )}
    </Popup>
  )
}

export default Instruction