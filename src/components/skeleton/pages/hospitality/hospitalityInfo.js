// @mui
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonHospitalityInfo({ ...other }) {
  return (
    <>
      <Box mt={2}>
        <Container maxWidth="large">
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12} xxs={12}>
              <Box>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: "400px",
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
            <Grid item lg={6} md={6} sm={6} xs={12} xxs={12}>
              <Box>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: "400px",
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
        </Container>
      </Box>
    </>
  );
}
