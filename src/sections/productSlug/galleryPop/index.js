import { Close } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material";
import dynamic from "next/dynamic";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";

const GalleryPop = ({ open, handleClose, data }) => {
  const GalleryPopupSliderSettings = {
    loop: false,
    slidesPerView: 1,
    autoHeight: false,
    observer: true,
    observeParents: true,
    spaceBetween: 0,
  };

  return (
    <>
      <Dialog
        open={open?.openGalleryPopup}
        scroll="body"
        onClose={handleClose}
        fullScreen
        sx={(theme) => ({
          "& .MuiDialog-paper": {
            backgroundColor: alpha(theme.palette.common.black, 0.4),
          },
        })}
      >
        <DialogContent
          sx={(theme) => ({
            "&.MuiDialogContent-root": {
              px: "20px",
              position: "relative",
              background: "transparent",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            },

            "& .swiper-pagination-fraction": {
              color: theme.palette.common.white,
              position: "fixed",
              left: "0%",
              width: "8%",
              top: "10%",
            },
            "& .swiper-button-prev, .swiper-button-next": {
              color: theme.palette.common.white,
            },
          })}
        >
          <Box
            sx={{
              position: "absolute",
              right: { md: "5%", sm: "5%", xs: "5%", xxs: "5%" },
              top: { md: "10%", sm: "5%", xs: "5%", xxs: "10%" },
              zIndex: 11,
            }}
          >
            <Card sx={{ borderRadius: "50%" }}>
              <IconButton size="small" onClick={handleClose}>
                <Close fontSize="small" />
              </IconButton>
            </Card>
          </Box>
          <Box sx={{ width: { md: "100%", sm: "calc(100vh - 200px)", xs: "calc(100vh - 200px)", xxs: "100%" } }} component='div'>
            <Grid container alignItems="center" justifyContent="center" mt={0} spacing={0} height="100%">
              <Grid item xl={5} lg={5} md={6} sm={12} xs={12} xxs={12}>
                <Box component="div" sx={{ height: "100%" }}>
                  <Swiper
                    {...GalleryPopupSliderSettings}
                    pagination={{
                      type: "fraction",
                    }}
                    navigation={true}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                  >
                    {open?.data &&
                      open?.data?.GALLERY?.length > 0 &&
                      open?.data?.GALLERY?.map((item, index) => (
                        <SwiperSlide key={`GalleryPopUp-${index}`}>
                          <NextLazyLoadImage
                            src={item?.image_path}
                            alt={item?.image_path}
                            width={768}
                            height={599}
                            sx={{
                              width: "100%!important",
                              height: "auto!important",
                              objectFit: "cover!important",
                              backgroundSize: "cover!important"
                            }}
                            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                            objectFit="contain"
                            upLgWidth={768}
                            downLgWidth={768}
                            downMdWidth={768}
                            downSmWidth={468}
                            downXsWidth={394}
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryPop;
