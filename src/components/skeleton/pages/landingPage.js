// @mui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonLanding({ ...other }) {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: 1, height: 680, borderRadius: 2, "&.MuiSkeleton-root": {
                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                    "::after": {
                      background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                    }
                  }
                }}
              />
            </Grid>
            <Grid item lg={8} >
              <Box position="relative">
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: 1, height: 680, borderRadius: 2, "&.MuiSkeleton-root": {
                      backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                      "::after": {
                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                      }
                    }
                  }}
                />
                <Box component={Container} position="absolute" bottom="20px" left="0" >
                  <Grid container spacing={2}>
                    <Grid item lg={8}>
                      <Grid container spacing={2}>
                        {[...Array(6)].map((_, index) => (
                          <>
                            <Grid item lg={4}>
                              <Card sx={{ borderRadius: 0 }}>
                                <Skeleton
                                  variant="rectangular"
                                  sx={{ height: 80, borderRadius: 0 }}
                                />
                              </Card>
                            </Grid>
                          </>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid item lg={4}>
                      <Grid item lg={10}>
                        <Card sx={{ borderRadius: 0 }}>
                          <Skeleton
                            variant="rectangular"
                            sx={{ height: 175, borderRadius: 0 }}
                          />
                        </Card>
                      </Grid>
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
