import { LandingPage } from '.'
import Grid from './grid/Grid'
import { Routes, Route, useLocation } from 'react-router-dom'

import {AnimatePresence, } from 'framer-motion'


const AnimatedRoutes = () => {
    const location = useLocation()

  return (
    <div className='w-full h-[100%]bg-center bg-spacy-pattern bg-cover bg-no-repeat '>

    <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
    <Route path="/" element={<LandingPage/>} />
    <Route path="/visualizer" element={<Grid/>}/>
    <Route path="/about" element={<div>about</div>}/>
    </Routes>
    </AnimatePresence>
    </div>

  )
}

export default AnimatedRoutes