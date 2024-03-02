
import {Hero} from './'
import { useState, Suspense } from 'react'
import {motion} from  'framer-motion'
import Modal from './modals/Tutorial'
function LandingPage() {
  const [tutorialOpen, setTutorialOpen] = useState(false)
  const openTutorial = () => {
    setTutorialOpen(true)
  }

  return (
<Suspense>
<motion.div 
className='relative h-full z-0 bg-primary '
>
    <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
{tutorialOpen ?  <Modal isOpen onClose={() => setTutorialOpen(false)}/> : null}
    <Hero onClick={openTutorial}/>
    </div>
    </motion.div>
</Suspense>
  )
}

export default LandingPage
