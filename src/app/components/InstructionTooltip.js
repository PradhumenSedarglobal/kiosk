import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';


const InstructionTooltip = ({ onClose = () => {},message }) => {
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    setRandomMessage(message);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "8vh",
        right: "40vw",
        bgcolor: "#222",
        color: "white",
        p: 3,
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
        zIndex: 1000,
        maxWidth: "350px",
        border: "2px solid #ef9c00",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        fontFamily: "Arial, sans-serif",
        transition: "0.3s ease-in-out",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          right: "-15px",
          transform: "translateY(-50%)",
          width: "0",
          height: "0",
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          borderLeft: "15px solid #ef9c00",
        },
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          color: "white",
          "&:hover": { color: "orange" },
        }}
        aria-label="Close tooltip"
      >
        <CloseIcon />
      </IconButton>

      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          textAlign: "left",
          fontSize: "16px",
          pl: 1,
        }}
      >
        🔹 Instruction
      </Typography>

      <Box
        sx={{
          border: "1px dashed white",
          p: 2,
          borderRadius: "12px",
          backgroundColor: "#333",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: "14px", lineHeight: "1.5", textAlign: "left" }}
        >
          {randomMessage}
        </Typography>
      </Box>
    </Box>
  );
};

InstructionTooltip.propTypes = {
  onClose: PropTypes.func
};

export default InstructionTooltip;