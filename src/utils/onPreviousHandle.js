import { removecart, setTabChangeValue } from "@/redux/slices/customization";
import { decrementStep } from "@/redux/slices/stepSlice";
import { setStepIndex } from "@/redux/slices/tourSlice";
import { useSelector } from "react-redux";

const onPreviousHandle = () => {
  const { tabChangeValue } = useSelector((state) => state.customization);

  let tabChange = 0;

  if (tabChangeValue == 0) {
    tabChange = 1;
  } else {
    tabChange = tabChangeValue;
  }

  if (tabChange === "1") {
    dispatch(removecart());
    dispatch(setStepIndex(5));
  } else if (tabChange === 2) {
    dispatch(setStepIndex(7));
  }

  if (tabChange != "1") {
    setTabChange((tabChange) => Number(tabChange) - 1);
    dispatch(setTabChangeValue(Number(tabChange) - 1));
  } else {
    setTabChange(0);
    dispatch(setTabChangeValue(0));
    dispatch(decrementStep(1));
  }
};

export default onPreviousHandle;
