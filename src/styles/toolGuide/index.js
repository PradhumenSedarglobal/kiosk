import { Box, styled, Typography } from "@mui/material";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { TabList } from "@mui/lab";

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
  "& .Mui-expanded": {
    backgroundColor: theme.palette.grey[2900],
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  background: theme.palette.grey[2900],
}));

export const AccordionDetailsBox = styled(Box)(({ theme }) => ({
  margin: "0 0em 0em 3em",
  borderLeft: `2px solid ${theme.palette.primary.light}`,
}));

// ACCORDIAN CUSTOM STYLE END

// ----------------------------------------------

export const TabListStyled = styled(TabList)(({ theme }) => ({
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
  },
}));

export const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: "url(/assets/ToolsAndGuides/rightbg.avif)",
  backgroundRepeat: "no-repeat",
  position: "fixed",
  height: "100%",
  width: "45%",
  right: "0px",
  zIndex: -1,
}));
export const BackgroundLeftBox = styled(Box)(({ theme }) => ({
  backgroundImage: "url(/assets/ToolsAndGuides/leftbg.avif)",

  backgroundRepeat: "no-repeat",
  position: "fixed",
  height: "100%",
  width: "100%",
  left: "0px",

  zIndex: -1,
}));
