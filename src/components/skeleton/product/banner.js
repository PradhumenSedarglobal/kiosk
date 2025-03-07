// @mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonProductBanner({ ...other }) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} xxs={12} >
                    <Box display={{ lg: "block", md: "block", sm: "none", xs: "none", xxs: "none" }}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: 400, borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box display={{ lg: "none", md: "none", sm: "block", xs: "block", xxs: "block" }}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: 93, borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                mt: 2,
                                height: 42, borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
