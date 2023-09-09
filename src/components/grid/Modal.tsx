import { motion } from "framer-motion"
import { useDispatch } from "react-redux/"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { setDimensions, setStart, setTarget, setAlgorithm } from "../../store/gridSlice"
import { RootState } from "../../store/store"
import { useState } from "react"

interface props {
  visible?: boolean
  type?: string
  onClose: () => void
  dimensions?:{width: number, height: number}
  startNode?: {x: number, y: number}
  targetNode?: {x: number, y: number}
  checked?: boolean
}

const StartNode: React.FC<props> = ({onClose, startNode, checked}: props) => {
  const dispatch = useDispatch()
  const gridWidth = useSelector((state: RootState) => state.grid.dimensions.x)
const gridHeight = useSelector((state: RootState) => state.grid.dimensions.y)

  const startNodeX = useSelector((state: RootState) => state.grid.start.x)
  const startNodeY = useSelector((state: RootState) => state.grid.start.y)
  const [values, setValues] = useState({x: startNodeX, y:startNodeY})

  const [isOutOfBounds, setisOutOfBounds] = useState(false)

  const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newX = parseInt(event.target.value);
  
    if (newX >= 0 && newX <= gridWidth) {
      setisOutOfBounds(false);
      setValues({ ...values, x: newX });
  
      if (checked) {
        dispatch(setStart({ x: newX, y: values.y }));
      }
    } else {
      setisOutOfBounds(true);
    }
  };
  
  const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newY = parseInt(event.target.value);
  
    if (newY >= 0 && newY <= gridHeight) {
      setisOutOfBounds(false);
      setValues({ ...values, y: newY });
  
      if (checked) {
        dispatch(setStart({ x: values.x, y: newY }));
      }
    } else {
      setisOutOfBounds(true);
    }
  };
  const handleSubmit = () => {
    dispatch(setStart({ x: values.x, y: values.y }));
    onClose()
  }

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay: 0.2, duration:0.9}}
    className="bg-white   rounded-md p-10">
   
        <label  className="block mt-2 text-black text-center mb-2 font-medium  ">X-Position</label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" placeholder={startNodeX ? startNodeX.toString(): startNode? startNode.x.toString() : "x"} onChange={handleXChange} />
    
        <label  className="block mb-2 font-medium text-black text-center mt-2">Y-Position</label>
        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" placeholder={startNodeY ? startNodeY.toString(): startNode? startNode.y.toString() : "y"}  onChange={handleYChange} />
    {isOutOfBounds === true ? <p className="text-red-700 mt-4">X oder Y Werte nicht im Grid</p> : null}
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className="text-white font-medium mt-8  bg-blue-800 hover:bg-blue-700 rounded-md block w-full py-3"
        onClick={handleSubmit} 
        >
      Save
    </motion.button>
    <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className="text-white font-medium mt-3  bg-red-800 hover:bg-red-700 rounded-md block w-full py-3"
        onClick={onClose} 
        >
      Cancel
    </motion.button>
    </motion.div>
  )
}

// Target Node Modal

