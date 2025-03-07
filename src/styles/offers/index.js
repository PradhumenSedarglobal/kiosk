import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const OffersSubHeading = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  borderLeft: `2px solid ${theme.palette.primary.light}`,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.grey[2700],
}));
export const OffersHeading = styled(Typography)(({ theme }) => ({
  letterSpacing: 0,
  ...theme.typography.typography39,
  fontWeight: "normal",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  marginBottom: "0px",
}));

export const OffersCardHeading = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.common.white,
  textAlign: "center",
}));

export const OffersCardSubHeading = styled(Typography)(({ theme }) => ({
  letterSpacing: 0,
  ...theme.typography.typography36,
  fontWeight: "normal",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.common.white,
  textAlign: "center",
  width: "400px",
}));

export const OffersCardShopNow = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  color: theme.palette.common.white,
  textDecoration: "underline",
  textAlign: "center",
}));
