import React from "react";
import { Typography, Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector, useDispatch } from "react-redux";
import { startTour } from "../../redux/slices/tourSlice";

const InfoHoverButton = ({ text = "HOW TO USE",step }) => {
  const fonts = useSelector((state) => state.font);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startTour(step));
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "absolute",
        top: "10px",
        left: "55vw",
        zIndex: 9999,
        cursor: "pointer",
        "&:hover .hover-text": {
          opacity: 1,
          transform: "translateX(10)",
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
            left: "-120px", // adjust as needed
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
            pt:"5px"
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
          <InfoOutlinedIcon sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default InfoHoverButton;
