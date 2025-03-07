import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";

const HomePageLoadingScreen = ({ count = 1, height = 560 }) => {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      {[...Array(count)].map((item, index) => {
        return (
          <Box key={`HomePageLoadingScreen-${index}`}>
            <Skeleton
              width="100%"
              height={height}
              variant="rectangular"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        );
      })}
    </Container>
  );
};
export default HomePageLoadingScreen;
