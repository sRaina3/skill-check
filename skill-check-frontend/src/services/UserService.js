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

const updateUser = (updatedUser, id) => {
  const request = axios.post(baseURL + `api/users/${id}`, updatedUser)
  return request.then(response => response.data)
}

const userService = {getUsers, addUser, updateUser}

export default userService