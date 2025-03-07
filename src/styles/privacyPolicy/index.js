import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const PrivacyPolicyDetails = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0,
    ...theme.typography.typography41,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
    color: theme.palette.common.black,
  },
  "& p strong": {
    letterSpacing: 0,
    ...theme.typography.typography41,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
    color: theme.palette.common.black,
  },
  "& p": {
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 1,
    color: theme.palette.grey[2300],
    fontWeight: 400,
    marginBlockStart: "30px!important",
    marginBlockEnd: "0px!important",
  },
}));
