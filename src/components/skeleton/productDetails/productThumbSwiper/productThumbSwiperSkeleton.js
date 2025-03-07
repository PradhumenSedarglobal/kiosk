import { alpha } from '@mui/material'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import React from 'react'

const ProductThumbSwiperSkeleton = () => {
    return (
        <>
            <Box mt={2} pl={0.5}>
                <Stack direction='row' spacing={3}>
                    <Box width="90px">
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "90px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box width="90px">
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "90px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box width="90px">
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "90px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default ProductThumbSwiperSkeleton