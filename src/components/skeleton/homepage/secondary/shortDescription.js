import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import React from "react";
import Container from "@mui/material/Container";

const ShortDescriptionSkeleton = () => {
  return (
    <Box
      component="div"
      sx={(theme) => ({
        backgroundColor: theme.palette.common.white,
        width: "100%",
        height: "100%",
      })}
    >
      <Container maxWidth="xl">
        <Skeleton
          variant="rectangular"
          width="90%"
          height={20}
          sx={{ mb: 1 }}
        />
        <Skeleton variant="rectangular" width="100%" height={210} />
      </Container>
    </Box>
  );
};

export default ShortDescriptionSkeleton;
