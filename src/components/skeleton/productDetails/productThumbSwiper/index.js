import Box from '@mui/material/Box'
import React from 'react'
import ImageSwiperSkeleton from './imageSwiperSkeleton'
import ProductThumbSwiperSkeleton from './productThumbSwiperSkeleton'

const ProductSwiperSkeleton = () => {
    return (
        <>
            <Box>
                <ImageSwiperSkeleton />
                <ProductThumbSwiperSkeleton />
            </Box>
        </>
    )
}

export default ProductSwiperSkeleton