import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import DeliveryDaysSkeleton from "./deliveryDaysSkeleton";
import ItemCodeSkeleton from "./itemCodeSkeleton";
import TabbySkeleton from "./tabbySkeleton";
import ColorSelectSkeleton from "./colorSelectSkeleton";
const ProductDetailsSection = () => {
  return (
    <>
      <Box>
        <DeliveryDaysSkeleton />
        <ItemCodeSkeleton />
        <TabbySkeleton />
        <Stack
          direction="row"
          spacing={1}
          mt={2}
          justifyContent="space-between"
        >
          <Box width="50%">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "56px",
                width: "280px",
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
          <Box width="50%">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "56px",
                width: "280px",
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
        <ColorSelectSkeleton />

        <Box mt={4}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "18x",
              width: "177px",
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
        <Box mt={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "28px",
              width: "100%",
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
        <Box mt={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "28px",
              width: "100%",
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
        <Box mt={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "28px",
              width: "100%",
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

        <Stack direction="row" spacing={3} mt={4}>
          <Box width="50%">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "58px",
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
          <Box width="50%">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "58px",
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

export default ProductDetailsSection;
