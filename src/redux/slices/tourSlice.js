import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  run: false,
  stepIndex: 0,
  steps: [
    {
      target: ".starterPoint",
      content: "Select your preference on how you move forward!",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".category-container",
      content: "As of now, select a category and move forward.",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".continue",
      content: "Now click on the continue button",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".selectModal",
      content: "Now select Modal!",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".continue2",
      content: "Now click on the continue button",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".selectMeasurment",
      content: "Now please enter measurements!",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".continue3",
      content: "Now click on the continue button",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".selectMaterial",
      content: "Now please select product color!",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".continue4",
      content: "Now click on the continue button",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".submit",
      content: "Now fill this form and submit details!",
      placement: "top",
      spotlightPadding: 10,
    },
    {
      target: ".drawer",
      content: "Now you can click on this drawer and check your product!",
      placement: "top",
      spotlightPadding: 10,
    },
  ],
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    startTour: (state) => {
      state.run = true;
      state.stepIndex = 0; // Restart tour when starting
    },
    stopTour: (state) => {
      state.run = false;
      state.stepIndex = 0; // Reset step index on stop
    },
    tourNextStep: (state) => {
      if (state.stepIndex < state.steps.length - 1) {
        state.stepIndex += 1;
      }
    },
    setStepIndex: (state, action) => {
      const newIndex = action.payload;
      if (newIndex >= 0 && newIndex < state.steps.length) {
        state.stepIndex = newIndex;
      }
    },
  },
});

export const { startTour, stopTour, tourNextStep, setStepIndex } = tourSlice.actions;
export default tourSlice.reducer;
