import { useSelector } from "@/redux/store";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { NextFillImage } from "@/components/image";
import useResponsive from "@/hooks/useResponsive";
import Iconify from "@/components/iconify";
import { useTranslation } from "next-i18next";
import { CustomLink } from "@/components/link";
import { useRouter } from "next/router";
import { useAuthContext } from "@/auth/useAuthContext";
import { useDispatch } from "react-redux";

// Swiper slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import { useMediaQuery } from "@mui/material";

// @mui
const SceneCanvas3D = dynamic(() => import("./sceneCanvas3D"), {
  ssr: false,
});

const TabinationStepsSection = dynamic(() => import("./Steps"), {
  ssr: false,
});

const CustomizationSection = () => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};
  const [activeIndex, setActiveIndex] = useState(0);
  const [show3d, setShow3d] = useState(false);
  const {
    customization,
    productInfo,
    headerData,
    materialList,
    isCustomizationLoading,
    stepsArray,
  } = useSelector((state) => state.customization);
  const { locale, query } = useRouter();
  const { slug } = query;
  const isDownMd = useResponsive("down", "md");
  const isDownSm = useResponsive("down", "sm");
  const isDownxs = useResponsive("down", "xs");
  const { t: translate } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [allowNextSlide, setAllowNextSlide] = useState(false);
  const [imageUrls, setImageUrls] = useState(["/360v.jpg"]);
  const stepCount = useSelector((state) => state.step.value);
  const fonts = useSelector((state) => state.font);

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1037px)");
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 767px)");

  const dispatch = useDispatch();

  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleThumbnailClick = (index) => {
    setAllowNextSlide(true);
    thumbsSwiper.slideTo(index);
  };

  const selectedItemCode = stepsArray?.MATERIAL_SELECTION?.material_info
    ?.SII_CODE
    ? stepsArray.MATERIAL_SELECTION.material_info.SII_CODE
    : null;

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

      console.log("setImageUrls", imageUrls);
    } catch (error) {
      console.error("Error fetching gallery data:", error.message);
    }
  }, [materialList, selectedItemCode, imageUrls]);

  // useEffect(()=>{
  //   dispatch(startCustomizationLoaded());
  // },5000);

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

  const actions = [
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://twitter.com/intent/tweet?text=Sedar"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="circum:twitter"
          />
        </CustomLink>
      ),
      name: "twitter",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://web.whatsapp.com/send?text=Sedar"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="prime:whatsapp"
          />
        </CustomLink>
      ),
      name: "whatsapp",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://www.facebook.com/sharer/sharer.php?u"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="circum:facebook"
          />
        </CustomLink>
      ),
      name: "facebook",
    },
  ];

  return (
    <Box
      sx={{
        height: { xxs: "100dvh", xs: "100dvh", sm: "100dvh", md: "100vh" },
        overflow: {
          lg: "hidden",
          md: "hidden",
          sm: "auto",
          xs: "auto",
          xxs: "auto",
        },
      }}
    >
      <Grid container direction="row">
        <Grid item lg={7} md={7} sm={12} xs={12} xxs={12}>
          {!isDownxs && (
            <>
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
                          {/* {(stepCount === 0 || stepCount === 1) &&
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
                                        )} */}

                          {/* {stepCount !== 0 &&
                                        stepCount !== 1 &&
                                        !isCustomizationLoading && ( */}
                          <SceneCanvas3D
                            langName={langName}
                            productInfo={productInfo}
                            {...(customization?.CHILD &&
                            customization?.CHILD?.length > 0
                              ? customization?.CHILD[0]
                              : {})}
                          />
                          {/* )} */}

                          {isCustomizationLoading && (
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
                {!isCustomizationLoading && (
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
            </>
          )}
        </Grid>
        <Grid item lg={5} md={5} sm={12} xs={12} xxs={12}>
          <TabinationStepsSection
            handleOpen={handleOpen}
            open={open}
            formik={formik}
            data={customization?.CHILD}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomizationSection;
