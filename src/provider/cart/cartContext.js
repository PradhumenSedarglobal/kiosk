import React, { useContext } from "react";
import { CartContext } from "./cartProvider";

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a MyOrderProvider");
  }

  return context;
};

export default useCartContext;
