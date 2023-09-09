import { SectionWrapper } from "../../HOC/"
import {motion} from 'framer-motion'
import GridCanvas from './GridCanvas'
import { Link } from "react-router-dom"
import { useState } from "react"
import Modal from '../modals/Tutorial'

const Grid = () => {
const [tutorialOpen, setTutorialOpen] = useState(false)
const openTutorial = () => {
  setTutorialOpen
}
  return (
    <motion.div 
    initial={{width: 0}}
animate={{width: "100%"}}
exit={{x: window.innerWidth, transition: {duration: 0.4}}}>
      <div className=" h-full">
      {tutorialOpen ?  <Modal isOpen onClose={() => setTutorialOpen(false)}/> : null}

      
      <GridCanvas/>

      <div className="flex flex-col space-y-4 sm:flex-row justify-center sm:space-y-0 sm:space-x-4 mt-16 h-full">
            <Link to={`/`} >
            <motion.button 
              whileHover={{scale: 1.1}}
              whileTap={{scale:  0.9}}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900  w-full">
                Home
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </motion.button>
                
              
            </Link>
            <Link to={`/visualizer`}  >
            <motion.button
              whileHover={{scale: 1.1}}
              whileTap={{scale:  0.9}}
              className="inline-flex justify-center  hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 w-full" onClick={() => setTutorialOpen(true)}>
                
                Anleitung
                </motion.button> 
                
            </Link>  </div>
            </div>
    </motion.div>
  )
}

export default SectionWrapper(Grid, 'grid')