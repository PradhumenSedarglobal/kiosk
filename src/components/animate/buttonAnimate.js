/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import { m } from "framer-motion";
import { forwardRef } from "react";
// @mui
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

const ButtonAnimate = forwardRef(
  ({ children, size = "medium", ...other }, ref) => (
    <AnimateWrap size={size}>
      <Box component="div" size={size} ref={ref} {...other}>
        {children}
      </Box>
    </AnimateWrap>
  )
);

ButtonAnimate.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    "inherit",
    "default",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default ButtonAnimate;

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
};

AnimateWrap.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

function AnimateWrap({ size, children }) {
  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: "inline-flex",
      }}
    >
      {children}
    </Box>
  );
}
