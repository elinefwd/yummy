import React, { useState } from 'react'
import yummynowlogo from './assets/yummynowlogo.png'
import './App.css'
import Navigation from "./assets/navigation/navigation.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Navigation />
      <div>
        <a>
          <img src={yummynowlogo} className="logo" alt="Vite logo" />
        </a>
       <a>
          <img src={yummynowlogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Yummy Now</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          login {count}
        </button>
          <p></p>
          <button onClick={() => setCount((count) => count + 1)}>
              register {count}
          </button>
      </div>
    </>
  )
}

export default App
