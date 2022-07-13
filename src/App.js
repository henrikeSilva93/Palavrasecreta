
import { startTransition, useEffect, useState } from 'react';
import './App.css';
import EndScreen from './components/EndScreen';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';

import {wordsList} from './data/wordlist'

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [PickedWord, setPickedWord] = useState("")
  const [PickedCategory, setPickedCategory] = useState("")
  const [Letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  useEffect(()=>{
    if(guesses <= 0){
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  },[guesses])

  //checar se o jogador venceu 
  useEffect(()=>{
    const uniqueLetters = [...new Set(Letters)]

    if(guessedLetters.length === uniqueLetters.length) {
        setScore((actualScore)=> actualScore += 100)
       
        StartGame()
        setGuesses(3)
    }

  },[guessedLetters])
 function pickWordAndCategory(){
  const categories = Object.keys(words)

   const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

   // pick random word

   const word = words[category][Math.floor(Math.random() * words[category].length)] 

   return [word, category]
 }

  function StartGame(){

   const [word, category] = pickWordAndCategory()
   const ArrayLetters = word.split('')
   const wordLetters = ArrayLetters.map(l => l.toLowerCase())
  clearLetterStates()
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setGameStage(stages[1].name)
  }

  function verifyLetter(letter){

    const normalizedLetter = letter.toLowerCase()

    if(guessedLetters.includes(normalizedLetter) ||  wrongLetters.includes(normalizedLetter)){
      return
    }
    if(Letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else {
          setWrongLetters((actualWrongLetter)=> [
            ...actualWrongLetter,
            normalizedLetter
          ])
          setGuesses((actualGuesses)=> actualGuesses - 1)
    }

    console.log(guessedLetters)
   
  }

  function clearLetterStates(){
    setWrongLetters([])
    setGuessedLetters([])
  }

  function retry() {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }

  return (
  <div className="app">
   {gameStage === "start" &&  <StartScreen StartGame={StartGame}/>}
   {gameStage === "game" && <GameScreen 
   verifyLetter={verifyLetter} 
   pickedWord={PickedWord} 
   PickedCategory={PickedCategory} 
   letters={Letters}
   guessesLetters={guessedLetters}
   wrongLetters={wrongLetters}
   guesses={guesses}
   score={score}
   />}
   {gameStage === "end" && <EndScreen retry={retry} score={score}/>}
  </div>
  );
}

export default App;
