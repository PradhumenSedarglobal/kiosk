import { alpha } from "@mui/material/styles"; // Import alpha from styles
import Container from "@mui/material/Container"; // Import Container as a default import
import Stack from "@mui/material/Stack"; // Import Stack as a default import
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const CartPopupSkeleton = () => {
  return (
    <Box component="div">
      <Grid container spacing={3} alignItems="center">
        <Grid item md={3.7} sm={3.7}>
          <Skeleton variant="rectangular" width="100%" height={88} />
        </Grid>
        <Grid item md={8.3} sm={8.3}>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" width="100%" height={10} />
            <Skeleton variant="rectangular" width="100%" height={10} />
            <Skeleton variant="rectangular" width="100%" height={10} />
            <Skeleton variant="rectangular" width="100%" height={10} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPopupSkeleton;
