import ImageCard from "@/app/components/ImageCard";
import MainHeading from "@/app/components/MainHeading";
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

//   const fetchData = async () => {
//     try{
//       const response = await axios.get('https://uatapi.sedarglobal.com/v2/header?lang=en&site=100001&country=uae&visitorId=OjXE-YpIp&userId=100062342&currency=AED&ccy_decimal=0&cn_iso=AE&country_iso=AE&detect_country=AE&locale=uae-en&seo_type=PRODUCT&page_name=wallpaperen', {cancelToken: source.token});

//       const selectedCategoryData = response.data.result.HEADER.SGMEGAMENU.find(
//         (item) => item.link_url === selectedCategory
//       );

//       setModal(selectedCategoryData.CHILD);
      
//     } catch(error){
//       if(axios.isCancel(error)){
//         console.log('Request canceled:', error.message);
//       }else{
//         console.error('Error fetching categories:', error);
//       }

//     }
//   }

  useEffect(() => {
    // fetchData();
    console.log("dataaaaaaaaa", data.SUB_CHILD);
  }, []);

  const handleChange = (link) => {
    dispatch(updateSelectedModal(link));
  
  };



  

  return (
    <>
      {/* Modal Start */}
      <Box
        sx={{
          userSelect: "none",
          paddingBottom: "1.5rem",
        }}
      >
        <MainHeading sx={{ mb: 2 }} title="Modal Selection" />

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
