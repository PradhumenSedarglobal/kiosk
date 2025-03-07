import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import WebLayoutSkeleton from "../layout";
const SuccessSkeleton = () => {
  return (
    <WebLayoutSkeleton>
      <Box mt={6}>
        <Container maxWidth="xl">
          <Box width={"100%"} textAlign="-webkit-center">
            <Skeleton
              variant="rectangular"
              sx={{
                height: "143px",
                width: "189px",
                borderRadius: 0,
                "&.MuiSkeleton-root": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[400], 0.4),
                  "::after": {
                    background: (theme) =>
                      `linear-gradient(90deg, transparent, ${alpha(
                        theme.palette.grey[900],
                        0.08
                      )}, transparent)`,
                  },
                },
              }}
            />
          </Box>
          <Box width={"100%"} textAlign="-webkit-center" mt={4}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "48px",
                width: "540px",
                borderRadius: 0,
                "&.MuiSkeleton-root": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[400], 0.4),
                  "::after": {
                    background: (theme) =>
                      `linear-gradient(90deg, transparent, ${alpha(
                        theme.palette.grey[900],
                        0.08
                      )}, transparent)`,
                  },
                },
              }}
            />
          </Box>
          <Box width={"100%"} textAlign="-webkit-center" mt={4}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "27px",
                width: "540px",
                borderRadius: 0,
                "&.MuiSkeleton-root": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[400], 0.4),
                  "::after": {
                    background: (theme) =>
                      `linear-gradient(90deg, transparent, ${alpha(
                        theme.palette.grey[900],
                        0.08
                      )}, transparent)`,
                  },
                },
              }}
            />
          </Box>
          <Box width={"100%"} textAlign="-webkit-center" mt={4}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "27px",
                width: "540px",
                borderRadius: 0,
                "&.MuiSkeleton-root": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[400], 0.4),
                  "::after": {
                    background: (theme) =>
                      `linear-gradient(90deg, transparent, ${alpha(
                        theme.palette.grey[900],
                        0.08
                      )}, transparent)`,
                  },
                },
              }}
            />
          </Box>
          <Box width={"100%"} textAlign="-webkit-center" mt={4}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "27px",
                width: "540px",
                borderRadius: 0,
                "&.MuiSkeleton-root": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[400], 0.4),
                  "::after": {
                    background: (theme) =>
                      `linear-gradient(90deg, transparent, ${alpha(
                        theme.palette.grey[900],
                        0.08
                      )}, transparent)`,
                  },
                },
              }}
            />
          </Box>
          <Box width={"100%"} textAlign="-webkit-center" mt={4}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "66px",
                width: "272px",
                borderRadius: 0,
                "&.MuiSkeleton-root": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[400], 0.4),
                  "::after": {
                    background: (theme) =>
                      `linear-gradient(90deg, transparent, ${alpha(
                        theme.palette.grey[900],
                        0.08
                      )}, transparent)`,
                  },
                },
              }}
            />
          </Box>
        </Container>
      </Box>
    </WebLayoutSkeleton>
  );
};

export default SuccessSkeleton;
