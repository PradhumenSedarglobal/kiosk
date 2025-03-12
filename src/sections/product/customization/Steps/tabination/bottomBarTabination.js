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
}) => {
  const { t: translate } = useTranslation();
  const { locale, query } = useRouter();
  const { slug } = query;
  const sys_id = slug && slug.length === 7 ? slug[6] : 0;
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};

  console.log("priceArray", priceArray);
  console.log("productInfo?.CCY_CODE", productInfo?.CCY_CODE);
  console.log("productInfoooo", productInfo);

  useEffect(() => {
    console.log("priceArray.SOL_PRICE", priceArray.SOL_VALUE);
  }, [priceArray.SOL_VALUE]);

  const fonts = useSelector((state) => state.font);

  const dispatch = useDispatch();

  const handleHome = () => {
    dispatch(showScanner(true));
    dispatch(decrementStep(0));
  };

  const nextStep = () => {};

  return (
    <Box
      sx={{
        height: "100%",
        zIndex: 4,
        position: {
          lg: "relative",
          md: "relative",
          sm: "sticky",
          xs: "sticky",
          xxs: "sticky",
        },
        bottom: 0,
        pb: 0,
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
          boxShadow: "0 -3px 11px -3px rgba(0, 0, 0, 0.1)",
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
            boxShadow: "0 7px 11px -3px rgba(0, 0, 0, 0)",
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
                    fontSize: '16px !important'
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
                    fontSize: '16px !important'
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
                fontSize: '16px !important'
              }}
              gutterBottom
              variant="p"
              component="div"
            >
              {translate("Total")} {translate(productInfo?.CCY_CODE)}{" "}
              {priceArray.SOL_VALUE ? priceArray.SOL_VALUE : 0}
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
            {tabChange != "0" && (
              <Button
                size="large"
                variant="outlined"
                onClick={() => {
                  onPreviousHandle("PREV");
                }}
                startIcon={<ArrowCircleLeftIcon color="black" />}
              >
                Previous
              </Button>
            )}

            {tabChange == "0" && (
              <Button
                size="large"
                variant="outlined"
                onClick={handleHome}
                startIcon={<ArrowCircleLeftIcon color="black" />}
              >
                Home
              </Button>
            )}
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
            {tabChange != "5" && (
              <Button
                size="large"
                variant="outlined"
                onClick={() => {
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
                onClick={() => handleAddToCart()}
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
