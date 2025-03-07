import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const ToolsAndGuidesHeading = styled(Typography)(({ theme }) => ({
  "& h1": {
    paddingLeft: "30px",
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    letterSpacing: 0.6,
    ...theme.typography.typography7,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "40px",
    color: theme.palette.common.black,
  },
  "& p": {
    ...theme.typography.typography45,
    paddingLeft: "30px",
    letterSpacing: 0.5,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
    color: theme.palette.common.black,
  },
}));

export const ToolsAndGuidesButton = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: 0,
  height: "auto",
  ...theme.typography.typography15,
  fontFamily: theme.fontFaces.helveticaNeueBold,
  color: theme.palette.common.black,
  ":hover": { color: "white" },
  fontWeight: 200,
  backgroundColor: theme.palette.primary.lighter,
}));

export const ToolsAndGuidesCategoryHeading = styled(Typography)(
  ({ theme }) => ({
    "& h2": {
      letterSpacing: 0,
      ...theme.typography.typography32,
      fontWeight: "normal",
      fontFamily: theme.fontFaces.helveticaNeueMedium,
      mb: 0,
      color: theme.palette.common.black,
    },
    "& h1": {
      letterSpacing: 0,
      ...theme.typography.typography7,
      fontFamily: theme.fontFaces.helveticaNeueMedium,
      mb: 0,
      fontWeight: "normal",
      color: theme.palette.common.black,
      textAlign: "center",
    },
    "& p": {
      ...theme.typography.typography18,
      paddingLeft: "30px",
      paddingTop: "30px",
      letterSpacing: 1.2,
      fontFamily: theme.fontFaces.helveticaNeueLight,
      marginBlockStart: "8px!important",
      marginBlockEnd: "8px!important",
    },
  })
);

export const ToolsAndGuidesBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[2900],
  backgroundImage: "url(/assets/ToolsAndGuides/leftbg.avif)",
  position: "relative",
  backgroundRepeat: "no-repeat",
  // backgroundPositionX: "right",
  backgroundAttachment: "fixed",
}));

export const ToolsAndGuidesAccordion = styled(Typography)(({ theme }) => ({
  "& h2,p": {
    paddingLeft: "30px",
    letterSpacing: 0,
    ...theme.typography.typography32,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
    color: theme.palette.common.black,
  },
  // "& p": {
  //   ...theme.typography.typography18,
  //   paddingLeft: "30px",
  //   paddingTop: "30px",
  //   letterSpacing: 1.2,
  //   fontFamily: theme.fontFaces.helveticaNeueLight,
  //   marginBlockStart: "8px!important",
  //   marginBlockEnd: "8px!important",
  // },
}));

export const ToolsAndGuidesAccordionDetails = styled(Typography)(
  ({ theme }) => ({
    "& h2": {
      letterSpacing: 0,
      ...theme.typography.typography39,
      fontWeight: "normal",
      fontFamily: theme.fontFaces.helveticaNeueMedium,
      mb: 0,
    },
    "& p": {
      ...theme.typography.typography24,
      letterSpacing: 0.6,
      mb: 0,
      fontWeight: 400,
      fontFamily: theme.fontFaces.helveticaNeueLight,
      marginBlockStart: "0px!important",
      marginBlockEnd: "8px!important",
    },
  })
);
