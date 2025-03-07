// @mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function SkeletonFreeSample({ ...other }) {
  return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: 400, borderRadius: 1, "&.MuiSkeleton-root": {
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
                  height: 100, borderRadius: 1, "&.MuiSkeleton-root": {
                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                    "::after": {
                      background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
}
