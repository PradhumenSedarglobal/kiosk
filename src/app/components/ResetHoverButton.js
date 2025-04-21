import React from "react";
import { Typography, Box } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt"; // Reset icon
import { useSelector } from "react-redux";

const ResetHoverButton = ({ text = "RESET", onReset }) => {
  const fonts = useSelector((state) => state.font);

  return (
    <Box
      onClick={onReset}
      sx={{
        position: "absolute",
        top: "60px", // You can change this if needed
        left: "55vw",
        zIndex: 9999,
        backgroundColor: "black",
        borderRadius: "8px",
        height: "40px",
        width: "40px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        cursor: "pointer",
        transition: "width 0.5s ease, background-color 0.3s ease",
        "&:hover": {
          width: "140px",
          backgroundColor: "orange",
        },
        "&:hover .hover-text": {
          opacity: 1,
          marginLeft: "8px",
          color: "white",
        },
      }}
    >
      <RestartAltIcon
        sx={{
          color: "white",
          opacity: 1,
          "&:hover": {
            color: "white",
          },
        }}
      />
      <Typography
        className="hover-text"
        variant="body2"
        sx={{
          color: "white",
          fontSize: "small",
          opacity: 0,
          marginLeft: "0px",
          whiteSpace: "nowrap",
          fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
          transition: "opacity 0.3s ease, margin-left 0.3s ease",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default ResetHoverButton;
