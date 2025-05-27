import React, { useState } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector, useDispatch } from "react-redux";
import { setStepIndex, skipTour, startTour } from "../../redux/slices/tourSlice";

const InfoHoverButton = ({ text = "HOW TO USE", step }) => {
  const fonts = useSelector((state) => state.font);
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleClick = () => {
    // Fire custom event to notify TourGuideButton to ignore back
    window.dispatchEvent(new Event("ignore-next-back"));

    // Ensure tour is reset before starting
    dispatch(skipTour());

    setTimeout(() => {
      dispatch(setStepIndex(Number(step)));
    }, 0);

    setTimeout(() => {
      dispatch(startTour(Number(step)));
    }, 100); // Short delay is enough
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "absolute",
        top: "10px",
        left: isMobile ? "87vw" : "54vw",
        zIndex: 999,
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
        {/* Expanding Text */}
        <Box
          sx={{
            position: "absolute",
            right: "100%",
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

        {/* Icon */}
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
          <InfoOutlinedIcon sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default InfoHoverButton;
