// @mui
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonOffersList({ ...other }) {
  return (
    <>
      <Box>
        <Container maxWidth="xl">
          <Stack
            mt={2}
            mb={2}
            spacing={2}
            direction="row"
            justifyContent="space-between"
          >
            <Box width="18%">
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "36px",
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
            <Box width="8%">
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "36px",
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
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "520.4px",
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
