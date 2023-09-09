import React, { useEffect} from 'react'
import { useState } from 'react'
import { Stack } from '../../DataStructures/Stack'
import { motion, } from 'framer-motion'
import { useSelector} from 'react-redux';
import CustomModal from './Modal'
import GridCellData from './GridValues.types'
import PriorityQueue from 'js-priority-queue'
import { RootState } from '../../store/store';
import GameOver from './GameOver';

export const assignGrid = (width: number, height: number, start: {x: number, y: number}, target:  {x: number, y: number}):GridCellData[][] => {
  let grid: Array<Array<GridCellData>> = [];

  for(let i = 0; i < height; i++) {
    let local = []
    for(let j= 0; j < width; j++) {
      local.push({x: j, y: i, 
      isStart: j === start.x && i === start.y,
      isTarget: j === target.x && i === target.y, weight:1, isWall: false, isVisited: false, previousNode: null, isShortestPath: false,  totalCost: Infinity})
    }
    grid.push(local)
  }

  return grid
}

const GridCanvas: React.FC = () => {
  const [gameOutcome, setGameOutcome] = useState('')
  // Grid Dimensionen, Start- und Targetnodes
  let startNodeX = useSelector((state: RootState) => state.grid.start.x)
  let startNodeY = useSelector((state: RootState) => state.grid.start.y)
  const targetNodeX = useSelector((state: RootState) => state.grid.target.x)
  const targetNodeY = useSelector((state: RootState) => state.grid.target.y)
  const gridWidth = useSelector((state: RootState) => state.grid.dimensions.x)
  const gridHeight = useSelector((state: RootState) => state.grid.dimensions.y)

  // Initial Grid
  const Grid = assignGrid(gridWidth,
    gridHeight,
    { x: startNodeX, y: startNodeY },
    { x: targetNodeX, y: targetNodeY })
  
  // updating and accessing grid
  const [grid, setGrid] = useState(Grid)

  // when any of the values of the nodes and grid change
  useEffect(()  => {
    const Gridd = assignGrid(gridWidth,
      gridHeight,
      { x: startNodeX, y: startNodeY },
      { x: targetNodeX, y: targetNodeY })

      setGrid(Gridd)
  }, [startNodeX, startNodeY, targetNodeX,  targetNodeY, gridWidth, gridHeight])
 

  const batchUpdateDelay = 50

  // current algorithm
  const algo =  useSelector((state: RootState) => state.grid.algorithm)
  // target node reached?
  const [goalReached, setGoalReached]= useState(false)
  // game over 
  const [muted, setMuted] = useState(false)
  
  // grid manipulation
  const [isDrawingWalls, setIsDrawingWalls] = useState(false)
  const [isDrawingWeights,  setIsDrawingWeights] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false);


const handleMouseDown = (e: any, rowIndex: number, columnIndex: number) => {
  e.preventDefault();

  // Determine whether to draw walls or weights based on mode
  if (isDrawingWalls) {
    const newGrid = grid.map((row) => [...row]);
    newGrid[rowIndex][columnIndex].isWall = true;
    setGrid(newGrid);
  } else if (isDrawingWeights) {
    const newGrid = grid.map((row) => [...row]);
    newGrid[rowIndex][columnIndex].weight = 5;
    setGrid(newGrid);
  } else {
    // Handle other interactions maybe
  }

  setIsDrawing(true);
};

const handleMouseEnter = (e: any, rowIndex: number, columnIndex: number) => {
  e.preventDefault();

  
  if (isDrawing) {
    if (isDrawingWalls) {
      const newGrid = grid.map((row) => [...row])
      newGrid[rowIndex][columnIndex].isWall = true
      setGrid(newGrid)
    } else if (isDrawingWeights) {
      const newGrid = grid.map((row) => [...row])
      newGrid[rowIndex][columnIndex].weight = 5
      setGrid(newGrid)
    }
  }
};

