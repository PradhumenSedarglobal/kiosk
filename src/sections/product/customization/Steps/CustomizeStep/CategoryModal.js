import ImageCard from "@/app/components/ImageCard";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";
import { updateSelectedModal } from "@/redux/slices/customization";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const CategoryModal = ({ data, formik, elem }) => {
  const selectedCategory = useSelector((state) => state.customization.SelectedCategory);
  const selectedModalData = useSelector((state) => state.customization.SelectedModal);

  useEffect(() => {
    console.log("selectedModalData", selectedModalData);
  }, [selectedModalData]);

  const [modal,setModal] = useState(null);
  const selectCategoryRef = useRef();
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();

  const handleChange = (link) => {
    dispatch(updateSelectedModal(link));
  
  };


  return (
    <>
      {/* Modal Start */}
      <SubHeading  title={data?.SPS_DESC} />
      <Box
        px={3}
        sx={{
          userSelect: "none",
          paddingBottom: "1.5rem",
        }}
      >

        <Box
          className="bigipads"
          sx={{
            height: { lg: "calc(100vh - 240px)", overflow: "auto" },
          }}
        >
          <Grid
            container
            spacing={2}
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
            {data.SUB_CHILD?.map((item, index) => (
              <ImageCard
                key={item.SPI_LINK_TITLE}
                category={selectedCategory}
                refName={selectCategoryRef}
                index={index}
                name={item.SPI_LINK_TITLE}
                link={item.SPI_LINK_URL}
                selected={selectedCategory === item.SPI_LINK_URL}
                functionname={handleChange}
                img={item.SPI_IMAGE_PATH}
              />
            ))}

          </Grid>
        </Box>
      </Box>
      {/* Modal End */}
    </>
  );
};

export default CategoryModal;
