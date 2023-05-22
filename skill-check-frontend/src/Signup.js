import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userService from './services/UserService'
import Message from './services/Message';

const SignUp = () => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')
  const [displayPassword, setDisplayPassword] = useState('')
  const [displayMessage, setDisplayMessage] = useState('Please Sign Up')

  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/Login')
  }

  const addLogin = (e) => {
    e.preventDefault()
    userService.getUsers()
      .then(users => {
        console.log(username)
        console.log(users)
        console.log(users.filter(u => u.username === username).length)
        if (users.filter(u => u.username === username).length === 1) {
          setDisplayMessage("This Username Already Exists")
        } else {
          const newUser = {
            username: username,
            password: password
          }
          userService.addUser(newUser)
            .then(addedUser => {
              setUser('')
              setPass('')
              setDisplayPassword('')
              localStorage.setItem('userAccount', JSON.stringify(newUser));
              navigate('/')
            })
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
    <div className='title-text'>
      <Message message={displayMessage}/>
      <button className="home-button" onClick={handleGoBack}>Home</button>
      <button className="signup-button" onClick={handleLogin}>Log In Instead</button>
      <form onSubmit={addLogin}>
        <div>
          <div className="label-text">Enter Username: <input className="input-field" value={username} onChange={usernameUpdate}/></div>
          <div className="label-text">Enter Password: <input className="input-field" value={displayPassword} onChange={passwordUpdate}/></div>
        </div>
        <div>
          <button className="submit-login" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp