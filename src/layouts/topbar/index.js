/* eslint-disable jsx-a11y/alt-text */
import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import LocaleMuiContainer from "@/components/localeMuiContainer";
import SkeletonCommon from "@/components/skeleton/SkeletonCommon";
import useResponsive from "@/hooks/useResponsive";
import { CombineTypography, TopBar, TopbarSwiper } from "@/styles/layouts";
import { TopBarTypography } from "@/styles/topbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import CountryPopover from "./countryPopover";
import SelectLanguage from "./selectLanguage";


const Topbar = ({ layout }) => {
  const { state } = useAuthContext();
  const { cookies } = state;

  const isUpMd = useResponsive("up", "md");
  const { t: translate } = useTranslation();
  const isDownMd = useResponsive("down", "lg");
  const { locale } = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [clickedItems, setClickedItems] = React.useState({});

  const handleClickColorChange = (index) => {
    setClickedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.dark.main,
        paddingRight: "18px",
        paddingLeft: "18px",
      }}
    >
      <LocaleMuiContainer>
        <Grid container alignItems="center">
          <Grid item md={4} sm={12} xs={12} xxs={12}>
            <Box
              component="div"
              sx={{
                position: "relative",
                minHeight: "38px",
                height: "38px",
                overflow: "hidden",
              }}
            >
              {!isUpMd && !isDownMd && (
                <Box
                  component="div"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "100%",
                    zIndex: 100,
                    backgroundColor: (theme) => theme.palette.common.black,
                  }}
                >
                  <SkeletonCommon
                    parentSkeletonKeyName="PARENT-Success"
                    parentCount={1}
                    childSkeletonKeyName="CHILD-Success"
                    childCount={1}
                    stackSpacing={0}
                    imageVariant="linear"
                    row="column"
                    center="center"
                    imgSx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "0px",
                    }}
                    lineSx={{
                      width: "100%",
                      height: "38px",
                      borderRadius: "0px",
                      backgroundSize: "cover",
                      aspectRatio: "unset",
                      bgcolor: "grey.400",
                    }}
                    lineVariant="rectangular"
                    lineRow="row"
                    imageAnimation="wave"
                    lineAnimation="pulse"
                    childWidth="100%"
                    isImageShow={false}
                    backgroundColor="grey.900"
                  />
                </Box>
              )}
              {(isUpMd != false || isDownMd != false) && (
                <TopbarSwiper
                  loop={true}
                  spaceBetween={0}
                  mousewheel={true}
                  direction={"vertical"}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                >
                  {layout &&
                    layout?.HEADER?.TOPBAR &&
                    layout?.HEADER?.TOPBAR?.length > 0 &&
                    layout?.HEADER?.TOPBAR[0]?.CHILD?.length > 0 &&
                    layout?.HEADER?.TOPBAR[0]?.CHILD.map((item, index) => {
                      return (
                        <SwiperSlide
                          key={`${index + 1}_ANNOUNCELAYOUT_${index + 1}`}
                        >
                          <Typography
                            component="span"
                            variant="caption"
                            color="common.white"
                            letterSpacing=".13px"
                            textAlign="center"
                            sx={(theme) => ({
                              fontFamily: theme.fontFaces.helveticaNeue,
                            })}
                          >
                            {item?.content}
                          </Typography>
                        </SwiperSlide>
                      );
                    })}
                </TopbarSwiper>
              )}
            </Box>
          </Grid>

          <Grid
            display={{ md: "block", sm: "none", xs: "none", xxs: "none" }}
            item
            md={8}
            sm={6}
            xs={12}
            xxs={12}
          >
            <TopBar>
              {layout &&
                layout?.HEADER?.TOPBAR?.length > 0 &&
                layout?.HEADER?.TOPBAR[1]?.CHILD?.length > 0 &&
                layout?.HEADER?.TOPBAR[1]?.CHILD?.map((item, index) => {
                  if (
                    item?.link_url != null &&
                    item?.link_url &&
                    (item?.link_url.startsWith("tel:") ||
                      item?.link_url.startsWith("mailto:")) &&
                    item?.link_title != "Language" &&
                    item.link_title != "Country" &&
                    item.content != "اللغة" &&
                    item.content != "البلد" &&
                    item.content != "Страна" &&
                    item.content != "Язык"
                  ) {
                    return (
                      <Box
                        key={`${item?.content}-${index}`}
                        display={{ lg: "block", md: "none" }}
                      >
                        <CombineTypography
                          sx={{
                            textDecoration: "none",
                            color: "white",
                          }}
                          href={item?.link_url}
                          component="a"
                          variant="typography12"
                        >
                          <NextLazyLoadImage
                            src={item?.image_path || ""}
                            sx={{
                              width: "15px!important",
                              height: "15px!important",
                              objectFit: "contain!important",
                            }}
                            alt="storm"
                            width={15}
                            height={15}
                            objectFit="contain"
                          />
                          <Typography
                            component="p"
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeue
                            }
                            variant="typography12"
                            width="max-content"
                            sx={(theme) => ({
                              color: clickedItems[index]
                                ? theme.palette.primary.main
                                : theme.palette.common.white,
                            })}
                            onClick={() => handleClickColorChange(index)}
                          >
                            {item?.content}
                          </Typography>
                        </CombineTypography>
                      </Box>
                    );
                  } else if (
                    item?.link_url &&
                    item?.content != "Language" &&
                    item.content != "Country" &&
                    item.content != "اللغة" &&
                    item.content != "البلد" &&
                    item.content != "Страна" &&
                    item.content != "Язык"
                  ) {
                    return (
                      <CombineTypography
                        key={`${item?.content}-${index}`}
                        sx={{
                          textDecoration: "none",
                          color: "white",
                        }}
                        component={CustomLink}
                        link={item?.link_url}
                        variant="typography12"
                      >
                        <NextLazyLoadImage
                          src={item?.image_path || ""}
                          sx={(theme) => ({
                            width: "15px!important",
                            height: "15px!important",
                            objectFit: "contain!important",

                            ...(theme.direction == "rtl" && {
                              transform: "scaleX(-1)",
                            }),
                          })}
                          alt="storm"
                          width={15}
                          height={15}
                          objectFit="contain"
                        />
                        <Typography
                          component="p"
                          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                          variant="typography12"
                          width="max-content"
                          sx={(theme) => ({
                            color: clickedItems[index]
                              ? theme.palette.primary.main
                              : theme.palette.common.white,
                          })}
                          onClick={() => handleClickColorChange(index)}
                        >
                          {item?.content}
                        </Typography>
                      </CombineTypography>
                    );
                  } else {
                    if (
                      item?.content != "Language" &&
                      item.content != "Country" &&
                      item.content != "اللغة" &&
                      item.content != "البلد" &&
                      item.content != "Страна" &&
                      item.content != "Язык"
                    ) {
                      return (
                        <CombineTypography
                          key={`${item?.content}-${index}`}
                          component="div"
                          sx={{
                            textDecoration: "none",
                            color: "white",
                          }}
                          variant="typography12"
                        >
                          <NextLazyLoadImage
                            src={item?.image_path || ""}
                            sx={{
                              width: "15px!important",
                              height: "15px!important",
                            }}
                            alt="storm"
                            width={15}
                            height={15}
                          />
                          <Typography
                            component="p"
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeue
                            }
                            variant="typography12"
                            width="max-content"
                          >
                            {item?.content}
                          </Typography>
                        </CombineTypography>
                      );
                    }
                  }
                })}
              <CountryPopover />
              {cookies?.cniso != "KW" && <SelectLanguage layout={layout} />}

              {isDownMd && (
                <Box
                  component="div"
                  sx={{
                    display: {
                      lg: "none",
                      md: "block",
                      sm: "block",
                      xs: "block",
                      xxs: "block",
                    },
                  }}
                >
                  <Typography
                    onClick={handleClick}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    component="p"
                    variant="caption"
                    sx={(theme) => ({
                      cursor: "pointer",
                      fontSize: theme.typography.typography12,
                      color: theme.palette.primary.contrastText,
                      fontFamily: theme.fontFaces.helveticaNeue,
                    })}
                  >
                    {translate("More")}
                  </Typography>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{
                      horizontal: "right",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}
                  >
                    {layout &&
                      layout?.HEADER?.TOPBAR &&
                      layout?.HEADER?.TOPBAR?.length > 0 &&
                      layout?.HEADER?.TOPBAR[1]?.CHILD?.length > 0 && (
                        <Box>
                          <CustomLink
                            locale={locale}
                            link={layout?.HEADER?.TOPBAR[1]?.CHILD[0]?.link_url}
                            target="_blank"
                          >
                            <MenuItem onClick={handleClose}>
                              <TopBarTypography component="p" variant="caption">
                                {locale != "default"
                                  ? layout?.HEADER?.TOPBAR[1]?.CHILD[0]?.content
                                  : "Contact us +971800-73327"}
                              </TopBarTypography>
                            </MenuItem>
                          </CustomLink>
                          <CustomLink
                            locale={locale}
                            link={layout?.HEADER?.TOPBAR[1]?.CHILD[1]?.link_url}
                            target="_blank"
                          >
                            <MenuItem onClick={handleClose}>
                              <TopBarTypography component="p" variant="caption">
                                {layout?.HEADER?.TOPBAR[1]?.CHILD[1]?.content}
                              </TopBarTypography>
                            </MenuItem>
                          </CustomLink>
                          <CustomLink
                            locale={locale}
                            link={layout?.HEADER?.TOPBAR[1]?.CHILD[2]?.link_url}
                            target="_blank"
                          >
                            <MenuItem onClick={handleClose}>
                              <TopBarTypography component="p" variant="caption">
                                {layout?.HEADER?.TOPBAR[1]?.CHILD[2]?.content}
                              </TopBarTypography>
                            </MenuItem>
                          </CustomLink>
                        </Box>
                      )}
                  </Menu>
                </Box>
              )}
            </TopBar>
          </Grid>
        </Grid>
      </LocaleMuiContainer>
    </Box>
  );
};

export default Topbar;
