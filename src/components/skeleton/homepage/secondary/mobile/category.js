import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
const MobileCategorySkeleton = () => {
  return (
    <Box
      component="div"
      sx={(theme) => ({
        backgroundColor: theme.palette.common.white,
        width: "100%",
        height: "100%",
      })}
    >
      <Grid container columnSpacing={2}>
        <Grid item sm={6} xs={6} xxs={6}>
          <Skeleton variant="rectangular" width="100%" height={250} />
        </Grid>
        <Grid item sm={6} xs={6} xxs={6}>
          <Skeleton variant="rectangular" width="100%" height={250} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MobileCategorySkeleton;
