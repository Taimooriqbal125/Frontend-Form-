import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Router from "../Router/Router"
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router/>
    </>
  )
}

export default App
