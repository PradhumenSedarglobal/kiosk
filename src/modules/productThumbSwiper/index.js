import Iconify from "@/components/iconify";
import { CustomLink } from "@/components/link";
import { ProductMaterialDetailThumbSlider } from "@/styles/product";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import ImageSwiper from "./imageSwiper";
import ThumbSwiper from "./thumbSwiper";

const GalleryPopUp = dynamic(() => import("./galleryPopup"), {
  ssr: false,
});

const ProductThumbSwiper = ({ data = [], defaultSelectItem, url }) => {
  const { t: translate } = useTranslation();
  const { locale } = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const [openGalleryPopup, setGalleryPopup] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleGalleryPopupOpen = () => setGalleryPopup(true);
  const handleGalleryPopupClose = () => setGalleryPopup(false);
  const hrefURL =
    process.env.NEXT_PUBLIC_LOCAL_API_URL +
    locale +
    `${url}/${defaultSelectItem?.SII_CODE}`;

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (
      /android/i.test(userAgent) ||
      (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    ) {
      setIsMobile(true);
    }
  }, []);

  const handleWhatsAppClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior

    const message = `Sedar Global - Fulfill your home decor ideas with Sedar Global's collection of curtains, roller blinds, room wallpapers, and folding doors have been crafted for each home ${hrefURL}`;
    const encodedMessage = encodeURIComponent(message);

    if (isMobile) {
      // If mobile, attempt to open WhatsApp app
      window.location.href = `whatsapp://send?text=${encodedMessage}`;
    } else {
      // If desktop, try to open WhatsApp desktop app
      const whatsappAppURL = `whatsapp://send?text=${encodedMessage}`;
      const whatsappWebURL = `https://web.whatsapp.com/send?text=${encodedMessage}`;

      // Open WhatsApp app first, fallback to web if the app is not available
      window.location.href = whatsappAppURL;

      // Fallback after a small delay if the app isn't installed
      setTimeout(() => {
        window.open(whatsappWebURL, "_blank");
      }, 1000); // Adjust delay as needed
    }
  };

  // Construct the WhatsApp Web URL for hover preview
  const whatsappWebLink = `https://web.whatsapp.com/send?text=Sedar Global - Fulfill your home decor ideas with Sedar Global's collection of curtains, roller blinds, room wallpapers, and folding doors have been crafted for each home ${hrefURL}`;

  const actions = [
    {
      icon: (
        <CustomLink
          target="_blank"
          link={`https://twitter.com/intent/tweet?text=Sedar Global - Fulfill your home decor ideas with Sedar Global's collection of curtains, roller blinds, room wallpapers, and folding doors have been crafted for each home  ${hrefURL}`}
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{
              color: (theme) => theme.palette.common.black,
              "&:hover": { color: (theme) => theme.palette.primary.main },
            }}
            width={30}
            height={30}
            icon="circum:twitter"
          />
        </CustomLink>
      ),
      name: "twitter",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link={whatsappWebLink}
          lang={locale}
          onClick={handleWhatsAppClick} // Handle click for app vs web
        >
          <Iconify
            pt={1}
            sx={{
              color: (theme) => theme.palette.common.black,
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
                backgroundColor: "none",
              },
            }}
            width={30}
            height={30}
            icon="prime:whatsapp"
          />
        </CustomLink>
      ),
      name: "whatsapp",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link={`https://www.facebook.com/sharer/sharer.php?${hrefURL}`}
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{
              color: (theme) => theme.palette.common.black,
              "&:hover": { color: (theme) => theme.palette.primary.main },
            }}
            width={30}
            height={30}
            icon="circum:facebook"
          />
        </CustomLink>
      ),
      name: "facebook",
    },
  ];

  return (
    <>
      <Box p={0.5} textAlign="left">
        <Typography
          component="p"
          variant="typography14"
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeue,
            color: theme.palette.error.lightError,
            letterSpacing: 0.5,
          })}
        >
          {translate("quick_view_promt_message1")}
        </Typography>
      </Box>
      <ProductMaterialDetailThumbSlider
        component="div"
        className="ProductMaterialDetailThumbSlider"
      >
        <Box component="div" className="zoom-slider">
          <ImageSwiper data={data} thumbsSwiper={thumbsSwiper} />
          <Box
            className="expand-product"
            sx={{
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              },
            }}
          >
            <IconButton onClick={handleGalleryPopupOpen}>
              <Iconify
                icon="system-uicons:expand"
                width={30}
                sx={{
                  color: "common.white",
                  transform: (theme) =>
                    theme.direction == "rtl" && "rotate(90deg)",
                }}
              />
            </IconButton>
          </Box>

          <Box className="share-product">
            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{
                "&.MuiSpeedDial-root": {
                  "& .MuiSpeedDial-fab": {
                    width: "40px",
                    height: "40px",
                    background: (theme) => theme.palette.common.white,
                  },
                },
              }}
              icon={
                <Iconify
                  icon="material-symbols:share"
                  width={20}
                  sx={{
                    color: "common.black",
                    transform: (theme) =>
                      theme.direction == "rtl" && "scale(-1)",
                  }}
                />
              }
              color="inherit"
              onClick={handleOpen}
              open={open}
            >
              {actions.map((action, index) => (
                <SpeedDialAction
                  color="inherit"
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={handleOpen}
                />
              ))}
            </SpeedDial>
          </Box>
        </Box>
        <ThumbSwiper data={data} setThumbsSwiper={setThumbsSwiper} />
      </ProductMaterialDetailThumbSlider>
      <GalleryPopUp
        handleClose={handleGalleryPopupClose}
        open={openGalleryPopup}
        data={data}
      />
    </>
  );
};

export default ProductThumbSwiper;
