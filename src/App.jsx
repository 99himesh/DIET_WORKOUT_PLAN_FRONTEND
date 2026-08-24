import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Route, Routes } from 'react-router-dom'
import GenerateDietWorkOutPlanFormPage from './pages/GenerateDietWorkOutPlanFormPage'
import DietWorkOutPlanPage from './pages/DietWorkOutPlanPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' bg-[#fff] !text-white"'>
    

    <Routes>
       <Route path="/" element={<GenerateDietWorkOutPlanFormPage/>} />
       <Route path="/diet-workout" element={<DietWorkOutPlanPage/>} />
    </Routes>
    </div>
  )
}

export default App
