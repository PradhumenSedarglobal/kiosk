import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerDialog = dynamic(() => import("@/sections/product/bannerDialog"), {
  ssr: false,
});

const Banner = ({ firstData }) => {
  const isDownMd = useResponsive("down", "md");
  const [open, setOpen] = useState(false);
  const { t: translate } = useTranslation();
  const handleOpenClose = () => setOpen(!open);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { locale } = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);

  return (
    <>
      <Box sx={{ position: "relative" }} component="section">
        <Swiper
          key={`${swiperDir}-${updateKey}-${isDownMd}`} // Combine to ensure re-render
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={500}
          navigation={false}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              const bulletColor = isDownMd ? "black" : "white";
              return `<span class="${className}" style="background-color: ${bulletColor};"></span>`;
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
          autoHeight={true}
          dir={swiperDir}
        >
          {firstData &&
            firstData.map((childItem, childIndex) => {
              return (
                <SwiperSlide
                  component="div"
                  key={`CHILD_SLIDER_INDEX_${childIndex}`}
                >
                  <Box component="div" position="relative">
                    <NextLazyFillImage
                      src={childItem?.SC_IMAGE_PATH}
                      alt={childItem?.SC_DESC}
                      sx={{
                        width: "100%!important",
                        height: "100%!important",
                        objectFit: "cover",
                        position: "relative!important",
                      }}
                      width={1400}
                      height={385}
                      upLgWidth={1400}
                      downLgWidth={1400}
                      downMdWidth={800}
                      downSmWidth={400}
                      downXsWidth={300}
                      priority={false}
                      loading="lazy"
                      aspectRatio="16 / 4"
                    />

                    <Box
                      sx={(theme) => ({
                        position: "absolute",
                        top: "60%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        [theme.breakpoints.down("md")]: {
                          top: "75%",
                        },
                      })}
                    >
                      <Typography
                        component="h1"
                        variant="typography10"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                        color="common.white"
                        fontWeight="400"
                        textAlign="center"
                        mb="45px"
                        letterSpacing={0.5}
                      >
                        {childItem?.SC_DESC}
                      </Typography>
                      <Typography
                        component="div"
                        variant="typography14"
                        color="common.white"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                        textAlign="center"
                        letterSpacing={0.5}
                        display={{
                          lg: "block",
                          md: "block",
                          sm: "none",
                          xs: "none",
                          xxs: "none",
                        }}
                      >
                        {parse(
                          typeof childItem?.SC_MORE === "string" &&
                            childItem?.SC_MORE.length > 380
                            ? `${childItem?.SC_MORE.slice(0, 380)}...`
                            : childItem?.SC_MORE || ""
                        )}
                        {childItem?.SC_MORE?.length > 380 && (
                          <Typography
                            component="span"
                            color={(theme) => theme.palette.primary[200]}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeueLight
                            }
                            letterSpacing=".54px"
                            sx={{ cursor: "pointer", fontWeight: 400, pl: 1 }}
                            variant="typography14"
                            display="inline-block"
                            onClick={() => {
                              setSelectedItem(childItem);
                              setOpen(!open);
                            }}
                          >
                            {translate("ReadMore")}
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  {isDownMd && (
                    <CardContent sx={{ mb: 2 }}>
                      <Typography
                        component="div"
                        variant="typography14"
                        color="common.black"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                        letterSpacing={0.5}
                        display={{
                          lg: "none",
                          md: "none",
                          sm: "block",
                          xs: "block",
                          xxs: "block",
                        }}
                      >
                        {parse(
                          typeof childItem?.SC_MORE === "string" &&
                            childItem?.SC_MORE.length > 80
                            ? `${childItem?.SC_MORE.slice(0, 80)}...`
                            : childItem?.SC_MORE || ""
                        )}
                        {childItem?.SC_MORE?.length > 80 && (
                          <Typography
                            component="span"
                            color={(theme) => theme.palette.primary[200]}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeueLight
                            }
                            letterSpacing=".54px"
                            sx={{ cursor: "pointer", fontWeight: 400, pl: 1 }}
                            variant="typography14"
                            display="inline-block"
                            onClick={() => {
                              setSelectedItem(childItem);
                              setOpen(!open);
                            }}
                          >
                            {translate("ReadMore")}
                          </Typography>
                        )}
                      </Typography>
                    </CardContent>
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>

      <BannerDialog
        open={open}
        handleOpenClose={handleOpenClose}
        firstData={selectedItem}
      />
    </>
  );
};

export default Banner;
