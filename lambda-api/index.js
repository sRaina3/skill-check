const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const {User, Word} = require('./models')

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
  User.find({username: request.body.username}).then(users => {
    if (users.length === 0) {
      const newUser = new User({
        ...request.body,
      });
      newUser.save().then(p => {
        response.json(p)
      })
    } else {
      response.status(400).send({ error: 'Double added login' })
    }
  })
})

app.put('/api/users/:id', (request, response, next) => {
  const newUser = ({
    ...request.body,
  });

  User.findByIdAndUpdate(request.params.id, newUser)
    .then(oldUser => {
      response.json(oldUser)
    })
    .catch(error => next(error))
})


/* Words Collection */


app.get('/api/words/random', (request, response) => {
  const randomIndex = Math.ceil(Math.random() * 60000);
  Word.find({index: randomIndex}).then(entry => {
    response.json(entry);
  });
});

app.get('/api/words', (request, response) => {
  Word.find({}).then(words => { 
    response.json(words)
  })
});

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

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

module.exports.handler = async function (event, context) {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message)
    throw error
  }
  return serverless(app)(event, context)
}