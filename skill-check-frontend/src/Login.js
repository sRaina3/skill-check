import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userService from './services/UserService';
import Message from './services/Message';
import './Login.css'

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
        const foundUser = users.find(u => u.username === username && u.password === password)
        if (foundUser) {
          // Save the user account in local storage
          localStorage.setItem('userAccount', JSON.stringify(foundUser));
          navigate('/')
        } else {
          setDisplayMessage('Incorrect Log in Information, Have you signed up?')
        }
        setUser('')
        setPass('')
        setDisplayPassword('')
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
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <button className="signup-button" onClick={handleSignUp}>Sign Up Instead</button>
      <form onSubmit={attemptLogin}>
        <div>
          <div className="label-text">Enter Username: <input className="input-field" value={username} onChange={usernameUpdate}/></div>
          <div className="label-text">Enter Password: <input className="input-field" value={displayPassword} onChange={passwordUpdate}/></div>
        </div>
        <div className="title-text">
          <button className="submit-login" type="submit">Log In</button>
        </div>
      </form>
    </div>
  )
}

export default Login