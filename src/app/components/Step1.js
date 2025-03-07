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
import { updateSelectedCategory } from "@/redux/slices/customization";

// Custom Components
import MainHeading from "./MainHeading";
import ImageCard from "./ImageCard";

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
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const dispatch = useDispatch();

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
          dispatch(updateSelectedCategory(firstCategory));
        }
      })
      .catch(setError)
      .finally(() => setLoading(false)); 

    return () => cancelToken.cancel();
  }, [dispatch]);

  const handleChange = useCallback(
    (link) => {
      setSelectedCategory(link);
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
        <Grid item xs={12} sm={6} md={4} key={item.id}>
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
          <img src="/loadernew.gif" style={{objectFit:"cover",height:"100px"}} alt="Loading..." />
        </Box>
      ) : (
        <Box sx={{ userSelect: "none", paddingBottom: "1.5rem" }}>
          <MainHeading sx={{ mb: 2 }} title="Category Selection" />
          <Box sx={{ height: { lg: "calc(100vh - 240px)" }, overflow: "auto" }}>
            <Grid
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
