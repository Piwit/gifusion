import { getRndInteger } from './util.js';

const HAPPY_WORDS = [
  'fusion',
  'cat',
  'dog',
  'dragon ball',
  'power rangers',
  'big robot',
  'punch',
  'baby dancing',
  'panzer',
  'disney',
  'elsa',
  'explosion',
  'star wars',
  'swag',
  'gif',
  'pokemon',
  'bling bling',
  'money',
  'plz',
  'happy',
  'jul',
  'ninja',
  'fun',
  'potato',
  'frozen'
]

export const chooseHappyWord = () => {
  return HAPPY_WORDS[getRndInteger(0, HAPPY_WORDS.length)];
}
