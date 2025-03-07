import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { color } from "framer-motion";

export const FranchiseHeading = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0,
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    paddingLeft: "30px",
    ...theme.typography.typography39,
    fontWeight: "normal",
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
  },
  "& p": {
    ...theme.typography.typography45,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0,
    pt: { md: 5, sm: 1, xs: 1, xxs: 1 },
    color: theme.palette.primary.main,
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const FranchiseText = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0,
    ...theme.typography.typography40,
    fontWeight: "normal",
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
  },
  "& p": {
    ...theme.typography.typography45,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 1,

    color: theme.palette.common.black,
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
export const FranchiseHelpHeading = styled(Typography)(({ theme }) => ({
  "& h1,h2": {
    letterSpacing: 0,
    ...theme.typography.typography49,
    fontWeight: "normal",
    textAlign: "center",
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
  },
  "& p": {
    ...theme.typography.typography18,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0,

    color: theme.palette.grey[2300],
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const FranchiseRealityContent = styled(Typography)(({ theme }) => ({
  "& h1,h2": {
    letterSpacing: 0,
    ...theme.typography.typography32,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    color: theme.palette.common.black,
    mb: 0,
  },
  "& p": {
    ...theme.typography.typography18,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0,
    color: theme.palette.grey[2300],
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const FranchiseServiceHeading = styled(Typography)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0,
    ...theme.typography.typography35,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
    color: theme.palette.common.black,
  },
  "& h1": {
    letterSpacing: 0,
    ...theme.typography.typography35,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
    color: theme.palette.common.black,
  },
  "& p": {
    ...theme.typography.typography45,
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0,
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
export const FranchiseMediaHeading = styled(Typography)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0,
    textAlign: "center",
    marginBlockStart: 0,
    fontWeight: "normal",
    marginBlockEnd: "0",
    ...theme.typography.typography35,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    color: theme.palette.common.white,
    marginBottom: 50,
  },
  "& h1": {
    letterSpacing: 0,
    textAlign: "center",
    marginBlockStart: 0,
    fontWeight: 500,
    marginBlockEnd: "0",
    ...theme.typography.typography35,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    color: theme.palette.common.white,
    marginBottom: 50,
  },
}));
