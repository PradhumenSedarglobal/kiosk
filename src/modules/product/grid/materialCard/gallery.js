import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Gallery = ({ data = [], urlData, defaultSelectItem }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { push, locale } = useRouter();
  const isDownMd = useResponsive("down", "md");
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);

  const gallerySlider = {
    autoHeight: true,
    loop: false,
    spaceBetween: 0,
    slidesPerView: 1,
    breakpoints: {
      // when window width is >= 320px
      0: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
      // when window width is >= 480px
      576: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      // when window width is >= 640px
    },
  };

  return (
    <Box
      component="div"
      sx={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        "& .swiper-slide": {
          width: "100%!important",
        },
      }}
      onClick={() => {
        if (isDownMd) push(`${urlData?.url}/${defaultSelectItem?.SII_CODE}`);
      }}
    >
      <Swiper
        {...gallerySlider}
        key={`${swiperDir}-${updateKey}`}
        dir={swiperDir}
      >
        {data &&
          data?.length > 0 &&
          data.map((item, index) => {
            return (
              <SwiperSlide
                style={{ width: "100%!important" }}
                key={`GALLERY-MATERIAL_SLIDER-${index}`}
              >
                <NextLazyFillImage
                  src={item?.SLI_IMAGE_PATH}
                  alt={item?.SLI_SII_CODE}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "cover",
                    position: "relative!important",
                  }}
                  width={100}
                  height={100}
                  upLgWidth={200}
                  downLgWidth={200}
                  downMdWidth={200}
                  downSmWidth={100}
                  downXsWidth={100}
                  priority={false}
                  aspectRatio="1 / 1"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Box>
  );
};

export default Gallery;
