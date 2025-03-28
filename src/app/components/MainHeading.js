import React from "react";
import typography, {
    Helvetica_Neue,
    Helvetica_Neue_Regular,
    Helvetica_Neue_Thin,
    Helvetica_Neue_Light,
    Helvetica_Neue_Medium,
    Helvetica_Neue_Bold,
    Helvetica_Neue_Light_Arabic,
    Helvetica_Neue_Bold_Arabic,
    Helvetica_Neue_Regular_Arabic,
    Helvetica_Neue_Thin_Arabic,
    Helvetica_Neue_Medium_Arabic,
    Helvetica_Neue_Arabic,
  } from "../../theme/typography";
  import Heading from "./MainHeading";
import { Box, Typography } from "@mui/material";
  

const MainHeading = ({title}) => {
  return (
    <Box sx={{
      padding:"0px !important",
      position:"sticky",
      top:0,
      zIndex:10,
      backgroundColor:"White"
      }}>
    <Typography
      sx={{
        fontFamily: Helvetica_Neue_Medium.style.fontFamily,
        borderBottom:"2px solid #eaaf60",
        borderRadius:"2px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "1rem"
      }}
      gutterBottom
      variant="h4"
      component="div"
    >
      {title}
    </Typography>
    </Box>
  );
};

export default MainHeading;
