import { useCallback } from "react";
import ImageCard from "@/app/components/ImageCard";
import MainHeading from "@/app/components/MainHeading";
import {

  setCustomization,
  setMaterialCustomization,
  updateSelectedModal,
} from "@/redux/slices/customization";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";

import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nullFormat } from "numeral";

const Modal = ({ data, formik, elem }) => {
  const customization = useSelector((state) => state.customization);
  const selectedCategory = useSelector(
    (state) => state.customization.SelectedCategory
  );
  const selectedModalData = useSelector(
    (state) => state.customization.SelectedModal
  );

  const [modal, setModal] = useState(null);
  const selectCategoryRef = useRef();
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();

  const getStep = async () => {
    if (!selectedModalData) return;

    const customizationRes = await apiSSRV2DataService.getAll({
      path: `kiosk/get_steps`,
      param: {
        content: "customization",
        slug_url: selectedModalData,
        category: selectedCategory,
        sys_id: 0,
      },
      locale: "uae-en",
    });

    console.log("customizationRes", customizationRes);

    if (customizationRes) {
   
      console.log("customizationResssssss1", customization);

      dispatch(setCustomization(customizationRes));
      console.log("customizationResssssss2", customization);
    }
  };

  useEffect(() => {
    dispatch(setMaterialCustomization(null)); // Clear old materials immediately
    getStep(); // Fetch new modal data
  }, [selectedModalData, selectedCategory, dispatch]);

  const handleChange = (link) => {
    if (selectedModalData !== link) {
      dispatch(updateSelectedModal(link));
    }
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
                selected={selectedModalData === item.SPI_LINK_URL}
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

export default Modal;