const target: GridCellData = grid[targetNodeY][targetNodeX]
const start: GridCellData = grid[startNodeY][startNodeX]
// store

  const [modalOpen, setModalOpen] = useState(false)
  const close = () => setModalOpen(false)
  const open = () => setModalOpen(true)
    
  const [modalName, setModalName] = useState("")
  const handleGridButtonClick = (input: string)  => {
    open()
    setModalName(input)
  }

  const clearGrid = () => {
    const clearedGrid = grid.map((row) => 
    row.map((cell) => ({
      ...cell,
      isShortestPath: false,
      isWall: false,
      isVisited: false,
      previousNode: null,
      weight: 1,
      totalCost: Infinity,
      totalCostLabel: null
    }))
    )
    setGrid(clearedGrid)
    setGoalReached(false)
    setMuted(false)
    setGameOutcome('')
  }


  const shortestPath = (targetNode: GridCellData) => {
    const shortestPath = []
    let currentNode: GridCellData | null = targetNode

    while(currentNode) {
      shortestPath.unshift(currentNode)
      currentNode = currentNode.previousNode
    }
    return shortestPath
  }

  const manhattanDistance = (cellA: {x: number, y: number}, cellB:{x: number, y: number}) => {
    return Math.abs(cellA.x - cellB.x) + Math.abs(cellA.y - cellB.y);
  }

  const colorShortestPath = async (shortestPathBackTrace: GridCellData[]) => {
    const updatedGrid = grid.map((row) => [...row])  
    for (const node of shortestPathBackTrace) {
     
    const withinBounds =
      node.x >= 0 &&
      node.y >= 0 &&
      node.x < gridWidth &&
      node.y < gridHeight

    if (withinBounds) {
      if (!updatedGrid[node.y][node.x].isWall) {
        updatedGrid[node.y][node.x].isShortestPath = true
        updatedGrid[node.y][node.x].totalCostLabel = node.totalCost
      }
      
    }

    setGrid(updatedGrid);
  }
  }

  const DJIKSTRArunPathfinder = async () => {
    const batchUpdateDelay = 0;
    const distances: number[][] = new Array(gridHeight).fill(null).map(() => new Array(gridWidth).fill(Infinity))
    distances[startNodeY][startNodeX] = 0
  
    const pq = new PriorityQueue<GridCellData>({ comparator: (a, b) => distances[a.y][a.x] - distances[b.y][b.x] }); 
    pq.queue(grid[startNodeY][startNodeX])  

    let gameOver = false

    while (pq.length > 0) {
      const currentNode = pq.dequeue()
  
      if (currentNode.x === target.x && currentNode.y === target.y) {

        const shortestPathBackTrace = shortestPath(target)
        colorShortestPath(shortestPathBackTrace)
        setGameOutcome('won')
        setMuted(true)
        return
      }
  
      const adjacentNodes = [
        { x: currentNode.x + 1, y: currentNode.y },
        { x: currentNode.x, y: currentNode.y + 1 },
        { x: currentNode.x - 1, y: currentNode.y },
        { x: currentNode.x, y: currentNode.y - 1 },
      ];
  
      for (const node of adjacentNodes) {

        const { x, y } = node
        const withinBounds = x >= 0 && y >= 0 && x < gridWidth && y < gridHeight

        if (withinBounds && !grid[y][x].isWall) {

          const neighbor = grid[y][x];
          const newDistance = distances[currentNode.y][currentNode.x] + neighbor.weight

          if (newDistance < distances[y][x]) {
            distances[y][x] = newDistance;
            neighbor.previousNode = currentNode
            pq.queue(neighbor)
            const newGrid = grid.map((row) => [...row])
            newGrid[y][x].isVisited = true
            setGrid(newGrid)
            await new Promise((resolve) => setTimeout(resolve, batchUpdateDelay))
          }

        }
      }
      if (pq.length === 0 && !gameOver) {
        gameOver = true
        setGameOutcome('lost')
        setMuted(true)
      }
    }
  };

  const ASTARrunPathfinder = async () => {
    const openSet = new PriorityQueue<GridCellData>({
      comparator: (a, b) => a.totalCost - b.totalCost,
    });
  
    start.totalCost = 0;
    openSet.queue(start);
    let gameOver = false

    const visitedNodes = new Set<GridCellData>()
    while (openSet.length > 0) {
      const currentNode = openSet.dequeue()
      visitedNodes.add(currentNode) 
  
      if (currentNode === target) {
        const shortestPathBackTrace = shortestPath(target)
        colorShortestPath(shortestPathBackTrace)
        setGameOutcome('won')
        setMuted(true)
        return;
      }
  
      const adjacentNodes = [
        { x: currentNode.x + 1, y: currentNode.y },
        { x: currentNode.x, y: currentNode.y + 1 },
        { x: currentNode.x - 1, y: currentNode.y },
        { x: currentNode.x, y: currentNode.y - 1 },
      ];
  
      for (const node of adjacentNodes) {
        const { x, y } = node;
        const withinBounds = x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
  
        if (withinBounds && !grid[y][x].isWall) {
          const neighbor = grid[y][x];
          const newCost = currentNode.totalCost + neighbor.weight + manhattanDistance(neighbor, target);
  
          if (!visitedNodes.has(neighbor) && newCost < neighbor.totalCost) {
            neighbor.totalCost = newCost
            neighbor.previousNode = currentNode
            openSet.queue(neighbor);
  
            const newGrid = grid.map((row) => [...row])
            newGrid[y][x].isVisited = true
            setGrid(newGrid)
            await new Promise((resolve) => setTimeout(resolve, batchUpdateDelay))
          }
        }
      }
      if (openSet.length === 0 && !gameOver) {
        gameOver = true
        setGameOutcome('lost')
        setMuted(true)
      }
    }
  };
  
  const reconstructAndColorPath = (currentNode: GridCellData | null) => {
    const shortestPathNodes = [];
    while (currentNode) {
      shortestPathNodes.push(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    const updatedGrid = grid.map((row) => [...row]);
    for (const node of shortestPathNodes) {
      updatedGrid[node.y][node.x].isShortestPath = true;
      setGrid(updatedGrid);
    }
  };

  const BFSrunPathfinder = async () => {
    let queue = []
    queue.push(start)
    let currentNode: GridCellData | null = null
    let gameOver = false
    while (queue.length > 0 && !goalReached) {    
      currentNode = queue.shift() as GridCellData | null
  
      if(currentNode !== null){

        if (currentNode.x === target.x && currentNode.y === target.y) {
          setGoalReached(true)
          reconstructAndColorPath(target)
          setGameOutcome('won')
          setMuted(true)

          break;
        }
      
      const adjacentNodes: {x: number, y:number}[] = [
        { x: currentNode.x + 1, y: currentNode.y },
        { x: currentNode.x, y: currentNode.y + 1 },
        { x: currentNode.x - 1, y: currentNode.y },
        { x: currentNode.x, y: currentNode.y - 1 },
      ];
  
      for (const node of adjacentNodes) {
        const withinBounds =
          node.x >= 0 &&
          node.y >= 0 &&
          node.x < gridWidth &&
          node.y < gridHeight;
  
        if (
          withinBounds &&
          !grid[node.y][node.x].isVisited &&
          !grid[node.y][node.x].isWall
        ) {
          grid[node.y][node.x].isVisited = true;
          grid[node.y][node.x].previousNode = currentNode;
          setGrid([...grid])
          await new Promise((resolve) => setTimeout(resolve, batchUpdateDelay))
          queue.push(node)
        }
      }
    }
  
  }
  if (queue.length === 0 && !gameOver) {
    gameOver = true
    setGameOutcome('lost')
    setMuted(true)
  }
  }

  const DFSrunPathfinder = async () => {
    let stack = new Stack<any>()
    let visited: { x: number, y: number }[] = [];    
    stack.push(start)
    visited.push(start)
    while(stack.storage.length > 0 && goalReached === false) {
      let currentNode = stack.pop()

      if (currentNode?.x === target.x && currentNode?.y === target.y) {
        setGameOutcome('won')
        setMuted(true)
        setGoalReached(true)
        const cTarget: GridCellData = grid[targetNodeY][targetNodeX]
        const shortestPathBackTrace = shortestPath(cTarget)
        colorShortestPath(shortestPathBackTrace);
        }

      if(currentNode)  {
        let adjacentNodes = [
          {x: currentNode.x +1, y: currentNode.y},
          {x: currentNode.x, y: currentNode.y +1},
          {x: currentNode.x -1, y: currentNode.y},
          {x: currentNode.x , y: currentNode.y -1}
        ]

        for(const node of adjacentNodes) {
          const withinBounds =
          node.x >= 0 &&
          node.y >= 0 &&
          node.x < gridWidth &&
          node.y < gridHeight;

        if (withinBounds && !visited.some(visitedNode => visitedNode.x === node.x && visitedNode.y === node.y) && !grid[node.y][node.x].isWall) {
          visited.push(node)
          stack.push(node)

          const newGrid = grid.map((row) => [...row])
          newGrid[node.y][node.x].isVisited = true
          newGrid[node.y][node.x].previousNode = currentNode
          setGrid(newGrid)
          await new Promise((resolve) => setTimeout(resolve, batchUpdateDelay))
      }
     
    }
  }
 
}
}


    const runAlgorithm = async () => {
      setMuted(false)

      switch(algo) {
        case 'dfs': {
          DFSrunPathfinder()
          break;
        }
        case 'bfs': {
          BFSrunPathfinder()
          break;
        }
        case 'djikstra': {
          DJIKSTRArunPathfinder()
          break;
        }
        case 'astar': {
          ASTARrunPathfinder()
          break;
        }
      }

    }
  

  

  return (
    <div className=" relative flex flex-col items-center mt-8 h-full">

      
   <div className='absolute -right-80  -top-11 max-w-sm bg-zinc-500 opacity-25 rounded-lg p-3 z-50 text-white  '>
<div className='flex justify-end'>
<div className=''>
<p> <span className='font-semibold text-sm'>dimensions</span>  {gridWidth} - {gridHeight}</p>
<p> <span className='font-semibold text-sm'>start</span>  {startNodeX} - {startNodeY}</p>
<p > <span className='font-semibold text-sm'>target</span>  {targetNodeX} - {targetNodeY}</p>
<p > <span className='font-semibold text-sm'>algorithm</span>  {algo}</p>

</div>
</div>
</div>  

<div>

  <div className='sm:flex  sm:flex-row justify-center sm:gap-4 '>

        <motion.button 
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className=" dim-button inline-flex justify-center     items-center py-3 px-5 text-base font-medium text-center    text-white rounded-lg bg-purple-600 hover:bg-purple-500   focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900    my-4" onClick={runAlgorithm}>RUN</motion.button>


        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className={`dim-button inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg ${isDrawingWalls?  'bg-orange-800': 'bg-blue-700'} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 my-4`}
        onClick={() => setIsDrawingWalls(!isDrawingWalls)}
        >
        {isDrawingWalls ? 'Save Wall' : 'Draw Wall'}
        </motion.button>

        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className={`dim-button inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg ${isDrawingWeights?  'bg-orange-800': 'bg-blue-700'} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 my-4`}
        onClick={() => setIsDrawingWeights(!isDrawingWeights)}
        >
        {isDrawingWeights ? 'Save Weights' : 'Set Weights'}
        </motion.button>
      
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        data-modal-toggle="dimensions"
        className='dim-button inline-flex justify-center    items-center py-3 px-5 text-base font-medium    text-center text-white rounded-lg bg-blue-700    hover:bg-blue-800 focus:ring-4 focus:ring-blue-300   dark:focus:ring-blue-900 my-4'
        onClick={(e) => handleGridButtonClick("dimensions")}
        >
        Dimensions
        </motion.button>

        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className='dim-button inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 my-4'
        onClick={(e) => handleGridButtonClick("algos")}
        >
        Algorithms
        </motion.button>

        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className='dim-button inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 my-4'
        onClick={(e) => handleGridButtonClick("startNode")}
        >
        Start
        </motion.button>
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className='dim-button inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 my-4'
        onClick={(e) => handleGridButtonClick("targetNode")}
        >
        Target
        </motion.button>
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale:  0.9}}
        className='dim-button inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-purple-600  hover:bg-purple-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 my-4'
        onClick={clearGrid}
        >
        Clear Grid
        </motion.button>

        
<CustomModal  visible={modalOpen} type={modalName} onClose={close} startNode={start} targetNode={target}  dimensions={{width: gridWidth, height: gridHeight}} />

    </div>

    {/* game over text*/}
    {muted?

    <GameOver muted={muted} outcome={gameOutcome} />
      
    : null
    }



</div>

      <div
        className={` grid  bg-spacy-pattern`} 
        style={{ gridTemplateColumns: `repeat(${gridWidth}, 40px) ` }}
      >
       
        
        {grid.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <motion.div key={`${rowIndex}-${columnIndex}`}  className={`h-[40px] bg-cover bg-center ${
              cell.isStart
                ? 'bg-start-pattern rounded-md'
                : cell.isWall
                ? 'bg-blue-500 rounded-md'
                : cell.isTarget
                ? 'bg-target-pattern'
                : cell.isShortestPath
                ? 'bg-teal-900 opacity-50 rounded-md'
                : cell.weight > 1
                ? 'bg-purple-600 rounded-md' 
                : cell.isVisited
                ? 'bg-teal-500 opacity-50 rounded-md'   
                : 'bg-transparent'
            }`}
            onMouseDown={(e) => handleMouseDown(e, rowIndex, columnIndex)}
            onMouseEnter={(e) => handleMouseEnter(e, rowIndex, columnIndex)}
            onMouseUp={() => setIsDrawing(false)}         
            >
  {cell.totalCostLabel !== undefined && (
          <div className="total-cost-label text-center font-semibold ">{cell.totalCostLabel !== Infinity ? <motion.p
          initial={{scaleY: 0, scaleX: 0, }}
          animate={{scaleY: 1, scaleX: 1, }}
          transition={{duration: 0.4, stiffness: 300, damping: 200,  }}
          >{cell.totalCostLabel}</motion.p> : null}</div>
        )}
              </motion.div>
          ))
        )}   
      </div>
    </div>
  );
};

export default GridCanvas;