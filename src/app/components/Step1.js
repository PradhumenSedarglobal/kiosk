import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Box, Modal, Typography, Grid, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  removecart,
  setIp,
  updateSelectedCategory,
  resetState,
  loadingfalse,
  setCategoryGallary,
  setCategoryDefaultImg,
} from "@/redux/slices/customization";

// Custom Components
import MainHeading from "./MainHeading";
import ImageCard from "./ImageCard";
import { useAuthContext } from "@/auth/useAuthContext";
import { setStepIndex } from "@/redux/slices/tourSlice";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { useRouter } from "next/router";



export async function getServerSideProps({ req }) {

 
  // Get the IP address
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // For better accuracy, you can check and return the actual IP from the x-forwarded-for header.
  const userIp = ip; // In case of multiple IPs, take the first one.

  return {
    props: {
      userIp,
    },
  };
}


const Step1 = ({ successValue, stepcount,userIp }) => {

  const { state } = useAuthContext();
  const { cookies } = state;
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const globalSelectedCategory = useSelector((state) => state.customization.SelectedCategory);
  const categoryGallary = useSelector((state) => state.customization.categoryGallary);
  const stepCount = useSelector((state) => state.step.value);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const dispatch = useDispatch();
  const { locale, query } = useRouter();

    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1037px)");
    const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 767px)");


  const fetchCategory = async () => {
 
    try {
      const response = await apiSSRV2DataService.getAll({
        path: `kiosk/categories`,
        locale: locale,
      });

  
      return response; // Ensure response.data exists
    } catch (error) {
      console.error("Error fetching category:", error);
      return null; // Return null to avoid undefined issues
    }
  
  };


  useEffect(() => {
    if (hasFetched.current) return;

    const cancelToken = axios.CancelToken.source();
    setLoading(true);

    fetchCategory()
    .then((data) => {
      console.log("Fetched Data:", data); // Check if data is received
      if (!data || !data.result) {
        console.error("No valid data received:", data);
        return;
      }
  
      hasFetched.current = true;
      setCategory(data.result);
      console.log("setCategoryGallary",data.result);
    
  
      if (data.result.length > 0) {
        const initialCategory = globalSelectedCategory || data.result[0].link_url;
        setSelectedCategory(initialCategory);
        dispatch(removecart());
        dispatch(updateSelectedCategory(initialCategory));
        dispatch(setCategoryGallary(data.result));
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      setError(error);
    })
    .finally(() => setLoading(false));
  
    // getIpAddress();

    return () => cancelToken.cancel();
  }, [dispatch, globalSelectedCategory]);

  const handleChange = useCallback((link) => {
    
  
    // Dispatch actions
    dispatch(resetState());
    dispatch(loadingfalse(true));
    setSelectedCategory(link); // Update the selected category state
    dispatch(updateSelectedCategory(link)); // Update the Redux store with the selected category

    // First, filter the categoryGallary for the selected category
    const filteredGallery = categoryGallary?.filter((item) => item.link_url === link);
  
    if (filteredGallery && filteredGallery.length > 0) {
      const firstImagePath = filteredGallery[0].image_path;
      dispatch(setCategoryDefaultImg(firstImagePath));
      console.log("filteredGallery", firstImagePath); // Log the first image path for debugging
    } else {
      console.log("No categories found matching the selected category");
    }

  }, [categoryGallary, dispatch]);

  useEffect(() => {
    if (successValue) {
      setOpen(true);
      const timer = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [successValue]);

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
              maxWidth:"50% !important"
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
    [category, selectedCategory, handleChange]
  );

  return (
    <>
      {successValue && stepcount !== 1 && (
        <Modal open={open}>
          <Typography>Data Submitted Successfully!!</Typography>
        </Modal>
      )}

      {loading ? (
       <Box
       sx={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         height: isTablet
           ? "calc(100vh - 510px)"
           : isMobile
           ? "calc(100vh - 340px)"
           : "calc(100vh - 5px)",
         backgroundColor: "#f5f5f5",
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
     </Box>
      ) : (
        <>
        <MainHeading title="Category Selection" />
        <Box px={3} sx={{ userSelect: "none", paddingBottom: "1.5rem" }}>
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
