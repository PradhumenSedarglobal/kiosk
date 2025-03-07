var validation_steps_type = ["TECH", "MATL", "MEASUREMENT", "ROLL_CALCULATION"];
import PdpShema from "@/modules/PdpSchema";
import PlpSchema from "@/modules/PlpSchema";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import {
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
  const { cookies } = req;

  // res.setHeader(
  //   "Cache-Control",
  //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
  //   }`
  // );
  //const { slug } = query;
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

  // CUSTOMIZATION END QUERY

  // const customizationRes = await apiSSRV2DataService.getAll({
  //   path: `kiosk/get_steps`,
  //   param: {
  //     content: "customization",
  //     slug_url: customization_slug_url,
  //     sys_id: sys_id,
  //   },
  //   //cookies: GET_ALL_COOKIES,
  //   locale: locale,
  // });

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

  // if (
  //   customizationRes?.result?.COMPONENT[0]?.PARENT.CHILD?.return_status == "-1"
  // ) {
  //   if (locale == "default") {
  //     return {
  //       redirect: {
  //         destination: `/`,
  //         statusCode: 301,
  //       },
  //     };
  //   } else {
  //     return {
  //       redirect: {
  //         destination: `/${locale}`,
  //         statusCode: 301,
  //       },
  //     };
  //   }
  // }

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
    SelectedCategory,
    SelectedModal,
    stepsArray,
    customization,
    materialList,
  } = useSelector((state) => state.customization);

  const selectedItemCode = stepsArray?.MATERIAL_SELECTION?.material_info
    ?.SII_ITEM_ID
    ? stepsArray.MATERIAL_SELECTION.material_info.SII_ITEM_ID.split("-").splice(
        1
      )
    : null;

  const selectedItemCode2 =
    stepsArray?.MATERIAL_SELECTION?.material_info?.SII_ITEM_ID;

  const data2 = customization?.CHILD;
  const scanner = useSelector((state) => state.scanner.value);
  const fonts = useSelector((state) => state.font);
  const locale = "uae-en";

  // const getStep = async () => {
  //   if (!selectedModalData) return;

  //   const customizationRes = await apiSSRV2DataService.getAll({
  //     path: `kiosk/get_steps`,
  //     param: {
  //       content: "customization",
  //       slug_url: selectedModalData,
  //       category: selectedCategory,
  //       sys_id: 0,
  //     },
  //     locale: "uae-en",
  //   });

  //   console.log("customizationRes", customizationRes);

  //   if (customizationRes) {
  //     dispatch(resetCustomizationExceptSelection(customizationRes));
  //     console.log("customizationResssssss1", customization);

  //     dispatch(setCustomization(customizationRes));
  //     console.log("customizationResssssss2", customization);
  //   }
  // };

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

  const setImage = useCallback(async () => {
    try {
      const itemGallary = materialList[0]?.items?.[0]?.gallery;

      if (!itemGallary) {
        throw new Error("Gallery data not found");
      }

      const newImageUrls = itemGallary?.map((item) => item.SLI_IMAGE_PATH);
      setImageUrls((prevImages) => [...prevImages, ...newImageUrls]);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  }, [stepsArray["MATERIAL_SELECTION"]]);

  const setSelectedImage = useCallback(async () => {
    try {
      const mdata = materialList.find(
        (item) => item.SFI_DESC === selectedItemCode[0]
      );
      const mdata2 = mdata?.items.find(
        (item) => item.SII_ITEM_ID === selectedItemCode2
      );
      let itemGallary = mdata2.gallery;
      const newImageUrls = itemGallary.map((item) => item.SLI_IMAGE_PATH);
      const fImage = imageUrls[0];
      setImageUrls([fImage, ...newImageUrls]);
    } catch (error) {
      console.error("Error fetching selected gallery data:", error);
    }
  }, [stepsArray["MATERIAL_SELECTION"]]);

  useEffect(() => {
    setImage();
  }, [setImage]);

  useEffect(() => {
    setSelectedImage();
  }, [setSelectedImage]);

  useEffect(() => {
    console.log("stepCount", stepCount);
  }, [stepCount]);

  console.log("get step data", props);

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
  //   if (customizationRes) {
  //     dispatch(setCustomization(customizationRes));
  //     dispatch(setHeaderResponse(headerResponse));
  //   }
  // }, [customizationRes, slug,]);

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [slug, router]);

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
                      {(stepCount === 0 || stepCount === 1) && (
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
                              : "calc(100vh - 130px)",
                            position: "relative",

                            "&::before": {
                              content:
                                '"Select a category to start customizing"',
                              display: "inline-block",
                              animation: "fadeInOut 1.5s infinite",
                            },

                            "&::after": {
                              content: '""',
                              display: "inline-block",
                              animation: "dotsAnimation 10s infinite",
                            },

                            "@keyframes dotsAnimation": {
                              "0%": { content: '"."' },
                              "33%": { content: '".."' },
                              "66%": { content: '"..."' },
                              "100%": { content: '"...."' },
                            },

                            "@keyframes fadeInOut": {
                              "0%": { opacity: 0.3 },
                              "50%": { opacity: 1 },
                              "100%": { opacity: 0.3 },
                            },
                          }}
                        ></Typography>
                      )}

                      {stepCount !== 0 && stepCount !== 1 && (
                        <SceneCanvas3D
                          {...(data2 && data2.length > 0 ? data2[0] : {})}
                        />
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
                      }}
                      alt={`Image ${index + 1}`}
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
          </main>
          {/* Swiper Slider with 3d Rendor Section End */}
        </Grid>

        {/* Input Container */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <CartManager
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />

            {renderStep()}

            <Box
              sx={{
                height: "100%",
                zIndex: 4,
                position: {
                  lg: "relative",
                  md: "relative",
                  sm: "sticky",
                  xs: "sticky",
                  xxs: "sticky",
                },
                
                bottom: 0,
                pb: 0,
              }}
            >
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
                  boxShadow: "0 -3px 11px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                {stepCount != 2 && (
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
                      boxShadow: "0 -3px 11px -3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Grid
                      container
                      spacing={2} // Adds space between child Grid items
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        paddingTop: "20px",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        paddingBottom: "5px",
                     
                      }}
                    >
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "start",
                        }}
                      >
                        {stepCount > 0 && (
                          <Button
                            size="large"
                            variant="outlined"
                            onClick={() => previousStep()}
                            startIcon={<ArrowCircleLeftIcon color="black" />}
                          >
                            Previous
                          </Button>
                        )}

                        {stepCount === 0 && (
                          <Button
                            size="large"
                            variant="outlined"
                            onClick={handleHome}
                            startIcon={<ArrowCircleLeftIcon color="black" />}
                          >
                            Home
                          </Button>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end",
                        }}
                      >
                        {stepCount < 5 && (
                          <Button
                            size="large"
                            variant="outlined"
                            onClick={() =>
                              dispatch(incrementStep(stepCount + 1))
                            }
                            endIcon={<ArrowCircleRightIcon color="black" />}
                          >
                            Continue
                          </Button>
                        )}

                        {stepCount === 5 && (
                          <Button
                            sx={{
                              display: "flex",
                              backgroundColor: "#ef9c00",
                              color: "#f5ece0",
                              fontFamily:
                                fonts.Helvetica_Neue_Regular.style.fontFamily,
                              justifyContent: "flex-end",
                              alignItems: "end",
                            }}
                            onClick={() => addToCart()}
                            size="larage"
                            variant="contained"
                            endIcon={<LocalMallIcon />}
                          >
                            Add To Cart
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
