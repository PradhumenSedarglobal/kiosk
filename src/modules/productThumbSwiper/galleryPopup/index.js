import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const GalleryPopUp = ({ open, handleClose, data }) => {
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
        open={open}
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
              px: "0px",
              position: "relative",
              background: "transparent",
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
              right: "5%",
              top: "10%",
              zIndex: 11,
            }}
          >
            <Card sx={{ borderRadius: "50%" }}>
              <IconButton size="small" onClick={handleClose}>
                <Close fontSize="small" />
              </IconButton>
            </Card>
          </Box>
          <Grid container alignItems="center" justifyContent="center" mt={7}>
            <Grid item xl={5} lg={5} md={6} sm={12} xs={12} xxs={12}>
              <Swiper
                {...GalleryPopupSliderSettings}
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {data &&
                  data?.length > 0 &&
                  data.map((item, index) => (
                    <SwiperSlide key={`GalleryPopUp-${index}`}>
                      <NextLazyLoadImage
                        src={item?.SLI_IMAGE_PATH}
                        alt={item?.SLI_IMAGE_PATH}
                        width={768}
                        height={599}
                        sx={{
                          width: "100%!important",
                          height: "100%!important",
                          objectFit: "cover!important",
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
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryPopUp;
