import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removecart,
  setCustomization,
  setHeaderResponse,
  setMaterialCustomization,
  updateModalData,
  updateSelectedModal,
} from "@/redux/slices/customization";
import ImageCard from "@/app/components/ImageCard";
import MainHeading from "@/app/components/MainHeading";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Alert, Box, Grid, AlertTitle } from "@mui/material";
import axios from "axios";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";

const Modal = () => {
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.font);
  const selectedCategory = useSelector(
    (state) => state.customization.SelectedCategory
  );
  const selectedModalData = useSelector(
    (state) => state.customization.SelectedModal
  );
  const modalData = useSelector((state) => state.customization.ModalData);

  useEffect(()=>{
    dispatch(removecart());
  },[modalData])

  const [selectedModal, setSelectedModal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const selectModalRef = useRef();

  const fetchModal = async (cancelToken) => {
    try {
      const response = await axios.get(
        `https://migapi.sedarglobal.com/kiosk/categories?category=${selectedCategory}`,
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

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchModal(source.token);
        console.log("selectedCategory", selectedCategory);
        console.log("selectedCategory", data.result.model);
        

        dispatch(updateModalData(data.result));


        if (data?.result?.model?.length > 0) {
          const firstModal = data.result.model[0].SPI_LINK_URL;
          setSelectedModal(firstModal);
          selectModalRef.current = firstModal;
          dispatch(updateSelectedModal(firstModal));
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error);
          console.error("Failed to fetch categories:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel("Component unmounted, request canceled");
    };
  }, [selectedCategory, dispatch]);

  const handleChange = (link) => {
    if (selectedModalData !== link) {
      dispatch(updateSelectedModal(link));
      dispatch(removecart());
    }
  };

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

    const header_response = await apiSSRV2DataService.getAll({
      path: `v2/getHeaderData`,
      param: {
        content: "Contact Info",
        column_name: "SH_LINK_URL",
        column_value: "tel:",
      },
      //cookies: GET_ALL_COOKIES,
      locale: "uae-en",
    });

    console.log("customizationRes", customizationRes);

    if (customizationRes) {
      dispatch(setCustomization(customizationRes));
      dispatch(setHeaderResponse(header_response));
    }
  };

  useEffect(() => {
    dispatch(setMaterialCustomization(null));
    getStep();
  }, [selectedModalData, selectedCategory, dispatch]);

  console.log("modalData", modalData?.model);

  return (
    <>
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
        <Box sx={{ userSelect: "none", paddingBottom: "1.5rem" }}>
          <MainHeading sx={{ mb: 2 }} title="Modal Selection" />

          <Box
            className="bigipads"
            sx={{ height: { lg: "calc(100vh - 240px)" }, overflow: "auto" }}
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
              {!modalData?.model || modalData.model.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "250px",
                    textAlign: "center",
                    borderRadius: "8px",
                    padding: "20px",
                  }}
                >
                  <Alert
                    severity="warning"
                    icon={<SentimentDissatisfiedIcon fontSize="large" />}
                    sx={{
                      maxWidth: "400px",
                      color: "#ff9800",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    <AlertTitle
                      sx={{
                        fontFamily:
                          fonts.Helvetica_Neue_Regular.style.fontFamily,
                      }}
                    >
                      No Data Available
                    </AlertTitle>
                    Please try selecting a different category.
                  </Alert>
                </Box>
              ) : (
                modalData?.model?.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={item.SPI_LINK_TITLE}>
                    <ImageCard
                      category={selectedCategory}
                      refName={selectModalRef}
                      index={index}
                      name={item.SPI_LINK_TITLE}
                      link={item.SPI_LINK_URL}
                      selected={selectedModalData === item.SPI_LINK_URL}
                      functionname={handleChange}
                      img={item.SPI_IMAGE_PATH}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Modal;
