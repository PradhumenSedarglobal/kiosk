import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const FaqsHeadingSkeleton = () => {
  return (
    <>
      <Box mt={2} mb={4}>
        <Container maxWidth="xl">
          <Skeleton
            variant="rectangular"
            sx={{
              height: "49px",
              width: "40%",
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
        </Container>
      </Box>
    </>
  );
};

export default FaqsHeadingSkeleton;
