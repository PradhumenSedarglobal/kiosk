import { NextImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import { CustomPopover, MenuLinkTypography } from "@/styles/layouts";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";

const MegaMenuPopover = ({
  handleOpen,
  anchorEl,
  handleClose,
  categoryData = [],
}) => {
  const { locale } = useRouter();
  const { t: translate } = useTranslation();

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseOver = (item) => {
    setHoveredItem(item?.image_path_2);
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };

  return (
    <CustomPopover
      anchorEl={anchorEl}
      onMouseOver={() => handleOpen()}
      onMouseLeave={handleClose}
      component={Fade}
      in={Boolean(anchorEl)}
    >
      <Box width="100%">
        <Grid
          container
          alignItems="center"
          columnSpacing={6}
          justifyContent="center"
        >
          <Grid item md={3}>
            <Typography
              component="h2"
              variant="typography31"
              sx={{ zIndex: 2, position: "relative" }}
            >
              {categoryData?.title}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Grid container spacing={2.6}>
              {categoryData?.data &&
                categoryData?.data?.length > 0 &&
                categoryData?.data.map((item, index) => {
                  const imagePath =
                    hoveredItem == item?.image_path_2
                      ? item?.image_path_2
                      : item?.image_path;
                  return (
                    <Grid
                      item
                      md={4}
                      sm={4}
                      xs={12}
                      xxs={12}
                      key={`Megas-Menus-${index}`}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        zIndex={2}
                        position="relative"
                        onMouseOver={() => handleMouseOver(item)}
                        onMouseOut={handleMouseOut}
                      >
                        <CustomLink link={`/${item?.link_url}`} lang={locale}>
                          <NextImage
                            src={imagePath}
                            sx={{
                              width: "30px!important",
                              height: "30px!important",
                              transition: "imagePaht 0.3 ease",
                            }}
                            alt={item?.content}
                          />
                        </CustomLink>
                        <CustomLink link={`/${item?.link_url}`} lang={locale}>
                          <Typography
                            component="p"
                            variant="caption1"
                            sx={{
                              letterSpacing: ".1rem",
                              transition:
                                "color 0.3s ease, font-size 0.3s ease",
                              "&:hover": {
                                color: (theme) => theme.palette.common.black,
                                fontSize: (theme) =>
                                  theme.typography.typography14,
                              },
                            }}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeue
                            }
                          >
                            {item?.content}
                          </Typography>
                        </CustomLink>
                      </Stack>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          <Grid item md={3}>
            <Stack sx={{ position: "relative" }} spacing={3}>
              <NextImage
                src={categoryData?.banner_image_path}
                sx={{
                  width: "auto",
                  height: "auto",
                }}
                alt={categoryData?.title}
              />
              <Box sx={{ position: "relative" }}>
                {["curtains-and-drapes", "blinds-shades"].indexOf(
                  categoryData?.link_url
                ) >= 0 ? (
                  <CustomLink
                    link={
                      categoryData?.redirect_to_type === "PRODUCT"
                        ? `/${categoryData?.link_url}`
                        : categoryData?.redirect_to_type === "OTHER"
                          ? categoryData?.redirect_url
                          : "/curtains-and-blinds"
                    }
                    lang={locale}
                  >
                    <MenuLinkTypography component="p" variant="typography15">
                      {translate("shop_all")}
                    </MenuLinkTypography>
                  </CustomLink>
                ) : (
                  <CustomLink link={`/${categoryData?.link_url}`} lang={locale}>
                    <MenuLinkTypography component="p" variant="typography15">
                      {translate("shop_all")}
                    </MenuLinkTypography>
                  </CustomLink>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </CustomPopover>
  );
};

export default MegaMenuPopover;
