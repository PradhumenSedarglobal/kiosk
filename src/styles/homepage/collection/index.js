import { styled } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import Typography from "@mui/material/Typography";

export const CustomerSwiper = styled(Swiper)(({ theme }) => {
  return {
    [theme.breakpoints.up("md")]: {
      "&.offerCollectionSlider": {
        height: "100%",
        "& .swiper-slide-active": {
          zIndex: 9,
          animation: "1s slide-left",
          "@keyframes slide-left": {
            from: {
              transform: "scale(0.7)",
            },

            to: {
              transform: "scale(1)",
            },
          },
        },

        img: {
          width: "65% !important",
        },

        "&.swiper-initialized": {
          "& .swiper-wrapper": {
            width: "60%",
            margin: 0,
            position: "relative",
            textAlign: "center",
            "& .swiper-slide": {
              position: "relative !important",
              textAlign: "right",
              ...(theme.direction == "rtl" && {
                textAlign: "right!important",
              }),
              "&.swiper-slide-next": {
                zIndex: 2,
                img: {
                  width: "210px !important",
                  zIndex: 99999,
                  position: "absolute",
                  left: "-87%",
                  height: "400px!important",
                  transform: "translate(0%, 18%)",
                  // ...(theme.direction == "rtl" && {
                  //   right: "-45%",
                  //   left: "unset",
                  // }),
                },
              },
            },
          },
        },

        "& .swiper-slide-prev": {
          zIndex: 2,
          img: {
            width: "210px !important",
            height: "400px!important",
            zIndex: 99999,
            position: "absolute",
            right: "-46%",
            transform: "translate(0%, 18%)!important",
            // ...(theme.direction == "rtl" && {
            //   right: "unset",
            //   left: "-87%",
            // }),
          },
        },
      },
    },
  };
});

export const CollectionHeading = styled(Typography)(({ theme }) => ({
  letterSpacing: "1.28px",
  color: theme.palette.grey[1600],
  fontWeight: 700,
  fontFamily: theme.fontFaces.helveticaNeue,
  textTransform: "uppercase",
  paddingLeft: "1.5rem!important",
  borderLeft: `2px solid ${theme.palette.warning.light}`,
}));

export const CollectionLink = styled(Typography)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.warning.light}`,
  width: "max-content",
  cursor: "pointer",
  textAlign: "left",
}));

export const CustomerSwiperSlider = styled(SwiperSlide)(({ theme }) => ({}));
