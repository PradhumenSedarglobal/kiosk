import { TabList } from "@mui/lab";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { alpha, styled } from "@mui/material/styles";

export const ProductCustomTab = styled(Tab)(({ theme }) => ({
  "&.MuiTab-root": {
    marginRight: "40px",
    fontSize: "18px",
    // ...theme.typography.typography18,
    ":not(:last-of-type):after": {
      content: "''",
      borderRight: `2px solid ${theme.palette.grey[1800]}`,
      width: "3px",
      height: "22px",
      paddingRight: "20px",
      paddingLeft: "20px",
    },
  },
  "&.MuiTab-root:not(.Mui-selected)": {
    color: "#000",
    opacity: ".15",
  },
}));
