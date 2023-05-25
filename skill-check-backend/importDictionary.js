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

rl.on('line', (line) => {
  const word = line.trim(); // Remove leading/trailing whitespace
  const newEntry = new Word({ word });

  newEntry.save()
    .catch((error) => {
      console.error(`Error saving word "${word}":`, error);
    });
});

rl.on('close', () => {
  console.log('Dictionary import completed.');
});