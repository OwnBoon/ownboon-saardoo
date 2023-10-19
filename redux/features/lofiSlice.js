import {createSlice, current} from "@reduxjs/toolkit";

const initialState = {
    sessionStarted:false
};

const lofiSlice = createSlice({
  name: "lofi",
  initialState,
  reducers: {
    setSessionStartedState: (state, action) => {
      state.sessionStarted = action.payload;
    },
  },
});

export const {
  setSessionStartedState
} = lofiSlice.actions;

export default lofiSlice.reducer;
