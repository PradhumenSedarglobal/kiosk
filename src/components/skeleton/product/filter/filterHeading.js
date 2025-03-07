// @mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonProductFilterHeading({ ...other }) {
    return (
        <>
            <Box mb={2}>
                <Grid container spacing={2}>
                    <Grid item lg={3.5}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "36.75px", "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item lg={6}>
                    </Grid>
                    <Grid item lg={2.5}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "21px", "&.MuiSkeleton-root": {
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