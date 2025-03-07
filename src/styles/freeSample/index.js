import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const FreeSampleSteps = styled(Typography)(({ theme }) => ({
  letterSpacing: 0,
  ...theme.typography.typography20,
  fontWeight: "normal",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.primary.main,
  display: "inline",
}));
export const FreeSampleStepsTitle = styled(Typography)(({ theme }) => ({
  paddingLeft: "10px",
  letterSpacing: 0,
  ...theme.typography.typography20,
  fontWeight: "normal",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  display: "inline",
}));

export const FreeSampleStep3Title = styled(Box)(({ theme }) => ({
  paddingLeft: "10px",
  letterSpacing: 0,
  ...theme.typography.typography20,
  fontWeight: "normal",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.primary.main,
}));
export const FreeSampleStep3SubTitle = styled(Box)(({ theme }) => ({
  paddingLeft: "28px",
  letterSpacing: 0,
  ...theme.typography.typography16,
  fontWeight: "normal",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
}));

export const FreeSampleConsultationHeading = styled(Box)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0,
    ...theme.typography.typography31,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
  },
  "& p": {
    ...theme.typography.typography18,
    letterSpacing: 0,
    fontWeight: 400,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
