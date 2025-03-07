import Box from '@mui/material/Box'
import WebLayoutSkeleton from '../layout'
import SkeletonOffersBanner from './offersBanner'
import SkeletonOffersList from './offersList'

const OfferPageSkeleton = () => {
    return (
        <WebLayoutSkeleton>
            <Box>
                <SkeletonOffersBanner />
                <SkeletonOffersList />
            </Box>
        </WebLayoutSkeleton>
    )
}

export default OfferPageSkeleton