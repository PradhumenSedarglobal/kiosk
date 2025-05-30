var validation_steps_type = ["TECH", "MATL", "MEASUREMENT", "ROLL_CALCULATION"];
import PdpShema from "@/modules/PdpSchema";
import PlpSchema from "@/modules/PlpSchema";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import TourIcon from "@mui/icons-material/Tour";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from '@mui/material/CircularProgress';

import {
  removecart,
  resetState,
  setCategoryDefaultImg,
  setCategoryGallary,
  setCustomization,
  setHeaderResponse,
  setModalSliderImage,
  setThumbSliderImage,
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
import {
  setStepIndex,
  skipTour,
  startTour,
  tourNextStep,
} from "@/redux/slices/tourSlice";
import TourGuideButton from "@/app/components/TourGuideButton";
import InfoButton from "@/app/components/InfoButton";
import ResetHoverButton from "@/app/components/ResetHoverButton";
import Loader2 from "@/app/components/Loader2";
import DotLoading from "@/app/components/DotLoading";
import { useTranslation } from "next-i18next";

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
  // const [imageUrls, setImageUrls] = useState(["/360v.jpg"]);

  const [formClose, setFormClose] = useState(false);
  const [modalSliderImageLoading, setModalSliderImageLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showButton, setShowButton] = useState(true);

  const router = useRouter();
  const { query, locale } = router;
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
    headerResponse,
  } = props;

  const { result = {} } = productFilter || {};
  const filters = result.FILTERS || [];
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1037px)");
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 767px)");
  const { state } = useAuthContext();
  const { cookies } = state;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const buttonRef = useRef(null);

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
    modalData,
    modalSliderImage,
    thumbImage,
    tabChangeValue,
    SelectedCategoryName,
    SelectedModalName
  } = useSelector((state) => state.customization);

  const scanner = useSelector((state) => state.scanner.value);
  const fonts = useSelector((state) => state.font);
  const tourState = useSelector((state) => state.tour);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const categoryScrollRef = useRef(null);

  const scrollCategoryToTop = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  // Memoized derived values
  const selectedItemCode = useMemo(
    () => stepsArray?.MATERIAL_SELECTION?.material_info?.SII_CODE || null,
    [stepsArray]
  );

  const selectedItemCode2 = useMemo(
    () => stepsArray?.MATERIAL_SELECTION?.material_info?.SII_ITEM_ID,
    [stepsArray]
  );

  const data2 = useMemo(() => customization?.CHILD, [customization]);

  const formik = useFormik({
    initialValues: {
      qtys: "1",
      product_width: "",
      product_height: "",
      sort_by: "",
    },
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();
    },
  });

  // Memoized filter processing
  const productFilterDropdown = useMemo(
    () =>
      result.MAIN_CATEGORY?.map((item) => ({
        ...item,
        label: item.DESCRIPTION,
        value: item.SC_LINK_URL,
      })) || [],
    [result.MAIN_CATEGORY]
  );

  const newFilterArray = useMemo(() => {
    const arr = [];
    const mainCategory = result?.MAIN_CATEGORY || [];

    filters?.forEach((element) => {
      const { SFT_CODE } = element;
      if (
        SFT_CODE === "012" ||
        SFT_CODE === "014" ||
        SFT_CODE === "009" ||
        SFT_CODE === "006"
      ) {
        arr.push({
          ...element,
          label: element.DESCRIPTION,
          value: element.SFT_CODE,
        });
      } else if (!["010", "013"].includes(SFT_CODE)) {
        arr.push({
          ...element,
          label: element.DESCRIPTION,
          value: element.SFT_CODE,
        });
      }
    });

    if (result?.MAIN_CATEGORY?.length) {
      arr.push(
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

    return arr.map((filter) => {
      if (filter.value === "CATEGORIES-008") {
        const category =
          mainCategory.find((item) => item?.SC_LINK_URL === SC_LINK_URL)
            ?.CATEGORY || [];
        return { ...filter, TAGS: category };
      }
      return filter;
    });
  }, [filters, result, SC_LINK_URL, translate]);

  // Handlers
  const handleOpen = () => setOpen(!open);
  const handleDrawerOpen = () => {
    dispatch(skipTour());
    setOpen(true);
  };
  const handleDrawerClose = () => setOpen(false);

  const handleThumbnailClick = useCallback(
    (index) => {
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
    },
    [thumbsSwiper, mainSwiper]
  );

  const previousStep = useCallback(() => {
    setLastPage(stepCount);
    if (stepCount > 0) {
      dispatch(resetState());
      dispatch(decrementStep(0));
    }

    dispatch(setStepIndex(tourState.stepIndex - 1));
    dispatch(removecart());

    if (stepCount === 1) {
      dispatch(resetState());
      dispatch(setCategoryGallary(null));
    } else {
      dispatch(setModalSliderImage(null));
    }
  }, [stepCount, dispatch, tourState.stepIndex]);

  const handleHome = useCallback(() => {
    dispatch(showScanner(true));
    dispatch(decrementStep(0));
  }, [dispatch]);

  const handleSubmit = useCallback(
    (submited) => {
      if (submited == "close") {
        dispatch(manualStep(5));
        return false;
      }
      if (submited == true) {
        setSuccess2(true);
      }
      dispatch(manualStep(0));
    },
    [dispatch]
  );


  // API calls and effects
  const getModalGallary = useCallback(
    async (SelectedCategory = null, productId = null, itemId = null) => {
      if (SelectedCategory !== null && SelectedModal !== null) {
        setModalSliderImageLoading(true);
        try {
          const response = await apiSSRV2DataService.getAll({
            path: `kiosk/fetch_gallery`,
            param: {
              category: SelectedCategory,
              product: itemId,
            },
            cookies: cookies,
            locale: locale,
          });

          if (response?.result.length > 0) {
            dispatch(setModalSliderImage(response.result));
          }
        } catch (error) {
          console.error("Error fetching modal gallery:", error);
        } finally {
          setModalSliderImageLoading(false);
        }
      }
    },
    [SelectedModal, cookies, locale, dispatch]
  );

  // Effects
  // useEffect(() => {
  //   dispatch(startTour());
  // }, [dispatch]);

  useEffect(() => {
    if (modalDefaultItem?.productId) {
      getModalGallary(
        SelectedCategory,
        modalDefaultItem?.productId,
        modalDefaultItem?.itemId
      );
    }
  }, [SelectedModal, SelectedCategory, modalDefaultItem, getModalGallary]);

  useEffect(() => {
    if (categoryGallary) {
      const filteredGallery = categoryGallary.filter(
        (item) => item.link_url === SelectedCategory
      );

      if (filteredGallery && filteredGallery.length > 0) {
        const firstImagePath = filteredGallery[0].image_path;
        dispatch(setCategoryDefaultImg(firstImagePath));
      }
    }
  }, [categoryGallary, SelectedCategory, dispatch]);

  useEffect(() => {
    if (!materialList?.length) return;

    const subChild = materialList.flatMap((item) => item.items);
    const selectedMaterial = subChild.find(
      (item) => item.SII_CODE === selectedItemCode
    );

    if (!selectedMaterial?.gallery?.length) return;

    const newImageUrls = selectedMaterial.gallery.map(
      (item) => item.SLI_IMAGE_PATH
    );

    const firstImage = thumbImage.length > 0 ? thumbImage[0] : "/360v.jpg";
    const updatedImageUrls = [firstImage, ...newImageUrls];

    if (JSON.stringify(thumbImage) !== JSON.stringify(updatedImageUrls)) {
      setIsImageLoading(true);
      dispatch(setThumbSliderImage(updatedImageUrls));
      setTimeout(()=>{
        setIsImageLoading(false);
      },2000);
    }

    if (thumbsSwiper) {
      thumbsSwiper.update();
    }
  }, [materialList, selectedItemCode, thumbImage, thumbsSwiper]);

  useEffect(() => {
    if (stepCount === 0) {
      dispatch(resetState());
      dispatch(setModalSliderImage(null));
    }

    if (mainSwiper) {
      mainSwiper.slideTo(0, 0);
      mainSwiper.update();
    }

    if (thumbsSwiper) {
      thumbsSwiper.slideTo(0, 0);
      thumbsSwiper.update();
    }
  }, [stepCount, dispatch, mainSwiper, thumbsSwiper]);

  const handleNext = useCallback(async () => {
    if (stepCount === 1) {
      const modalSlug = SelectedModal;
      if (!modalSlug) {
        console.error("Modal slug is missing");
        return;
      }

      try {
        const [customizationRes, headerResponse] = await Promise.all([
          apiSSRV2DataService.getAll({
            path: `kiosk/get_steps`,
            param: {
              content: "customization",
              slug_url: modalSlug,
              category: SelectedCategory,
              sys_id: 0,
            },
            locale: "uae-en",
          }),
          apiSSRV2DataService.getAll({
            path: `v2/getHeaderData`,
            param: {
              content: "Contact Info",
              column_name: "SH_LINK_URL",
              column_value: "tel:",
            },
            locale: "uae-en",
          }),
        ]);

        dispatch(setCustomization(customizationRes));
        dispatch(setHeaderResponse(headerResponse));
        dispatch(incrementStep(stepCount + 1));
        dispatch(setStepIndex(tourState.stepIndex + 1));
      } catch (error) {
        console.error("Failed to fetch steps:", error);
      }
    } else {
      dispatch(incrementStep(stepCount + 1));
      dispatch(setStepIndex(tourState.stepIndex + 1));
    }
  }, [
    stepCount,
    SelectedModal,
    SelectedCategory,
    dispatch,
    tourState.stepIndex,
  ]);

  const renderStep = useCallback(() => {
    switch (stepCount) {
      case 0:
        return <Step1 categoryScrollRef={categoryScrollRef} />;
      case 1:
        return <Modal categoryScrollRef={categoryScrollRef} getModalGallary={getModalGallary} />;
      case 2:
        return (
          <TabinationStepsSection
            categoryScrollRef={categoryScrollRef}
            handleOpen={handleOpen}
            open={open}
            formik={formik}
            data={data2}
            handleSubmit={handleSubmit}
            formClose={formClose}
            setFormClose={setFormClose}
          />
        );
      default:
        return null;
    }
  }, [
    stepCount,
    getModalGallary,
    open,
    formik,
    data2,
    handleSubmit,
    formClose,
  ]);

  // Helper components for better readability
  const LoaderComponent = ({ isTablet, isMobile }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: isTablet
          ? "calc(100vh - 510px)"
          : isMobile
          ? "calc(100vh - 230px)"
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
  );

  const CategoryDefaultImage = ({ categoryDefaultImg, isTablet, isMobile }) => (
    <Typography
      sx={{
        fontFamily: "Helvetica Neue Bold",
        fontSize: "1rem",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
        backgroundColor: "rgba(245, 175, 12, 0.5)",
        color: "#ef9c00",
        textShadow: "2px 2px 5px rgba(245, 186, 24, 0.5)",
        background: categoryDefaultImg
          ? `url(${categoryDefaultImg})`
          : "url('https://thisiscrowd.com/wp-content/uploads/2023/01/sedar_feature.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: isTablet
          ? "calc(100vh - 510px)"
          : isMobile
          ? "calc(100vh - 230px)"
          : "calc(100vh - 5px)",
        position: "relative",
      }}
    />
  );

  const ThumbnailImage = ({ src, isActive, onClick }) => (
    <img
      src={src}
      height={90}
      width={100}
      style={{
        border: isActive ? "2px solid orange" : "2px solid transparent",
        marginTop: "1px",
        cursor: "pointer",
        transition: "border 0.3s ease-in-out",
      }}
      onClick={onClick}
      alt="Thumbnail"
    />
  );


  const getStepValue = (tab, stepCount) => {
    switch (tab) {
      case 1:
        return "5";
      case 2:
        return "7";
      case 3:
        return "9";
      case 11:
        return "3";
      default:
        return stepCount === 0 && stepCount <= 1  ? "1" : "3";
    }
  };

  return (
    <>
      <TourGuideButton previousStep={previousStep} />

      <InfoButton onInfoClick={scrollCategoryToTop} step={getStepValue(tabChangeValue, stepCount)} />

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
              ? "calc(100vh - 230px)"
              : "calc(100vh - 5px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Burger Menu Icon Start */}
          <Fab
            className="drawer"
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
            <MenuIcon />
          </Fab>
          {/* Burger Menu End  */}

          {/* Reset 3dModal Icon Start */}
          {stepCount !== 0 && stepCount !== 1 && !isCustomizationLoading && (
            <ResetHoverButton resetCanvasScene={resetCanvasScene} />
          )}


          {/* Swiper Slider with 3D Render Section Start */}
          <main>
            {/* Main Swiper */}
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
              initialSlide={activeIndex} 
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} 
            >
              {thumbImage?.map((src, index) => (
                <SwiperSlide key={index}>
                  {index === 0 ? (
                    <>
                      {(stepCount === 0 || stepCount === 1) &&
                        materialList !== null && (
                          <>
                            {modalSliderImageLoading ? (
                              <LoaderComponent
                                isTablet={isTablet}
                                isMobile={isMobile}
                              />
                            ) : modalSliderImage?.length > 0 ? (
                              <ModalGallary
                                modalSliderImage={modalSliderImage}
                                isTablet={isTablet}
                                isMobile={isMobile}
                                activeIndex={activeIndex}
                              />
                            ) : (
                              <CategoryDefaultImage
                                categoryDefaultImg={categoryDefaultImg}
                                isTablet={isTablet}
                                isMobile={isMobile}
                              />
                            )}
                          </>
                        )}

                      {stepCount !== 0 && stepCount !== 1 && (
                        <>
                          {isCustomizationLoading ? (
                            <LoaderComponent
                              isTablet={isTablet}
                              isMobile={isMobile}
                            />
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
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbs Swiper */}
            <Swiper
              modules={[Thumbs]}
              watchSlidesProgress
              onSwiper={(swiper) => {
                setThumbsSwiper(swiper);
                // Initialize to match activeIndex
                if (swiper && swiper.activeIndex !== activeIndex) {
                  swiper.slideTo(activeIndex);
                }
              }}
              onSlideChange={(swiper) => {
                if (
                  mainSwiper &&
                  swiper.activeIndex !== mainSwiper.activeIndex
                ) {
                  mainSwiper.slideTo(swiper.activeIndex);
                }
                setActiveIndex(swiper.activeIndex);
              }}
              slidesPerView={6}
              loop={false}
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
                    <ThumbnailImage
                      src={src.SLI_IMAGE_PATH}
                      isActive={activeIndex === index}
                      onClick={() => {
                        setActiveIndex(index);
                        if (mainSwiper) mainSwiper.slideTo(index);
                        if (thumbsSwiper) thumbsSwiper.slideTo(index);
                      }}
                    />
                  </SwiperSlide>
                ))}

              {/* 3D modal thumb images */}
              {stepCount !== 0 &&
                stepCount !== 1 &&
                !isCustomizationLoading && !isImageLoading &&
                thumbImage?.map((src, index) => (
                  <SwiperSlide key={index}>
                    <ThumbnailImage
                      src={src}
                      isActive={activeIndex === index}
                      onClick={() => {
                        setActiveIndex(index);
                        setShow3d(index === 0);
                        if (mainSwiper) mainSwiper.slideTo(index);
                        if (thumbsSwiper) thumbsSwiper.slideTo(index);
                      }}
                    />
                  </SwiperSlide>
                ))}

                {isImageLoading && (
                  <Box sx={{p:"4px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <DotLoading />
                  </Box>
                )}
            </Swiper>

            
          </main>
          {/* Swiper Slider with 3D Render Section End */}
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
                      {stepCount == 0
                        ? SelectedCategoryName
                          ? SelectedCategoryName
                          : null
                        : SelectedModalName
                        ? SelectedModalName
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
                      previousStep();
                    }}
                    startIcon={<ArrowCircleLeftIcon />}
                  >
                    {translate("Previous")}
                  </Button>
                ) : (
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={handleHome}
                    startIcon={<ArrowCircleLeftIcon />}
                  >
                    {translate("Home")}
                  </Button>
                )}

                {/* Continue/Add to Cart Button */}
                {stepCount < 5 ? (
                  <Button
                    ref={buttonRef}
                    className={stepCount >= 1 ? "continue2" : "continue1"}
                    size="large"
                    variant="outlined"
                    onClick={(e) => {
                      // Disable the button
                      if (buttonRef.current) {
                        buttonRef.current.disabled = true;
                      }

                      handleNext();

                      setTimeout(() => {
                        if (buttonRef.current) {
                          buttonRef.current.disabled = false;
                        }
                      }, 1000);
                    }}
                    endIcon={<ArrowCircleRightIcon />}
                  >
                    {translate("NextStep")}
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
                    {translate("AddtoCart")}
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
        setOpen={setOpen}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        cartData={orderList}
      />
    </>
  );
}
