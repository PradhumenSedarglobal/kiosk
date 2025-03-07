import React, { useState } from "react";

// MUI Components
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";

// Custom Components
import MainHeading from "./MainHeading";

const Step6 = () => {
  const [selectedValue, setSelectedValue] = useState("No Track(Fabric Only)");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box sx={{ userSelect: "none", paddingBottom: "1.5rem" }}>
      <MainHeading sx={{ mb: 2 }} title="Control Option" />

      <Box sx={{ height: { lg: "calc(100vh - 240px)" }, overflow: "auto" }}>
        {/* Use RadioGroup from @mui/material */}
        <RadioGroup
          value={selectedValue}
          onChange={handleChange}
          sx={{ my: 1, mx: 3, display: "flex", flexDirection: "column", pb: 15 }}
        >
          {/* First row */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                value="Corded Track"
                control={<Radio />}
                label="Corded Track"
                sx={{ "& .MuiFormControlLabel-label": { marginLeft: "10px" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="Cordless Track"
                control={<Radio />}
                label="Cordless Track"
                sx={{ "& .MuiFormControlLabel-label": { marginLeft: "10px" } }}
              />
            </Grid>
          </Grid>

          {/* Second row */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                value="Motorized Track"
                control={<Radio />}
                label="Motorized Track"
                sx={{ "& .MuiFormControlLabel-label": { marginLeft: "10px" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="No Track(Fabric Only)"
                control={<Radio />}
                label="No Track(Fabric Only)"
                sx={{ "& .MuiFormControlLabel-label": { marginLeft: "10px" } }}
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default Step6;
