import {useState} from 'react'
import { Link } from 'react-router-dom'
import {styles} from '../styles'
import logo from '/logo.svg'
import close from '/close.svg'
import menu from '/menu.svg'
const Navbar = () => {

  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)

  return (
    <nav 
    className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className=' w-full flex justify-between  items-center max-w-7xl mx-auto'>
        <Link
        to="/"
        className='flex item-center gap-2'
        onClick={() => {
          setActive("/")
          window.scrollTo(0, 0)
        }}>
        <div >
        <img src={logo} alt='logo' className='sm:block hidden w-27 h-16 object-contain'/>
        </div>
        </Link>
        <div className={`${styles.paddingX} sm:block hidden py-5 gap-6`}>
        <Link to="/visualizer" className={`${
              active === "Visualizer" ? "text-[#5ff096] underline underline-offset-4"  : "text-white"
            }  hover:text-[#5ff096] text-[18px] font-medium cursor-pointer`} onClick={() => setActive("Visualizer")}>
          Visualizer
         </Link>
        
     
        </div>

        <div className='sm:hidden flex flex-1 justify-end items-center ' >
            <img src={toggle?  close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer "
            onClick={() => setToggle(!toggle)}/>
            <div
            className={`${!toggle ? 'hidden' : 'flex'} flex-col p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
    
    <Link to="/" className={`${
              active === "Home" ? "text-[#5ff096] underline underline-offset-4"  : "text-white"
            } hover:text-[#5ff096] text-[18px] font-medium cursor-pointer`} onClick={() => setActive("Home")}>
          Home
         </Link>
          
         <Link to="/visualizer" className={`${
              active === "Visualizer" ? "text-[#5ff096] underline underline-offset-4"  : "text-white"
            } hover:text-[#5ff096] text-[18px] font-medium cursor-pointer`} onClick={() => setActive("Visualizer")}>
          Visualizer
         </Link>
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar