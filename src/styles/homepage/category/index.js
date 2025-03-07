import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import { alpha, styled } from "@mui/material/styles";

export const CustomTab = styled(Tab)(({ theme }) => ({
  "&.MuiTab-root": {
    marginRight: "40px",
    ...theme.typography.typography45,
    fontWeight: 200,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    color: theme.palette.common.black,
    paddingRight: "50px",
    ":not(:last-of-type):after": {
      content: "''",
      borderRight: "2px solid",
      display: "inline-block",
      width: "30px",
      height: "22px",
      marginLeft: "50px",
      position: "absolute",
      right: "0px",
    },
  },
  "&.MuiTab-root:not(.Mui-selected)": {
    color: "#000",
    opacity: ".50",
  },
}));

export const CustomTabList = styled(TabList)(({ theme }) => ({
  "&.MuiTabs-root": {
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
}));

export const OverlayBody = styled(Box)(({ theme }) => ({
  padding: 10,
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  display: "flex",
  alignItems: "end",
  justifyContent: "center",
  background: `linear-gradient(0deg,${alpha(
    theme.palette.common.black,
    0.58
  )},transparent 41%,transparent 56%)`,
}));
