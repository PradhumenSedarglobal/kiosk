import React, {useState } from "react";

// MUI Components
import Grid from "@mui/material/Grid";
// import Input from "@mui/joy/Input";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

// Custom Components
import MainHeading from "./MainHeading";

// Redux
import { useSelector } from "react-redux";

const Step2 = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  // Redux
  const fonts = useSelector((state) => state.font);

  const handleChangeSelect = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          userSelect: "none",
          paddingBottom: "1.5rem",
        }}
      >
        <MainHeading sx={{ mb: 2 }} title="Size" />

        <Box
          className="bigipads"
          sx={{
            height: { lg: "calc(100vh - 240px)", overflow: "auto" },
          }}
        >
          <Grid
            sx={{
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
              variant="button"
              gutterBottom
              sx={{
                display: "block",
                fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                marginBottom: "20px",
              }}
            >
              Measurement
            </Typography>

            <Box>
              <InputLabel
                sx={{
                  marginBottom: "10px",
                  fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                }}
              >
                Product Width (Min 100 cm - Max 500 cm)
              </InputLabel>
              <Input
                size="lg"
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
                }}
                value="100"
              />
            </Box>
            <Box>
              <InputLabel
                sx={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                }}
              >
                Product Height (Min 200 cm - Max 375 cm)
              </InputLabel>
              <Input
                size="lg"
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
                }}
                value="200"
              />
            </Box>
            <Box>
              <Typography
                variant="button"
                gutterBottom
                sx={{
                  display: "block",
                  fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                  marginTop: "20px",
                }}
              >
                Quantity
              </Typography>

              <FormControl fullWidth sx={{ zIndex: 0, marginTop: "10px" }}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select"
                  value={selectedOption}
                  onChange={handleChangeSelect}
                  size="small"
                  sx={{
                    fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
                    padding: "6px 10px",
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Step2;
