import SnackbarProvider from "@/components/snackbar/SnackbarProvider";
import ProductGridModule from "@/modules/product";
import Banner from "@/modules/product/banner";
import useProduct from "@/provider/product/useProduct";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React from "react";
import Filter from "./filter";

const Product = ({
  products,
  firstData,
  productFilterData,
  productFilterDropdown,
  pageCount,
  activePage,
  getFilterKeysValuesData,
}) => {
  const { productState, handleChangeGridView, handleCheckedFilterData } =
    useProduct();
  const { gridView } = productState;
  const router = useRouter();
  React.useEffect(() => {
    handleCheckedFilterData(getFilterKeysValuesData);
  }, [router, getFilterKeysValuesData]);
  return (
    <Box component="div">
      <Banner firstData={firstData} />
      <Filter
        productFilter={productFilterData}
        productFilterDropdown={productFilterDropdown}
        handleChangeGridView={handleChangeGridView}
        gridView={gridView}
        products={products}
      >
        <SnackbarProvider>
          <ProductGridModule
            gridView={gridView}
            materialData={
              products?.result &&
                products?.result &&
                products?.result?.length > 0
                ? products?.result
                : []
            }
            gridSm={6}
            gridXs={6}
            gridXxs={6}
            pageCount={pageCount}
            activePage={activePage}
          />
        </SnackbarProvider>
      </Filter>
    </Box>
  );
};

export default Product;
