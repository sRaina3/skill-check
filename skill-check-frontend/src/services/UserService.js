import axios from 'axios'
//const baseURL = 'https://skillcheck-backend.onrender.com/'
const baseURL = 'http://localhost:3001/'

const getUsers = () => {
  const request = axios.get(baseURL + 'api/users')
  return request.then(response => response.data)
}

const addUser = (newUser) => {
  const request = axios.post(baseURL + 'api/users', newUser)
  return request.then(response => response.data)
}

const updateUser = (updatedUser) => {
  const request = axios.put(baseURL + `api/users/${updatedUser.id}`, updatedUser)
  return request.then(response => response.data)
}

const userService = {getUsers, addUser, updateUser}

export default userService