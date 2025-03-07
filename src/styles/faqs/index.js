import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const FaqsAccordionText = styled(Typography)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0,
    ...theme.typography.typography39,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
  },
  "& p": {
    ...theme.typography.typography18,
    letterSpacing: 0,
    marginBottom: "0px",
    fontWeight: 300,
    lineHeight: "32px",
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const FaqsHeading = styled(Typography)(({ theme }) => ({
  "& h1": {
    fontSize: "39px",
    lineHeight: "49px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "28px",
      lineHeight: "normal",
    },
    letterSpacing: 0,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    color: theme.palette.common.black,
    marginBottom: "0px",
  },
  "& p": {
    ...theme.typography.typography20,
    paddingLeft: "30px",
    paddingTop: "30px",
    letterSpacing: 1.1,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
