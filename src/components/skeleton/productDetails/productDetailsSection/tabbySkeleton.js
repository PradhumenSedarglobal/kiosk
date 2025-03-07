import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import React from "react";
import { alpha } from "@mui/material/styles";

const TabbySkeleton = () => {
  return (
    <>
      <Box mt={2}>
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "75.6px",
              borderRadius: 1,
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
      </Box>
    </>
  );
};

export default TabbySkeleton;
