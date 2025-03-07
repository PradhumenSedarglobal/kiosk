import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const ReturnRefundDetails = styled(Typography)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0,
    ...theme.typography.typography19,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
  },
  "& p": {
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0,
    fontWeight: 400,
    marginBlockStart: "30px!important",
    marginBlockEnd: "8px!important",
    color: theme.palette.common.black,
    "& strong": {
      fontFamily: theme.fontFaces.helveticaNeueMedium,
      ...theme.typography.typography19,
      color: theme.palette.common.black,
    },
  },

  "& ol": {
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0,
    paddingLeft: "30px",
    color: theme.palette.common.black,
    fontWeight: 400,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
