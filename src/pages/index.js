var validation_steps_type = ["TECH", "MATL", "MEASUREMENT", "ROLL_CALCULATION"];
import PdpShema from "@/modules/PdpSchema";
import PlpSchema from "@/modules/PlpSchema";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import TourIcon from "@mui/icons-material/Tour";
import Tooltip from '@mui/material/Tooltip';

import {
  removecart,
  resetState,
  setCategoryDefaultImg,
  setCustomization,
  setHeaderResponse,
} from "@/redux/slices/customization";
import { useDispatch } from "@/redux/store";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import CloseIcon from "@mui/icons-material/Close";
import {
  getKeysValuesData,
  getQueryKeysStringUrl,
  getQueryKeysValuesObject,
  getQueryKeysValuesStringUrl,
  getQueryString,
  getQueryValuesStringUrl,
  setClientSideReduxCookie,
} from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
// import Head from "next/head";
import CustomizationSlug from "@/sections/slug/customization";
import ProductLists from "@/sections/slug/product";
import ProductDetail from "@/sections/slug/productDetail";
import ProductSlug from "@/sections/slug/ProductSlug";
import { isEmpty, split } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ScanModal from "@/app/components/ScanModal";

import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

// Swiper slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import { Modal, Step1, Step4 } from "@/app/components";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import { useAuthContext } from "../auth/useAuthContext";
import axiosInstance from "../utils/axios";
import BottomBarTabination from "@/sections/product/customization/Steps/tabination/bottomBarTabination";
import CartManager from "@/components/CartManager";
import { showScanner } from "@/redux/slices/scannerSlice";
import { decrementStep, incrementStep } from "@/redux/slices/stepSlice";
import ModalGallary from "@/app/components/ModalGallary";
import InstructionTooltip from "@/app/components/InstructionTooltip";
import { setStepIndex, skipTour, startTour } from "@/redux/slices/tourSlice";
import TourGuideButton from "@/app/components/TourGuideButton";

// Dynamically import Joyride to prevent SSR issues
const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

const SceneCanvas3D = dynamic(
  () => import("@/sections/product/customization/sceneCanvas3D"),
  {
    ssr: false,
  }
);

