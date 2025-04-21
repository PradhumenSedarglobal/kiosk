import React from "react";
import Joyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { skipTour, setStepIndex } from "../../redux/slices/tourSlice"; // Adjust path as needed

const TourGuideButton = () => {
  const dispatch = useDispatch();
  const tourState = useSelector((state) => state.tour); // adjust according to your reducer name

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    console.log("Joyride callback:", data); // optional: for debugging

    if (type === "step:after") {
      if (action === "next") {
        const isLastStep = index === tourState.steps.length - 1;
        if (isLastStep) {
          dispatch(skipTour());
        } else {
          dispatch(setStepIndex(index + 1));
        }
      } else if (action === "prev") {
        dispatch(setStepIndex(index - 1));
      }
    }

    if (
      action === "skip" ||
      action === "close" ||
      (action === "next" && index === tourState.steps.length - 1) ||
      status === "skipped" ||
      status === "finished"
    ) {
      dispatch(skipTour());
    }
  };

  return (
    <Joyride
      steps={tourState.steps}
      stepIndex={tourState.stepIndex}
      run={tourState.run}
      continuous
      showProgress
      showSkipButton
      spotlightClicks
      disableScrolling
      hideCloseButton={false}
      styles={{
        options: {
          zIndex: 99999,
          overlayColor: "rgba(0, 0, 0, 0.5)",
          primaryColor: "#ff6600",
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
};

export default TourGuideButton;
