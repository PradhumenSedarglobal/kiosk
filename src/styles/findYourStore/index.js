import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const StoreHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[3000],
  fontWeight: 500,
  textTransform: "uppercase",
  paddingLeft: "1.5rem!important",
  borderLeft: `2px solid ${theme.palette.warning.light}`,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  mb: 0,
  textTransform: "uppercase",
  width: "max-content",
}));

export const StoreDescription = styled(Typography)(({ theme }) => ({
  marginTop: "0px !important",
  "& h1": {
    letterSpacing: 0,
    ...theme.typography.typography43,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mt: 0,
    color: theme.palette.common.black,
  },
  "& p": {
    ...theme.typography.typography18,
    letterSpacing: 0,
    mb: 0,
    fontWeight: 400,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const StoreMapBox = styled(Box)(({ theme }) => ({
  "& #marker-example": {
    height: "500px!important",
    width: "100%",
    "& .gm-ui-hover-effect": {
      top: "5px!important",
      right: "5px!important",
      borderRadius: "50%",
      border: `1px solid ${theme.palette.divider}!important`,
      width: "22px!important",
      height: "22px!important",
      "&.gm-ui-hover-effect>span": {
        width: "12px!important",
        height: "12px!important",
        margin: "4px!important",
      },
    },
    "& .gm-style-iw-ch": {
      paddingTop: "35px !important",
    },
  },
}));
