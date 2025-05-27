import React, { useEffect, useRef, useState, useMemo } from "react";
import { Box, Modal, Typography, Grid, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  removecart,
  resetState,
  loadingfalse,
  updateSelectedCategory,
  setCategoryGallary,
  setCategoryDefaultImg,
} from "@/redux/slices/customization";

import MainHeading from "./MainHeading";
import ImageCard from "./ImageCard";
import { useAuthContext } from "@/auth/useAuthContext";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { useRouter } from "next/router";
import { setStepIndex } from "@/redux/slices/tourSlice";

const Step1 = ({ successValue, stepcount }) => {
  const { state } = useAuthContext();
  const { cookies } = state;

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const dispatch = useDispatch();
  const { locale } = useRouter();

  const globalSelectedCategory = useSelector(
    (state) => state.customization.SelectedCategory
  );
  const categoryGallary = useSelector(
    (state) => state.customization.categoryGallary
  );
  const stepCount = useSelector((state) => state.step.value);

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1037px)");
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 767px)");

  const tourState = useSelector((state) => state.tour);

  const fetchCategory = async () => {
    try {
      const response = await apiSSRV2DataService.getAll({
        path: `kiosk/categories`,
        locale,
      });
      return response;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const cancelToken = axios.CancelToken.source();
    setLoading(true);

    fetchCategory()
      .then((data) => {
        if (!data?.result) {
          console.error("No valid data received:", data);
          return;
        }

        setCategory(data.result);

        const initialCategory =
          globalSelectedCategory || data.result[0].link_url;

        setSelectedCategory(initialCategory);
        dispatch(removecart());
        dispatch(updateSelectedCategory(initialCategory));
        dispatch(setCategoryGallary(data.result));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
      })
      .finally(() => setLoading(false));

    return () => cancelToken.cancel();
  }, []);

  

  const handleChange = (link) => {
    // Add a short delay to let Joyride finish spotlight transition
    setTimeout(() => {
      // dispatch(resetState());
      // dispatch(loadingfalse(true));
      setSelectedCategory(link);
      dispatch(updateSelectedCategory(link));
  
      const filteredGallery = categoryGallary?.filter(
        (item) => item.link_url === link
      );
  
      if (filteredGallery?.length > 0) {
        dispatch(setCategoryDefaultImg(filteredGallery[0].image_path));
      }
    }, 100); // 100ms delay helps Joyride and Redux sync up
  };
  

  const categoryList = useMemo(
    () =>
      category.map((item, index) => (
        <Grid
          className="category-container"
          item
          xs={6}
          sm={6}
          md={4}
          key={item.id}
          sx={{
            flex: "0 0 50%",
            "@media (min-width: 992px)": {
              flex: "0 0 calc(100% / 2)",
              maxWidth: "50% !important",
            },
            "@media (min-width: 768px) and (max-width: 991px)": {
              flex: "0 0 calc(100% / 4)",
            },
            "@media (max-width: 575px)": {
              flex: "0 0 calc(100% / 2)",
            },
          }}
        >
          <ImageCard
            category={selectedCategory}
            index={index}
            name={item.link_title}
            link={item.link_url}
            selected={selectedCategory === item.link_url}
            functionname={handleChange}
            img={item.image_path}
            step={stepCount}
          />
        </Grid>
      )),
    [category, selectedCategory]
  );

  return (
    <>
      {successValue && stepcount !== 1 && (
        <Modal open={open}>
          <Typography>Data Submitted Successfully!!</Typography>
        </Modal>
      )}

      {loading && !isMobile ? (
        <>
       {/*  <Box
          sx={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 130px)",
            zIndex:"99998"
          }}
        >
          <div className="loader2">
            <ul className="hexagon-container">
              <li className="hexagon hex_1"></li>
              <li className="hexagon hex_2"></li>
              <li className="hexagon hex_3"></li>
              <li className="hexagon hex_4"></li>
              <li className="hexagon hex_5"></li>
              <li className="hexagon hex_6"></li>
              <li className="hexagon hex_7"></li>
            </ul>
          </div>
        </Box>*/}
        </>
      ) : (
        <>
          <MainHeading title="Category Selection" />
          <Box px={3} sx={{ userSelect: "none", paddingBottom: isMobile ? "130px" : "1.5rem" }}>
            <Box
              sx={{
                height: { lg: "calc(100vh - 180px)" },
                overflow: "auto",
                pt: "20px",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{ px: 2, pb: { sm: 20, xs: 20, md: 5, lg: 5 } }}
              >
                {categoryList}
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default React.memo(Step1);
