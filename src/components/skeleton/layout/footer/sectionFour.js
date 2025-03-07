import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import { alpha, styled } from "@mui/material/styles";
const Stack = dynamic(() => import("@mui/material/Stack"), {
  loading: () => <></>,
  ssr: true,
});

const CustomSkeleton = styled(Skeleton)(({ theme }) => ({
  "&.MuiSkeleton-root": {
    backgroundColor: alpha(theme.palette.grey[400], 0.5),
    "::after": {
      background: `linear-gradient(90deg, transparent, ${alpha(
        theme.palette.grey[900],
        0.6
      )}, transparent) !important`,
    },
  },
}));

const SectionFourSkeleton = () => {
  return (
    <Box component="div" mt={5}>
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
            <CustomSkeleton width="100%" height={40} />
          </Grid>
          <Grid item lg={7} md={7} sm={12} xs={12} xxs={12}>
            <Stack
              direction="row"
              spacing={{ md: 6, sm: 10, xs: 1.6, xxs: 1.6 }}
              rowGap={1}
              justifyContent="center"
              flexWrap="wrap"
            >
              <CustomSkeleton width="100px" height={30} />
              <CustomSkeleton width="100px" height={30} />
              <CustomSkeleton width="100px" height={30} />
              <CustomSkeleton width="100px" height={30} />
            </Stack>
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12} xxs={12}>
            <CustomSkeleton width="100%" height={40} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SectionFourSkeleton;
