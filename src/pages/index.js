var validation_steps_type = ["TECH", "MATL", "MEASUREMENT", "ROLL_CALCULATION"];
import PdpShema from "@/modules/PdpSchema";
import PlpSchema from "@/modules/PlpSchema";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import {
  resetState,
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
    productInfo
  } = useSelector((state) => state.customization);

  console.log("resetCanvasScene",resetCanvasScene);

 

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
  const locale = "uae-en";

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

      const subChild = materialList.flatMap((item) => item.items);

      const selectedMaterial = subChild.find(
        (item) => item.SII_CODE === selectedItemCode
      );

      if (!selectedMaterial?.gallery?.length) return;

      const newImageUrls = selectedMaterial.gallery.map(
        (item) => item.SLI_IMAGE_PATH
      );

      // Avoid unnecessary state updates
      const firstImage = imageUrls.length > 0 ? imageUrls[0] : "/360v.jpg";
      const updatedImageUrls = [firstImage, ...newImageUrls];

      if (JSON.stringify(imageUrls) !== JSON.stringify(updatedImageUrls)) {
        setImageUrls(updatedImageUrls);
      }

      console.log("setImageUrls",imageUrls);
    } catch (error) {
      console.error("Error fetching gallery data:", error.message);
    }
  }, [materialList, selectedItemCode, imageUrls]);

  // useEffect(() => {
  //   console.log("stepCount", stepCount);
  // }, [stepCount]);

  console.log("get step data", props);

  const router = useRouter();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { slug } = props;
  const { langName } = cookies || {};
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

  const handleThumbnailClick = (index) => {
    setAllowNextSlide(true);
    thumbsSwiper.slideTo(index);
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
    console.log("materialListlllllll",materialList);
  }, [stepCount === 1]);

  const renderStep = () => {
    switch (stepCount) {
      case 0:
        return <Step1 />;
      case 1:
        return <Modal />;
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

  return (
    <>
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
            <MenuIcon />
          </Fab>
          {/* Burger Menu End  */}

          {/* Reset 3dModal Icon Start */}
          { stepCount !== 0 && stepCount !== 1 && (
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
                position: "absolute",
                zIndex: 999,
                marginLeft: "5px",
                top: "10px",
              
                // Use MUI breakpoints for responsiveness
                right: { 
                  xs: "calc(100vw - 200px)",  // Mobile (375px+)
                  sm: "calc(100vw - 300px)",  // Tablet (600px+)
                  md: "calc(100vw - 500px)",  // Small laptops (900px+)
                  lg: "calc(100vw - 57%)",  // Large screens (1200px+)
                },
              
                // Media Query (Only if necessary)
                "@media (min-width: 375px) and (max-width: 959px)": {
                  right: "calc(100vw - 95%)", 
                }
              }}
              
              color="warning"
              aria-label="edit"
            >
              <SettingsBackupRestoreIcon />
            </Fab>
          )}

          {/* Reset 3dModal Icon End  */}

          {/* Swiper Slider with 3d Rendor Section Start */}
          <main>
            {/* Main Swiper -> pass thumbs swiper instance */}
            <Swiper
              style={{
                marginBottom: "5px",
              }}
              className="previewImage"
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              // spaceBetween={10}
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
                          <Typography
                            sx={{
                              fontFamily: fonts.Helvetica_Neue_Bold.fontFamily,
                              fontSize: "1rem",
                              fontWeight: "bold",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "end",
                              backgroundColor: "rgba(245, 175, 12, 0.5)",
                              color: "#ef9c00",
                              textShadow: "2px 2px 5px rgba(245, 186, 24, 0.5)",
                              background:
                                "url('https://thisiscrowd.com/wp-content/uploads/2023/01/sedar_feature.jpg')",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              height: isTablet
                                ? "calc(100vh - 510px)"
                                : isMobile
                                ? "calc(100vh - 340px)"
                                : "calc(99vh)",
                              position: "relative",
                            }}
                          />
                        )}

                      {stepCount !== 0 &&
                        stepCount !== 1 &&
                        !isCustomizationLoading && (
                          <SceneCanvas3D
                          langName={langName}
                          productInfo={productInfo}
                            {...(customization?.CHILD && customization?.CHILD?.length > 0
                              ? customization?.CHILD[0]
                              : {})}
                          />
                        )}

                      {stepCount !== 0 &&
                        stepCount !== 1 &&
                        isCustomizationLoading && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "calc(98vh)",
                              backgroundImage:
                                "url('https://thisiscrowd.com/wp-content/uploads/2023/01/sedar_feature.jpg')",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              position: "relative",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better contrast
                                backdropFilter: "blur(5px)", // Subtle blur effect
                                zIndex: 0,
                              },
                            }}
                          >
                            <img
                              src="/loadernew.gif"
                              style={{
                                objectFit: "contain",
                                height: "100px",
                                zIndex: 1,
                                position: "relative",
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                padding: "10px",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                              }}
                              alt="Loading..."
                            />
                          </Box>
                        )}
                    </>
                  ) : (
                    <img
                      src={src}
                      className="swiper-image"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        height: isTablet
                          ? "calc(100vh - 510px)"
                          : isMobile
                          ? "calc(100vh - 340px)"
                          : "calc(100vh - 130px)",
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
            {stepCount !== 0 && stepCount !== 1 && !isCustomizationLoading && (
              <Swiper
                modules={[Thumbs]}
                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                // spaceBetween={5}
                slidesPerView={6}
                loop={false}
                allowSlideNext={true}
                slideToClickedSlide
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
                {imageUrls.map((src, index) => (
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
                        border:
                          index === 0
                            ? "2px solid orange"
                            : activeIndex === index
                            ? "2px solid #010101"
                            : "",
                        marginTop: "1px",
                      }}
                      onClick={() => {
                        handleThumbnailClick(index),
                          index === 0 ? setShow3d(true) : setShow3d(false);
                      }}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
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
          {stepCount != 2 && (
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
                justifyContent: "space-between", // Center buttons
                gap: "8px",
                flexWrap: "nowrap", // Prevent wrapping
                overflowX: "auto", // Allow horizontal scroll if needed
              }}
            >
              {/* Previous/Home Button */}
              {stepCount > 0 ? (
                <Button
                  size="large"
                  variant="outlined"
                  onClick={previousStep}
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
                  size="large"
                  variant="outlined"
                  onClick={() => dispatch(incrementStep(stepCount + 1))}
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
