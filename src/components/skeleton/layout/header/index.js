import { alpha } from "@mui/material/styles"; // Import alpha from styles
import Container from "@mui/material/Container"; // Import Container as a default import
import Stack from "@mui/material/Stack"; // Import Stack as a default import
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const HeaderSkeleton = () => {
  return (
    <Box
      component="div"
      sx={{
        bgColor: "white",
        px: { md: 3, sm: 2, xs: 2, xxs: 2 },
        pt: 1,
        position: "relative",
        pb: { md: 1, sm: 0, xs: 1, xxs: 1 },
        height: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2.5} alignItems="center">
          <Grid item lg={1.5} md={1.5} sm={2} xs={2} xxs={3}>
            <Skeleton variant="rectangular" width="100%" height={55} />
          </Grid>
          <Grid item lg={10.5} md={10.5} sm={9.3} xs={9.3} xxs={7.5}>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: { md: "block", sm: "none", xs: "none", xxs: "none" },
                }}
              >
                <Stack direction="row" spacing={2} justifyContent="end">
                  <Skeleton variant="rectangular" width="145px" height={24} />
                  <Skeleton variant="rectangular" width="145px" height={24} />
                  <Skeleton variant="rectangular" width="145px" height={24} />
                  <Skeleton variant="rectangular" width="145px" height={24} />
                  <Skeleton variant="rectangular" width="145px" height={24} />
                  <Skeleton variant="rectangular" width="145px" height={24} />
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" spacing={2} justifyContent="end">
                  <Box
                    sx={{
                      width: {
                        md: "100%",
                        sm: "20px",
                        xs: "20px",
                        xxs: "20px",
                      },
                    }}
                  >
                    <Skeleton variant="rectangular" width="100%" height={24} />
                  </Box>
                  <Box
                    sx={{
                      display: {
                        md: "none",
                        sm: "block",
                        xs: "block",
                        xxs: "block",
                      },
                      width: {
                        md: "100%",
                        sm: "20px",
                        xs: "20px",
                        xxs: "20px",
                      },
                    }}
                  >
                    <Skeleton variant="rectangular" width="100%" height={24} />
                  </Box>
                </Stack>
              </Box>

              <Box
                sx={{
                  display: { md: "block", sm: "none", xs: "none", xxs: "none" },
                }}
              >
                <Stack direction="row" spacing={2}>
                  {[...Array(10)].map((item, index) => {
                    return (
                      <Skeleton
                        key={`${index}-${item}`}
                        variant="rectangular"
                        width="100%"
                        height={24}
                      />
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeaderSkeleton;
