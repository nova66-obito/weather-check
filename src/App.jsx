import { useState } from 'react'
import './App.css'
import Weather from './weathercard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='overall'>
        <Weather/>
     </div>
    </>
  )
}

export default App
