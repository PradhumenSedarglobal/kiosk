import NextLazyLoadImage from '@/components/image/NextLazyLoadImage';
import { setStepIndex } from '@/redux/slices/tourSlice';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

let img_path = "/assets/images/";
const item_img_path_tile = process.env.NEXT_PUBLIC_ITEM_IMG_PATH + "hover/";
const sliderSetting = {
    initialSlide: 0,
    observer: true,
    observeParents: true,
    loopAdditionalSlides: 1,
};

const MaterialSwiper = ({ item_info, updateTextureFun, item_img_path, elem, productInfo }) => {
    const sliderRef = useRef(null);

    return (
        <Swiper
            // slidesPerView={4}
            ref={sliderRef}
            spaceBetween={0}
            freeMode={false}
            pagination={false}
            className="mySwiper"
            loop={false}
            {...sliderSetting}
            breakpoints={{
                320: {
                    slidesPerView: 2.5, // xxs
                },
                576: {
                    slidesPerView: 2.3, // xs
                },
                768: {
                    slidesPerView: 3.3, // sm
                },
                992: {
                    slidesPerView: 2.3, // md
                },
                1100: {
                    slidesPerView: 3.3, // lg
                },
            }}
        >
            {item_info?.items.map((subColor, index) => {
                return (
                    <SwiperSlide key={`COLOR-MATERIAL-${index}`}>
                        <Card
                            sx={() => ({
                                "&.MuiCard-root": {
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%!important",
                                    position: "relative",
                                    border: (theme) =>
                                        productInfo?.code == subColor?.SII_CODE &&
                                        `2px solid ${theme.palette.primary.main}`,
                                    overflow: "hidden",
                                    borderWidth: "2px",
                                    cursor: "pointer",
                                    padding: 0.5,
                                },
                            })}
                            variant="outlined"
                            onClick={(e) => {
                               
                                sliderRef.current.swiper.slideTo(index - 1);
                                updateTextureFun(subColor.texture_info);
                            }}
                        >
                            <Box 
                              
                                component="div"
                                sx={{
                                    border: (theme) =>
                                        `2px solid ${theme.palette.common.white}`,
                                    position: "relative",
                                    overflow: "hidden",
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: "50%!important",
                                }}
                            >
                                <NextLazyLoadImage
                                    src={
                                        subColor.SII_IMAGE_PATH_DESKTOP
                                            ? item_img_path_tile +
                                            subColor.SII_IMAGE_PATH_DESKTOP
                                            : img_path + "noimage.jpg"
                                    }
                                    alt={elem?.IMAGE_PATH}
                                    objectFit="cover"
                                    sx={{
                                        width: "100%!important",
                                        height: "100%!important",
                                        borderRadius: "50%!important",
                                        objectFit: "cover",
                                        backgroundSize: "cover",
                                    }}
                                    width={28}
                                    height={28}
                                    upLgWidth={28}
                                    downLgWidth={28}
                                    downMdWidth={28}
                                    downSmWidth={18}
                                    downXsWidth={18}
                                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                                />
                            </Box>
                        </Card>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    )
}

export default MaterialSwiper