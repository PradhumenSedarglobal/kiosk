import React from "react";
import WebLayoutSkeleton from "..";
import ProductDetailsSkeleton from "../../productDetails";

const ProductDetailSkeleton = () => {
  return (
    <WebLayoutSkeleton>
      <ProductDetailsSkeleton />
    </WebLayoutSkeleton>
  );
};

export default ProductDetailSkeleton;
