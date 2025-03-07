import Box from "@mui/material/Box";
import React from "react";

const ColorSelect = ({ color, borderColor }) => {
  return (
    <Box

      component="div"
      sx={{
        border: `2px solid ${borderColor}`,
        padding: "2px",
        width: "min-content",
        borderRadius: "50%",
        cursor:"pointer"
      }}
    >
      <Box
        component="div"
        color="blue"
        sx={{
          width: "1.2em",
          height: "1.2em",
          borderRadius: "50%",
          backgroundColor: `${color}`,
        }}
      />
    </Box>
  );
};

export default ColorSelect;
