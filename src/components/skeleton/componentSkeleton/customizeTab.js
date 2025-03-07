import { alpha } from "@mui/material/styles"; // Import alpha from styles
import Box from "@mui/material/Box"; // Import Box as a default import
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton as a default import
import React from "react";

const CustomizeTabSkeleton = () => {
  return (
    <>
      <Box>
        <Box mb={1}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "244px",
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
        <Box mb={1}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "83px",
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
        <Box mb={1}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "83px",
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
        <Box mb={1}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "83px",
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
        </Box>{" "}
        <Box mb={1}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "83px",
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

export default CustomizeTabSkeleton;
