import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const AboutDescription = styled(Typography)(({ theme }) => ({
  "& h2,h3": {
    letterSpacing: 0,
    ...theme.typography.typography31,
    fontWeight: "normal",
    // marginTop: "20px",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
  },
  "& p": {
    ...theme.typography.typography18,
    letterSpacing: 1,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    color: theme.palette.common.black,
    fontWeight: "300",
    lineHeight: "31px",
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
    [theme.breakpoints.down("md")]: {
      lineHeight: "20px",
    },
  },
}));
export const AboutHomeAutomationDescription = styled(Typography)(
  ({ theme }) => ({
    fontFamily: theme.fontFaces.helveticaNeueBold,
    "& h1": {
      marginBottom: "0px!important",
      ...theme.typography.typography49,
      fontFamily: theme.fontFaces.helveticaNeueMedium,
      fontWeight: 300,
      "& strong": {
        letterSpacing: 0,
        ...theme.typography.typography31,
        lineHeight: "38px",
        fontWeight: 700,
        margin: "0px",
        fontFamily: theme.fontFaces.helveticaNeueMedium,
        marginBottom: "0px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "25px",
          lineHeight: "30px",
        },
      },
    },
    "& h2": {
      marginBottom: "0px!important",
      "& strong": {
        letterSpacing: 0,
        ...theme.typography.typography32,
        fontWeight: 700,
        margin: "0px",
        fontFamily: theme.fontFaces.helveticaNeueMedium,
        marginBottom: "0px!important",
        [theme.breakpoints.down("sm")]: {
          fontSize: "25px",
          lineHeight: "30px",
        },
      },
    },
    "& h3": {
      marginTop: "0px",
      "& strong": {
        letterSpacing: 0,
        margin: "0px",
        ...theme.typography.typography42,
        fontWeight: 700,
        fontFamily: theme.fontFaces.helveticaNeueMedium,
        marginBottom: "10px",
      },
    },
    "& p": {
      fontSize: 18,
      lineHeight: "31px",
      letterSpacing: 0.5,
      fontWeight: 300,
      fontFamily: theme.fontFaces.helveticaNeueLight,
      marginBlockStart: "8px!important",
      marginBlockEnd: "8px!important",
    },
  })
);

export const AboutGotoHomeAutomation = styled(Typography)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.light}`,
  color: theme.palette.common.white,
  paddingBottom: "2px",
}));

export const AboutMediaDetails = styled(Typography)(({ theme }) => ({
  borderLeft: `2px solid ${theme.palette.primary.light}`,
  paddingLeft: 30,
  fontSize: 20,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.common.black,
}));

export const AboutMediaDate = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.grey[1600],
  letterSpacing: 1.6,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  paddingLeft: 30,
  paddingBottom: 20,
  textTransform: "uppercase",
}));
