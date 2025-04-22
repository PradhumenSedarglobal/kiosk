import React from "react";
import Joyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { skipTour, setStepIndex } from "../../redux/slices/tourSlice";

const TourGuideButton = () => {
  const dispatch = useDispatch();
  const tourState = useSelector((state) => state.tour);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    console.log("Joyride callback:", data);

    // Handle all side effects here before step transitions
    if (type === "step:before") {
      // Call your additional functions here
      if (typeof tourState.steps[index]?.beforeStep === 'function') {
        tourState.steps[index].beforeStep();
      }
    }

    if (type === "step:after") {
      // Call your additional functions here
      if (typeof tourState.steps[index]?.afterStep === 'function') {
        tourState.steps[index].afterStep();
      }

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
      disableOverlayClose={false}
      spotlightPadding={0}
      styles={{
        options: {
          zIndex: 99999,
          overlayColor: "rgba(0, 0, 0, 0.5)",
          primaryColor: "#ff6600",
          spotlightShadow: "none",
        },
        spotlight: {
          borderRadius: 0,
          animation: "none",
        },
        beacon: {
          display: "none",
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
};

export default TourGuideButton;