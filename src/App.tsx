import { Suspense } from 'react'
import {  Navbar} from './components'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes.tsx'


function App() {
  
  return (
    <Suspense>
    <Router>
      <Navbar/>
      <AnimatedRoutes/>
    </Router>
    </Suspense>
  )
}

export default App

