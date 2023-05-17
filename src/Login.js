import { useState } from 'react'

const Login = () => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')

  const addLogin = () => {

  }

  const usernameUpdate = (e) => {
    setUser(e.target.value)
  }

  const passwordUpdate = (e) => {
    setPass(e.target.value)
  }

  return (
    <div className='title-text'>
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

export default Login