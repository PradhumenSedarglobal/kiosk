import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const OrderSignOut = styled(Button)(({ theme }) => ({
  padding: "18px",
  borderRadius: "0px",
  fontWeight: 200,
  color: theme.palette.common.black,
  fontFamily: theme.fontFaces.helveticaNeueBold,
  border: `1px solid ${theme.palette.common.black}`,
  "&:hover": {
    border: `1px solid ${theme.palette.common.black}`,
  },
}));

export const OrderTab = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "15px",
  fontWeight: "300",
  fontFamily: theme.fontFaces.helveticaNeueBold,
  color: "#282c3f",
  letterSpacing: 0.5,
}));

export const OrderDetails = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.typography24,
  fontFamily: theme.fontFaces.helveticaNeue,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.common.black,
}));

export const OrderTrackOrder = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.typography24,
  fontFamily: theme.fontFaces.helveticaNeueLight,
  color: theme.palette.grey[6400],
  letterSpacing: 0.5,
}));

export const WishListMyFavorites = styled(Typography)(({ theme }) => ({
  letterSpacing: 0,
  ...theme.typography.typography39,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.fontFaces.helveticaNeue,
  display: "inline",
}));

export const WishListMyFavoritesItem = styled(Typography)(({ theme }) => ({
  letterSpacing: 0,
  ...theme.typography.typography31,
  fontFamily: theme.fontFaces.helveticaNeueLight,
  fontWeight: theme.typography.fontWeightLight,
  display: "inline",
}));
export const WishListMyFavoritesHeading = styled(Typography)(({ theme }) => ({
  letterSpacing: 0,
  ...theme.typography.typography36,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.fontFaces.helveticaNeue,
  textAlign: "center",
}));

export const CardFAQS = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography16,
  fontFamily: theme.fontFaces.helveticaNeueBold,
}));

export const CardFAQSDetails = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography16,
  fontFamily: theme.fontFaces.helveticaNeueRegular,
}));
export const CardSaveCardTitles = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography24,
  fontFamily: theme.fontFaces.helveticaNeueLight,
  color: theme.palette.grey[6400],
}));

export const AddressHeadingText = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography24,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.fontFaces.helveticaNeueBold,
  color: theme.palette.common.black,
  fontWeight: 200,
}));

export const AddressText = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography24,
  fontFamily: theme.fontFaces.helveticaNeueLight,
  letterSpacing: 0.5,
}));

export const MoodBoardNewList = styled(Typography)(({ theme }) => ({
  ...theme.typography.typography16,
  fontFamily: theme.fontFaces.helveticaNeueRegular,
  fontWeight: theme.typography.fontWeightBold,
  color: (theme) => theme.palette.common.black,
}));
