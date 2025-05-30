import React, { useRef, useCallback, useEffect, useState } from "react";
import Joyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { skipTour, setStepIndex } from "../../redux/slices/tourSlice";

const waitForElement = async (selector, timeout = 2000) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(selector)) {
      return resolve(true);
    }

    const interval = 100;
    let elapsed = 0;

    const check = setInterval(() => {
      elapsed += interval;
      
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(check);
        resolve(true);
      } else if (elapsed >= timeout) {
        clearInterval(check);
        reject(new Error(`Element ${selector} not found`));
      }
    }, interval);
  });
};

const TourGuideButton = ({ previousStep, previousStep2 }) => {
  const dispatch = useDispatch();
  const tourState = useSelector((state) => state.tour);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { tabChangeValue } = useSelector((state) => state.customization);
  const stepCount = useSelector((state) => state.step.value);

  const ignoreBackRef = useRef(false);
  const previousStep2Ref = useRef(null);
  const lastTabChangeValue = useRef(null);

  useEffect(() => {
    previousStep2Ref.current = previousStep2;
  }, [previousStep2]);

  useEffect(() => {
    // Only update step index when tabChangeValue actually changes
    if (tabChangeValue !== lastTabChangeValue.current) {
      lastTabChangeValue.current = tabChangeValue;
      
      let newStepIndex;
      switch (tabChangeValue) {
        case 0:
          newStepIndex = 3;
          break;
        case 1:
          newStepIndex = 5;
          break;
        case 2:
          newStepIndex = 7;
          break;
        case 3:
          newStepIndex = 9;
          break;
        case 4:
          newStepIndex = 11;
          break;
        default:
          newStepIndex = stepCount === 0 ? 1 : 3;
      }

      // dispatch(setStepIndex(newStepIndex));
    }
  }, [tabChangeValue, dispatch, stepCount]);

  const handleBackButton = useCallback(
    async (index) => {
      if (isTransitioning) return;
      
      setIsTransitioning(true);
      const prevIndex = index - 1;
      
      if (!ignoreBackRef.current && prevIndex >= 0) {
        const prevStep = tourState.steps[prevIndex];
        const selector = prevStep?.target;

        try {
          if (selector) {
            await waitForElement(selector).catch(err => {
              console.warn(err.message);
            });
          }

          // Dispatch before any potential DOM manipulations
          dispatch(setStepIndex(prevIndex));

          // Special cases for custom back handlers
          if (typeof previousStep === "function" && index === 3) {
            await Promise.resolve(previousStep());
          }

          if (previousStep2Ref.current && [5, 7, 9, 11].includes(index)) {
            await Promise.resolve(previousStep2Ref.current());
          }
        } catch (error) {
          console.error("Error during back navigation:", error);
        } finally {
          setIsTransitioning(false);
        }
      } else {
        setIsTransitioning(false);
      }
    },
    [dispatch, tourState.steps, previousStep, isTransitioning]
  );

 const handleJoyrideCallback = useCallback(
  async (data) => {
    const { action, index, status, type } = data;

    // Before step action
    if (type === "step:before") {
      const beforeFn = tourState.steps[index]?.beforeStep;
      if (typeof beforeFn === "function") {
        try {
          await Promise.resolve(beforeFn());
        } catch (error) {
          console.error("Error in beforeStep:", error);
        }
      }
    }

    // After step action
    if (type === "step:after") {
      const afterFn = tourState.steps[index]?.afterStep;
      if (typeof afterFn === "function") {
        try {
          await Promise.resolve(afterFn());
        } catch (error) {
          console.error("Error in afterStep:", error);
        }
      }

      if (action === "next") {
        const isLastStep = index === tourState.steps.length - 1;
        if (!isLastStep) {
          dispatch(setStepIndex(index + 1));
        } else {
          // If last step, mark tour as completed
          dispatch(completeTour());  // Dispatch any action that marks the tour as completed
        }
      }

      if (action === "prev") {
        await handleBackButton(index);
      }
    }

    // Handle skip or tour completion
    if (action === "skip" || status === "skipped" || status === "finished") {
      const isLastStep = tourState.steps.length - 1;
      // Skip directly to the last step
      dispatch(setStepIndex(isLastStep));
      dispatch(skipTour());  // Dispatch an action to handle skipping or tour completion
    }
  },
  [dispatch, tourState.steps, handleBackButton]
);


  return (
    <Joyride
      key={`joyride-${tourState.stepIndex}-${tourState.run}`}
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