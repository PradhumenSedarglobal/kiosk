/* eslint-disable jsx-a11y/alt-text */
import NextLazyLoadImage from "./image/NextLazyLoadImage";

const AnnouncementLogoComponent = ({ url }) => {
  return (
    <NextLazyLoadImage
      src={url || ""}
      sx={{
        position: "absolute!important",
        right: "5px!important",
        top: { lg: 9, md: 9, sm: 38, xs: 34, xxs: 59 },
        left: "auto!important",
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

export default AnnouncementLogoComponent;
