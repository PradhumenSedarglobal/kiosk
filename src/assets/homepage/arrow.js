import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

function Arrow({
  width = "56.25px",
  component = "p",
  height = "90px",
  color,
  ...others
}) {
  const theme = useTheme();

  const COMMON_MAIN = theme.palette.common.white;

  return (
    <Box component={component} {...others}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={color || COMMON_MAIN}
          d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
        ></path>
      </svg>
    </Box>
  );
}

export default memo(Arrow);
