import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import { alpha } from "@mui/material/styles";

const MoodBoardBreadCrumbSkeleton = () => {
  return (
    <>
      <Box pt={8}>
        <Container maxWidth="xl">
          <Box width="10%">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "26px", borderRadius: 0, "&.MuiSkeleton-root": {
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

export default MoodBoardBreadCrumbSkeleton;