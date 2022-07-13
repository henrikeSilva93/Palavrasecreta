import React from 'react'
import { useState, useRef } from 'react'
import './GameScreen.css'

function GameScreen({verifyLetter, pickedWord, letters, guessesLetters, wrongLetters, guesses, score, PickedCategory}) {
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef()
  

  function handleSubmit(e){
    e.preventDefault()
    verifyLetter(letter)
    setLetter("")
    letterInputRef.current.focus()
  }
  return (
  <div className="game">
    <p className="points">
      <span>Pontuação: {score}</span>
    </p>
    <h1>Adivinhe a Palavra</h1>
    <h3 className="tip">
      <span>Dica sobre a Palavra: {PickedCategory}</span>
    </h3>
    <p>Você ainda tem {guesses} tentativas</p>
    <div className="wordContainer">
     {
      letters.map((letter, index) =>(
        guessesLetters.includes(letter) ? (
          <span className="letter" key={index}>{letter}</span>
        ) 
        :
        (
          <span className="blankSquare" key={index}></span>
        )
      ))
     }
    </div>
    <div className="letterContainer">
      <p>tente adivinhar a Letra da Palavra</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="letter" maxLength={1} onChange={(e)=> setLetter(e.target.value)} value={letter} ref={letterInputRef} required/>
        <button>Jogar</button>
      </form>
    </div>
    <div className="wrongLettersContainer">
      <p>Letras Já utilizadas</p>
      [
     {wrongLetters.map((letter, index)=>(
      <span key={index}>{letter}, </span>
     ))}
      ]
    </div>
  </div>
  )
}

export default GameScreen