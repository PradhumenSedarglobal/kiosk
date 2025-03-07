import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const CookiePolicyDetails = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0,
    ...theme.typography.typography41,
    fontWeight: 900,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
    color: theme.palette.common.black,
  },
  "& p strong": {
    letterSpacing: 0,
    ...theme.typography.typography41,
    fontWeight: 900,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
    color: theme.palette.common.black,
  },
  "& p": {
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 1,
    padding: "5px 0",
    color: theme.palette.grey[2300],
    fontWeight: 400,
    // marginBlockStart: "30px!important",
    marginBlockEnd: "30px!important",
  },
  "& ul": {
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0,
    paddingLeft: "30px",
    color: theme.palette.grey[2300],
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
