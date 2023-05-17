import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')

  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate('/');
  };

  const addLogin = (e) => {
    e.preventDefault()
  }

  const usernameUpdate = (e) => {
    setUser(e.target.value)
  }

  const passwordUpdate = (e) => {
    setPass(e.target.value)
  }

  return (
    <div className='title-text'>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <form onSubmit={addLogin}>
        <div>
          <div>Enter Username: <input value={username} onChange={usernameUpdate}/></div>
          <div>Enter Password: <input value={password} onChange={passwordUpdate}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp