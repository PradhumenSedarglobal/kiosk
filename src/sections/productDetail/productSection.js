import SnackbarProvider from "@/components/snackbar";
import ProductThumbSwiper from "@/modules/productThumbSwiper";
import useProduct from "@/provider/product/useProduct";
import { ProductCommonList } from "@/utils/constant";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import React from "react";
import ProductDetails from "./productDetails";

const ProductSection = ({ data }) => {
  const { t: translate } = useTranslation();
  const [defaultSelectItem, setDefaultSelectItem] = React.useState(
    data?.LISTING?.items &&
    data?.LISTING?.items.find((item) => item.SII_CODE == data?.itemCode)
  );

  React.useEffect(() => {
    setDefaultSelectItem(
      (data?.LISTING?.items &&
        data?.LISTING?.items.find((item) => item.SII_CODE == data?.itemCode)) ||
      {}
    );
  }, [data?.itemCode, data?.LISTING]);

  const { handleSelectDialogDetail, productState } = useProduct();
  const { productSelectDialogDetail } = productState;

  const handleSelectDefaultItem = (item) => {
    setDefaultSelectItem(item);
    let width = ProductCommonList({
      data:
        data?.LISTING && data?.LISTING?.SPI_WIDTH_STANDARD
          ? data?.LISTING?.SPI_WIDTH_STANDARD?.split(",")
          : [],
      measuring_unit: "cm",
      SPI_RESTRICT_TO_MATERIAL_COMMON_YN: "N",
      SII_COMMON: item?.SII_WIDTH,
      keyName: "width",
      translate,
    });

    let height = ProductCommonList({
      data:
        data && data?.LISTING?.SPI_HEIGHT_STANDARD
          ? data?.LISTING?.SPI_HEIGHT_STANDARD?.split(",")
          : [],
      measuring_unit: "cm",
      SPI_RESTRICT_TO_MATERIAL_COMMON_YN: "N",
      SII_COMMON: item?.SII_LENGTH,
      keyName: "height",
      translate,
    });

    handleSelectDialogDetail({
      productSelectDialogDetail: {
        ...productSelectDialogDetail,
        defaultSelectItem: item,
      },
      product_width: width,
      product_height: height,
    });
  };
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Grid container spacing={{ md: 3, sm: 2, xx: 0, xxs: 0 }}>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <ProductThumbSwiper
            data={
              defaultSelectItem?.gallery &&
                defaultSelectItem?.gallery?.length > 0
                ? defaultSelectItem?.gallery
                : []
            }
            url={data?.LISTING?.url}
            defaultSelectItem={defaultSelectItem}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <SnackbarProvider>
            <ProductDetails
              handleSetItemData={handleSelectDefaultItem}
              data={data}
              defaultSelectItem={defaultSelectItem}
            />
          </SnackbarProvider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductSection;
