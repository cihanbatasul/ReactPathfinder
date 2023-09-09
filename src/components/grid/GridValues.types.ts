export default interface GridCellData {
    x: number;
    y: number;
    isStart: boolean;
    isTarget: boolean;
    weight: number;
    isWall: boolean;
    isVisited: boolean;
    previousNode:  GridCellData | null
    isShortestPath: boolean
    totalCost?: number
    totalCostLabel?: number | null
  }