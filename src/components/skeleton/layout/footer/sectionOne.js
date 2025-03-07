import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
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

const SectionOneSkeleton = () => {
  return (
    <Box component="div">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="100%">
            <CustomSkeleton variant="rounded" width="30%" height={100} />
          </Box>
          <Stack spacing={1} width="100%">
            <CustomSkeleton variant="rounded" width="70%" height={25} />
            <CustomSkeleton variant="rounded" width="80%" height={20} />
            <CustomSkeleton variant="rounded" width="100%" height={60} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SectionOneSkeleton;
