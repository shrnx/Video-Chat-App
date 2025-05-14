import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Lobby from './pages/Lobby'

function App() {

  return (
    <>
      <div className='App'>
          <Routes>
            <Route path="/" element={<Lobby />}/>
          </Routes>
      </div>
    </>
  )
}

export default App
