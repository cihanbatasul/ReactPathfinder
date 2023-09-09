import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface navState {
    active: string
  }
  
const initialState: navState = {
   active: "/"
};

export const navState = createSlice({
    name: 'navSlice',
    initialState,
    reducers: {
        setActiveLink: (state, action: PayloadAction<string>) => {
            state.active = action.payload
        }
    }

})

export const { setActiveLink} = navState.actions;

export default navState.reducer;