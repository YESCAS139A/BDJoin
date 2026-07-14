import { Outlet } from 'react-router-dom'
import './App.css'
import TopBar from './components/TopBar'

function App() {

  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopBar /> 
        <Outlet /> 
    </div>
  )
}

export default App
