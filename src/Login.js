import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userService from './services/UserService';
import Message from './services/Message';

const Login = () => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')
  const [displayPassword, setDisplayPassword] = useState('')
  const [displayMessage, setDisplayMessage] = useState('Please Log In')

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/Signup')
  }

  const attemptLogin = (e) => {
    e.preventDefault()
    userService.getUsers()
      .then(users => {
        setUser('')
        setPass('')
        setDisplayPassword('')
        if (users.filter(u => u.name === username && u.key === password).length === 1) {
          navigate('/')
        } else {
          setDisplayMessage('Wrong log in info dumbass, or maybe you forgor to signup?')
        }
      })
  }

  const usernameUpdate = (e) => {
    setUser(e.target.value)
  }

  const passwordUpdate = (e) => {
    if (e.target.value.length > password.length) {
      setPass(password + e.target.value.charAt(e.target.value.length - 1))
    } else {
      setPass(password.substring(0, password.length - 1))
    }

    let displayed = ''
    for (let i = 0; i < e.target.value.length; i++) {
      displayed += '*'
    }
    setDisplayPassword(displayed)
  }

  return (
    <div>
      <Message message={displayMessage}/>
      <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <form onSubmit={attemptLogin}>
        <div className="title-text">
          <div>Enter Username: <input value={username} onChange={usernameUpdate}/></div>
          <div>Enter Password: <input value={displayPassword} onChange={passwordUpdate}/></div>
        </div>
        <div className="title-text">
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Login