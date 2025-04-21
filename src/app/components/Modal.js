import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  removecart,
  resetState,
  setCustomization,
  setHeaderResponse,
  setMaterialCustomization,
  setModalDefaultItem,
  startCustomizationLoading,
  updateModalData,
  updateSelectedModal,
} from "@/redux/slices/customization";
import ImageCard from "@/app/components/ImageCard";
import MainHeading from "@/app/components/MainHeading";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Alert, Box, Grid, AlertTitle, useMediaQuery } from "@mui/material";
import axios from "axios";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import InstructionTooltip from "./InstructionTooltip";
import { useRouter } from "next/router";

const Modal = () => {
  const dispatch = useDispatch();
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const ModalSelection = "Step 2: Now you need to select modal!";
  const stepCount = useSelector((state) => state.step.value);
  const selectedCategory = useSelector(
    (state) => state.customization.SelectedCategory
  );
  const selectedModalData = useSelector(
    (state) => state.customization.SelectedModal
  );
  const modalData = useSelector((state) => state.customization.ModalData);

  const [modal,setModal]  = useState();




  const [selectedModal, setSelectedModal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { locale, query } = useRouter();
  const [selectedItemCode, setSelectedItemCode] = useState();
  const [productCode, setProductCode] = useState();

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1037px)");
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 767px)");
  const hasFetchedSteps = useRef(false);
  const isInitialMount = useRef(true);

  // ✅ Clear cart and start loading on category change
  const debouncedRemoveCart = useCallback(
    debounce(() => {
      dispatch(startCustomizationLoading());
    }, 300),
    [dispatch]
  );

  // ✅ Reset state when category changes
  useEffect(() => {
    dispatch(removecart());
  }, [selectedCategory, dispatch]);

  // ✅ Memoized fetch function
  const fetchModalData = useCallback(async () => {
    if (!selectedCategory) return;

    const source = axios.CancelToken.source();
    setLoading(true);

    try {
      const response = await apiSSRV2DataService.getAll({
        path: `kiosk/categories`,
        param: {
          category: selectedCategory,
        },
        locale: locale,
      });

      if (response?.result?.model?.length > 0) {
        dispatch(updateModalData(response.result));

        const firstModal =
          selectedModalData || response.result.model[0]?.SPI_LINK_URL;

        dispatch(
          setModalDefaultItem({
            itemId: selectedItemCode
              ? selectedItemCode
              : response?.result.model[0]?.SPI_PR_ITEM_CODE,
            productId: productCode,
          })
        );

        setSelectedModal(firstModal);
        dispatch(updateSelectedModal(firstModal));
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

    return () => {
      source.cancel("Component unmounted, request canceled");
    };
  }, [selectedCategory, locale, dispatch, selectedModalData, selectedItemCode, productCode]);

  // ✅ Fetch modal data when category changes (only once)
  useEffect(() => {
    if (isInitialMount.current && selectedCategory) {
      isInitialMount.current = false;
      fetchModalData();
    }
  }, [selectedCategory, fetchModalData]);

  // ✅ Fetch steps data for selected modal (Only once when data is available)
  const getStep = useCallback(async (modalData) => {
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
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    if (!modalData?.model || hasFetchedSteps.current) return;

    const firstModal = selectedModalData || modalData.model[0]?.SPI_LINK_URL;
    if (firstModal) {
      hasFetchedSteps.current = true;
      getStep(firstModal);
    }
  }, [modalData, selectedModalData, getStep]);

  // ✅ Handle modal change and state reset
  const handleChange = useCallback(async (link, selectedItemCode, productCode) => {
    setModal(link);
    
    setProductCode(productCode);
    setSelectedItemCode(selectedItemCode);
    dispatch(removecart());
    
    if (selectedModalData !== link) {
      dispatch(updateSelectedModal(link));
    }
  }, [dispatch, selectedModalData]);

  useEffect(() => {
    if (modal) {
        console.log("modalllll",modal);
    }
  }, [modal]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 130px)",
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
          <MainHeading sx={{ mb: 2 }} title="Modal Selection" />
          <Box px={3} sx={{ userSelect: "none", paddingBottom: "1.5rem" }}>
            <Box
              className="bigipads"
              sx={{ height: { lg: "calc(100vh - 180px)" }, overflow: "auto" }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  alignItems: "start",
                  justifyContent: "start",
                  pt: 2,
                  px: 2,
                  pb: { sm: 20, xs: 20, md: 5, lg: 5 },
                }}
              >
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
                    <Grid
                      className="selectModal"
                      item
                      xs={6}
                      sm={6}
                      md={4}
                      key={item.id || index}
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
                        name={item.SPI_TOOLTIP}
                        link={item.SPI_LINK_URL}
                        selected={selectedModalData === item.SPI_LINK_URL}
                        functionname={handleChange}
                        img={item.SPI_IMAGE_PATH}
                        selectedItemCode={item.SPI_PR_ITEM_CODE}
                        productCode={item.SII_CODE}
                        step={stepCount}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Modal;