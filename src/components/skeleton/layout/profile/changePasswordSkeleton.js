import React from 'react'
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
const ChangePasswordSkeleton = () => {
    return (
        <>
            <Box pr={40} pt={3}>
                <Container maxWidth="xl">
                    <Box>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "26.66px", width: "15%", borderRadius: 0, "&.MuiSkeleton-root": {
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
                            variant="rectangular"
                            sx={{
                                height: "56px", borderRadius: 0, "&.MuiSkeleton-root": {
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
                            variant="rectangular"
                            sx={{
                                height: "56px", borderRadius: 0, "&.MuiSkeleton-root": {
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
                            variant="rectangular"
                            sx={{
                                height: "56px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>

                    <Stack direction='row' spacing={2} p={4}>
                        <Box width="50%">
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    height: "48px", borderRadius: 0, "&.MuiSkeleton-root": {
                                        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                        "::after": {
                                            background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                        }
                                    }
                                }}
                            />
                        </Box>
                        <Box width="50%">
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    height: "48px", borderRadius: 0, "&.MuiSkeleton-root": {
                                        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                        "::after": {
                                            background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Stack>
                   
                </Container>
            </Box>
        </>
    )
}

export default ChangePasswordSkeleton;