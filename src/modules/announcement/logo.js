/* eslint-disable jsx-a11y/alt-text */
import NextImage from "@/components/image/nextImage";

const AnnouncementLogo = ({ url }) => {
  return (
    <NextImage
      src={url}
      sx={{
        "&.MuiCard-root": {
          position: "absolute!important",
          right: "5px!important",
          bottom: -2,
        },
        width: {
          md: "215px!important",
          sm: "163px!important",
          xs: "163px!important",
          xxs: "163px!important",
        },
      }}
      width={216}
      height={110}
      objectFit="contain"
      alt="logo"
    />
  );
};

export default AnnouncementLogo;
