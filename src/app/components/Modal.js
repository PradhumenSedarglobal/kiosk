import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  removecart,
  resetState,
  setCustomization,
  setHeaderResponse,
  setMaterialCustomization,
  startCustomizationLoading,
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

  const selectedCategory = useSelector(
    (state) => state.customization.SelectedCategory
  );
  const selectedModalData = useSelector(
    (state) => state.customization.SelectedModal
  );
  const modalData = useSelector((state) => state.customization.ModalData);
 

 
  const [selectedModal, setSelectedModal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Clear cart and start loading on category change
  const debouncedRemoveCart = useCallback(
    debounce(() => {
      dispatch(removecart());
      dispatch(startCustomizationLoading());
    }, 300),
    [dispatch]
  );

  // ✅ Reset state when category changes
  useEffect(() => {
    dispatch(removecart());
    dispatch(updateModalData([]));
    dispatch(updateSelectedModal(null));
    dispatch(setCustomization(null));
    dispatch(setMaterialCustomization(null));
    setSelectedModal(null);
    setError(null);
  }, [selectedCategory, dispatch]);

  // ✅ Fetch modal data when category changes
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        debouncedRemoveCart();

        const response = await axios.get(
          `https://migapi.sedarglobal.com/kiosk/categories?category=${selectedCategory}`,
          { cancelToken: source.token }
        );

        if (response?.data?.result?.model?.length > 0) {
          dispatch(updateModalData(response.data.result));
          const firstModal = response.data.result.model[0].SPI_LINK_URL;
          setSelectedModal(firstModal);
          dispatch(updateSelectedModal(firstModal));
          await getStep(firstModal);
        } else {
          dispatch(updateModalData([]));
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

    if (selectedCategory) {
      fetchData();
    }

    return () => {
      source.cancel("Component unmounted, request canceled");
    };
  }, [selectedCategory, dispatch, debouncedRemoveCart]);

  // ✅ Fetch steps data for selected modal
  const getStep = async (modalData) => {
    if (!modalData) return;

    try {
      const customizationRes = await apiSSRV2DataService.getAll({
        path: `kiosk/get_steps`,
        param: {
          content: "customization",
          slug_url: modalData,
          category: selectedCategory,
          sys_id: 0,
        },
        locale: "uae-en",
      });

      const headerResponse = await apiSSRV2DataService.getAll({
        path: `v2/getHeaderData`,
        param: {
          content: "Contact Info",
          column_name: "SH_LINK_URL",
          column_value: "tel:",
        },
        locale: "uae-en",
      });

      if (customizationRes) {
        dispatch(setCustomization(customizationRes));
        dispatch(setHeaderResponse(headerResponse));
      }
    } catch (error) {
      console.error("Failed to fetch steps:", error);
    }
  };

  // ✅ Handle modal change and state reset
  const handleChange = async (link) => {
    if (selectedModalData !== link) {
  
      // ✅ Set the new selected modal
      dispatch(updateSelectedModal(link));
  
      // ✅ Fetch new steps AFTER resetting state
      await getStep(link);
    }
  };
  

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 130px)",
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
          <MainHeading sx={{ mb: 2 }} title="Modal Selection" />

          <Box
            className="bigipads"
            sx={{ height: { lg: "calc(100vh - 130px)" }, overflow: "auto" }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                alignItems: "start",
                justifyContent: "start",
                px: 2,
                pb: { sm: 20, xs: 20, md: 5, lg: 5 },
              }}
            >
              {/* ✅ Show message if no data */}
              {!modalData?.model || modalData.model.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
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
                    <AlertTitle>No Data Available</AlertTitle>
                    Please try selecting a different category.
                  </Alert>
                </Box>
              ) : (
                modalData.model.map((item, index) => (
                  <Grid item xs={6} sm={6} md={4} key={item.id || index}>
                    <ImageCard
                      category={selectedCategory}
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
