import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const TermsAndConditionDetails = styled(Typography)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0.5,
    ...theme.typography.typography41,
    fontWeight: "normal",
    color: "common.black",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: 10,
    marginTop: 0,
  },
  "& p": {
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    letterSpacing: 0.5,
    paddingTopBottom: "5px",
    color: theme.palette.grey[2300],
    fontWeight: 400,
    // marginBlockStart: "30px!important",
    marginBlockEnd: "0px!important",
  },
  "& ul": {
    letterSpacing: 0.5,
    padding: "20px",
    ...theme.typography.typography19,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    color: theme.palette.grey[2300],
    "& li": {
      letterSpacing: 0.5,
      listStyleType: "none",
    },
  },
}));
