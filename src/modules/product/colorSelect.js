import { useAuthContext } from "@/auth/useAuthContext";
import { NextFillImage } from "@/components/image";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const ColorSelect = ({
  handleSetItemData,
  data,
  defaultSelectItemData,
  productData,
  isWidthFull = false,
  isMoreColor = true,
  breakpoints,
  maxWidth,
  isProductViewDetailRedirect = false,
  viewNumber = 5,
}) => {
  const { t: translate } = useTranslation();
  const [more, setMore] = React.useState(false);
  const item_img_path_tile = process.env.NEXT_PUBLIC_ITEM_IMG_PATH + "hover/";
  const swiperRef = useRef(null);
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const handleSetMoreData = () => {
    setMore(true);
  };
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );
  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
  }, [themeDirection, locale]);

  const sliderSetting = {
    initialSlide: 0,
    observer: true,
    observeParents: true,
    loopAdditionalSlides: 1,
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          boxSizing: "border-box",
          mt: 2,
          mb: { md: 2, sm: 2, xs: 2, xxs: 2 },
          display: {
            md: "none",
            sm: "inline-block",
            xs: "inline-block",
            xxs: "inline-block",
          },
          width: "100%",
          maxWidth: maxWidth,
        }}
      >
        <Swiper
          key={swiperDir}
          ref={swiperRef}
          spaceBetween={0}
          freeMode={false}
          pagination={false}
          className="mySwiper"
          loop={false}
          {...sliderSetting}
          breakpoints={breakpoints}
          dir={swiperDir}
          virtual={true}
          modules={[Virtual]}
        >
          {data &&
            data?.length > 0 &&
            data.map((item, index) => {
              return (
                <SwiperSlide key={`COLOR-MATERIAL-${index}`}>
                  <Box
                    component="div"
                    {...(isProductViewDetailRedirect && {
                      component: CustomLink,
                      link: `/${productData?.LISTING?.url}/${item?.SII_CODE}`,
                    })}
                  >
                    <Card
                      sx={() => ({
                        "&.MuiCard-root": {
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%!important",
                          position: "relative",
                          borderColor: (theme) =>
                            defaultSelectItemData?.SII_CODE == item.SII_CODE
                              ? theme.palette.primary.main
                              : theme.palette.divider,
                          overflow: "hidden",
                          borderWidth: "2px",
                          cursor: "pointer",
                          padding: 0.5,
                        },
                      })}
                      variant="outlined"
                      onClick={() => {
                        handleSetItemData(item, defaultSelectItemData),
                          swiperRef.current.swiper.slideTo(index - 1);
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
                          src={`${item_img_path_tile}${item?.SII_IMAGE_PATH_DESKTOP}`}
                          alt={item?.SII_IMAGE_PATH_DESKTOP}
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
                  </Box>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>

      <Box
        component="div"
        sx={{
          boxSizing: "border-box",
          mt: 2,
          mb: { md: 2, sm: 0, xs: 0, xxs: 0 },

          display: { md: "block", sm: "none", xs: "none", xxs: "none" },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <TransitionGroup
            component={Stack}
            direction="row"
            alignItems="center"
            columnGap={0.5}
            rowGap={0.5}
            flexWrap="wrap"
          >
            {data &&
              data?.length > 0 &&
              data
                .map((item, index) => {
                  return (
                    <Collapse key={`COLOR-MATERIAL-${index}`}>
                      <Box
                        component="div"
                        {...(isProductViewDetailRedirect && {
                          component: CustomLink,
                          link: `/${productData?.LISTING?.url}/${item?.SII_CODE}`,
                        })}
                      >
                        <Card
                          sx={(theme) => ({
                            "&.MuiCard-root": {
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%!important",
                              position: "relative",
                              borderColor: (theme) =>
                                defaultSelectItemData?.SII_CODE == item.SII_CODE
                                  ? theme.palette.primary.main
                                  : theme.palette.divider,
                              overflow: "hidden",
                              borderWidth: "2px",
                              cursor: "pointer",
                              [theme.breakpoints.down("sm")]: {
                                width: "22px !important",
                                height: "22px !important",
                              },
                            },
                          })}
                          variant="outlined"
                          onClick={() => {
                            handleSetItemData(item, defaultSelectItemData);
                          }}
                        >
                          <Box
                            component={Card}
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
                            <NextFillImage
                              src={`${item_img_path_tile}${item?.SII_IMAGE_PATH_DESKTOP}`}
                              alt={item?.SII_IMAGE_PATH_DESKTOP}
                              objectFit="cover"
                              sxBreakpoint={(theme) => ({
                                width: "28px !important",
                                height: "28px !important",
                                borderRadius: "50%!important",
                                objectFit: "cover",
                                backgroundSize: "cover",
                                "&.MuiCard-root": {
                                  borderRadius: "50%!important",
                                  width: "100% !important",
                                  height: "100% !important",
                                  boxShadow: "none",
                                  position: "relative!important",
                                  backgroundSize: "cover",
                                  img: {
                                    borderRadius: "50%!important",
                                  },
                                },
                                [theme.breakpoints.down("sm")]: {
                                  width: "20px !important",
                                  height: "20px !important",
                                },
                              })}
                              sizes="(min-width: 0px) and (max-width: 1920px) 100%"
                            />
                          </Box>
                        </Card>
                      </Box>
                    </Collapse>
                  );
                })
                .slice(0, !more && isMoreColor ? viewNumber : data?.length)}
          </TransitionGroup>

          {data?.length > viewNumber && !more && isMoreColor && (
            <Typography
              component="p"
              variant="typography15"
              color={(theme) => theme.palette.common.black}
              onClick={handleSetMoreData}
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              sx={{ cursor: "pointer" }}
            >
              {!more
                ? `+${data?.length - viewNumber}${" "}${translate("More")}`
                : `${translate("Less")}`}
            </Typography>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ColorSelect;
