import React from 'react'
import ProductSwiperSkeleton from './productThumbSwiper'
import ProductDetailsSection from './productDetailsSection'
import Grid from '@mui/material/Grid'

const ProductDetailsSkeleton = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <ProductSwiperSkeleton />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <ProductDetailsSection />
        </Grid>
      </Grid>
    </>
  )
}

export default ProductDetailsSkeleton