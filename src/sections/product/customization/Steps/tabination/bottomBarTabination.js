import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify/Iconify";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { CustomLink } from "@/components/link";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { showScanner } from "@/redux/slices/scannerSlice";
import { decrementStep, incrementStep } from "@/redux/slices/stepSlice";
import { useEffect, useState } from "react";
import PopupModal from "@/app/components/PopupModal";
import { addToCartFunScene } from "@/sections/product/customization/addToCartFunScene";
import { toast } from "react-toastify";
import {
  removecart,
  resetState,
  setCustomerSysId,
  setCustomerSystemId,
  setGeoLocationDetails,
  setOrderList,
  loadingfalse,
} from "@/redux/slices/customization";

import CircularProgress from "@mui/material/CircularProgress";
import { setStepIndex } from "@/redux/slices/tourSlice";
import axios from "axios";
import DotLoading from "@/app/components/DotLoading";

const BottomBarTabination = ({
  setTabChange,
  tabChange,
  onNextHandle,
  onPreviousHandle,
  priceArray,
  stepsArray,
  productInfo,
  handleAddToCart,
  handleSubmit,
  formClose,
  setFormClose,
  setAddToCartShow,
  customerSysId,
  customization_info,
}) => {
  const { t: translate } = useTranslation();
  const { locale, query } = useRouter();
  const { slug } = query;
  const sys_id = slug && slug.length === 7 ? slug[6] : 0;
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};

  const paramKeys = Object.keys(query);

  console.log("tabChangeeeeeeeeee", tabChange);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (priceArray.SOL_VALUE && stepsArray && Object.keys(stepsArray).length > 8) {
      setIsLoading(false); 
    // }
  }, [priceArray.SOL_VALUE]);

  const fonts = useSelector((state) => state.font);
  const {isMaterialCustomizationLoading} = useSelector((state) => state.customization);

  const dispatch = useDispatch();

  const handleHome = () => {
    dispatch(showScanner(true));
    dispatch(decrementStep(0));
  };

  const handleAddToCartIfVistiorId = async () => {
    try {
      console.log(
        "Dispatching removecart and decrementStep before fetchOrderList"
      );

      const result = await addToCartFunScene(
        {
          ...cookies,
          ...customization_info,
          locale: locale,
          customerSysIdnew: customerSysId,
          cart_status: "COMPLETED",
        },
        dispatch
      );

      toast.success("Add to cart successfully!", {
        position: "top-right",
        style: {
          background: "linear-gradient(45deg,rgb(22, 160, 54),rgb(97, 238, 72))",
          color: "white",
        },
      });

      dispatch(resetState());


    } catch (error) {
      console.error("Failed to add to cart:", error);
    }

    // Ensure customerId and userId are defined before use
    if (!cookies.visitorId || !customerSysId) {
      console.error("Missing customerId or userId");
      return;
    }

    // Ensure dispatching occurs before the API request

    if (paramKeys.length > 0) {
      setTabChange(1);
    } else {
      dispatch(removecart());
      dispatch(decrementStep(0));
    }

    console.log("VisitorIdUserId", cookies.visitorId, customerSysId);

    try {
      dispatch(setOrderList(null));

      const response = await axios.get(
        `https://migapi.sedarglobal.com/kiosk/order/orderList?lang=en&site=100001&country=uae&visitorId=${cookies.visitorId}&userId=${customerSysId}&currency=AED&ccy_decimal=0&cn_iso=AE&locale=${locale}&$detect_country=`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      dispatch(
        setOrderList({
          complete: response.data.complete,
          cart_count: response.data.cart_count,
          total_price: response.data.total_price,
        })
      );

      if (paramKeys.length > 0) {
        setTabChange(1);
      }else{
        dispatch(resetState());
      }

     
    } catch (error) {
      console.error("Failed to fetch order list:", error);
    }
  };


  const tourState = useSelector((state) => state.tour);

  return (
    <Box
      sx={{
        height: "auto",
        width: {
          lg: "42vw",
          md: "42vw",
          sm: "100%",
          xs: "100%",
        },
        "@media (min-width:290px) and (max-width:599px)": {
          width: "100vw",
        },
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        gap: "8px",
        flexWrap: "nowrap",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          position: {
            lg: "unset",
            xl: "unset",
            xs: "fixed",
            md: "fixed",
            sm: "fixed",
          },
          overflow: "hidden",
          bottom: { xs: 0, md: 0, sm: 0 },
          left: 0,
          zIndex: 1000,
          // boxShadow: "0 -3px 11px -3px rgba(0, 0, 0, 0.1)",
          pb: "10px",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            paddingRight: "10px",
            paddingLeft: "10px",
          }}
        >
          <Grid item xs={7} pt={"0 !important"}>
            {tabChange !== 6 && (
              <>
                <Typography
                  sx={{
                    fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
                    color: "#010101",
                    paddingTop: "25px",
                    textAlign: "start",
                    fontSize: "16px !important",
                    // paddingLeft: "20px",
                  }}
                  gutterBottom
                  variant="p"
                  component="div"
                >
                  {stepsArray?.MATERIAL_SELECTION?.material_info?.SII_ITEM_ID?.split(
                    "-"
                  )
                    ?.splice(1)
                    ?.join("-")}{" "}
                  - {stepsArray.MATERIAL_SELECTION?.material_info?.COLOR_DESC}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                    color: "#010101",
                    textAlign: "start",
                    fontSize: "16px !important",
                    // paddingLeft: "20px",
                  }}
                  gutterBottom
                  variant="p"
                  component="div"
                >
                  {productInfo && productInfo.SPI_TOOLTIP
                    ? productInfo.SPI_TOOLTIP
                    : ""}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item xs={5} pt={"0 !important"}>
              <Typography
                sx={{
                  fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                  color: "#010101",
                  paddingTop: "25px",
                  textAlign: "end",
                  fontSize: "16px !important",
                }}
                gutterBottom
                variant="p"
                component="div"
              >
                {translate("Total")} {translate(cookies?.CCYCODE || "AED")}{" "}
                {!isMaterialCustomizationLoading && !isLoading && priceArray.SOL_VALUE > 0 ? (priceArray.SOL_VALUE ? priceArray.SOL_VALUE : 0) : <DotLoading/>}
              </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2} // Adds space between child Grid items
          justifyContent="space-between"
          alignItems="center"
          sx={{
            paddingRight: "10px",
            paddingLeft: "10px",
            // paddingBottom: "10px",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "start",
            }}
          >
            {tabChange >= 1 && (
              <Button
                size="large"
                variant="outlined"
                onClick={() => {
                  if (tabChange === "1") {
                    console.log("tabChangetabChange", tabChange);
                    // dispatch(resetState());
                     dispatch(removecart());
                    // dispatch(loadingfalse(true));
                  }

                  // if(tabChange === "2"){
                  //   dispatch(resetState());
                  // }
                  dispatch(setStepIndex(tourState.stepIndex - 1));

                  onPreviousHandle("PREV");
                }}
                startIcon={<ArrowCircleLeftIcon color="black" />}
              >
                Previous
              </Button>
            )}

            {/* {tabChange === 1 && (
              <Button
                size="large"
                variant="outlined"
                onClick={handleHome}
                startIcon={<HomeIcon color="black" />}
              >
                Home
              </Button>
            )} */}
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "end",
            }}
          >
            {tabChange != "5" && priceArray.SOL_VALUE > 0 && (
              <Button
                className={
                  tabChange === "1"
                    ? "continue3"
                    : tabChange === "2"
                    ? "continue4"
                    : tabChange === "3"
                    ? "continue5"
                    : tabChange === "4"
                    ? "continue6"
                    : ""
                }
                size="large"
                variant="outlined"
                onClick={() => {
                  dispatch(setStepIndex(tourState.stepIndex + 1));
                  onNextHandle("NEXT");
                }}
                endIcon={<ArrowCircleRightIcon color="black" />}
              >
                Continue
              </Button>
            )}

            {tabChange == "5" && priceArray.SOL_VALUE > 0 && (
              <Button
                size="large"
                variant="outlined"
                onClick={() =>
                  !customerSysId
                    ? handleAddToCart()
                    : handleAddToCartIfVistiorId()
                }
                startIcon={<LocalMallIcon color="black" />}
              >
                Add To Cart
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BottomBarTabination;
