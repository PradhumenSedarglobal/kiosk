import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React from "react";

const CloseButton = ({ handleOpenClose }) => {
  return (
    <Box pt={2} textAlign="right">
      <IconButton size="small" onClick={handleOpenClose} aria-label="close">
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CloseButton;
