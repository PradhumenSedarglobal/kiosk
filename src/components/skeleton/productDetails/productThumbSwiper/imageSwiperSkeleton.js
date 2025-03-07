import { alpha } from "@mui/material/styles";
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import React from 'react'

const ImageSwiperSkeleton = () => {
    return (
        <>
            <Box mt={2} pl={0.5}>
                <Box mt={1}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "21px", width: '60%', borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box>
                <Box mt={1}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "598px", borderRadius: 0, "&.MuiSkeleton-root": {
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

export default ImageSwiperSkeleton