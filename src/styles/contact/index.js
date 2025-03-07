import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import TabList from "@mui/lab/TabList";
import { color } from "framer-motion";

export const ContactHeading = styled(Typography)(({ theme }) => ({
  marginBottom: "1em",
  borderLeft: `2px solid ${theme.palette.primary.light}`,
  paddingLeft: "1em",
  color: theme.palette.grey[1600],
  letterSpacing: "1px",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  textTransform: "uppercase",
  fontWeight: 500,
}));

export const ContactEmailText = styled(Typography)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.light}`,
  width: "max-content",
  fontWeight: 500,
  color: theme.palette.grey[7200],
  fontFamily: theme.fontFaces.helveticaNeueMedium,
  paddingBottom: "0.3em",
  cursor: "pointer",
}));

// ACCORDIAN CUSTOM STYLE START

export const CustomIconBox = styled(Box)(({ theme }) => ({
  ".Mui-expanded & > .collapsIconWrapper": {
    display: "none",
  },
  ".expandIconWrapper": {
    display: "none",
  },
  ".Mui-expanded & > .expandIconWrapper": {
    display: "block",
  },
}));

const CustomExpandIcon = () => {
  return (
    <CustomIconBox>
      <div className="expandIconWrapper">
        <RemoveIcon sx={{ fontSize: "1.8rem", transform: "rotate(90deg)" }} />
      </div>
      <div className="collapsIconWrapper">
        <AddIcon sx={{ fontSize: "1.8rem" }} />
      </div>
    </CustomIconBox>
  );
};

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<CustomExpandIcon />} {...props} />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  margin: "0em 1.5em 1.5em 3em",
  borderLeft: `2px solid ${theme.palette.primary.light}`,
}));

// ACCORDIAN CUSTOM STYLE END

// ----------------------------------------------

export const TabListStyled = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#f8f8f8",
  borderRadius: "10px",
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: "2rem",
  "& .MuiButtonBase-root": {
    fontSize: "20px!important",
    padding: "18px 0!important",
    marginRight: "0px!important",
    justifyContent: "flex-start!important",
    "&.MuiTab-root": {
      "&.Mui-selected": {
        width: "100%",
      }
    }
  },
}));

export const MuiTabListStyled = styled(TabList, {
  shouldForwardProp: (prop) => prop !== "value" && prop !== "index",
})(({ theme, value, index }) => {
  return {
    ...(value == index && {
      "& .MuiTabs-indicator": {
        height: "0.8px!important",
        width: "100%",
        top: "unset!important",
        bottom: 0,
      },
    }),
    ...(value != index && {
      "& .MuiTabs-indicator": {
        height: "0px!important",
        width: "100%",
        top: "unset!important",
        bottom: 0,
      },
    }),

  };
});

export const ContactFormHeading = styled(Typography)(({ theme }) => ({
  "& h1": {
    letterSpacing: 0,
    ...theme.typography.typography32,
    fontWeight: 400,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
    color:theme.palette.common.black,
    marginTop:0,
    marginBottom:2,
  },
  "& p": {
    ...theme.typography.typography15,
    letterSpacing: 0,
    fontWeight: 400,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const ContactEnquiriesDetails = styled(Typography)(({ theme }) => ({
  "& p": {
    ...theme.typography.typography16,
    letterSpacing: 0,
    fontWeight: 600,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    color:theme.palette.common.black,
    marginBottom:0
  },
}));


export const QuickQuestionsCardContent = styled(CardContent)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "center",
  height: "100%",
  width: "auto",
  // px: { md: 6, sm: 2, xs: 2, xxs: 2 },
  // pt: { md: 9, sm: 6, xs: 4, xxs: 4 },
  // pb: {
  //   md: `48px!important`,
  //   sm: `38px!important`,
  //   xs: `18px!important`,
  //   xxs: `18px!important`,
  // },
}));

export const QuickQuestionsTitle = styled(Typography)(({ theme }) => ({
  padding: "45px 0",
  letterSpacing: 0,
  color: (theme) => theme.palette.common.black,
  opacity: 1,
  fontSize: "30px",
  fontWeight:200
}));

export const QuickQuestionsButton = styled(Button)(({ theme }) => ({
  background: theme.palette.common.white,
  borderRadius: 0,
  height: "auto",
  ...theme.typography.typography15,
  fontFamily: theme.fontFaces.helveticaNeueBold,
  color: theme.palette.common.black,
  "&:hover": {
    background: theme.palette.common.white,
    boxShadow: "none",
  },
  fontWeight:200
}));

export const ContactAccordion = styled(Typography)(({ theme }) => ({
  "& h2": {
    letterSpacing: 0.5,
    ...theme.typography.typography39,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    mb: 0,
  },
  "& p": {
    ...theme.typography.typography18,
    letterSpacing: 1,
    mb: 0,
    fontWeight: 400,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "0px!important",
  },
}));
