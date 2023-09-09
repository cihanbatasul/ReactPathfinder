
import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './gridSlice';
import navReducer from './navSlice';

const store = configureStore({
  reducer: {
    grid: gridReducer,
    nav: navReducer
    // Add other reducers here if needed
  },
});

export default store
export type RootState = ReturnType<typeof store.getState>