const TabinationStepsSection = dynamic(
  () => import("@/sections/product/customization/Steps"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async (context) => {
  const { locale, query, res, req } = context;

  const category = "curtains-and-drapes";
  const sub_category = "fabric-curtain-ripple-fold";
  const product = "fabric-curtain-ripple-fold";
  const item = 0;

  const queryKeysString = getQueryKeysStringUrl(query);

  const queryValuesString = getQueryValuesStringUrl(query);

  const QueryKeysValues = getQueryKeysValuesObject(true, query);

  const commonFilterQuery = {
    ...(sub_category ? { sub_category: sub_category } : {}),
    ...(QueryKeysValues || {}),
    category: category,
    limit: "21",
    filters: queryKeysString,
    filter_values: queryValuesString,
  };

  //  CUSTOMIZATION QUERY

  const sys_id = 0; //slug && slug?.length === 7 ? slug[6] : 0;
  const customization_slug_url = product;

  const header_response = await apiSSRV2DataService.getAll({
    path: `v2/getHeaderData`,
    param: {
      content: "Contact Info",
      column_name: "SH_LINK_URL",
      column_value: "tel:",
    },
    //cookies: GET_ALL_COOKIES,
    locale: locale,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      layout: null,

      slug: [
        "curtains-and-drapes",
        "fabric-curtain-ripple-fold",
        "fabric-curtain-ripple-fold",
        "1024024",
        "customize",
      ], //slug,
      headerResponse: header_response ? header_response : null,
      customization_slug_url: customization_slug_url,
      sys_id: sys_id,
      // Will be passed to the page component as props
    },
  };
};

export default function ProductPage(props) {
  const theme = useTheme();
  const [show3d, setShow3d] = useState(false);
  const [allowNextSlide, setAllowNextSlide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [lastPage, setLastPage] = useState();
  const [tabChange, setTabChange] = useState("1");
  const [missingStep, setMissingStep] = useState({});
  const handleOpen = () => setOpen(!open);
  const [imageUrls, setImageUrls] = useState(["/360v.jpg"]);
  const [formClose, setFormClose] = useState(false);
  const [modalSliderImage, setModalSliderImage] = useState(null);
  const [modalSliderImageLoading, setModalSliderImageLoading] = useState(false);
  const { query, locale } = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [showButton, setShowButton] = useState(true);

  const steps = [
    {
      title: "Select Category",
      description: "Click to select an item to proceed.",
    },
    {
      title: "Fill Details",
      description: "Fill in your details in the form below.",
    },
    {
      title: "Review & Submit",
      description: "Review your submission before confirming.",
    },
  ];

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1037px)");
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 767px)");

  const { state } = useAuthContext();
  const { cookies } = state;

  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const stepCount = useSelector((state) => state.step.value);

  const {
    customerSystemId,
    SelectedCategory,
    SelectedModal,
    stepsArray,
    customization,
    materialList,
    orderList,
    isCustomizationLoading,
    resetCanvasScene,
    productInfo,
    modalDefaultItem,
    categoryGallary,
    categoryDefaultImg,
  } = useSelector((state) => state.customization);

  const getModalGallary = async () => {
    if (SelectedCategory !== null && SelectedModal !== null) {
      setModalSliderImageLoading(true);
      const response = await apiSSRV2DataService.getAll({
        path: `kiosk/fetch_gallery`,
        param: {
          category: SelectedCategory,
          item: modalDefaultItem?.productId,
          product: modalDefaultItem?.itemId,
        },
        cookies: cookies,
        locale: locale,
      });

      if (response.result.length > 0) {
        setModalSliderImage(response.result);
      }

      setModalSliderImageLoading(false);
    }
  };

  useEffect(() => {
    getModalGallary();
  }, [SelectedModal, SelectedCategory]);

  useEffect(() => {
    const filteredGallery = categoryGallary?.filter(
      (item) => item.link_url === SelectedCategory
    );

    if (filteredGallery && filteredGallery.length > 0) {
      const firstImagePath = filteredGallery[0].image_path;
      dispatch(setCategoryDefaultImg(firstImagePath));
      console.log("filteredGallery", firstImagePath);
    } else {
      console.log("No categories found matching the selected category");
    }
  }, [SelectedCategory]);

  useEffect(() => {
    console.log("orderListnew", orderList);
  }, [orderList]);

  const selectedItemCode = stepsArray?.MATERIAL_SELECTION?.material_info
    ?.SII_CODE
    ? stepsArray.MATERIAL_SELECTION.material_info.SII_CODE
    : null;

  const selectedItemCode2 =
    stepsArray?.MATERIAL_SELECTION?.material_info?.SII_ITEM_ID;

  const data2 = customization?.CHILD;
  const scanner = useSelector((state) => state.scanner.value);
  const fonts = useSelector((state) => state.font);

  const formik = useFormik({
    initialValues: {
      qtys: "1",
      product_width: "",
      product_height: "",
      // select_room: "",
      sort_by: "",
      //  operating_side: "",
    },
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();
    },
  });

  useEffect(() => {
    try {
      if (!materialList?.length) return;

      // setThumbsSwiper(null);
      const subChild = materialList.flatMap((item) => item.items);

      const selectedMaterial = subChild.find(
        (item) => item.SII_CODE === selectedItemCode
      );

      if (!selectedMaterial?.gallery?.length) return;

      const newImageUrls = selectedMaterial.gallery.map(
        (item) => item.SLI_IMAGE_PATH
      );

      const firstImage = imageUrls.length > 0 ? imageUrls[0] : "/360v.jpg";
      const updatedImageUrls = [firstImage, ...newImageUrls];

      if (JSON.stringify(imageUrls) !== JSON.stringify(updatedImageUrls)) {
        setImageUrls(updatedImageUrls);
      }

      // Ensure Swiper instance is set AFTER updating images
      setTimeout(() => {
        if (thumbsSwiper) {
          thumbsSwiper.update(); // Ensure it's properly updated
        }
      }, 100);
    } catch (error) {
      console.error("Error fetching gallery data:", error.message);
    }
  }, [materialList, selectedItemCode, imageUrls]);

  // useEffect(() => {
  //   console.log("stepCount", stepCount);
  // }, [stepCount]);

  const router = useRouter();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { slug } = props;
  const {
    SC_LINK_URL,
    getFilterKeysValuesData,
    productFilter,
    productLayout,
    productType,
    productsData,
    firstData,
    productsSlugPageData,
    // customizationRes,
    headerResponse,
  } = props;

  // React.useEffect(() => {
  //   setClientSideReduxCookie({ dispatch: dispatch, router: router });
  // }, [slug, router]);

  const { result = {} } = productFilter || {};
  const filters = result.FILTERS || [];
  const newFilterArray = [];

  const addFilter = (element) => {
    newFilterArray.push({
      ...element,
      label: element.DESCRIPTION,
      value: element.SFT_CODE,
    });
  };

  filters.forEach((element) => {
    const { SFT_CODE } = element;
    if (
      SFT_CODE === "012" ||
      SFT_CODE === "014" ||
      SFT_CODE === "009" ||
      SFT_CODE === "006"
    ) {
      addFilter(element);
    } else if (!["010", "013"].includes(SFT_CODE)) {
      addFilter(element);
    }
  });

  if (result?.MAIN_CATEGORY?.length) {
    newFilterArray.push(
      {
        TAGS: result?.MAIN_CATEGORY,
        label: translate("Products"),
        value: "PRODUCT-007",
      },
      {
        TAGS: result?.MAIN_CATEGORY[0]?.CATEGORY,
        label: translate("Categories"),
        value: "CATEGORIES-008",
      },
      {
        TAGS:
          (result?.PRODUCT &&
            result?.PRODUCT?.length > 0 &&
            result?.PRODUCT.filter(
              (item) => item?.SC_SHOW_IN_FILTER_YN === "Y"
            )) ||
          [],
        label: translate("SubCategories"),
        value: "SUB-CATEGORIES-011",
      }
    );
  }

  const data =
    result.MAIN_CATEGORY?.map((item) => ({
      ...item,
      label: item.DESCRIPTION,
      value: item.SC_LINK_URL,
    })) || [];

  const productFilterDropdown = data;

  const mainCategory = result?.MAIN_CATEGORY || [];

  const updatedFilters = newFilterArray.map((filter) => {
    if (filter.value === "CATEGORIES-008") {
      const category =
        mainCategory.find((item) => item?.SC_LINK_URL === SC_LINK_URL)
          ?.CATEGORY || [];
      return { ...filter, TAGS: category };
    }
    return filter;
  });
  const [mainSwiper, setMainSwiper] = useState(null);

  useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiper.update();
    }
  }, [thumbsSwiper]);

  const handleThumbnailClick = (index) => {
    console.log("activeIndex", activeIndex);

    if (!thumbsSwiper || !mainSwiper) {
      console.warn("Swiper instances are not ready. Retrying...");
      setTimeout(() => {
        if (thumbsSwiper && mainSwiper) {
          thumbsSwiper.slideTo(index);
          mainSwiper.slideTo(index);
        } else {
          console.error("Swiper instances are still not initialized.");
        }
      }, 100);
      return;
    }

    setAllowNextSlide(true);
    thumbsSwiper.slideTo(index);
    mainSwiper.slideTo(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const nextStep = () => {
    // if (stepCount < 5) {
    //   dispatch(incrementStep());
    //   console.log("stepCount", stepCount);
    // } else {
    //   setFormClose(true);
    // }
  };

  const previousStep = () => {
    setLastPage(stepCount);
    if (stepCount > 0) {
      dispatch(resetState());
      dispatch(decrementStep(0));
    }
  };

  const handleHome = () => {
    dispatch(showScanner(true));
    dispatch(decrementStep(0));
  };

  const handleSubmit = (submited) => {
    if (submited == "close") {
      dispatch(manualStep(5));
      return false;
    }
    if (submited == true) {
      setSuccess2(true);
    }

    dispatch(manualStep(0));
  };

  const handleResetThreed = () => {
    dispatch(reset(true));

    setTimeout(() => {
      dispatch(reset(false));
    }, 1000);
  };

  

  useEffect(() => {
    dispatch(startTour());
  }, [dispatch]);

  const tourState = useSelector((state) => state.tour);

  console.log("tourState", tourState);

  const renderStep = () => {
    switch (stepCount) {
      case 0:
        return <Step1 />;
      case 1:
        return <Modal getModalGallary={getModalGallary} />;
      case 2:
        return (
          <TabinationStepsSection
            handleOpen={handleOpen}
            open={open}
            formik={formik}
            data={customization?.CHILD}
            handleSubmit={handleSubmit}
            formClose={formClose}
            setFormClose={setFormClose}
          />
        );
      default:
        return null;
    }
  };

  const formatCategory = (category) => {
    return category
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/\s+/g, " ") // Remove extra spaces if any
      .trim(); // Remove leading/trailing spaces
  };

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type, lifecycle } = data;
  
    // Handle step changes
    if (type === "step:after") {
      if (action === "next") {
        const isLastStep = index === tourState.steps.length - 1;
        if (isLastStep) {
          dispatch(skipTour());
        } else {
          dispatch(setStepIndex(index + 1));
        }
      } else if (action === "prev") {
        dispatch(setStepIndex(index - 1));
      }
    }
  
    // Handle all cases where the tour should end
    if (
      // When user clicks "Skip"
      (action === "skip") ||
      // When user clicks "Last" button on final step
      (action === "next" && index === tourState.steps.length - 1) ||
      // When user clicks the close button
      (action === "close") ||
      // When tour completes naturally
      status === "finished" ||
      // When tour is skipped
      status === "skipped"
    ) {
      dispatch(skipTour());
    }
  };
  
  

  return (
    <>
      {/* {stepCount == 0 && <TourGuideButton  />} */}
      
      <Joyride
        steps={tourState.steps}
        stepIndex={tourState.stepIndex}
        run={tourState.run}
        continuous
        showProgress
        showSkipButton
        spotlightClicks
        disableScrolling
        styles={{
          options: {
            zIndex: 99999,
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#ff6600",
          },
        }}
        callback={handleJoyrideCallback}
        hideCloseButton={false} // Ensure this is not set to true
      />

      <Head>
        <title>Customization List Page</title>
      </Head>
      {scanner && <ScanModal />}

      <Grid
        container={isMobile ? false : true}
        sx={{
          height: {
            maxWidth: "1920px",
            margin: "auto",
            lg: "none",
            md: "100vh",
            sm: "100vh",
          },
        }}
      >
        {/* Image Container */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            margin: 0,
            height: isTablet
              ? "calc(100vh - 510px)"
              : isMobile
              ? "calc(100vh - 340px)"
              : "calc(100vh - 5px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Burger Menu Icon Start */}
          <Fab
            onClick={handleDrawerOpen}
            sx={{
              backgroundColor: "#ef9c00",
              color: "#f5ece0",
              fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
              fontWeight: "700",
              padding: "8px 16px",
              position: "absolute",
              zIndex: 999,
              marginLeft: "5px",
              top: "10px",
            }}
            color="warning"
            aria-label="edit"
          >
            <MenuIcon className="drawer" />
          </Fab>
          {/* Burger Menu End  */}

          {/* Reset 3dModal Icon Start */}
          {stepCount !== 0 && stepCount !== 1 && (
            <Fab
              onClick={() => {
                resetCanvasScene();
              }}
              className="resetbutton"
              sx={{
                backgroundColor: "#ef9c00",
                color: "#f5ece0",
                fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
                fontWeight: "700",
                padding: "8px 16px",
                position: "fixed",
                zIndex: 999,
                marginLeft: "5px",
                top: "10px",

                // Use MUI breakpoints for responsiveness
                right: {
                  // xs: "calc(100vw - 200px)",  // Mobile (375px+)
                  // sm: "calc(100vw - 300px)",  // Tablet (600px+)
                  // md: "calc(100vw - 500px)",  // Small laptops (900px+)
                  lg: "calc(100vw - 55%)", // Large screens (1200px+)
                },

                // Media Query (Only if necessary)
                "@media (min-width: 375px) and (max-width: 959px)": {
                  right: "calc(100vw - 95%)",
                },
              }}
              color="warning"
              aria-label="edit"
            >
              <SettingsBackupRestoreIcon />
            </Fab>
          )}


        {/* <Tooltip title="Start tour" arrow>
          <Fab >
            <TourIcon />
          </Fab>
        </Tooltip> */}

          {/* Reset 3dModal Icon End  */}

          {/* Swiper Slider with 3d Rendor Section Start */}
          <main>
            {/* Main Swiper -> pass thumbs swiper instance */}
            <Swiper
              style={{
                marginBottom: "5px",
              }}
              onSwiper={setMainSwiper}
              className="previewImage"
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              slidesPerView={1}
              allowTouchMove={false}
              loop={false}
              initialSlide={1}
              allowSlideNext={allowNextSlide}
            >
              {imageUrls.map((src, index) => (
                <SwiperSlide key={index}>
                  {index === 0 ? (
                    <>
                      {(stepCount === 0 || stepCount === 1) &&
                        materialList !== null && (
                          <>
                            {modalSliderImageLoading ? (
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
                            ) : modalSliderImage?.length > 0 ? (
                              <ModalGallary
                                modalSliderImage={modalSliderImage}
                                isTablet={isTablet}
                                isMobile={isMobile}
                                activeIndex={activeIndex}
                              />
                            ) : (
                              <Typography
                                sx={{
                                  fontFamily:
                                    fonts.Helvetica_Neue_Bold.fontFamily,
                                  fontSize: "1rem",
                                  fontWeight: "bold",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                  backgroundColor: "rgba(245, 175, 12, 0.5)",
                                  color: "#ef9c00",
                                  textShadow:
                                    "2px 2px 5px rgba(245, 186, 24, 0.5)",
                                  background: categoryDefaultImg
                                    ? `url(${categoryDefaultImg})`
                                    : "url('https://thisiscrowd.com/wp-content/uploads/2023/01/sedar_feature.jpg')",
                                  backgroundSize: "cover",
                                  backgroundRepeat: "no-repeat",
                                  height: isTablet
                                    ? "calc(100vh - 510px)"
                                    : isMobile
                                    ? "calc(100vh - 340px)"
                                    : "calc(100vh - 5px)",
                                  position: "relative",
                                }}
                              />
                            )}
                          </>
                        )}

                      {stepCount !== 0 && stepCount !== 1 && (
                        <>
                          {isCustomizationLoading ? (
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
                            <SceneCanvas3D
                              {...(data2 && data2.length > 0 ? data2[0] : {})}
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <img
                      src={src}
                      className="swiper-image"
                      style={{
                        width: "100%",
                        objectFit: "fill",
                        height: isTablet
                          ? "calc(100vh - 510px)"
                          : isMobile
                          ? "calc(100vh - 340px)"
                          : "calc(100vh - 110px)",
                        cursor: "pointer",
                      }}
                      alt={`Image ${index + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Image ${index + 1} clicked`);
                        handleImageClick(src);
                      }}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbs Swiper -> store swiper instance */}
            <Swiper
              modules={[Thumbs]}
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
              slidesPerView={6}
              loop={false}
              allowSlideNext={true}
              slideToClickedSlide
              initialSlide={activeIndex}
              style={{
                marginLeft: "3px",
              }}
              breakpoints={{
                320: { slidesPerView: 4, spaceBetween: 8 },
                480: { slidesPerView: 4, spaceBetween: 10 },
                768: { slidesPerView: 5, spaceBetween: 10 },
                1024: { slidesPerView: 6, spaceBetween: 15 },
              }}
            >
              {/* Category thumb images */}
              {(stepCount === 0 || stepCount === 1) &&
                materialList !== null &&
                modalSliderImage?.map((src, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={src.SLI_IMAGE_PATH}
                      height={90}
                      width={100}
                      breakpoints={{
                        320: {
                          style: {
                            height: 70,
                            width: 70,
                          },
                        },
                      }}
                      style={{
                        border:
                          activeIndex === index
                            ? "2px solid orange"
                            : "2px solid transparent",
                        marginTop: "1px",
                        cursor: "pointer",
                        transition: "border 0.3s ease-in-out",
                      }}
                      onClick={() => {
                        setActiveIndex(index);
                      }}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}

              {/* 3d modal thumb images */}
              {stepCount !== 0 &&
                stepCount !== 1 &&
                !isCustomizationLoading &&
                imageUrls.map((src, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={src}
                      height={90}
                      width={100}
                      breakpoints={{
                        320: {
                          style: {
                            height: 70,
                            width: 70,
                          },
                        },
                      }}
                      style={{
                        border: activeIndex === index ? "2px solid orange" : "",
                        marginTop: "1px",
                      }}
                      onClick={() => {
                        setActiveIndex(index);
                        handleThumbnailClick(index);
                        index === 0 ? setShow3d(true) : setShow3d(false);
                      }}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </main>
          {/* Swiper Slider with 3d Rendor Section End */}
        </Grid>

        {/* Input Container */}
        <Grid
          item
          xs={12}
          md={5}
          sm={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            display: "block",
          }}
        >
          {renderStep()}
          {/* Bottom Bar */}
          {stepCount !== 2 && (
            <Box
              sx={{
                height: "auto",
                width: {
                  lg: "42vw",
                  md: "42vw",
                  sm: "100%",
                  xs: "100%",
                },
                "@media (min-width:290px) and (max-width:599px)": {
                  width: "100vw",
                },
                backgroundColor: "#fff",
                position: "fixed",
                bottom: 0,
                zIndex: 1000,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "10px",
                display: "flex",
                flexDirection: "column", // Changed to column for vertical layout
                alignItems: "center", // Center content horizontally
                gap: "10px", // Added space between elements
              }}
            >
              {/* Price Section */}
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  position: {
                    lg: "unset",
                    xl: "unset",
                    xs: "fixed",
                    md: "fixed",
                    sm: "fixed",
                  },
                  overflow: "hidden",
                  bottom: { xs: 0, md: 0, sm: 0 },
                  left: 0,
                  zIndex: 1000,
                  // boxShadow: "0 -3px 11px -3px rgba(0, 0, 0, 0.1)",
                  pb: "10px",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    backgroundColor: "white",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  <Grid item xs={7} pt={"0 !important"}>
                    <Typography
                      sx={{
                        fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                        color: "#010101",
                        paddingTop: "25px",
                        textAlign: "start",
                        fontSize: "16px !important",
                        // paddingLeft: "20px",
                      }}
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      {SelectedCategory
                        ? formatCategory(SelectedCategory)
                        : null}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} pt={"0 !important"}>
                    <Typography
                      sx={{
                        fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                        color: "#010101",
                        paddingTop: "25px",
                        textAlign: "end",
                        fontSize: "16px !important",
                        // paddingLeft: "20px",
                      }}
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      {translate("Total")}{" "}
                      {translate(cookies?.CCYCODE || "AED")} 0.00
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Button Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* Previous/Home Button */}
                {stepCount > 0 ? (
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={() => {
                      dispatch(setStepIndex(tourState.stepIndex - 1));
                      previousStep();
                      dispatch(removecart());
                      if (stepCount === 2) {
                        dispatch(resetState());
                      }
                    }}
                    startIcon={<ArrowCircleLeftIcon />}
                  >
                    Previous
                  </Button>
                ) : (
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={handleHome}
                    startIcon={<ArrowCircleLeftIcon />}
                  >
                    Home
                  </Button>
                )}

                {/* Continue/Add to Cart Button */}
                {stepCount < 5 ? (
                  <Button
                    className={stepCount >= 1 ? 'continue2' : 'continue1'}
                    size="large"
                    variant="outlined"
                    onClick={(e) => {
                      // Disable the button immediately after click
                      e.target.disabled = true;
                  
                      dispatch(incrementStep(stepCount + 1));
                  
                      setTimeout(() => {
                        dispatch(setStepIndex(tourState.stepIndex + 1));
                        // Re-enable the button after 3 seconds
                        e.target.disabled = false;
                      }, 3000); // 3000 milliseconds = 3 seconds
                    }}
                    endIcon={<ArrowCircleRightIcon />}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    sx={{
                      backgroundColor: "#ef9c00",
                      color: "#f5ece0",
                    }}
                    onClick={addToCart}
                    size="large"
                    variant="contained"
                    endIcon={<LocalMallIcon />}
                  >
                    Add To Cart
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>

      <CartManager
        sx={{
          overflow: "hidden",
        }}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        cartData={orderList}
      />
    </>
  );
}
