import { Box } from "@mui/material";
import React from "react";

const DotLoading = () => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        justifyContent: "flex-end",
        gap: "5px",
        alignItems: "center",
        paddingTop: "25px",
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          bgcolor: "primary.main",
          borderRadius: "50%",
          animation: "dot-pulse 1.2s infinite",
        }}
      />
      <Box
        sx={{
          width: 10,
          height: 10,
          bgcolor: "primary.main",
          borderRadius: "50%",
          animation: "dot-pulse 1.2s infinite 0.2s",
        }}
      />
      <Box
        sx={{
          width: 10,
          height: 10,
          bgcolor: "primary.main",
          borderRadius: "50%",
          animation: "dot-pulse 1.2s infinite 0.4s",
        }}
      />
      <style>
        {`@keyframes dot-pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }}`}
      </style>
    </Box>
  );
};

export default DotLoading;
