const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  seqNScore: Number,
  seqCScore: Number,
  scramNScore: Number,
  scramCScore: Number,
  skillCoins: Number,
  wordfreqNScore: Number
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

const wordSchema = new mongoose.Schema({
  word: String,
  index: Number
})

wordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Word = mongoose.model('Word', wordSchema)

module.exports = {User, Word}