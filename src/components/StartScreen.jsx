import React from 'react'
import "./StartScreen.css"

export default function StartScreen({StartGame}) {
  return (
   <div className='start'>
    <h1>Secret Word</h1>
    <p>Clique no botão abaixo para Iniciar</p>
    <button onClick={StartGame}>Começar o jogo</button>
   </div>
  );
}
