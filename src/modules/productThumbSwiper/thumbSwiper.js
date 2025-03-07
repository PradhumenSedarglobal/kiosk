import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import ProductThumbSwiperSkeleton from "@/components/skeleton/productDetails/productThumbSwiper/productThumbSwiperSkeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const ThumbSwiper = ({ data = [], setThumbsSwiper }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <ProductThumbSwiperSkeleton />; // Avoid rendering until on client side
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
          <Swiper
            {...thumbsSliderConfig}
            onSwiper={(swiperInstance) => setThumbsSwiper(swiperInstance)}
          >
            {data &&
              data?.length > 0 &&
              data.map((item, index) => (
                <SwiperSlide key={`THUMB-MAT-PRO-${index}`}>
                  <NextLazyFillImage
                    src={item?.SLI_IMAGE_PATH}
                    alt={item?.SLI_IMAGE_PATH}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "contain",
                      position: "relative!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    width={90}
                    height={90}
                    upLgWidth={108}
                    downLgWidth={108}
                    downMdWidth={108}
                    downSmWidth={105}
                    downXsWidth={108}
                    aspectRatio="1 / 1"
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
