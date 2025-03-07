import SnackbarProvider from "@/components/snackbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import StickyTab from "./stickyTab";


const SimilarProductSection = ({ similarProducts }) => {

  return (
    <Box sx={{ position: "relative", mt: 5 }}>
      <Container maxWidth="xl">
        <SnackbarProvider>
          <StickyTab similarProducts={similarProducts} />
        </SnackbarProvider>
      </Container>
    </Box>
  );
};

export default SimilarProductSection;
