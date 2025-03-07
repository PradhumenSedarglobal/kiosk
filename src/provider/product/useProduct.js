import React from "react";
import { CreateProductContext } from "./productProvider";

const useProduct = () => {
  const product = React.useContext(CreateProductContext);

  if (!product) {
    throw new Error("useProduct must be used within a ProductProvider");
  }

  return product;
};
export default useProduct;
