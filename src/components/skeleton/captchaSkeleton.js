// @mui
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

// ----------------------------------------------------------------------

export default function CaptchaSkeleton({ ...other }) {
  return (
    <CardContent>
      <Box>
        <Skeleton
          variant="rectangular"
          sx={{ width: "300px", height: "74px", borderRadius: 0 }}
        />
      </Box>
    </CardContent>
  );
}
