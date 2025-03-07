import { alpha } from "@mui/material/styles"; // Import alpha from styles
import Box from "@mui/material/Box"; // Import Box as a default import
import Grid from "@mui/material/Grid"; // Import Grid as a default import
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton as a default import
import React from "react";
import CustomizeTabSkeleton from "./customizeTab";

const TabAccordionSkeleton = () => {
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={12} xs={12} xxs={12}>
            <Box mb={1}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "61px",
                  borderRadius: 1,
                  "&.MuiSkeleton-root": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.grey[400], 0.4),
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
                  height: "61px",
                  borderRadius: 1,
                  "&.MuiSkeleton-root": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.grey[400], 0.4),
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
                  height: "61px",
                  borderRadius: 1,
                  "&.MuiSkeleton-root": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.grey[400], 0.4),
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
                  height: "61px",
                  borderRadius: 1,
                  "&.MuiSkeleton-root": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.grey[400], 0.4),
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
                  height: "61px",
                  borderRadius: 1,
                  "&.MuiSkeleton-root": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.grey[400], 0.4),
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
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12} xxs={12}>
            <CustomizeTabSkeleton />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TabAccordionSkeleton;
