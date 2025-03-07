import { alpha } from "@mui/material/styles";
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import React from 'react'
import WebLayoutSkeleton from '..'

const ProfileSkeleton = () => {
    return (
        <WebLayoutSkeleton>
            <Box>
                <Container maxWidth="xl">
                    <Box>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "30px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Stack direction='row' spacing={2} mt={2}>
                        <Box >
                            <Skeleton
                                variant="circular"
                                sx={{
                                    height: "50px", width: "50px", borderRadius: 50, "&.MuiSkeleton-root": {
                                        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                        "::after": {
                                            background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                        }
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    height: "24px", borderRadius: 0, "&.MuiSkeleton-root": {
                                        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                        "::after": {
                                            background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                        }
                                    }
                                }}
                            />
                            <Box sx={{ flex: 1 }} mt={1}>
                                <Skeleton
                                    variant="rectangular"
                                    sx={{
                                        height: "24px", borderRadius: 0, "&.MuiSkeleton-root": {
                                            backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                            "::after": {
                                                background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Stack>
                    <Box mt={6}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "25px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box mt={4}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "25px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box mt={4}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "25px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box mt={4}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "25px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box pl={6} pr={6} pt={3}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "59.6px", borderRadius: 0, "&.MuiSkeleton-root": {
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
        </WebLayoutSkeleton>
    )
}

export default ProfileSkeleton
