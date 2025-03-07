import React from "react";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const AddNewCardSkeleton = () => {
  return (
    <>
      <Box pr={30} pt={3}>
        <Container maxWidth="xl">
          <Box>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "26.66px",
                width: "15%",
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
          <Stack direction="row" spacing={2} mt={2}>
            <Box width="80%"></Box>
            <Box width="20%">
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "25px",
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

          <Box mt={2} width={"60%"}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "56px",
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
          <Box width={"40%"}></Box>
          <Box mt={5} width={"60%"}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "56px",
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
          <Box mt={5} width={"40%"}></Box>
          <Stack direction="row" spacing={2}>
            <Box mt={2} width={"29%"}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "56px",
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
            <Box mt={2} width={"29%"}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "56px",
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
          <Box width="50%" p={5}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "48px",
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
          <Box width="80%">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "22px",
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
        </Container>
      </Box>
    </>
  );
};

export default AddNewCardSkeleton;
