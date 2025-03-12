import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Box, Modal, Typography, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removecart, setIp, updateSelectedCategory } from "@/redux/slices/customization";

// Custom Components
import MainHeading from "./MainHeading";
import ImageCard from "./ImageCard";
import { useAuthContext } from "@/auth/useAuthContext";
import { NextResponse } from "next/server";

const fetchCategory = async (cancelToken) => {
  try {
    const response = await axios.get(
      `https://migapi.sedarglobal.com/kiosk/categories`,
      { cancelToken }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error("Error fetching categories:", error);
    }
    throw error;
  }
};



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
  const response = NextResponse.next();
  
  const getIpAddress = async () => {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    dispatch(setIp(data.ip));
    console.log('Your IP:', data.ip);
  };

  console.log("cookies", cookies);


  useEffect(() => {
    if (hasFetched.current) return;

    const cancelToken = axios.CancelToken.source();
    setLoading(true);

    fetchCategory(cancelToken.token)
      .then((data) => {
        hasFetched.current = true;
        setCategory(data.result);
        if (data.result.length > 0) {
          const firstCategory = data.result[0].link_url;
          setSelectedCategory(firstCategory);
          dispatch(removecart());
          dispatch(updateSelectedCategory(firstCategory));
        }
      })
      .catch(setError)
      .finally(() => setLoading(false));

      getIpAddress();


    return () => cancelToken.cancel();
  }, [dispatch]);

  const handleChange = useCallback(
    (link) => {
      setSelectedCategory(link);
      dispatch(removecart());
      dispatch(updateSelectedCategory(link));
    },
    [dispatch]
  );

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
          item
          xs={6}
          sm={6}
          md={4}
          key={item.id}
          sx={{
            flex: "0 0 50%", // Default for mobile-first approach
            "@media (min-width: 992px)": {
              flex: "0 0 calc(100% / 3)", // Ensures correct width for larger screens
            },
            "@media (min-width: 768px) and (max-width: 991px)": {
              flex: "0 0 calc(100% / 4)", // Ensures correct width for larger screens
            },
            "@media (max-width: 575px)": {
              flex: "0 0 calc(100% / 2)", // Adjusting to full width for smaller screens if needed
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
            height: "calc(100vh - 240px)",
          }}
        >
          <img
            src="/loadernew.gif"
            style={{ objectFit: "cover", height: "100px" }}
            alt="Loading..."
          />
        </Box>
      ) : (
        <Box px={3} sx={{ userSelect: "none", paddingBottom: "1.5rem" }}>
          <MainHeading title="Category Selection" />
          <Box sx={{ height: { lg: "calc(100vh - 240px)" }, overflow: "auto", pt: "20px" }}>
            <Grid
              className="tester"
              container
              spacing={2}
              sx={{ px: 2, pb: { sm: 20, xs: 20, md: 5, lg: 5 } }}
            >
              {categoryList}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default React.memo(Step1);
