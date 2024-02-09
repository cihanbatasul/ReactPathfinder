import {motion} from 'framer-motion'
import { useRef, useState } from 'react'
import gameOverSound from '/sounds/gameover.mp3'
import goalReached from '/sounds/goalreached.wav'

interface  gameOverProps {
    muted: boolean,
    outcome: string
}

const GameOver: React.FC<gameOverProps>= ({muted, outcome}) => {
    const audio = useRef<HTMLAudioElement>(null)
    const [playAudio, setPlayAudio] = useState(false)

    if(muted && !playAudio) {
        if(audio.current) {
            audio.current.play()
            setPlayAudio(true)
        }
    }

  return (
    <div className="container relative flex flex-col items-center mt-8 h-full">
     
        <motion.div className="absolute m-auto top-64 z-50  text-center font-bold">
          <motion.p
            initial={{ scaleX: 0, scaleY: 0.2, opacity: 0 }}
            animate={{ scaleX: 4, scaleY: 4, opacity: 1 }}
            
            transition={{ duration: 0.8 }}
          >
            {outcome === 'won' ? 'TARGET REACHED' : 'GAME OVER'}
          </motion.p>
          <motion.p
            className="mt-12 "
            initial={{ scaleX: 0, scaleY: 0.2, opacity: 0 }}
            animate={{ scaleX: 1.5, scaleY: 1.5, opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            {outcome === 'won' ?  'ALIEN WAS ABLE TO REACH ITS HOME PLANET' : 'THE PATH IS BLOCKED, ALIEN IS TRAPPED'}
            
          </motion.p>
          <audio ref={audio} src={`${outcome === 'won'? goalReached :gameOverSound }`}  autoPlay/>
        </motion.div>
    </div>
  )
}

export default GameOver