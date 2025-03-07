import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const PaymentInfoSkeleton = () => {
  return (
    <Box
      padding="   40px"
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

        <Box width={"100%"} mt={8}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "94.55px",
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
        <Box width={"100%"} p={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "48px",
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
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid lg={4}>
              <Box p={2}>
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
            <Grid lg={4}>
              <Box p={2}>
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
            <Grid lg={4}>
              <Box p={2}>
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
        </Box>
        <Box width={"100%"} p={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "48px",
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

        <Box width={"100%"} p={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "40px",
              width: "50%",
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

        <Box width={"100%"} p={2} textAlign="-webkit-right">
          <Skeleton
            variant="rectangular"
            sx={{
              height: "48px",
              width: "50%",
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

        <Box width={"100%"} textAlign="-webkit-right">
          <Skeleton
            variant="rectangular"
            sx={{
              height: "48px",
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
        <Box width={"100%"} mt={2} textAlign="-webkit-right">
          <Skeleton
            variant="rectangular"
            sx={{
              height: "48px",
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

export default PaymentInfoSkeleton;
