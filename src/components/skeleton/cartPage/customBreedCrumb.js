import { alpha } from "@mui/material/styles"; // For the alpha function
import Box from "@mui/material/Box"; // For the Box component
import Skeleton from "@mui/material/Skeleton"; // For the Skeleton component

import React from "react";

const CustomBreedCrumbSkeleton = () => {
  return (
    <>
      <Box>
        <Skeleton
          variant="rectangular"
          sx={{
            height: "28px",
            width: "15%",
            borderRadius: 0,
            "&.MuiSkeleton-root": {
              backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
              "::after": {
                background: (theme) =>
                  `linear-gradient(90deg, transparent, ${alpha(
                    theme.palette.grey[900],
                    0.08
                  )}, transparent)`,
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default CustomBreedCrumbSkeleton;
