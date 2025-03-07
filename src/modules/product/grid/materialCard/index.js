import { useAuthContext } from "@/auth/useAuthContext";
import useResponsive from "@/hooks/useResponsive";
import useCartContext from "@/provider/cart/cartContext";
import useProduct from "@/provider/product/useProduct";
import { addToCart } from "@/redux/slices/product";
import { useDispatch } from "@/redux/store";
import { HoverCard } from "@/styles/product";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ColorSelect from "../../colorSelect";
import FloatPrice from "../../floatPrice";
import ItemCode from "../../itemCode";
import AddWishlistIcon from "./addWishlistIcon";
import Gallery from "./gallery";
import HoverButton from "./hoverButton";

const ToastMessage = dynamic(() => import("@/components/dialog/toastMessage"), {
  loading: () => <></>,
  ssr: false,
});

const MaterialCard = ({
  data,
  handleOpenCloseContact,
  handleOpenSelectDialog,
  handleOpenWishlistDialog,
  handleAddFreeSample,
  type,
  gridView,
  width = {
    md: "auto!important",
    sm: "40%!important",
    xs: "90%!important",
    xxs: "90%!important",
  },
  viewNumber,
}) => {
  const [defaultSelectItem, setDefaultSelectItem] = React.useState(
    data?.items && data?.items?.length > 0 ? data?.items?.[0] : {}
  );
  const { getMyCartData } = useCartContext();
  const { productState, setInitialProductAllCheckedFreeSample } = useProduct();
  const { productFreeSamples } = productState;
  const isSmallScreen = useResponsive("down", "md");
  const isUpMd = useResponsive("up", "md");
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale, query } = router;
  const { slug } = query;
  const { state, setCartPopupOpen } = useAuthContext();
  const { cookies } = state;
  const { modificationUser, countryName } = cookies || {};
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;
  const [showFreeSampleToast, setShowFreeSampleToast] = React.useState(false);

  const category_slug = (slug && slug[0]) || undefined;

  const [hoverButtonName, setHoverButtonName] = React.useState("Loading...");
  const [openToast, setOpenToast] = React.useState(false);
  React.useEffect(() => {
    setDefaultSelectItem(
      data?.items && data?.items?.length > 0 ? data?.items?.[0] : {}
    );
  }, [data?.items]);

  React.useEffect(() => {
    if (data?.items && data?.items?.length > 0) {
      let defaultSampleChecked = [];

      data?.items?.forEach((item) => {
        if (item?.SAMPLE_SYS_ID) {
          const splitSampleSysId =
            item?.SAMPLE_SYS_ID?.split("|") &&
              item?.SAMPLE_SYS_ID?.split("|")?.length > 0
              ? item?.SAMPLE_SYS_ID?.split("|")[0]
              : 0;

          defaultSampleChecked.push({
            SII_CODE: item?.SII_CODE,
            SAMPLE_SYS_ID: splitSampleSysId,
          });
        }
      });
      setInitialProductAllCheckedFreeSample(defaultSampleChecked);
    }
  }, [data?.items, router]);

  const handleSelectDefaultItem = (item) => {
    setDefaultSelectItem(item);
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
  const getHoverButtonName = () => {
    if (type != "free_sample") {
      if (
        (countryName && ["global", "default"].includes(countryName)) ||
        data?.SPI_ADD_TO_CART_TYPE == "B1"
      ) {
        setHoverButtonName("ContactUs");
      } else if (
        ["A5", "A1", "A3", "A4"].includes(data?.SPI_ADD_TO_CART_TYPE) &&
        data?.SPI_PRODUCT_YN != "N"
      ) {
        setHoverButtonName("Select_Options");
      } else if (
        ["A3", "A1"].includes(data?.SPI_ADD_TO_CART_TYPE) &&
        data?.SPI_PRODUCT_YN != "Y"
      ) {
        setHoverButtonName("Select_Options");
      } else if (
        ["A2", "A4"].includes(data?.SPI_ADD_TO_CART_TYPE) &&
        data?.SPI_PRODUCT_YN != "Y"
      ) {
        setHoverButtonName("AddtoCart");
      }
    } else {
      if (
        productFreeSamples.some(
          (item) => item?.SII_CODE == defaultSelectItem?.SII_CODE
        )
      ) {
        setHoverButtonName("Remove");
      } else {
        setHoverButtonName("free_sample");
      }
    }
  };

  React.useEffect(() => {
    getHoverButtonName();
  }, [locale, data, cookies, productFreeSamples]);

  const handleClickHoverButton = async () => {
    if (type != "free_sample") {
      if (
        (countryName && ["global", "default"].includes(countryName)) ||
        data?.SPI_ADD_TO_CART_TYPE == "B1"
      ) {
        handleOpenCloseContact();
      } else if (
        ["A5", "A1", "A3", "A4"].includes(data?.SPI_ADD_TO_CART_TYPE) &&
        data?.SPI_PRODUCT_YN != "N"
      ) {
        handleOpenSelectDialog({
          ...data,
          defaultSelectItem: defaultSelectItem,
        });
      } else if (
        ["A3", "A1"].includes(data?.SPI_ADD_TO_CART_TYPE) &&
        data?.SPI_PRODUCT_YN != "Y"
      ) {
        handleOpenSelectDialog({
          ...data,
          defaultSelectItem: defaultSelectItem,
        });
      } else if (
        ["A2", "A4"].includes(data?.SPI_ADD_TO_CART_TYPE) &&
        data?.SPI_PRODUCT_YN != "Y"
      ) {
        const responseData = {
          ...defaultSelectItem,
          ...data,
          canvasImg: defaultSelectItem?.gallery[0]?.SLI_IMAGE_PATH,
          SPI_PRODUCT_YN: data?.SPI_PRODUCT_YN,
          item_label: "ADD_TO_CART",
          page_name: "",
          code: defaultSelectItem?.SII_CODE,
          SPI_PR_ITEM_CODE: data?.SPI_PR_ITEM_CODE,
          cart_status: "COMPLETED",
          count: 1,
          STEPS: "",
          VALUE: data?.PRICE,
        };
        try {
          GoogleAnalytics && GoogleAnalytics.addToCart(responseData);

          const response = await dispatch(addToCart(responseData));
          if (response?.data) {
            handleShowToastOpen();
            getMyCartData({
              params: { soh_sys_id: head_sys_id || 0 },
            });

            setCartPopupOpen(true);
          }
        } catch (error) {
        }
      }
    } else {
      handleAddFreeSample(
        {
          ...data,
          defaultSelectItem: defaultSelectItem,
        },
        productFreeSamples
      );
    }
  };
  const breakpoints = {
    320: {
      slidesPerView: 3.3, // xxs
    },
    420: {
      slidesPerView: 4.3, // xs
    },
    576: {
      slidesPerView: 5.3, // xs
    },
    768: {
      slidesPerView: 7.3, // sm
    },
  };
  const maxWidth = "100%!important";
  return (
    <>
      <HoverCard className="hover">
        <Box
          component="div"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            flexBasis: "1 1 auto",
          }}
        >
          <Box
            component="div"
            sx={{ position: "relative", height: "max-content" }}
          >
            <AddWishlistIcon
              handleAddFreeSample={handleAddFreeSample}
              handleOpenWishlistDialog={handleOpenWishlistDialog}
              data={data}
              handleShowFreeSampleToastOpen={handleShowFreeSampleToastOpen}
              type={type}
              defaultSelectItem={defaultSelectItem}
            />

            <HoverButton
              type={type}
              handleOpenCloseContact={handleOpenCloseContact}
              handleOpenSelectDialog={handleOpenSelectDialog}
              data={data}
              defaultSelectItem={defaultSelectItem}
              gridView={gridView}
              hoverButtonName={hoverButtonName}
              handleClickHoverButton={handleClickHoverButton}
            />
            <Gallery
              data={
                defaultSelectItem?.gallery &&
                  defaultSelectItem?.gallery?.length > 0
                  ? defaultSelectItem?.gallery
                  : []
              }
              urlData={data}
              defaultSelectItem={defaultSelectItem}
            />
          </Box>
          <Box
            sx={(theme) => ({
              padding: "15px!important",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              [theme.breakpoints.down("md")]: {
                padding: "8px!important",
              },
            })}
          >
            {isSmallScreen ? (
              <Box>
                <ColorSelect
                  handleSetItemData={handleSelectDefaultItem}
                  data={
                    data && data?.items && data?.items?.length > 0
                      ? data?.items
                      : []
                  }
                  defaultSelectItemData={defaultSelectItem}
                  breakpoints={breakpoints}
                  maxWidth={maxWidth}
                />
                {defaultSelectItem?.STOCK_STATUS == "ONDEMAND" ? (
                  <Chip
                    sx={(theme) => ({
                      height: 28,
                      marginTop: { md: 0, sm: 1, xs: 1, xxs: 1 },
                      mb: 1,
                      ...theme.typography.typography14,
                      fontFamily: theme.fontFaces.HelveticaNeue,
                      lineHeight: "17px",
                      fontWeight: 500,
                      backgroundColor: "#4b4b4b",
                      borderRadius: "0px",
                      color: theme.palette.common.white,
                    })}
                    label={translate("ONDEMAND")}
                    variant="contained"
                  />
                ) : (
                  ""
                )}
                {defaultSelectItem?.STOCK_STATUS == "EXPRESS" ? (
                  <Chip
                    sx={(theme) => ({
                      ".MuiChip-label": {
                        fontFamily: theme.fontFaces.helveticaNeueBold,
                        fontWeight: 200,
                      },
                      height: 28,
                      ...theme.typography.typography14,
                      marginTop: { md: 0, sm: 1, xs: 1, xxs: 1 },
                      lineHeight: "17px",
                      backgroundColor: (theme) => theme.palette.grey[6100],
                      borderRadius: "0px",
                      color: theme.palette.common.white,
                      backgroundColor: theme.palette.primary.mainLight,
                    })}
                    label={translate("EXPRESS")}
                    variant="contained"
                  />
                ) : (
                  ""
                )}
              </Box>
            ) : (
              ""
            )}
            <Stack
              justifyContent="space-between"
              direction="row"
              alignItems={{
                lg: "center",
                md: "center",
                sm: "start",
                xs: "start",
                xxs: "start",
              }}
              mb={1}
              flexWrap="nowrap"
            >
              <Stack spacing={0.5} width="100%">
                <Box component="div" sx={{ width: "100%" }}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{
                      mb: 0,
                    }}
                    color="primary.darker"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                  >
                    {category_slug == "wallpaper" ? (
                      <Typography
                        gutterBottom
                        variant="caption"
                        component="p"
                        sx={{
                          mb: 0,
                        }}
                        color="primary.darker"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueBold
                        }
                      >
                        {translate("total_price_of_rolls", {
                          roll: data?.LEADER_QTY,
                        })}
                      </Typography>
                    ) : type != "free_sample" &&
                      category_slug != "smart-home" &&
                      category_slug != "furnishings" ? (
                      <Typography
                        gutterBottom
                        variant="typography12"
                        component="p"
                        sx={{
                          mb: 0,
                          fontWeight: 400,
                          lineHeight: "14px",
                        }}
                        color="primary.darker"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueBold
                        }
                      >
                        {translate("PricesFrom")}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Typography>
                  {type != "free_sample" ? (
                    <Typography
                      component="span"
                      color="primary.darker"
                      fontSize={{
                        lg: "21px",
                        md: "21px",
                        sm: "14px",
                        xs: "14px",
                        xxs: "14px",
                      }}
                      lineHeight="24px"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                    >
                      {translate(data.SFP_CCY_CODE)}{" "}
                      <FloatPrice price={data?.PRICE} />
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
                {Number(data?.FROM_PRICE_OLD) > Number(data?.FROM_PRICE) && (
                  <Stack
                    direction={{
                      lg: "row",
                      md: "column",
                      sm: "row",
                      xs: "column",
                      xxs: "column",
                    }}
                    spacing={0.5}
                    alignItems={{
                      lg: "center",
                      md: "left",
                      sm: "left",
                      xs: "left",
                      xxs: "left",
                    }}
                  >
                    <Typography
                      variant="typography12"
                      component="p"
                      color={(theme) => theme.palette.grey[4100]}
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      sx={(theme) => ({
                        textDecoration: "line-through",
                        textDecorationColor: theme.palette.error.main,
                      })}
                    >
                      {translate(data.SFP_CCY_CODE)}{" "}
                      <FloatPrice price={data?.PRICE_OLD} />
                    </Typography>

                    <Typography
                      variant="typography14"
                      component="p"
                      color={(theme) => theme.palette.error.darkerRed}
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                      sx={(theme) => ({
                        textDecorationColor: theme.palette.error.main,
                      })}
                    >
                      {translate(`off_percentage`, {
                        val: data?.OFFER_PCT,
                      })}
                    </Typography>
                  </Stack>
                )}
              </Stack>
              <Tooltip title={data?.BRAND_DESC}>
                <Stack width="75%" alignItems="self-end" mt={0.3}>
                  <LazyLoadImage
                    effect="blur"
                    className="img-fluid"
                    src={data.BRAND_IMAGE_PATH}
                    alt={data.BRAND_DESC}
                    width="auto"
                    height="auto"
                    style={{ maxHeight: "50px" }}
                  />
                </Stack>
              </Tooltip>
            </Stack>
            <Stack
              flexWrap="wrap"
              justifyContent="space-between"
              direction="row"
            >
              <Typography
                gutterBottom
                variant="typography33"
                component="span"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                sx={(theme) => ({
                  fontWeight: 400,
                  color: theme.palette.grey[2400],
                  lineHeight: "19px",
                  mb: 0,
                })}
              >
                <ItemCode code={defaultSelectItem?.SII_ITEM_ID} />
              </Typography>
            </Stack>
            <Typography
              component="h3"
              variant="typography34"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              fontWeight={400}
              lineHeight="22px"
              color={(theme) => ({ color: theme.palette.common.black })}
            >
              {data?.DESCRIPTION} - {defaultSelectItem?.SII_COLOR_DESC}
              {category_slug == "furnishings" &&
                data.SPI_WIDTH_STANDARD > 0 &&
                data.SPI_HEIGHT_STANDARD > 0
                ? " - " +
                data.SPI_WIDTH_STANDARD +
                " x " +
                data.SPI_HEIGHT_STANDARD +
                translate("cm")
                : ""}
            </Typography>
            {isUpMd ? (
              <Box
                component="div"
                sx={{
                  flex: 1,
                }}
              >
                <ColorSelect
                  viewNumber={
                    !viewNumber && gridView == 3 ? 3 : viewNumber ? 6 : 5
                  }
                  handleSetItemData={handleSelectDefaultItem}
                  data={
                    data && data?.items && data?.items?.length > 0
                      ? data?.items
                      : []
                  }
                  defaultSelectItemData={defaultSelectItem}
                  breakpoints={breakpoints}
                  maxWidth={maxWidth}
                />
                {defaultSelectItem?.STOCK_STATUS == "ONDEMAND" ? (
                  <Chip
                    sx={(theme) => ({
                      marginTop: { md: 0, sm: 2, xs: 2, xxs: 2 },
                      ...theme.typography.typography14,
                      fontFamily: theme.fontFaces.HelveticaNeue,
                      lineHeight: "17px",
                      fontWeight: 500,
                      backgroundColor: "#4b4b4b",
                      borderRadius: "0px",
                      color: theme.palette.common.white,
                    })}
                    label={translate("ONDEMAND")}
                    variant="contained"
                  />
                ) : (
                  ""
                )}
                {defaultSelectItem?.STOCK_STATUS == "EXPRESS" ? (
                  <Chip
                    sx={(theme) => ({
                      height: 28,
                      marginTop: { md: 0, sm: 2, xs: 2, xxs: 2 },
                      ...theme.typography.typography14,
                      fontFamily: theme.fontFaces.HelveticaNeue,
                      lineHeight: "17px",
                      fontWeight: 500,
                      backgroundColor: (theme) => theme.palette.grey[6100],
                      borderRadius: "0px",
                      color: theme.palette.common.white,
                      backgroundColor: theme.palette.primary.mainLight,
                    })}
                    label={translate("EXPRESS")}
                    variant="contained"
                  />
                ) : (
                  ""
                )}
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: { md: "none", sm: "none", xs: "block", xxs: "block" },
            width: "100%",
            padding: "12px!important",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            color="dark"
            sx={(theme) => ({
              // mt: 2,
              ...theme.typography.typography15,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              borderRadius: "5px",
              border: `2px solid ${theme.palette.grey[4500]}`,
              color: (theme) => theme.palette.dark.darker,
              minHeight: "50px",
              fontWeight: 500,
            })}
            onClick={() => {
              handleClickHoverButton(data);
            }}
            aria-label="contact us"
          >
            {translate(hoverButtonName)}
          </Button>
        </Box>
      </HoverCard>
      {openToast && (
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
                  product_name: data.SFP_TITLE,
                })}`}
              </Typography>
            </>
          }
          handleClose={handleShowToastClose}
          isButtonShow={true}
          spacing={2}
          icon="/assets/icon/auth/success.png"
        />
      )}
      {openToast && (
        <ToastMessage
          open={showFreeSampleToast}
          title={`${translate("maximum_limit_for_free_sample")}`}
          handleClose={handleShowFreeSampleToastClose}
          icon="/assets/icon/warning/warning.png"
          titleSx={{ textAlign: "center" }}
        />
      )}
    </>
  );
};
MaterialCard.propTypes = {
  handleOpenCloseContact: PropTypes.func,
};

MaterialCard.defaultProps = {
  handleOpenCloseContact: () => { },
};

export default MaterialCard;
