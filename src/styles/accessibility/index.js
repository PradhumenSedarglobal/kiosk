import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const AccessibilityDetails = styled(Typography)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0.5,
    ...theme.typography.typography32,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBottom: "0px",
  },
  "& h1": {
    ...theme.typography.typography41,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    color: theme.palette.common.black,
    fontWeight: 400,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  "& p": {
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0.5,
    color: theme.palette.grey[2300],
    fontWeight: 400,
    marginBottom: 5,
    marginTop: 15,
    "& strong": {
      ...theme.typography.typography19,
      fontFamily: theme.fontFaces.helveticaNeueMedium,
      color: theme.palette.common.black,
      fontWeight: 400,
      letterSpacing: 0.5,
    },
  },
  "& ul": {
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0.5,
    color: theme.palette.grey[2300],
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
    "& li": {
      listStyleType: "none",
      letterSpacing: 0.5,
    },
  },
}));
