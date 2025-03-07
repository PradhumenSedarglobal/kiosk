import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import { NextFillImage } from "@/components/image";
import TabbySkeleton from "@/components/skeleton/productDetails/productDetailsSection/tabbySkeleton";
import useFloatPrice from "@/hooks/useFloatPrice";
import useResponsive from "@/hooks/useResponsive";
import useCartContext from "@/provider/cart/cartContext";
import useProduct from "@/provider/product/useProduct";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import {
  addFreeSample,
  addToCart,
  removeFreeSample,
} from "@/redux/slices/product";
import { useDispatch } from "@/redux/store";
import {
  ProductDetailListItem,
  ProductDetailsCheckList,
} from "@/styles/productDetailPage";
import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import { ProductCommonList } from "@/utils/constant";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ColorSelect from "@/modules/product/colorSelect";
import DeliveryDays from "@/modules/product/DeliveryDays";
import ItemCode from "@/modules/product/itemCode";
import FloatPrice from "@/modules/product/floatPrice";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { SelectDialog } from "@/modules/dialog";
import ToastMessage from "@/components/dialog/toastMessage";
import Link from '@mui/material/Link';
const brand_name = ['The MET'];
const TabbyPromoMgs = dynamic(
  () => import("@/modules/PaymentGateway/Tabby/TabbyPromoMgs"),
  {
    loading: () => <TabbySkeleton />,
    ssr: false,
  }
);

const TamaraWidget = dynamic(
  () => import("@/modules/PaymentGateway/Tamara/TamaraWidget"),
  {
    loading: () => <TabbySkeleton />,
    ssr: false,
  }
);

const ContactDialog = dynamic(() => import("@/modules/dialog/contactDialog"), {
  loading: () => <></>,
  ssr: false,
});

