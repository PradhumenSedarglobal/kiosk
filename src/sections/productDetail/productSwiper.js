import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Controller, Navigation, Pagination, Thumbs } from "swiper/modules";

import Box from "@mui/material/Box";
import "swiper/swiper-bundle.css";

const ProductListThumbSlider = ({ data = {} }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const gallery = data.data;

  const ProductListThumbSliderConfig = {
    observer: true,
    observeParents: true,
    breakpoints: {
      576: {
        pagination: false,
      },
    },
  };
  const thumbsSliderConfig = {
    observer: true,
    observeParents: true,
  };

  return (
    <Box className="ProductListThumbSlider" sx={{ pb: 1 }}>
      <Swiper
        id="main"
        thumbs={{
          swiper: null,
        }}
        tag="section"
        wrapperTag="ul"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Controller, Thumbs]}
        {...ProductListThumbSliderConfig}
      >
        {data?.data?.map((row, index) => (
          <SwiperSlide key={index}>
            <Box>
              <LazyLoadImage
                effect=""
                className="img-fluid"
                src={row?.SLI_IMAGE_PATH}
                alt="ssss"
                width="auto"
                height="auto"
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box
        sx={{ display: { xxs: "none", xs: "none", sm: "none", md: "block" } }}
      >
        <Swiper
          id="thumbs"
          spaceBetween={5}
          slidesPerView={5}
          onSwiper={setThumbsSwiper}
          {...thumbsSliderConfig}
        >
          {data?.data?.map((row, index) => (
            <SwiperSlide key={index}>
              <LazyLoadImage
                effect=""
                className="img-fluid"
                src={row?.SLI_IMAGE_PATH}
                alt="sdas"
                width="auto"
                height="auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

ProductListThumbSlider.propTypes = { data: propTypes.object };



export default ProductListThumbSlider;
