import axios from 'axios'
const baseURL = process.env.REACT_APP_Backend_URI

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

const getRandomWord = () => {
  const request = axios.get(baseURL + 'api/words/random')
  return request.then(response => response.data)
}

const userService = {getUsers, addUser, updateUser, getRandomWord}

export default userService