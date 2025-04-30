import React, { useState } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector, useDispatch } from "react-redux";
import { startTour } from "../../redux/slices/tourSlice";

const InfoHoverButton = ({ text = "HOW TO USE", step }) => {
  const fonts = useSelector((state) => state.font);
  const dispatch = useDispatch();
  const [showText, setShowText] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleClick = () => {
    dispatch(startTour(step));
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "absolute",
        top: "10px",
        left: isMobile ? "87vw" : "55vw",
        zIndex: 9999,
        cursor: "pointer",
      }}
    >
      <Box
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {showText && (
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              left: isMobile ? "-105px" : "-112px",
              backgroundColor: "orange",
              padding: "6px 10px",
              borderRadius: "0 0 0 8px",
              whiteSpace: "nowrap",
              height: "40px",
              color: "white",
              fontSize: "small",
              fontFamily: fonts.Helvetica_Neue_Bold?.style?.fontFamily,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.2s ease",
              opacity: 1,
            }}
          >
            {text}
          </Typography>
        )}
        <Box
          sx={{
            backgroundColor: "black",
            borderRadius: "0 8px 8px 0",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "orange",
            },
          }}
        >
          <InfoOutlinedIcon sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default InfoHoverButton;
