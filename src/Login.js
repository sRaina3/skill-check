import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')
  const [displayPassword, setDisplayPassword] = useState('')

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const attemptLogin = (e) => {
    e.preventDefault()
  }

  const usernameUpdate = (e) => {
    setUser(e.target.value)
  }

  const passwordUpdate = (e) => {
    setPass(e.target.value)
    setDisplayPassword(displayPassword + "*")
  }

  return (
    <div className='title-text'>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <form onSubmit={attemptLogin}>
        <div>
          <div>Enter Username: <input value={username} onChange={usernameUpdate}/></div>
          <div>Enter Password: <input value={displayPassword} onChange={passwordUpdate}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Login