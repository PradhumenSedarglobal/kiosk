import React, { useState } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useSelector } from "react-redux";

const ResetHoverButton = ({ text = "RESET", resetCanvasScene }) => {
  const fonts = useSelector((state) => state.font);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onClick={resetCanvasScene}
      sx={{
        position: "absolute",
        top: "60px",
        left: isMobile ? "87vw" : "54vw",
        zIndex: 99998,
        cursor: "pointer",
      }}
    >
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Expanding Text Box */}
        <Box
          sx={{
            position: "absolute",
            right: "100%", // grow to the left
            backgroundColor: "orange",
            borderRadius: "8px 0 0 8px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: hovered ? "0 12px" : "0px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: hovered ? "200px" : "0px",
            transition: "all 0.3s ease",
            color: "white",
            fontFamily: fonts.Helvetica_Neue_Bold?.style?.fontFamily,
            marginRight: hovered ? "-6px" : "0px",
          }}
        >
          <Typography>{text}</Typography>
        </Box>

        {/* Icon Box */}
        <Box
          sx={{
            backgroundColor: "black",
            borderRadius: "8px",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s",
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
