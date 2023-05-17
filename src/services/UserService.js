import axios from 'axios'

const getUsers = () => {
  const request = axios.get('http://localhost:3001/logins')
  return request.then(respone => respone.data)
}

const addUser = (newUser) => {
  const request = axios.post('http://localhost:3001/logins', newUser)
  return request.then(response => response.data)
}

const userService = {getUsers, addUser}

export default userService