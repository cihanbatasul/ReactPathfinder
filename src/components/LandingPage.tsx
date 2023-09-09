
import {Hero} from './'
import { useState } from 'react'
import {motion} from  'framer-motion'
import Modal from './modals/Tutorial'
function LandingPage() {
  const [tutorialOpen, setTutorialOpen] = useState(false)
  const openTutorial = () => {
    setTutorialOpen(true)
  }

  return (
<motion.div className='relative h-full z-0 bg-primary '
initial={{width: 0}}
animate={{width: "100%"}}
exit={{x: window.innerWidth, transition: {duration: 0.4}}}

>
    <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
{tutorialOpen ?  <Modal isOpen onClose={() => setTutorialOpen(false)}/> : null}
    <Hero onClick={openTutorial}/>
    </div>
    </motion.div>
  )
}

export default LandingPage
