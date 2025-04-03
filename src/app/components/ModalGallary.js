// components/SliderComponent.js
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ModalGallary = ({ modalSliderImage, isTablet, isMobile }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (prevRef.current && nextRef.current) {
        prevRef.current.style.display = "block";
        nextRef.current.style.display = "block";
      }
    }, 100);
  }, []);

  return (
    <div className="slider-container">
      <Swiper
        style={{ marginBottom: "5px" }}
        className="previewImage"
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop={true}
        modules={[Navigation]}
      >
        {modalSliderImage.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.SLI_IMAGE_PATH}
              alt={`Slider Image ${index + 1}`}
              style={{
                width: "100%",
                objectFit: "fill",
                height: isTablet
                  ? "calc(100vh - 510px)"
                  : isMobile
                  ? "calc(100vh - 340px)"
                  : "calc(98.5vh)",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Navigation Arrows */}
      <div ref={prevRef} className="custom-prev">❮</div>
      <div ref={nextRef} className="custom-next">❯</div>

      <style jsx>{`
        .custom-prev, .custom-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 2rem;
          color: #ef9c00;
          cursor: pointer;
          z-index: 10;
          user-select: none;
        }
        
        .custom-prev { left: 10px; }
        .custom-next { right: 10px; }
        
        .custom-prev:hover, .custom-next:hover {
          color: #ffb300;
        }
      `}</style>
    </div>
  );
};

export default ModalGallary;
