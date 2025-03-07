import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { color } from "framer-motion";

export const ProductDetailsCheckList = styled(Typography)(({ theme }) => ({
  "& h1": {
    paddingLeft: "30px",
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    letterSpacing: 0,
    ...theme.typography.typography39,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
  },
  "& p": {
    ...theme.typography.typography18,
    letterSpacing: 1.2,
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
  "& span": {
    ...theme.typography.typography16,
    letterSpacing: 0.5,
    fontWeight: 200,
    color: theme.palette.common.black,
    fontFamily: `${theme.fontFaces.helveticaNeueMedium} !important`,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
  "& li": {
    ...theme.typography.typography15,
    color: "#333333AB",
    padding: "3px",
    fontFamily: theme.fontFaces.helveticaNeue,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const ProductDetailListItem = styled(ListItemText)(({ theme }) => ({
  "& li::marker": {
    content: `""`,
  },
  "& li::before": {
    content: `""`,
    display: "inline-block",
    backgroundImage: `url(/assets/freeConsultation/tick.png)`,
    backgroundRepeat: "no-repeat",
    width: "25px",
    height: "12px",
    fontFamily: theme.fontFaces.helveticaNeue,
  },
  "& .MuiTypography-root": {
    ...theme.typography.subtitle1,
  },
}));
