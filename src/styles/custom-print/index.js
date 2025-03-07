import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const CustomPrintHeading = styled(Typography)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0,
    ...theme.typography.typography39,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    margin: 0,
    marginTop: "30px",
  },
  "& p": {
    ...theme.typography.typography18,
    letterSpacing: 1.2,
    fontFamily: theme.fontFaces.helveticaNeueLight,

    margin: 0,
  },
}));
