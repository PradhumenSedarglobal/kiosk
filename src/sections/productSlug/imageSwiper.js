import { NextFillImage } from "@/components/image";
import { Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const ImageSwiper = ({ data = [], thumbsSwiper = null }) => {

  const imageSwiperSettings = {
    loop: false,
    observer: true,
    observeParents: true,
    setWrapperSize: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 0,
  };
  return (
    <>
      <Swiper
        {...imageSwiperSettings}
        id="main"
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null,
        }}
        tag="section"
        wrapperTag="ul"
        navigation={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Thumbs]}
      >
        {data?.GALLERY.map((item, index) => {
          return (
            <SwiperSlide key={`PRO-MAT-KEY-${index}`}>
              <NextFillImage
                src={item?.image_path}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                objectFit="cover"
                sx={{
                  width: "100%!important",
                  height: "auto!important",
                  objectFit: "cover",
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
                />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ImageSwiper;
