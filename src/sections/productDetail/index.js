import { ReTagCategoryPage } from "@/admitad/AdmitadIndex";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import Box from "@mui/material/Box";
import React, { useMemo } from "react";
import CustomBreadCrumb from "./breadCrumb";
import ProductSection from "./productSection";
import SimilarProductSection from "./similarProductSection";

const ProductDetailSection = ({
  productDetails,
  itemCode,
  similarProducts,
}) => {

  const productDetail = useMemo(() => {
    const data = productDetails?.result;
    if (data?.COMPONENT && data?.COMPONENT?.length > 0) {
      let breadcrumb = [];

      const LINK_PATHS =
        data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.LINK_PATH &&
          data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.LINK_PATH.split(" / ")
          ? data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.LINK_PATH.split(" / ")
          : [];
      if (LINK_PATHS && LINK_PATHS?.length > 0 && LINK_PATHS[0].trim() === "") {
        LINK_PATHS.shift();
      }

      LINK_PATHS &&
        LINK_PATHS?.forEach((item, index) => {
          if (index == 0) {
            breadcrumb.push({
              label: item,
              value: data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.PARENT_LINK_URL,
            });
          } else if (index == 1) {
            breadcrumb.push({
              label: item,
              value: `${data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.PARENT_LINK_URL}/${data?.COMPONENT[0]?.PARENT?.BREADCRUMB?.LINK_URL}`,
            });
          } else {
            breadcrumb.push({
              label: item,
              value: "",
            });
          }
        });
      breadcrumb.push({
        label: data?.COMPONENT[0]?.PARENT?.LISTING
          ? data?.COMPONENT[0]?.PARENT?.LISTING?.SFI_DESC
          : "",
        value: "",
      });

      return {
        ...data?.COMPONENT[0]?.PARENT,
        BREADCRUMB: {
          links: breadcrumb,
          ...data?.COMPONENT[0]?.PARENT?.BREADCRUMB,
        },
        itemCode: itemCode,
        defaultSelectItem:
          itemCode &&
            data?.COMPONENT[0]?.PARENT?.LISTING?.items?.find(
              (item) => item?.SII_CODE == itemCode
            )
            ? data?.COMPONENT[0]?.PARENT?.LISTING?.items?.find(
              (item) => item?.SII_CODE == itemCode
            )
            : data?.COMPONENT[0]?.PARENT?.LISTING?.items &&
              data?.COMPONENT[0]?.PARENT?.LISTING?.items?.length > 0
              ? data?.COMPONENT[0]?.PARENT?.LISTING?.items[0] || {}
              : {},
      };
    }
  }, [productDetails, itemCode]);

  React.useEffect(() => {
    GoogleAnalytics && GoogleAnalytics.viewSingleItem(productDetails);
    if (productDetails && productDetails.SFP_TITLE) {
      ReTagCategoryPage(productDetails.SFP_TITLE); //Admitad
    }
  }, []);

  return (
    <Box sx={{ my: 2 }}>
      <Box>
        <CustomBreadCrumb data={productDetail?.BREADCRUMB} />
      </Box>
      <Box>
        <ProductSection data={productDetail} />
      </Box>
      <Box>
        <SimilarProductSection similarProducts={similarProducts} />
      </Box>
    </Box>
  );
};

export default ProductDetailSection;
