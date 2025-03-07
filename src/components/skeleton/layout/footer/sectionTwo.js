import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import React from "react";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
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

const SectionTwoSkeleton = () => {
  return (
    <Box component="div" mt={5}>
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="stretch">
          <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
            <Box width="100%" mb={3}>
              <CustomSkeleton width="100%%" height={50} />
            </Box>
            <Stack spacing={1} width="100%">
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
            </Stack>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
            <Box width="100%" mb={3}>
              <CustomSkeleton width="100%%" height={50} />
            </Box>
            <Stack spacing={1} width="100%">
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
            </Stack>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
            <Box width="100%" mb={3}>
              <CustomSkeleton width="100%%" height={50} />
            </Box>
            <Stack spacing={1} width="100%">
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
            </Stack>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
            <Box width="100%" mb={3}>
              <CustomSkeleton width="100%%" height={50} />
            </Box>
            <Stack spacing={1} width="100%">
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
              <CustomSkeleton width="100%%" height={30} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SectionTwoSkeleton;
