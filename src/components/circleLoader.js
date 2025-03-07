import Box from "@mui/material/Box";
import React, { memo } from "react";
import { NextImage } from "./image";

const CircleLoader = (props) => {
  const { sx } = props;
  const progress = props.progress ? props.progress : 0;
  const animation = props.animation ? props.animation : "all 3s";
  const size = props.size ? props.size : 65;
  const strokeWidth = props.strokeWidth ? props.strokeWidth : 2;
  // const percentage = 100;
  const activeColor =
    props.activeColor && props.activeColor ? props.activeColor : "#FDCC5D";
  const color = props.color && props.color ? props.color : "#ccc";
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  return (
    <>
      <Box
        component="svg"
        sx={{ cursor: "pointer", ...sx }}
        width={size}
        height={size}
        viewBox={viewBox}
      >
        <circle
          fill="none"
          stroke={color}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          fill="none"
          stroke={activeColor}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={[dash, circumference - dash]}
          strokeLinecap="round"
          style={{ transition: animation }}
        />
      </Box>

      <Box
        sx={{
          width: "max-content",
          height: "max-content",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
        }}
      >
        <NextImage
          sx={{
            transform: props.action == -1 ? "scaleX(-1)" : "",
            cursor: "pointer",
            width: "22px!important",
            height: "12px!important",
          }}
          src="/assets/homepage/collections/arrow.png"
          alt="next"
        />
      </Box>
    </>
  );
};

CircleLoader.propTypes = {};

export default memo(CircleLoader);
