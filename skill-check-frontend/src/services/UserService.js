import axios from 'axios'
const baseURL = 'https://skillcheck-backend.onrender.com/'

const getUsers = () => {
  const request = axios.get(baseURL + 'api/users')
  return request.then(response => response.data)
}

const addUser = (newUser) => {
  const request = axios.post(baseURL + 'api/users', newUser)
  return request.then(response => response.data)
}

const userService = {getUsers, addUser}

export default userService