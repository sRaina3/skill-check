require('dotenv').config()

const fs = require('fs');
const readline = require('readline');
const Word = require('./models/word');

const filename = './words.txt'; // Replace with the actual path to your text file

const readStream = fs.createReadStream(filename);
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

let arr = []
let count = 30001

rl.on('line', (line) => {
  const nextWord = line.trim(); // Remove leading/trailing whitespace
  const newEntry = new Word({ 
    word: nextWord,
    index: count
  });
  count++
  newEntry.save()
  .catch((error) => {
    console.error(`Error saving word "${nextWord}":`, error);
  });
});

rl.on('close', () => {
  console.log('Dictionary import completed.');
});