import {  Navbar} from './components'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes.tsx'


function App() {
  
  return (
    <Router>
      <Navbar/>
      <AnimatedRoutes/>
    </Router>
  )
}

export default App

