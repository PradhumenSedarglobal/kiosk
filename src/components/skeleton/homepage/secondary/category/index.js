import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const CategorySkeleton = () => {
  return (
    <>
      <Box
        component="div"
        sx={(theme) => ({
          backgroundColor: theme.palette.common.white,
          width: "100%",
          height: "100%",
        })}
      >
        <Grid container columnSpacing={2}>
          <Grid item sm={4} xs={4} xxs={4}>
            <Skeleton variant="rectangular" width="100%" height={594} />
          </Grid>
          <Grid item sm={4} xs={4} xxs={4}>
            <Skeleton variant="rectangular" width="100%" height={594} />
          </Grid>
          <Grid item sm={4} xs={4} xxs={4}>
            <Skeleton variant="rectangular" width="100%" height={594} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CategorySkeleton;
