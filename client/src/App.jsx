import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css';
import './style.css';

// import Header from './Components/Header.jsx';
import Calendar from './Components/Calendar.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Header></Header> */}
      <Calendar></Calendar>
    </>
  )
}

export default App
