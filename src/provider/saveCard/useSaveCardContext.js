import { useContext } from "react";
import { SaveCardContext } from "./saveCardProvider";

const useSaveCardContext = () => {
  const context = useContext(SaveCardContext);

  if (!context) {
    throw new Error(
      "useSaveCardContext must be used within a save Payment Card"
    );
  }

  return context;
};

export default useSaveCardContext;
