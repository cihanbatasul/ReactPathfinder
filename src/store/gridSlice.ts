import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GridState {
  start: { x: number; y: number };
  target: { x: number; y: number };
  dimensions: { x: number; y: number };
  algorithm: string
}

const initialState: GridState = {
  start: { x: 5, y: 5 },
  target: { x: 40, y: 2 },
  dimensions: { x: 45, y: 16 },
  algorithm: "astar",
};

export const gridState = createSlice({
  name: 'gridState',
  initialState,
  reducers: {
    setDimensions: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.dimensions = action.payload;
    },
    setStart: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.start = action.payload;
    },
    setTarget: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.target = action.payload;
    },
    incrementStartX: (state) => {
      state.start.x += 1
    },
    incrementStartY: (state) => {
      state.start.y += 1
    },
    incrementTargetX: (state) => {
      state.target.x += 1
    },
    incrementTargetY: (state) => {
      state.start.y += 1
    },
    incrementDimensionX: (state) => {
      state.dimensions.x += 1
    },
    incrementDimensionY: (state) => {
      state.dimensions.y += 1
    },
    setAlgorithm: (state, action: PayloadAction<string>) => {
      state.algorithm = action.payload
    },

  },
});

export const { setDimensions, setTarget, setStart,incrementDimensionX, incrementDimensionY, incrementStartX, incrementStartY, incrementTargetX, incrementTargetY, setAlgorithm} = gridState.actions;

export default gridState.reducer;