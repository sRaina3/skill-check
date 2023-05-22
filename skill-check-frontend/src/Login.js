import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userService from './services/UserService';
import Message from './services/Message';

const Login = ({userAccSetter}) => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')
  const [displayPassword, setDisplayPassword] = useState('')
  const [displayMessage, setDisplayMessage] = useState('Please Log In')
  const [loginAttempt, setLoginAttempt] = useState(false)

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/Signup')
  }

  const handleLogin = () => {
    setLoginAttempt(true)
  }

  const attemptLogin = (e) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
    userService.getUsers()
      .then(users => {
        console.log(users)
        if (users.filter(u => u.username === username && u.password === password).length === 1) {
          const newUser = {
            username: username,
            passwrd: password
          }
          userAccSetter(newUser)
          setLoginAttempt(false)
        } else {
          setDisplayMessage('Wrong log in info dumbass, or maybe you forgor to signup?')
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

  if (loginAttempt) {
    return (
      <div>
        <Message message={displayMessage}/>
        <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
        <form onSubmit={attemptLogin}>
          <div className="title-text">
            <div>Enter Username: <input value={username} onChange={usernameUpdate}/></div>
            <div>Enter Password: <input value={displayPassword} onChange={passwordUpdate}/></div>
          </div>
          <div className="title-text">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <button className="login-button" onClick={handleLogin}>Log In</button>
    )
  }
}

export default Login