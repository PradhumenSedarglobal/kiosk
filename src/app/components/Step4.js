// MUI Components
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

// Custom Components
import MainHeading from "./MainHeading";
import PopupModal from "./PopupModal";

// Redux
import { useSelector } from "react-redux";

const Step4 = ({ handleSubmit, formClose, setFormClose }) => {
  // Redux
  const stepCount = useSelector((state) => state.step.value);
  const fonts = useSelector((state) => state.font);

  return (
    <>
      {/* Popup modal Form Submition */}

      {/* {stepCount == 5 && formClose && ( */}
        <PopupModal/>
      {/* )} */}

      {/* <Box
        sx={{
          userSelect: "none",
          paddingBottom: "1.5rem",
        }}
      >
        <MainHeading sx={{ mb: 2 }} title="Summery" />

        <Box
          className="bigipads"
          sx={{
            height: { lg: "calc(100vh - 240px)", overflow: "auto" },
          }}
        >
          <Grid
            sx={{
              overflow: "auto",
              alignItems: {
                xs: "center",
                sm: "center",
                md: "start",
                lg: "start",
                xl: "start",
              },
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "start",
                lg: "start",
                xl: "start",
              },
              px: 2,
              pb: { sm: 20, xs: 20, md: 5, lg: 5 },
            }}
          >
            <Typography
              sx={{
                fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                marginTop: "20px",
              }}
              gutterBottom
              variant="h6"
              component="div"
            >
              Ripple Fold Curtains
            </Typography>

            <Grid
              container
              justifyContent="space-between"
              sx={{ fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily }}
            >
              <Grid item sx={{ mt: 2, fontSize: "small", fontWeight: "700" }}>
                <Grid xs={6}>Color</Grid>
              </Grid>

              <Grid item sx={{ mt: 2, fontSize: "small", textWrap: "nowrap" }}>
                <Grid xs={6}>YJD500-07 -Brown</Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              sx={{ fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily }}
            >
              <Grid item sx={{ mt: 2, fontSize: "small", fontWeight: "700" }}>
                <Grid xs={6}>Measurement</Grid>
              </Grid>
              <Grid item sx={{ mt: 2, fontSize: "small", textWrap: "nowrap" }}>
                <Grid xs={6}>W:100cm* H:200cm</Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              sx={{ fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily }}
            >
              <Grid item sx={{ mt: 2, fontSize: "small", fontWeight: "700" }}>
                <Grid xs={6}>Gathering</Grid>
              </Grid>
              <Grid item sx={{ mt: 2, fontSize: "small", textWrap: "nowrap" }}>
                <Grid xs={6}>Standard</Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              sx={{ fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily }}
            >
              <Grid item sx={{ mt: 2, fontSize: "small", fontWeight: "700" }}>
                <Grid xs={6}>No of Pieces</Grid>
              </Grid>
              <Grid item sx={{ mt: 2, fontSize: "small", textWrap: "nowrap" }}>
                <Grid xs={6}>1 Pcs</Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              sx={{ fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily }}
            >
              <Grid item sx={{ mt: 2, fontSize: "small", fontWeight: "700" }}>
                <Grid xs={6}>Fabric Qty</Grid>
              </Grid>
              <Grid item sx={{ mt: 2, fontSize: "small", textWrap: "nowrap" }}>
                <Grid xs={6}>12 LMT</Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              sx={{ fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily }}
            >
              <Grid item sx={{ mt: 2, fontSize: "small", fontWeight: "700" }}>
                <Grid xs={6}>Lining Option</Grid>
              </Grid>
              <Grid item sx={{ mt: 2, fontSize: "small", textWrap: "nowrap" }}>
                <Grid xs={6}>No Lining</Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              sx={{ fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily }}
            >
              <Grid item sx={{ mt: 2, fontSize: "small", fontWeight: "700" }}>
                <Grid xs={6}>Track Option</Grid>
              </Grid>
              <Grid item sx={{ mt: 2, fontSize: "small", textWrap: "nowrap" }}>
                <Grid xs={6}>No Track(Fabric Only)</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box> */}
    </>
  );
};

export default Step4;
