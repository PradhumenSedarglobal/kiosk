import React, { useRef, useState } from "react";

// MUI Components
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Custom Components
import MainHeading from "./MainHeading";
import ImageCard from "./ImageCard";

// Redux
import { useSelector } from "react-redux";

const Step3 = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const selectCategoryRef = useRef();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  // Redux
  const fonts = useSelector((state) => state.font);

  const handleChange = (index) => {
    setSelectedCategory(index);
  };

  return (
    <>
      <Box
        sx={{
          userSelect: "none",
          paddingBottom: "1.5rem",
        }}
      >
        <MainHeading sx={{ mb: 2 }} title="Search Item" />

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
            <TextField
              sx={{
                marginTop: "10px",
                width: isSmallScreen == true ? "75%" : "75%",
                fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
              }}
              id="item-code"
              label="Item Code"
              variant="standard"
            />

            <Button
              sx={{
                padding: "8px",
                width: "85px",
                marginTop: "18px",
                borderRadius: "1px",
                minWidth: "50px",
                background: "#ef9c00",
                color: "white",
                fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
                border: "none",
              }}
              variant="outlined"
            >
              Search
            </Button>

            <Typography
              sx={{
                fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                marginTop: "20px",
              }}
              gutterBottom
              variant="h6"
              component="div"
            >
              Material Selection
            </Typography>

            <Grid container spacing={2}>
              <ImageCard
                category={selectedCategory}
                refName={selectCategoryRef}
                index={1}
                selected={true}
                functionname={handleChange}
                name="ALNK600-24"
                img="https://api.sedarglobal.com/uploads/100001/lifestyle/1708000430_546345798927edf987f6.webp?imwidth=1920"
              />
              <ImageCard
                category={selectedCategory}
                refName={selectCategoryRef}
                index={2}
                functionname={handleChange}
                name="CBL702-7"
                img="https://api.sedarglobal.com/uploads/100001/item/laptop/1708146524_d97c7cc07e26fd5ba93d.webp?imwidth=1920"
              />

              <ImageCard
                category={selectedCategory}
                refName={selectCategoryRef}
                index={3}
                functionname={handleChange}
                name="HME14-6"
                img="https://api.sedarglobal.com/uploads/100001/item/laptop/1708154697_35150ccc448f4f780300.webp?imwidth=1920"
              />

              <ImageCard
                category={selectedCategory}
                refName={selectCategoryRef}
                index={4}
                functionname={handleChange}
                name="HNTB10-13"
                img="https://api.sedarglobal.com/uploads/100001/item/laptop/1715149486_b0e9fe2dedf1cb6a881b.webp?imwidth=1920"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Step3;
