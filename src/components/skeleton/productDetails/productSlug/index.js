import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import SkeletonProductBanner from "./bannerSkeleton";
import ProductSwiperSkeleton from "../productThumbSwiper";
import ProductDetailsSection from "../productDetailsSection";

const ProductSkeletonSlug = () => {
  return (
    <>
      <Box>
        <SkeletonProductBanner />
        <Container maxWidth="lg">
          <Grid container spacing={2} mt={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ProductSwiperSkeleton />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ProductDetailsSection />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ProductSkeletonSlug;
