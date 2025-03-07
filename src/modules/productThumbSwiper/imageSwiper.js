import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import ImageSwiperSkeleton from "@/components/skeleton/productDetails/productThumbSwiper/imageSwiperSkeleton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageSwiper = ({ data = [], thumbsSwiper = null }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { locale } = useRouter();
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );
  const [updateKey, setUpdateKey] = useState(0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);

  if (!isClient) return <ImageSwiperSkeleton />; // Avoid rendering until on client side

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
        dir={swiperDir}
        {...imageSwiperSettings}
        key={`${swiperDir}-${updateKey}`}
        id="main"
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null, // Ensure thumbsSwiper is available
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Thumbs]}
      >
        {data &&
          data?.length > 0 &&
          data.map((item, index) => {
            return (
              <SwiperSlide key={`PRO-MAT-KEY-${index}`}>
                <NextLazyFillImage
                  src={item?.SLI_IMAGE_PATH}
                  alt={item?.SLI_IMAGE_PATH}
                  width={1400}
                  height={1400}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "cover!important",
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                  objectFit="contain"
                  upLgWidth={1400}
                  downLgWidth={1400}
                  downMdWidth={1400}
                  downSmWidth={790}
                  downXsWidth={530}
                  aspectRatio="1 / 1"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default ImageSwiper;
