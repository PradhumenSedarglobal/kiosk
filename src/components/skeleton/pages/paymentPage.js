// @mui
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonPayment({ ...other }) {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <Box position="relative">
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: 700, borderRadius: 1, "&.MuiSkeleton-root": {
                      backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                      "::after": {
                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                      }
                    }
                  }}
                />
                <Box component={Container} position="absolute" top="20px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Card sx={{ borderRadius: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ height: 100, borderRadius: 0 }}
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={6}></Grid>
                  </Grid>
                </Box>
                <Box component={Container} position="absolute" top="130px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={12}>
                      <Card sx={{ borderRadius: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ height: 40, borderRadius: 0 }}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                <Box component={Container} position="absolute" top="180px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={12}>
                      <Card sx={{ borderRadius: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ height: 510, borderRadius: 0 }}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>


            <Grid item lg={6}>
              <Box position="relative">
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: 700, borderRadius: 1, "&.MuiSkeleton-root": {
                      backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                      "::after": {
                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                      }
                    }
                  }}
                />
                <Box component={Container} position="absolute" top="130px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Card sx={{ borderRadius: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ height: 80, borderRadius: 0 }}
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={6}></Grid>
                  </Grid>
                </Box>
                <Box component={Container} position="absolute" top="220px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={12}>
                      <Card sx={{ borderRadius: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ height: 110, borderRadius: 0 }}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                <Box component={Container} position="absolute" top="340px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={12}>
                      <Card sx={{ borderRadius: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ height: 110, borderRadius: 0 }}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                <Box component={Container} position="absolute" top="460px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={12}>
                      <Card sx={{ borderRadius: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ height: 110, borderRadius: 0 }}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                <Box component={Container} position="absolute" top="580px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={12}>
                      <Card sx={{ borderRadius: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ height: 110, borderRadius: 0 }}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
