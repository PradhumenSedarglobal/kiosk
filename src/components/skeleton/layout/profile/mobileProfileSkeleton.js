import React from 'react'
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
const MobileProfileSkeleton = () => {
    return (
        <>
            <Box >
                <Container maxWidth="xl">
                    <Box display='flex'
                        flexDirection='column'
                        alignItems='center' mt={6}>
                        <Skeleton variant="circular" sx={{
                            height: "80px", width: '80px', borderRadius: 5, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }} />
                        <Skeleton variant="rectangular" sx={{
                            height: "19.25px", width: "85.25px", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }} />
                    </Box>
                    <Box mt={4}>
                        <Skeleton variant="rectangular" sx={{
                            height: "74.93px", width: "100%", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }} />

                    </Box>
                    <Box mt={2}>
                        <Skeleton variant="rectangular" sx={{
                            height: "74.93px", width: "100%", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }} />

                    </Box>
                    <Box mt={2}>
                        <Skeleton variant="rectangular" sx={{
                            height: "74.93px", width: "100%", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }} />

                    </Box>
                    <Box mt={2}>
                        <Skeleton variant="rectangular" sx={{
                            height: "74.93px", width: "100%", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }} />

                    </Box>
                    <Box p="32px">
                        <Skeleton variant="rectangular" sx={{
                            height: "61.6px", width: "100%", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }} />

                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default MobileProfileSkeleton;