const TargetNode: React.FC<props> = ({onClose, targetNode, checked}: props) => {

  const dispatch = useDispatch()
  const targetNodeX = useSelector((state: RootState) => state.grid.target.x)
  const targetNodeY = useSelector((state: RootState) => state.grid.target.y)
  const [values, setValues] = useState({x: targetNodeX, y:targetNodeY})
  const gridWidth = useSelector((state: RootState) => state.grid.dimensions.x)
const gridHeight = useSelector((state: RootState) => state.grid.dimensions.y)
  const [isOutOfBounds, setisOutOfBounds] = useState(false)

  const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newX = parseInt(event.target.value);
  
    if (newX >= 0 && newX <= gridWidth) {
      setisOutOfBounds(false);
      setValues({ ...values, x: newX });
  
      if (checked) {
        dispatch(setTarget({ x: newX, y: values.y }));
      }
    } else {
      setisOutOfBounds(true);
    }
  };
  
  const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newY = parseInt(event.target.value);
  
    if (newY >= 0 && newY <= gridHeight) {
      setisOutOfBounds(false);
      setValues({ ...values, y: newY });
  
      if (checked) {
        dispatch(setTarget({ x: values.x, y: newY }));
      }
    } else {
      setisOutOfBounds(true);
    }
  };

  const handleSubmit = () => {
    dispatch(setTarget({ x: values.x, y: values.y }));
    onClose()
  }

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay: 0.2, duration:0.9}}
    
    className="bg-white   rounded-md p-10">

        <label  className="block mt-2 text-black text-center mb-2 font-medium  ">X-Position</label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" placeholder={targetNodeX ? targetNodeX.toString(): targetNode? targetNode.x.toString() : "x"}  onChange={handleXChange} />
    
        <label  className="block mb-2 font-medium text-black text-center mt-2">Y-Position</label>
        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"  placeholder={targetNodeY ? targetNodeY.toString(): targetNode? targetNode.y.toString() : "y"}  onChange={handleYChange} />
        {isOutOfBounds === true ? <p className="text-red-700 mt-4">X oder Y Werte nicht im Grid</p> : null}
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className="text-white font-medium mt-8  bg-blue-800 hover:bg-blue-700 rounded-md block w-full py-3"
        onClick={handleSubmit} 
        >
      Save
    </motion.button>
    <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className="text-white font-medium mt-3  bg-red-800 hover:bg-red-700 rounded-md block w-full py-3"
        onClick={onClose} 
        >
      Cancel
    </motion.button>
    </motion.div>
  )
}
// Dimensions Modul

const Dimensions: React.FC<props> = ({onClose, dimensions, checked}: props) => {

  const dispatch = useDispatch()
  const dimensionsX = useSelector((state: RootState) => state.grid.dimensions.x)
  const dimensionsY = useSelector((state: RootState) => state.grid.dimensions.y)
  const targetNodeX = useSelector((state: RootState) => state.grid.target.x)
  const targetNodeY = useSelector((state: RootState) => state.grid.target.y)

  const startNodeX = useSelector((state: RootState) => state.grid.start.x)
  const startNodeY = useSelector((state: RootState) => state.grid.start.y)
  const [values, setValues] = useState({x: dimensionsX, y:dimensionsY})
  const [isOutOfBounds, setisOutOfBounds] = useState(false)


  const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newX = parseInt(event.target.value);

    if ( newX >= 0 && newX >=  startNodeX && newX >= targetNodeX && newX <= 45) {
      setisOutOfBounds(false);
      setValues({ ...values, x: newX });

      if (checked  && !isOutOfBounds) {
        dispatch(setDimensions({ x: newX, y: values.y }));
      }
    } else {
      setisOutOfBounds(true);
    }
  };

  const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newY = parseInt(event.target.value);

    if ( newY >= 0 && newY >= startNodeY && newY >= targetNodeY && newY <= 30) {
      setisOutOfBounds(false);
      setValues({ ...values, y: newY });

      if (checked && !isOutOfBounds) {
        dispatch(setDimensions({ x: values.x, y: newY }));
      }
    } else {
      setisOutOfBounds(true);
    }
  };

  const handleSubmit = () => {
    if(!isOutOfBounds){
      dispatch(setDimensions({ x: values.x, y: values.y }));
    }
    onClose()
  }

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay: 0.2, duration:0.9}}
    
    className="bg-white  rounded-md p-10">
        <label  className="block mt-2 text-black text-center mb-2 font-medium  ">Width</label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" placeholder={dimensionsX ? dimensionsX.toString(): dimensions? dimensions.width.toString() : "Width"}  onChange={handleXChange} />
    
        <label  className="block mb-2 font-medium text-black text-center mt-2">Height</label>
        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" placeholder={dimensionsY ? dimensionsY.toString(): dimensions? dimensions.height.toString() : "Height"}  onChange={handleYChange} />
        {isOutOfBounds === true ? 
        <div>

         <p className="text-red-700 mt-4 w-60 text-center ">Make sure dimensions contain start and target nodes and are not larger than x: 45 and y: 30.</p>        </div>
 : null}
        <motion.button
        disabled={isOutOfBounds}
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className={`text-white font-medium mt-8  ${isOutOfBounds ? 'bg-gray-500' : 'bg-blue-800 hover:bg-blue-700'} rounded-md block w-full py-3`}
        onClick={handleSubmit} 
        >
      Save
    </motion.button>
    <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className="text-white font-medium mt-3  bg-red-800 hover:bg-red-700 rounded-md block w-full py-3"
        onClick={onClose} 
        >
      Cancel
    </motion.button>
    </motion.div>
  )
}

