// @mui
import  Box  from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonProductAccordionFilter({ ...other }) {
    return (
        <>
        <Box mb={2}>
            <Grid container spacing={2}>
                <Grid item lg={3.5}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "22px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={7}>
                </Grid>
                <Grid item lg={1.5}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "15px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item lg={12}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "36px", "&.MuiSkeleton-root": {
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
        </>
    )
}