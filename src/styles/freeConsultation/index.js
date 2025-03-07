import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const FreeConsultationHeading = styled(Typography)(({ theme }) => ({
  "& h1": {
    paddingLeft: "30px",
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    letterSpacing: 0,
    marginTop: "0px",
    ...theme.typography.typography39,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
    color: theme.palette.dark.darker,
  },
  "& p": {
    ...theme.typography.typography18,
    paddingTop: "20px",
    letterSpacing: 1.2,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const FreeConsultationButton = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: 0,
  height: "auto",
  ...theme.typography.typography15,
  fontFamily: theme.fontFaces.helveticaNeueBold,
  fontWeight: 300,
  color: theme.palette.common.black,
}));

export const FreeConsultationListItem = styled(ListItemText)(({ theme }) => ({
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
    marginRight: theme?.direction === "rtl" ? "8px!important" : "0px!important",
  },
  "& .MuiTypography-root": {
    ...theme.typography.subtitle1,
  },
  paddingLeft: "20px",
  paddingBottom: "20px",
}));

export const FreeConsultationCheckList = styled(Typography)(({ theme }) => ({
  "& h1": {
    paddingLeft: "30px",
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    letterSpacing: 0,
    ...theme.typography.typography39,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
  },
  "& p,span": {
    ...theme.typography.typography15,
    paddingLeft: "0px",
    letterSpacing: 1.2,
    fontFamily: theme.fontFaces.helveticaNeue,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
  "& strong p": {
    ...theme.typography.typography15,
    fontFamily: theme.fontFaces.helveticaNeue,
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
  "& li": {
    ...theme.typography.typography16,
    padding: "3px",
    fontFamily: theme.fontFaces.helveticaNeue,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
