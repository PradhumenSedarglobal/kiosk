import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import { alpha } from "@mui/material/styles";

const MoodBoardHeadingSkeleton = () => {
  return (
    <>
      <Box>
        <Container maxWidth="xl">
          <Box width="20%" m={2} pb={4}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "44.8px", borderRadius: 0, "&.MuiSkeleton-root": {
                  backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                  "::after": {
                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                  }
                }
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default MoodBoardHeadingSkeleton;