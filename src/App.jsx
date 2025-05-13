import React, { useState, useEffect } from 'react'
import basketJSON from '../utils/export.json'
import axios from "axios";
import './App.css'

function App() {
  const [pitch, setPitch] = useState([])

  // equivale a un componentDidUpdate()
  useEffect(() => {
        setPitch(basketJSON.features);
  }, []); // componentDidUpdate

  //console.log(pitch?.features)
  
  
  return (
    <>
      
    </>
  )
}

export default App
