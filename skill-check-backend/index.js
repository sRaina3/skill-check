require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const User = require('./models/user')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))

morgan.token('body', function(req, res) {
  if (req.method === 'POST') {
  return JSON.stringify(req.body);
  }
});

app.get('/', (request, response) => {
  response.send('<h1>Server is Functioning!</h1>')
})

app.get('/api/users', (request, response) => {
  User.find({}).then(users => { 
    response.json(users)
  })
})

app.get('/api/users/:id', (request, response, next) => {
  User.findById(request.params.id)
    .then(u => {
      if (u) {
        response.json(u)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/users', (request, response) => {
  if (!User.find({username: request.body.username})) {
    const newUser = new User ({
      username: request.body.username,
      password: request.body.password,
      seqNScore: request.body.seqNScore,
      seqCScore: request.body.seqCScore,
      scramNScore: request.body.scramNScore,
      scramCScore: request.body.scramCScore
    })
    newUser.save().then(p => {
      response.json(p)
    })
  }
})

app.put('/api/users/:id', (request, response, next) => {
  const newUser = ({
    username: request.body.username,
    password: request.body.password,
    seqNScore: request.body.seqNScore,
    seqCScore: request.body.seqCScore,
    scramNScore: request.body.scramNScore,
    scramCScore: request.body.scramCScore
  })

  User.findByIdAndUpdate(request.params.id, newUser)
    .then(oldUser => {
      response.json(oldUser)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})