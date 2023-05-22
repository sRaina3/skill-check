import axios from 'axios'
const baseURL = ''

const getUsers = () => {
  const request = axios.get(baseURL + 'https://sraina3.github.io/Logins/db.json')
  return request.then(response => response.data)
}

const addUser = (newUser) => {
  const request = axios.post(baseURL + 'https://sraina3.github.io/Logins/db.json', newUser)
  return request.then(response => response.data)
}

const userService = {getUsers, addUser}

export default userService