// Algorithm Modal

const Algorithm: React.FC<props> = ({onClose}: props) => {

  const dispatch = useDispatch()
  const algorithm = useSelector((state: RootState) => state.grid.algorithm)
  const [empty, setEmpty] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const userInput = e.target.value

    if(userInput !== "") {
      setEmpty(false)
      
        dispatch(setAlgorithm(userInput));
      
    }

  }
    
  const handleSubmit = (e:any) => {
    e.preventDefault()
    const userInput  = algorithm

    if(!empty) {
      dispatch(setAlgorithm(userInput));
      console.log(algorithm)
      onClose()
    }
  }

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay: 0.2, duration:0.9}}
    
    className="bg-white   rounded-md p-10 px-4">
    
      <label htmlFor="underline_select" className="sr-only">Algo</label>
<select id="underline_select" className="block py-2.5 px-0 w-full  dark:text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer text-center" onChange={handleChange}>
    <option  value="">Choose algorithm</option>
    <option value="dfs">Depth First Search</option>
    <option value="bfs">Breath First Search</option>
    <option value="djikstra">Djikstra's Algorithm</option>
    <option value="astar">A*</option>
</select>

      {empty === true? <p className="text-red-800 text-center mt-4">You need to select an algorithm.</p> : null}
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className="text-white font-medium mt-8  bg-blue-800 hover:bg-blue-700 rounded-md block w-full py-3"
        onClick={handleSubmit} 
        >
      Save
    </motion.button>
    <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className="text-white font-medium mt-3  bg-red-800 hover:bg-red-700 rounded-md block w-full py-3"
        onClick={onClose} 
        >
      Cancel
    </motion.button>
    </motion.div>
  )
}


 const CustomModal: React.FC<props> = ({visible, type,  onClose, startNode, targetNode, dimensions}: props) =>  {

  const [checked, setChecked] = useState(false)
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  }
  if(!visible)  return null

  const modals: {[key: string]: JSX.Element} = {
    "dimensions": <Dimensions dimensions={dimensions} onClose={onClose} checked={checked}/>,
    "startNode": <StartNode startNode={startNode} onClose={onClose} checked={checked}/>,
    "targetNode": <TargetNode targetNode={targetNode} onClose={onClose} checked={checked} />,
    "algos": <Algorithm targetNode={targetNode} onClose={onClose} checked={checked} />,
  }

  const modalNames: {[key: string]: string} = {
    "dimensions": "Grid Dimensions",
    "startNode": "Starting Position",
    "targetNode": "Target Position",
    "algos": "Algorithms",
  }

  const selectedModal = type ? modals[type] : null
  return (
    
     <motion.div
     
     initial={{width: 0}}
animate={{width: "40%"}}
exit={{x: window.innerWidth, transition: {duration: 0.4}}}
    className="z-50 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
    >   
    <div>
      <div className="flex align-middle justify-center my-4 ">
        <h3 className="text-center text-xl ">
          {type ? modalNames[type] : "Choose values"}
        </h3>
      </div>
    <div className="ml-3 flex items-center mb-4">
    {type !== "algos" && type !== "mazes" ? <div><input id="insta_save" type="checkbox" value="" className="sm: w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={handleCheckboxChange} checked={checked}/>
    <label htmlFor="insta_save" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">Werte beim Ändern direkt übernehmen</label></div> : null}
</div>
   {selectedModal}
   </div>
    </motion.div> 
    
  )
}

export default CustomModal