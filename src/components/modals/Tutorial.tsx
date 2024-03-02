import { useCallback, useEffect, useState } from "react"
import TutorialPage from "./Page"

interface ModalProps {
    isOpen?:  boolean
    onClose: () => void
    disabled?: boolean
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, disabled}) => {

    const [showModal, setShowModal] = useState(isOpen)
    const [index, setIndex] = useState(1)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])
    
    const handleClose = useCallback(() => {
        if(disabled) {
            return
        }
        setShowModal(false)

        setTimeout(() => {
        onClose()
        }, 300)

    }, [disabled, onClose])

    if(!isOpen) {
        return null
    }

  return (
    <>
    <div className="
    justify-center
    items-center
    flex
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0

    z-50
    outline-none
    focus:outline-none
    bg-neutral-800/70">

<div className="
relative
w-full
md:w-4/6
lg:w-3/6
xl:w-2/5
my-6
mx-auto
h-full
lg:h-auto
md:h-auto

"
>
  {/* content */}  
  <div className={
    `
    translate
    duration-300
    h-full
    ${showModal? 'translate-y-0' : 'translate-y-full'}
    ${showModal? 'opacity-100' : 'opacity-0'}
    `}
    >
    <div className="
    translate
    h-full
    p-12
    lg:h-auto
    md:h-auto
    border-0
    rounded-sm
    shadow-lg
    relative
    flex
    flex-col
    w-full
    bg-white
    outline-none
    focus:outline-none
    ">
   {/* CLOSE BUTTON */}     
    <div>
    <button onClick={handleClose}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black hover:text-red-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

</button>
    </div>

<div className="flex justify-between">

<div className="flex">

    {/* back arrow*/}
<button  onClick={() => index > 1 ? setIndex(index -1 ) : null }>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>
</button>
</div>

<TutorialPage index={index}/>



{/* next arrow*/}


<div className="flex flex-col justify-center items-center">
   
<div className="flex flex-col items-center justify-center">
<button onClick={() => index < 3 ? setIndex(index + 1) : null }>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
</svg>
</button>
</div>
</div>

</div>
    </div>
  </div>
</div>
    </div>
    
    </>
  )
}

export default Modal