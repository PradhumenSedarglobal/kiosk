import Box from '@mui/material/Box'
import WebLayoutSkeleton from '../..'
import MoodBoardBreadCrumbSkeleton from './moodBoardBreadCrumbSkeleton'
import MoodBoardHeadingSkeleton from './moodBoardHeadingSkeleton'
import MoodBoardListSkeleton from './moodBoardListSkeleton'

const MoodBoardSkeleton = () => {
    return (
        <WebLayoutSkeleton>
            <Box>
                <MoodBoardBreadCrumbSkeleton />
                <MoodBoardHeadingSkeleton />
                <MoodBoardListSkeleton />
            </Box>
        </WebLayoutSkeleton>
    )
}

export default MoodBoardSkeleton;