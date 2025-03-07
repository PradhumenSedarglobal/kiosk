import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { alpha } from "@mui/material/styles"; // Import alpha separately from styles
import React from "react";

const BackdropLoading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: (theme) => alpha(theme.palette.common.white, 0.5),
        zIndex: 1000,
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default BackdropLoading;
