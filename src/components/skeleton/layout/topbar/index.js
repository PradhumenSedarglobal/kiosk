import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const TopBarSkeleton = () => {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: (theme) => theme.palette.dark.darker,
        px: 3,
        pt: 1,
        position: "relative",
        pb: { md: 1, sm: 0, xs: 1, xxs: 1 },
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "20px",
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
        </Grid>

        <Grid item lg={1} md={1} sm={0} xs={0} xxs={0}></Grid>
        <Grid item lg={1} md={1} sm={0} xs={0} xxs={0}></Grid>
        <Grid item lg={1}>
          <Skeleton
            variant="rectangular"
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              },
              height: "20px",
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
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0} xxs={0}>
          <Skeleton
            variant="rectangular"
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              },
              height: "20px",
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
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0} xxs={0}>
          <Skeleton
            variant="rectangular"
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              },
              height: "20px",
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
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0} xxs={0}>
          <Skeleton
            variant="rectangular"
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              },
              height: "20px",
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
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0} xxs={0}>
          <Skeleton
            variant="rectangular"
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              },
              height: "20px",
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
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0} xxs={0}>
          <Skeleton
            variant="rectangular"
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              },
              height: "20px",
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
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0} xxs={0}>
          <Skeleton
            variant="rectangular"
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              },
              height: "20px",
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopBarSkeleton;
