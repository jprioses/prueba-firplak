import { useState } from 'react'
import { Home } from './components/Home'
import {TrackNumber} from './components/TrackNumber'
import './styles/App.css'

function App() {
  const [dashboard, setDashboard] = useState(false)
  const [trackNumber, setTrackNumber] = useState(false)
  
  return (
    <>
    {!dashboard ? <Home setDashboard={setDashboard} setTrackNumber={setTrackNumber}/>: <TrackNumber trackNumber={trackNumber}/>}
    </>
  )
}

export default App
