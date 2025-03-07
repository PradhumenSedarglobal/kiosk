import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import { NextFillImage } from "@/components/image";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const InfoDilogueButton = ({
  open,
  setOpen,
  image,
  headingText,
  subHeadingText,
  elem,
}) => {
  const Images = elem?.SPS_INFO_IMAGE_PATH

  const { t: translate } = useTranslation();
  const handleOpenClose = () => setOpen(!open);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { locale } = useRouter();
  const [swiperDir, setSwiperDir] = useState(themeDirection === "rtl" ? "rtl" : "ltr");
  const [updateKey, setUpdateKey] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);
  return (
    <>
      <Iconify
        onClick={handleClickOpen}
        icon="material-symbols-light:info-outline"
        width="16px"
        style={{ color: "black", cursor: "pointer" }}
      />

      <Dialog
        scroll="body"
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        sx={{
          "& .MuiPaper-rounded": {
            borderRadius: "0px!important",
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ maxWidth: "24em" }}>
          <Box sx={{ position: "relative" }}>
            <Swiper
              key={`${swiperDir}-${updateKey}`} // Combine to ensure re-render
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              speed={500}
              navigation={false}
              // modules={[Pagination]}
              className="mySwiper"
              autoHeight={true}
              dir={swiperDir}
            >
              {Images &&
                Images?.map((childItem, childIndex) => {
                  return (
                    <SwiperSlide
                      component="div"
                      key={`CHILD_SLIDER_INDEX_${childIndex}`}
                    >

                      <NextFillImage
                        src={childItem}
                        sx={{
                          width: "100%!important",
                          height: "100%!important",
                          objectFit: "contain",
                          backgroundSize: "contain",
                          "&.MuiCard-root": {
                            borderRadius: 0,
                            boxShadow: "none",
                            position: "relative!important",
                            width: "100%!important",
                            height: "100%!important",
                          },
                        }}
                        alt="Image"
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                        objectFit="contain"
                      />
                      <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[1800],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </Box>
          <Box p={4}>
            <Typography
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeueBold,
                fontSize: theme.typography.typography18,
                color: theme.palette.common.black,
              })}
            >
              {headingText}
            </Typography>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{
                __html: subHeadingText,
              }}
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeueLight,
                fontSize: theme.typography.typography14,
                color: theme.palette.common.black,
                // "& h2": {
                //   letterSpacing: 0,
                //   ...theme.typography.typography31,
                //   fontWeight: "normal",
                //   fontFamily: theme.fontFaces.helveticaNeueMedium,
                //   mb: 0,
                // },
              })}
            />
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default InfoDilogueButton;
