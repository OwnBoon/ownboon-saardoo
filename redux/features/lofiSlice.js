import {createSlice, current} from "@reduxjs/toolkit";

const initialState = {
    sessionStarted:false,
    hideElements:false,
    hideElementsTimeout:null
};

const lofiSlice = createSlice({
  name: "lofi",
  initialState,
  reducers: {
    setSessionStartedState: (state, action) => {
      state.sessionStarted = action.payload;
    },
    setHideElements: (state,action) => {
      state.hideElements = action.payload
    },
    setHideElementsTimeout:(state,action)=>{
      state.hideElementsTimeout = action.payload
    }
  },
});

export const {
  setSessionStartedState,
  setHideElements,
  setHideElementsTimeout
} = lofiSlice.actions;

export default lofiSlice.reducer;
