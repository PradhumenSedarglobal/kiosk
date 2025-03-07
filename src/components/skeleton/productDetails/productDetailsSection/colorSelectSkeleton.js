import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import React from 'react'
import { alpha, Stack } from '@mui/material'

const ColorSelectSkeleton = () => {
    return (
        <>
            <Box mt={2}>
                <Box >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "16px", width: "150px", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box>
                <Stack direction='row' spacing={1} mt={2}>
                    <Box mt={2}>
                        <Skeleton
                            variant="circular"
                            sx={{
                                height: "32px", width: "32px", borderRadius: 5, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box mt={2}>
                        <Skeleton
                            variant="circular"
                            sx={{
                                height: "32px", width: "32px", borderRadius: 5, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box mt={2}>
                        <Skeleton
                            variant="circular"
                            sx={{
                                height: "32px", width: "32px", borderRadius: 5, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box mt={2}>
                        <Skeleton
                            variant="circular"
                            sx={{
                                height: "32px", width: "32px", borderRadius: 5, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box mt={2}>
                        <Skeleton
                            variant="circular"
                            sx={{
                                height: "32px", width: "32px", borderRadius: 5, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box mt={2}>
                        <Skeleton
                            variant="circular"
                            sx={{
                                height: "32px", width: "32px", borderRadius: 5, "&.MuiSkeleton-root": {
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

export default ColorSelectSkeleton