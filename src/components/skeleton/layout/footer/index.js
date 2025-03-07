import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import React from "react";
import SectionOneSkeleton from "./sectionOne";
import SectionTwoSkeleton from "./sectionTwo";
import SectionThreeSkeleton from "./sectionThree";
import SectionFourSkeleton from "./sectionFour";

const FooterSkeleton = () => {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: (theme) => theme.palette.dark.darker,
        px: 3,
        pt: "87px",
        position: "relative",
        pb: { md: 0, sm: 0, xs: 6, xxs: 6 },
      }}
    >
      <Container maxWidth="xl">
        <SectionOneSkeleton />
        <SectionTwoSkeleton />
        <SectionThreeSkeleton />
        <SectionFourSkeleton />
      </Container>
    </Box>
  );
};

export default FooterSkeleton;
