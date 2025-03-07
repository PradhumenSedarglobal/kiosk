import { alpha } from "@mui/material/styles"; // Import alpha from styles
import Grid from "@mui/material/Grid"; // Import Grid as a default import
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ShippingInfoSkeleton = () => {
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
        <Box mt={5}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "48px",
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

        <Grid container spacing={2} mt={1}>
          <Grid item lg={6}>
            <Box>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "303px",
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
                  height: "303px",
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
        <Box mt={5}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "66.28px",
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
      </Container>
    </Box>
  );
};

export default ShippingInfoSkeleton;
