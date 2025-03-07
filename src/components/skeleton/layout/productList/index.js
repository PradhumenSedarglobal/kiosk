import React from "react";
import WebLayoutSkeleton from "..";
import ProductListSkeleton from "../../product";

const ProductListPageSkeleton = () => {
  return (
    <WebLayoutSkeleton>
      <ProductListSkeleton />
    </WebLayoutSkeleton>
  );
};

export default ProductListPageSkeleton;
