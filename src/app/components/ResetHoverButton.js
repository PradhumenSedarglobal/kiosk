import React from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useSelector } from "react-redux";

const ResetHoverButton = ({ text = "RESET", resetCanvasScene }) => {
  const fonts = useSelector((state) => state.font);
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 767px)");

  return (
    <Box
      onClick={resetCanvasScene}
      sx={{
        position: "absolute",
        top: "60px",
        left: isMobile ? "87vw" : "55vw",
        zIndex: 9999,
        cursor: "pointer",
        "&:hover .hover-text": {
          opacity: 1,
          transform: "translateX(10px)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          className="hover-text"
          variant="body2"
          sx={{
            position: "absolute",
            left: "-65px", // adjust as needed
            opacity: 0,
            backgroundColor: "orange",
            padding: "6px 10px",
            borderRadius: "0px 0px 0px 8px",
            whiteSpace: "nowrap",
            height: "40px",
            color: "white",
            fontSize: "small",
            fontFamily: fonts.Helvetica_Neue_Bold?.style?.fontFamily,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            transform: "translateX(10px)",
            pointerEvents: "none",
            textAlign:"center",
            pt:"10px"
          }}
        >
          {text}
        </Typography>
        <Box
          sx={{
            backgroundColor: "black",
            borderRadius: "0px 8px 8px 0px",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "orange",
            },
          }}
        >
          <RestartAltIcon sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ResetHoverButton;
