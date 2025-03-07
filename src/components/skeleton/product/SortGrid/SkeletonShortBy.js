// @mui
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonProductShortBy({ ...other }) {
    return (
        <>
            <Box >
                <Skeleton
                    variant="rectangular"
                    sx={{
                        height: "48px", "&.MuiSkeleton-root": {
                            backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                            "::after": {
                                background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                            }
                        }
                    }}
                />
            </Box>
        </>
    )
}