import Box from '@mui/material/Box'
import WebLayoutSkeleton from '../../..'
import MoodBoardBreadCrumbSkeleton from '../moodBoardBreadCrumbSkeleton'
import MoodBoardHeadingSkeleton from '../moodBoardHeadingSkeleton'
import SkeletonMoodBoardDetails from './moodBoardDetails'

const MoodBoardsFavoritesSkeleton = () => {
    return (
        <WebLayoutSkeleton>
            <Box>
                <MoodBoardBreadCrumbSkeleton />
                <MoodBoardHeadingSkeleton />
                <SkeletonMoodBoardDetails />
            </Box>
        </WebLayoutSkeleton>
    )
}

export default MoodBoardsFavoritesSkeleton;