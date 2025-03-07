import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const ServiceQualityServiceHeading = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  "& h2,h1": {
    letterSpacing: 0,
    ...theme.typography.typography32,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
    marginBlockEnd: "8px!important",
  },
  "& Span": {
    ...theme.typography.typography18,
    paddingLeft: "20px",
    textTransform: "uppercase",
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    color: theme.palette.grey[500],
    letterSpacing: 1.1,
    fontFamily: theme.fontFaces.helveticaNeue,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
  "& p": {
    ...theme.typography.typography18,
    paddingLeft: "20px",
    textTransform: "uppercase",
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    color: theme.palette.grey[500],
    letterSpacing: 1.1,
    fontFamily: theme.fontFaces.helveticaNeue,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
