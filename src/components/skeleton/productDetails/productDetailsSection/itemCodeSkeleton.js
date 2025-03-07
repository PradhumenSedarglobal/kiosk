import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import { alpha } from "@mui/material";

const ItemCodeSkeleton = () => {
  return (
    <>
      <Box mt={2}>
        <Stack direction="row" spacing={1}>
          <Box width="12%">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "17.6px",
                borderRadius: 0,
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
          <Box width="10%">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "17.6px",
                borderRadius: 0,
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
        </Stack>

        <Box width="70%" mt={1}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "34px",
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

        <Stack
          direction="row"
          spacing={1}
          mt={2}
          justifyContent="space-between"
        >
          <Box>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "53px",
                width: "120px",
                borderRadius: 0,
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
          <Box>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "58px",
                width: "156px",
                borderRadius: 0,
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
        </Stack>
      </Box>
    </>
  );
};

export default ItemCodeSkeleton;
