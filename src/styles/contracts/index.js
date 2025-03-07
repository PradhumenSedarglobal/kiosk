import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const ContractsExploreProject = styled(Box)(({ theme }) => ({
  backgroundImage: "url(/assets/contracts/contractsBg.avif)",
  position: "relative",
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "right",
  backgroundPositionY: "top",
  backgroundAttachment: "fixed",
}));

export const ContractsExploreProjectViewAll = styled(Typography)(
  ({ theme }) => ({
    cursor: "pointer",
    fontSize: 16,
    paddingBottom: "8px",
    lineHeight: "18px",

    color: theme.palette.grey[7200],
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
  })
);

export const ContractBringWorldHeading = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0,
    ...theme.typography.typography38,
    fontFamily: theme.fontFaces.helveticaNeue,
    fontWeight: 600,
    mb: 0,
    mt: 0,
    margin: "0px",
    color: theme.palette.common.black,
    letterSpacing: 1,
    // ml: 15,
  },
  "& strong": {
    letterSpacing: 0,
    ...theme.typography.typography38,
    fontFamily: theme.fontFaces.helveticaNeue,
    fontWeight: 600,
    mb: 0,
    mt: 0,
    margin: "0px",
    color: theme.palette.common.black,
    letterSpacing: 1,
    // ml: 15,
  },
  "& p": {
    ...theme.typography.typography20,
    paddingLeft: "40px",
    paddingTop: "40px",
    letterSpacing: 1.1,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const ContractBringWorldText = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0,
    ...theme.typography.typography39,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
  },
  "& p": {
    ...theme.typography.typography45,
    color: theme.palette.common.black,
    fontWeight: 300,
    lineHeight: "31px",
    letterSpacing: 0.5,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
export const ContractQualityServices = styled(Typography)(({ theme }) => ({
  "& h1": {
    textAlign: "center",
    letterSpacing: 0,
    ...theme.typography.typography36,
    fontWeight: "normal",
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
  },
  "& p": {
    textAlign: "center!important",
    ...theme.typography.typography18,
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    textTransform: "uppercase",
    color: theme.palette.grey[1600],
    letterSpacing: 1.1,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
  "& strong": {
    textAlign: "center!important",
    ...theme.typography.typography18,
    textTransform: "uppercase",
    color: theme.palette.grey[1600],
    letterSpacing: 0.5,
    paddingLeft: "20px",
    fontFamily: theme.fontFaces.helveticaNeueLight,
  },
}));

export const ContractQualityImage = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0,
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    paddingLeft: "30px",
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
    ...theme.typography.typography8,
    color: theme.palette.common.black,
  },
  "& p": {
    ...theme.typography.typography45,
    paddingLeft: "30px",
    paddingTop: "5px",
    letterSpacing: 0.5,
    lineHeight: "31px",
    fontWeight: 300,
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const ContractOurWorkForce = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0.5,
    color: theme.palette.common.black,
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    fontFamily: theme.fontFaces.helveticaNeue,
    paddingLeft: "30px",
    mb: 0,
    fontWeight: "normal",
    ...theme.typography.typography6,
    fontWeight: 600,
  },
  "& p": {
    ...theme.typography.typography45,
    paddingLeft: "30px",
    paddingTop: "10px",
    letterSpacing: 0.5,
    lineHeight: "31px",
    fontWeight: 300,
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "18px!important",
  },
}));

export const ContractProjectGallery = styled(Typography)(({ theme }) => ({
  "& h3": {
    letterSpacing: 0,
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    ...theme.typography.typography47,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    paddingLeft: "30px",
    mb: 0,
    color: theme.palette.common.black,
  },
  "& p": {
    ...theme.typography.typography18,
    paddingLeft: "30px",
    paddingTop: "40px",
    letterSpacing: 1.1,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));
