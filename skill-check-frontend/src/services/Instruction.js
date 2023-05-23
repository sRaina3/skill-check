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
          <div className="header"> Instructions </div>
          <div className="content">
            {content}
          </div>
        </div>
      )}
    </Popup>
  )
}

export default Instruction