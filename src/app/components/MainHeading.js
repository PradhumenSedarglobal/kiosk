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
    <Box sx={{px:2}}>
    <Typography
      sx={{
        fontFamily: Helvetica_Neue_Bold.style.fontFamily,
        fontSize: "1.82rem",
        borderBottom:"5px solid #eaaf60",
        paddingBottom:"10px",
        borderRadius:"5px",
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
