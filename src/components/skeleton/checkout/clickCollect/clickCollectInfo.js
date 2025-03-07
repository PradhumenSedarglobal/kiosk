import { alpha } from "@mui/material/styles"; // For the alpha function
import Grid from "@mui/material/Grid"; // For the Grid component
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ClickCollectInfoSkeleton = () => {
  return (
    <Box
      padding="32px"
      component="div"
      sx={(theme) => ({
        width: "100%",
        height: "100%",
      })}
    >
      <Container maxWidth="xl">
        <Box
          width={"100%"}
          display={{
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
            xxs: "none",
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              height: "77.46px",
              width: "170px",
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
        <Stack direction="row" mt={2} spacing={1}>
          <Box>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "20.8px",
                width: "130px",
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
                height: "20.8px",
                width: "130px",
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
          <Box
            display={{
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                height: "20.8px",
                width: "130px",
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
          <Box
            display={{
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                height: "20.8px",
                width: "130px",
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
        <Grid container spacing={2} mt={4}>
          <Grid item lg={6}>
            <Box>
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
          </Grid>
          <Grid item lg={6}>
            <Box>
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
          </Grid>

          <Grid item lg={6}>
            <Box>
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
          </Grid>
          <Grid item lg={6}>
            <Box>
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
          </Grid>
        </Grid>

        <Box mt={2} width="30%">
          <Skeleton
            variant="rectangular"
            sx={{
              height: "47px",
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
      </Container>
    </Box>
  );
};

export default ClickCollectInfoSkeleton;
