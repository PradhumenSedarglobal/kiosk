import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const CartPageSaveForLater = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontFamily: theme.fontFaces.helveticaNeue,
  fontSize: 14,
  lineHeight: "19px",
  color: theme.palette.primary.main,
  borderLeft: `2px solid ${theme.palette.common.black}`,
  paddingLeft: "7px",
  cursor: "pointer",
  textDecoration: "underline",
}));

export const EditOption = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontWeight: 300,
  fontFamily: theme.fontFaces.helveticaNeue,
  fontSize: 14,
  lineHeight: "19px",
  fontSize: 14,
  color: theme.palette.grey[600],
  // paddingLeft: "7px",
  textDecoration: "underline",
}));

export const CartPageRate = styled(Typography)(({ theme }) => ({
  fontFamily: theme.fontFaces.helveticaNeueBold,
  fontSize: 14,
  lineHeight: "19px",
  color: theme.palette.error.lighterError,
}));

export const CartPageAccordionHeading = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  fontSize: theme.typography.typography18,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.common.black,
}));

export const CartPageAddressName = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography16,
  fontFamily: theme.fontFaces.helveticaNeueRegular,
  fontWeight: theme.typography.fontWeightBold,
  color: (theme) => theme.palette.common.black,
}));

export const CartPageAddressDetails = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography16,
  wordWrap: "break-word",
  fontFamily: theme.fontFaces.helveticaNeueLight,
}));
export const CartPageOrderSummaryTotal = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography45,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.common.black,
}));

export const CartPageShipment = styled(Typography)(({ theme }) => ({
  padding: "10px",
  ...theme.typography.typography15,
  fontFamily: theme.fontFaces.helveticaNeueLight,
  lineHeight: "23px",
  color: theme.palette.common.black,
  fontWeight: "600",
  borderBottom: `1px solid ${theme.palette.grey[4500]}`,
}));
export const CartPageShipmentDelivery = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.typography18,
  fontFamily: theme.fontFaces.helveticaNeue,
  color: theme.palette.common.black,
  letterSpacing: 0.5

}));
export const CommonPaymentPage = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography18,
  fontFamily: theme.fontFaces.helveticaNeueLight,
  textAlign: "center",
  color: "common.black",
}));

export const TabbyBox = styled(Box)(({ theme }) => {
  return {
    "&.tabystyle": {
      "&.tabby-promo-snippet": {
        maxWidth: "100% !important",
        padding: "10px !important",
        a: {
          padding: "5px !important",
          marginTop: "0 !important",
        },
        span: {
          opacity: "1 !important",
          color: "#000 !important",
          fontFamily: theme.fontFaces.helveticaNeueLight,
        },
      },
    },
    [theme.direction == "rtl"]: {
      "&.tabystyleRTL": {
        svg: {
          transform: "scaleX(1) !important",
        },
      },
    },
  };
});
export const TamaraBox = styled(Box)(({ theme }) => ({
  "#tamara-widget": {
    color: "#fff",
  },
}));
