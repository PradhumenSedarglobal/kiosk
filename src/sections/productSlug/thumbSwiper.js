import { NextFillImage } from "@/components/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Swiper, SwiperSlide } from "swiper/react";

const ThumbSwiper = ({ data, setThumbsSwiper }) => {
  const thumbsSliderConfig = {
    loop: false,
    observer: true,
    observeParents: true,
    spaceBetween: 10,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 7,
      },
      992: {
        slidesPerView: 5,
      },
      1300: {
        slidesPerView: 6,
      },
      // when window width is >= 640px
    },
  };
  return (
    <Box component="div" width="100%">
      <Grid container id="thumbs">
        <Grid item xs={12} className="left">
          <Swiper {...thumbsSliderConfig} onSwiper={setThumbsSwiper}>
            {data?.GALLERY.map((item, index) => (
              <SwiperSlide key={`THUMB-MAT-PRO-${index}`}>
                <NextFillImage
                  src={item?.image_path}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                  sx={{
                    width: "auto!important",
                    height: "auto!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    "&.MuiCard-root": {
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative!important",
                      width: "max-content!important",
                      height: "100%!important",
                    },
                  }}
                  alt="Image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThumbSwiper;
