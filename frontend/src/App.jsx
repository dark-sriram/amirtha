import { useState } from 'react'
import Feedback from './pages/Feedback'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (<>
    <Navbar/>
    {/* <Feedback/> */}
    </>
  )
}

export default App
