import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import OrderSummarySkeleton from '../orderSummary'
import ClickCollectInfoSkeleton from './clickCollectInfo'

const ClickCollectSkeleton = () => {
  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid lg={7} md={7} sm={12} xs={12} xxs={12}>
            <ClickCollectInfoSkeleton />
          </Grid>
          <Grid lg={5} md={5} sm={12} xs={12} xxs={12}>
            <Box display={{ lg: 'block', md: 'block', sm: 'none', xs: 'none', xxs: 'none' }}>
              <OrderSummarySkeleton />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ClickCollectSkeleton