import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import { alpha } from "@mui/material/styles";
import Grid from '@mui/material/Grid'

const MoodBoardListSkeleton = () => {
  return (
    <>
      <Box>
        <Container maxWidth="xl">
          <Box width="10%" m={2}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "22px", borderRadius: 0, "&.MuiSkeleton-root": {
                  backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                  "::after": {
                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                  }
                }
              }}
            />
          </Box>
          <Box pt={4} pb={4}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "188px", borderRadius: 0, "&.MuiSkeleton-root": {
                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                    "::after": {
                      background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                    }
                  }
                }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "188px", borderRadius: 0, "&.MuiSkeleton-root": {
                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                    "::after": {
                      background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                    }
                  }
                }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "188px", borderRadius: 0, "&.MuiSkeleton-root": {
                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                    "::after": {
                      background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                    }
                  }
                }}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={4} xxs={4}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "188px", borderRadius: 0, "&.MuiSkeleton-root": {
                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                    "::after": {
                      background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default MoodBoardListSkeleton;