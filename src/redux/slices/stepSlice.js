import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "step",
  initialState: { value: 0 },
  reducers: {
    incrementStep(state,action) {
      
      state.value = action.payload;

    },
    decrementStep(state,action) {
        state.value = action.payload;
    },
    manualStep(state, action) {
      state.value = action.payload;
    }
  }
});

export const { incrementStep, decrementStep, manualStep } = stepSlice.actions;
export default stepSlice.reducer;
