import React from 'react'
import "./EndScreen.css"

function EndScreen({retry,score}) {
  return (
    <div>
    <h1>Jogo finalizado</h1>
    <h3>Sua Pontuação: {score}</h3>
      <button onClick={retry}>reiniciar Jogo</button>
    </div>
   
  )
}

export default EndScreen