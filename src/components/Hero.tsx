import {motion} from 'framer-motion'

import AlienCanvas from './canvas/AlienCanvas'
import FontCanvas from './canvas/FontCanvas'
import {Link } from 'react-router-dom'


interface HeroProps {
  onClick: () => void
}

const Hero: React.FC<HeroProps> = ({onClick}) => {


  return (
    <section className='relativ w-full  mx-auto'>
      <div>
 
      <div className="px-4  mx-auto max-w-screen-xl text-center py-24 lg:py-56">
     
  
      <AlienCanvas /> 

      <div className=' w-full h-96  items-center'>
      <FontCanvas/>

      </div>
        
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Gestrandet auf Planet Erde, versucht eine Truppe von Aliens ihren Weg zurück nach Hause zu finden. Doch die wissbegierige Menschheit will dies nicht zulassen und stellt ihnen Steine in den Weg.</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          
            <Link to={`/visualizer`}>
              <motion.button 
              whileHover={{scale: 1.1}}
              whileTap={{scale:  0.9}}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Visualisieren
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </motion.button>
            </Link>
            <Link to={`/`}>
              <motion.button
              whileHover={{scale: 1.1}}
              whileTap={{scale:  0.9}}
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400" onClick={onClick}>
                
                Anleitung
                </motion.button> 
            
            </Link>  
        </div>
    </div>
      </div>        
    </section>
   
  )
}

export default Hero