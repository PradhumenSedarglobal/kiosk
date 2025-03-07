import React, { useContext } from "react";
import { MyOrderContext } from "./myOrderProvider";

const useMyOrderContext = () => {
  const context = useContext(MyOrderContext);

  if (!context) {
    throw new Error("useMyOrderContext must be used within a MyOrderProvider");
  }

  return context;
};

export default useMyOrderContext;
