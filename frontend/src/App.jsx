import { useState } from 'react'
// 1. Correct the import: Remove the './' from the end and don't import it like CSS
import UserDashboard from './pages/UserDashboard' 
import './App.css'

function App() {

  return (
    <div className="App">
      <UserDashboard />
    </div>
  )
}

export default App