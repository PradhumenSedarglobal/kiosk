import  Skeleton  from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import React from 'react'
import { alpha } from '@mui/material'

const DeliveryDaysSkeleton = () => {
    return (
        <>
            <Box >
                <Box width='32%'>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "28px", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default DeliveryDaysSkeleton