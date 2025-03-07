import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SkeletonProductBanner from './banner'
import SkeletonProductFilter from './filter'
import SkeletonProductList from './MaterialCardGrid/MaterialList'

const ProductListSkeleton = () => {
    return (
        <>
            <Box>
                <SkeletonProductBanner />
                <Container maxWidth='xl'>
                    <Grid container spacing={2} mt={2}>
                        <Grid item lg={4} md={4} sm={4} xs={12} xxs={12}>
                            <SkeletonProductFilter />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={12} xxs={12}>
                            <SkeletonProductList />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default ProductListSkeleton