const ProductDetails = ({ data, handleSetItemData, defaultSelectItem }) => {
  const { getMyCartData, cartState } = useCartContext();
  const price = useFloatPrice(data?.LISTING?.PRICE);
  const router = useRouter();
  const { locale, query, push } = router;
  const isDownSm = useResponsive("down", "sm");
  const { slug } = query;
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const [openContact, setOpenContact] = React.useState(false);

  const [openSelectDialog, setOpenSelectDialog] = React.useState(false);
  const line_sys_id = slug && slug?.length > 3 ? slug[4] : 0;
  const category_slug = (slug && slug[0]) || undefined;
  const [showFreeSampleToast, setShowFreeSampleToast] = React.useState(false);
  const [buttonName, setButtonName] = React.useState("Loading...");
  const { cart } = cartState;
  const { modificationUser, countryName, user } = cookies || {};
  const {
    handleSelectDialogDetail,
    handleAddFreeSampleData,
    handleRemoveFreeSampleData,
    productState,
    handleSetSteps,
    setInitialAllCheckedFreeSample,
  } = useProduct();
  const { isLoading } = useProgressRouter();
  const [isStepLoading, setIsStepLoading] = React.useState(false);
  const { productFreeSamples, productSelectDialogDetail } = productState;
  let head_sys_id = modificationUser?.head_sys_id ? modificationUser?.head_sys_id : 0;
  let modify_cust_sys_id = user && user.cust_type == 'ADMIN' && head_sys_id > 0 ? user.cust_id : 0;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openToast, setOpenToast] = React.useState(false);

  React.useEffect(() => {
    if (defaultSelectItem?.SAMPLE_SYS_ID) {
      const splitSampleSysId =
        defaultSelectItem?.SAMPLE_SYS_ID?.split("|") &&
          defaultSelectItem?.SAMPLE_SYS_ID?.split("|")?.length > 0
          ? defaultSelectItem?.SAMPLE_SYS_ID?.split("|")[0]
          : 0;
      setInitialAllCheckedFreeSample([
        {
          SII_CODE: defaultSelectItem?.SII_CODE,
          SAMPLE_SYS_ID: splitSampleSysId,
        },
      ]);
    }
  }, [data, defaultSelectItem, router]);

  const handleOpenCloseContact = () => {
    setOpenContact(!openContact);
  };

  const handleShowToastClose = () => {
    setOpenToast(false);
  };

  const handleShowToastOpen = () => {
    setOpenToast(true);
  };
  const handleShowFreeSampleToastClose = () => {
    setShowFreeSampleToast(false);
  };
  const handleShowFreeSampleToastOpen = () => {
    setShowFreeSampleToast(true);
  };

  const handleAddFreeSample = async (values) => {
    const data = {
      // ...defaultSelectItem,
      ...values?.LISTING,
      item_label: "SAMPLE",
      page_name: "",
      code: defaultSelectItem?.SII_CODE,
      SPI_PR_ITEM_CODE: Number(values?.LISTING?.SPI_PR_ITEM_CODE),
      canvasImg: defaultSelectItem?.gallery[0]?.SLI_IMAGE_PATH,
      cart_status: "COMPLETED",
      m_width: 15,
      m_height: 15,
      count: 1,
      VALUE: 0,
      PRICE: 0,
    };
    if (
      !productFreeSamples.some(
        (item) => item?.SII_CODE == defaultSelectItem?.SII_CODE
      )
    ) {
      if (Number(cart?.countFreeSample) >= 10) {
        handleShowFreeSampleToastOpen();
      } else {
        try {
          const response = await dispatch(addFreeSample(data));
          if (response) {
            handleAddFreeSampleData({
              SII_CODE: defaultSelectItem?.SII_CODE,
              SAMPLE_SYS_ID:
                response?.data?.result && response?.data?.result?.SOL_SYS_ID,
            });
            enqueueSnackbar(`${translate("FreeSampleAddedSuccessfully")}`, {
              variant: "success",
            });
            getMyCartData({
              params: { soh_sys_id: head_sys_id || 0 },
            });
          } else {
            enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
              variant: "error",
            });
          }
        } catch (error) {
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        }
      }
    } else {
      try {
        const response = await dispatch(
          removeFreeSample({
            SAMPLE_SYS_ID: productFreeSamples?.find(
              (item) => item?.SII_CODE == defaultSelectItem?.SII_CODE
            )
              ? productFreeSamples?.find(
                (item) => item?.SII_CODE == defaultSelectItem?.SII_CODE
              )?.SAMPLE_SYS_ID
              : defaultSelectItem?.SAMPLE_SYS_ID
                ? defaultSelectItem?.SAMPLE_SYS_ID.split("|")[0]
                : defaultSelectItem?.SAMPLE_SYS_ID,
          })
        );
        if (response) {
          handleRemoveFreeSampleData({
            SII_CODE: defaultSelectItem?.SII_CODE,
            SAMPLE_SYS_ID:
              response?.data?.result && response?.data?.result?.SOL_SYS_ID,
          });
          getMyCartData({
            params: { soh_sys_id: head_sys_id || 0 },
          });

          enqueueSnackbar(`${translate("FreeSampleRemovedSuccessfully")}`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        }
      } catch (error) {
        console.log("TESTERRIR", error);
        enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
          variant: "error",
        });
      }
    }
  };
  const handleOpenSelectDialog = async (data) => {
    let width = ProductCommonList({
      data:
        data && data?.SPI_WIDTH_STANDARD
          ? data?.SPI_WIDTH_STANDARD?.split(",")
          : [],
      measuring_unit: "cm",
      SPI_RESTRICT_TO_MATERIAL_COMMON_YN: "N",
      SII_COMMON: defaultSelectItem?.SII_WIDTH,
      keyName: "width",
      translate,
    });

    let height = ProductCommonList({
      data:
        data && data?.SPI_HEIGHT_STANDARD
          ? data?.SPI_HEIGHT_STANDARD?.split(",")
          : [],
      measuring_unit: "cm",
      SPI_RESTRICT_TO_MATERIAL_COMMON_YN: "N",
      SII_COMMON: defaultSelectItem?.SII_LENGTH,
      keyName: "height",
      translate,
    });

    handleSelectDialogDetail({
      productSelectDialogDetail: data,
      product_width: width,
      product_height: height,
    });
    setOpenSelectDialog(true);
    handleSetSteps([]);
    await apiClientV2DataService
      .post({
        path: `v2/steps`,
        data: {
          product: data?.SPI_PR_ITEM_CODE,
          sys_id: line_sys_id,
        },
        locale,
      })
      .then((response) => {
        if (response.status === 200) {
          handleSetSteps(response?.data);
          setIsStepLoading(false);
        }
      })
      .catch((error) => {
        console.log("V2-PRODUCT-DETAIL ERROR", error);
      });
  };

  React.useEffect(() => {
    if (line_sys_id && locale) {
      handleOpenSelectDialog({
        defaultSelectItem: defaultSelectItem,
        ...data?.LISTING,
      });
    }
  }, [line_sys_id, locale]);

  const handleCloseSelectDialog = () => {
    setOpenSelectDialog(false);
  };
  const getButtonName = () => {
    if (
      (countryName && countryName == "global") ||
      countryName == "default" ||
      data?.LISTING?.SPI_ADD_TO_CART_TYPE == "B1"
    ) {
      setButtonName("ContactUs");
    } else if (
      ["A5", "A1", "A3", "A4"].includes(data?.LISTING?.SPI_ADD_TO_CART_TYPE)
    ) {
      setButtonName("Select_Options");
    } else if (data?.LISTING?.SPI_ADD_TO_CART_TYPE == "A2") {
      setButtonName("AddtoCart");
    }
  };

  React.useEffect(() => {
    getButtonName();
  }, [locale, data, cookies]);

  const handleClickButton = async () => {
    if (
      (countryName && (countryName == "global" || countryName == "default")) ||
      data?.LISTING?.SPI_ADD_TO_CART_TYPE == "B1"
    ) {
      handleOpenCloseContact();
    } else if (
      ["A5", "A1", "A3", "A4"].includes(data?.LISTING?.SPI_ADD_TO_CART_TYPE)
    ) {
      handleOpenSelectDialog({
        ...data?.LISTING,
        defaultSelectItem: defaultSelectItem,
      });
    } else if (data?.LISTING?.SPI_ADD_TO_CART_TYPE == "A2") {
      try {
        const response = await dispatch(
          addToCart({
            ...defaultSelectItem,
            ...data?.LISTING,
            SPI_PRODUCT_YN: data?.LISTING?.SPI_PRODUCT_YN,
            item_label: "ADD_TO_CART",
            page_name: "",
            code: defaultSelectItem?.SII_CODE,
            SPI_PR_ITEM_CODE: data?.LISTING?.SPI_PR_ITEM_CODE,
            cart_status: "COMPLETED",
            canvasImg: defaultSelectItem?.gallery[0]?.SLI_IMAGE_PATH,
            count: 1,
            soh_sys_id: head_sys_id,
            SOL_MODIFY_CUST_SYS_ID: modify_cust_sys_id,
            SOL_SOH_SYS_ID: head_sys_id
          })
        );
        if (response) {
          handleShowToastOpen();
          getMyCartData({
            params: { soh_sys_id: head_sys_id || 0 },
          });
        }
      } catch (error) {
        console.log("SMART HOME ERROR:", error);
      }
    }
  };
  const breakpoints = {
    320: {
      slidesPerView: 8, // xxs
    },
    420: {
      slidesPerView: 8, // xs
    },
    576: {
      slidesPerView: 8, // xs
    },
    768: {
      slidesPerView: 18, // sm
    },
    1100: {
      slidesPerView: 7.3, // sm
    },
  };
  const maxWidth = {
    md: "100%!important",
    sm: "100%!important",
    xs: "100%!important",
    xxs: "100%!important",
  };
  return (
    <Box component="div">
      <Box
        sx={{ display: { md: "none", sm: "block", xs: "block", xxs: "block" } }}
      >
        <Box my={0}>
          <Typography variant="subtitle1">
            {translate("ChooseFabric")}
            <Typography
              sx={{
                fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                color: (theme) => theme.palette.grey[600],
                fontWeight: "500",
              }}
              component="span"
            >
              {" "}
              {defaultSelectItem?.SII_COLOR_DESC || ""}
            </Typography>
          </Typography>
        </Box>
        <Box component="div" mb={2}>
          <ColorSelect
            isWidthFull={true}
            handleSetItemData={handleSetItemData}
            data={
              data?.LISTING?.items && data?.LISTING?.items?.length > 0
                ? data?.LISTING?.items
                : []
            }
            defaultSelectItemData={defaultSelectItem}
            productData={data}
            breakpoints={breakpoints}
            maxWidth={maxWidth}
            isProductViewDetailRedirect={true}
          />
        </Box>
      </Box>
      {locale != "global-en" && (
        <Box my={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {defaultSelectItem && defaultSelectItem?.DELIVERY_DAYS > 0 && (
              <>
                <DeliveryDays
                  data={data}
                  status_days={
                    defaultSelectItem && defaultSelectItem?.DELIVERY_DAYS
                  }
                  status={defaultSelectItem?.STOCK_STATUS}
                />
              </>
            )}
          </Stack>
        </Box>
      )}

      <Box my="1rem">
        <Typography
          typography="typography15"
          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
          fontWeight={400}
          lineHeight="21px"
        >
          {translate("ItemCode")} :
          <Typography
            typography="typography15"
            ml={0.8}
            fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            sx={{ color: (theme) => theme.palette.grey[600] }}
            fontWeight={400}
            lineHeight="16px"
            component="span"
          >
            <ItemCode code={defaultSelectItem?.SII_ITEM_ID} />
          </Typography>
        </Typography>
        <Typography
          fontSize="28px"
          component="h1"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          lineHeight="34px"
        >
          {data?.LISTING?.DESCRIPTION} - {defaultSelectItem?.SII_COLOR_DESC}
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={{ lg: 10, md: 4, sm: 17, xs: 15, xxs: 15 }}
        mb={2}
        justifyContent={
          data && data?.LISTING?.OFFER_PCT != null ? "none" : "space-between"
        }
      >
        <Box>
          {category_slug != "smart-home" && category_slug != "furnishings" && (
            <Typography
              typography="typography12"
              component="p"
              lineHeight="8px"
              color="primary.darker"
              fontWeight={400}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
            >
              {translate("PricesFrom")}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "400",
              lineHeight: "normal",
              color: (theme) => theme.palette.primary.darker,
            }}
            fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
            component="span"
          >
            {translate(data?.LISTING?.SFP_CCY_CODE)}
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              ml: 0.8,
              color: (theme) => theme.palette.primary.darker,
            }}
            fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
            component="span"
          >
            <FloatPrice price={data?.LISTING?.PRICE} />
          </Typography>
        </Box>
        {locale != "global-en" && (
          <>
            <Box>
              {data && data?.LISTING?.OFFER_PCT != null && (
                <Box>
                  <Typography
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    sx={{
                      fontSize: "16px",
                      color: (theme) => theme.palette.grey[1200],
                      textDecoration: "line-through",
                      textDecorationColor: (theme) =>
                        theme.palette.secondary.lighterBlue,
                    }}
                    component="span"
                    variant="span"
                  >
                    {translate(data?.LISTING?.SFP_CCY_CODE)}{" "}
                    <FloatPrice price={data?.LISTING?.PRICE_OLD} />
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: (theme) => theme.palette.secondary.lighterBlue,
                    }}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    component="h2"
                    variant="span"
                    fontWeight={200}
                  >
                    {translate("save_up_to", {
                      offer_badge: data?.LISTING?.OFFER_PCT,
                    })}
                  </Typography>
                </Box>
              )}
            </Box>
            {data?.LISTING?.SFI_SAMPLE_APP_YN == "Y" && (
              <Box
                sx={{
                  display: {
                    xxs: "none",
                    xs: "none",
                    sm: "block",
                    md: "block",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    border: (theme) =>
                      `1px solid ${theme.palette.common.black}`,
                    pr: 1,
                    py: 1,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleAddFreeSample({
                      ...data,
                      defaultSelectItem: defaultSelectItem,
                    });
                  }}
                >
                  {productFreeSamples.some(
                    (item) => item?.SII_CODE == defaultSelectItem?.SII_CODE
                  ) ? (
                    <>
                      <IconButton>
                        <NextLazyLoadImage
                          src="/assets/icon/product/sample_check.svg"
                          alt="sample_uncheck"
                          width={33}
                          height={33}
                          sx={{
                            width: "25px!important",
                            height: "100%!important",
                            objectFit: "cover!important",
                            backgroundSize: "contain",
                            backgroundColor: (theme) =>
                              theme.palette.primary.iconColor,
                          }}
                          sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                          objectFit="contain"
                          upLgWidth={33}
                          downLgWidth={33}
                          downMdWidth={33}
                          downSmWidth={870}
                          downXsWidth={582}
                        />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton>
                      <NextLazyLoadImage
                        src="/assets/icon/product/sample_uncheck.png"
                        alt="sample_uncheck"
                        width={33}
                        height={33}
                        sx={{
                          width: "25px!important",
                          height: "100%!important",
                          objectFit: "cover!important",
                          backgroundSize: "contain",
                          backgroundColor: (theme) =>
                            theme.palette.primary.iconColor,
                        }}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                        objectFit="contain"
                        upLgWidth={33}
                        downLgWidth={33}
                        downMdWidth={33}
                        downSmWidth={870}
                        downXsWidth={582}
                      />
                    </IconButton>
                  )}
                  <Typography
                    fontSize={18}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                  >
                    {productFreeSamples.some(
                      (item) => item?.SII_CODE == defaultSelectItem?.SII_CODE
                    )
                      ? `${translate("Remove")}`
                      : `${translate("FreeSample")}`}
                  </Typography>
                </Stack>
              </Box>
            )}
          </>
        )}
      </Stack>
      {locale != "global-en" && (
        <Stack spacing={2} my={2}>
          {isLoading ? (
            <TabbySkeleton />
          ) : (
            <TabbyPromoMgs tab_name="cartpageId" amount={price} />
          )}
          {isLoading ? (
            <TabbySkeleton />
          ) : (
            <TamaraWidget
              tab_name="materialId"
              inline_type="2"
              amount={price}
            />
          )}
        </Stack>
      )}
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          <Grid
            item
            md={6}
            sm={6}
            xs={6}
            xxs={6}
            sx={{
              borderRight: (theme) => `1px solid ${theme.palette.grey[1200]}`,
            }}
          >
            <Box>
              <Typography
                variant="typography16"
                component="p"
                sx={{
                  color: (theme) => theme.palette.grey[1200],
                  lineHeight: "28px",
                  fontWeight: 400,
                }}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              >
                {translate("Collection")}
              </Typography>
              <Typography
                variant="h5"
                lineHeight="28px"
                fontWeight={400}
                color={(theme) => theme.palette.common.black}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              >
                {data?.LISTING?.SFI_COLLECTION_DESC}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={6} sm={6} xs={6} xxs={6}>
            <Box sx={{ pl: 3 }}>
              <Typography
                variant="typography16"
                component="p"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                sx={{
                  color: (theme) => theme.palette.grey[1200],
                  lineHeight: "28px",
                }}
              >
                {translate("Brand")}
              </Typography>
              <Box mt={0.5} maxWidth="30%">
                <LazyLoadImage
                  effect="blur"
                  className="img-fluid"
                  wrapperProps={
                    data?.LISTING?.BRAND_DESC === "Jannelli & Volpi"
                      ? { style: { width: "50px", display: "inline-block" } }
                      : { style: { width: "90px", display: "inline-block" } }
                  }
                  src={data?.LISTING?.BRAND_IMAGE_PATH}
                  alt="brandImage"
                  width="auto"
                  height="auto"
                  style={{ maxHeight: "50px" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        sx={{ display: { md: "block", sm: "none", xs: "none", xxs: "none" } }}
      >
        <Box my={2}>
          <Typography
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            fontSize={(theme) => theme.typography.typography17}
            color={(theme) => theme.palette.common.black}
            fontWeight={400}
            lineHeight="16px"
            component="h5"

          >
            {translate("ChooseFabric")}
            <Typography
              sx={{
                color: (theme) => theme.palette.grey[600],
                fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                fontWeight: 400,
                lineHeight: "16px",
                fontSize: "18px",
              }}
              component="span"
            >
              {" "}
              {defaultSelectItem?.SII_COLOR_DESC || ""}
            </Typography>
          </Typography>
        </Box>
        <Box component="div" mb={2}>
          <ColorSelect
            isMoreColor={false}
            isWidthFull={true}
            handleSetItemData={handleSetItemData}
            data={
              data?.LISTING?.items && data?.LISTING?.items?.length > 0
                ? data?.LISTING?.items
                : []
            }
            defaultSelectItemData={defaultSelectItem}
            productData={data}
            breakpoints={breakpoints}
            maxWidth={maxWidth}
            isProductViewDetailRedirect={true}
          />
        </Box>
        <Divider />
      </Box>
      <Box>
        <Box>
          <List>
            <ListItem disablePadding>
              <ProductDetailListItem>
                <ProductDetailsCheckList
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: data?.LISTING?.SPI_FEATURES,
                  }}
                  sx={{
                    "& h2": {
                      margin: 0,
                    },
                  }}
                />
              </ProductDetailListItem>
            </ListItem>
          </List>
        </Box>
        <Box
          component="div"
          sx={{
            position: {
              lg: "inherit",
              md: "inherit",
              sm: "sticky",
              xs: "sticky",
              xxs: "sticky",
            },
            bottom: 0,
            zIndex: 1199,
            bgcolor: "common.white",
          }}
        >
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              onClick={() => handleClickButton(data)}
              color="dark"
              fullWidth
              sx={(theme) => ({
                py: 2,
                borderRadius: "0px",
                color: theme.palette.common.white,
                backgroundColor: theme.palette.common.black,
                fontSize: "15.4px",
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                fontWeight: 400,
              })}
            >
              <Iconify
                icon="mdi:cart-outline"
                sx={{
                  mr: 1,
                  display: {
                    lg: "block",
                    md: "block",
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  },
                }}
              />
              {translate(buttonName)}
            </Button>
            {(locale != "global-en" &&
              slug != "wallpaper" &&
              (data?.LISTING?.SPI_ADD_TO_CART_TYPE != "A5") ||
              data?.LISTING?.SPI_ALLOW_CUSTOMIZATION_YN == "Y") &&
              brand_name.indexOf(data?.LISTING?.BRAND_DESC) == -1 && (
                <Link
                  variant="contained"
                  fullWidth
                  // onClick={() =>
                  //   push(
                  //     `/${query?.slug?.[0]}/${query?.slug?.[1]}/${query?.slug?.[2]}/${query?.slug?.[3]}/customize`
                  //   )
                  // }
                  href={`/${query?.slug?.[0]}/${query?.slug?.[1]}/${query?.slug?.[2]}/${query?.slug?.[3]}/customize`}
                  sx={(theme) => ({
                    py: { md: 2, sm: 1, xs: 0, xxs: 0 },
                    px: { md: 2, sm: 1, xs: 0, xxs: 0 },
                    borderRadius: "0px",
                    fontSize: "15.4px",
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontWeight: 400,
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.secondary.lightPurple,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.lightPurple,
                      textDecoration: 'none'
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: "15px",
                    width: "100%",
                    pl: isDownSm ? "15px" : "0px",
                  })}
                >
                  {!isDownSm && (
                    <NextFillImage
                      src={`/assets/icon/product/Group 22922.png`}
                      alt="1"
                      sx={{
                        width: "20px!important",
                        objectFit: "cover",
                        mr: "15px",
                        float: "left",
                        "&.MuiCard-root": {
                          borderRadius: 0,
                          boxShadow: "none",
                          position: "relative!important",
                        },
                      }}
                    />
                  )}
                  {translate("AdvancedCustomization")}
                </Link>
              )}
          </Stack>
        </Box>
      </Box>
      {openContact && (
        <ContactDialog
          open={openContact}
          handleOpenClose={handleOpenCloseContact}
        />
      )}
      {
        openSelectDialog && (
          <SelectDialog
            data={productSelectDialogDetail}
            open={openSelectDialog}
            handleOpenClose={handleCloseSelectDialog}
            handleSetItemData={handleSetItemData}
            isStepLoading={isStepLoading}
          // isProductViewDetailRedirect={true}
          />
        )
      }
      <ToastMessage
        open={openToast}
        content={
          <>
            <Typography
              component="p"
              variant="typography19"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              fontWeight={500}
            >
              {`${translate("is_added_to_cart", {
                product_name: data?.LISTING?.SFP_TITLE,
              })}`}
            </Typography>
          </>
        }
        handleClose={handleShowToastClose}
        isButtonShow={true}
        spacing={2}
        icon="/assets/icon/auth/success.png"
      />
      <ToastMessage
        open={showFreeSampleToast}
        title={`${translate("maximum_limit_for_free_sample")}`}
        handleClose={handleShowFreeSampleToastClose}
        icon="/assets/icon/warning/warning.png"
        titleSx={{ textAlign: "center" }}
      />
    </Box >
  );
};

export default ProductDetails;
