/* eslint-disable jsx-a11y/alt-text */
import ArrowDown from "@/assets/header/arrow-down";
import CartIcon from "@/assets/header/cart";
import Search from "@/assets/header/search";
import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import LazyImage from "@/components/LazyImage";
import { CustomLink } from "@/components/link";
import LocaleMuiContainer from "@/components/localeMuiContainer";
import useResponsive from "@/hooks/useResponsive";
import CanonicalTag from "@/modules/canonicalTag";
import SeoHeader from "@/modules/seoHeader";
import WebSiteShema from "@/modules/websiteSchema";
import useCartContext from "@/provider/cart/cartContext";
import { useSelector } from "@/redux/store";
import { PATH_PAGE } from "@/routes/paths";
import {
  CustomCategoryPaper,
  CustomCategoryStack,
  MUIAppbar,
} from "@/styles/layouts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { bindHover, bindPopover } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import LoginMenu from "./loginMenu";
import MegaMenuPopover from "./megaMenuPopover";
import MidMenu from "./midMenu";
import SearchBox from "./search";
import Head from 'next/head';

const AuthDialog = dynamic(() => import("./authDialog"), {
  ssr: false,
});

const SearchDialogBox = dynamic(() => import("./search/searchDialog"), {
  ssr: false,
});

const CartPopup = dynamic(() => import("@/modules/cartPopup"), {
  loading: () => <></>,
  ssr: false,
});

const WebHeader = ({ handleOpenClose, layout }) => {
  const router = useRouter();
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const { t: translate } = useTranslation();
  const { productType } = useSelector((state) => state.product);
  const { locale, pathname, back, query, asPath } = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);
  const { state, setLoginPopupOpen, setCartPopupOpen } = useAuthContext();
  const { cookies = {}, loginPopupOpen, cartPopupOpen } = state;
  const { getMyCartData } = useCartContext();
  const { user, JWTAuthToken, modificationUser, USER_ID, langName } =
    cookies || {};
  const isDownMd = useResponsive("down", "md");
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [categoryData, setCategoryData] = React.useState({
    title: "",
    data: [],
  });
  const isRu =
    locale != "default" &&
      locale.split("-")?.[1] &&
      locale.split("-")?.[1] === "ru"
      ? true
      : false;


  const handleCartPopup = () => {
    setCartPopupOpen(!cartPopupOpen);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLoginClose = () => {
    setLoginPopupOpen(false);
  };

  const handleLoginOpen = () => {
    setLoginPopupOpen(true);
  };

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });
  const handleOpen = () => {
    setAnchorEl(true);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (locale) {
        getMyCartData({
          params: { soh_sys_id: modificationUser?.head_sys_id || 0 },
        });
      }
    }, 300);
  }, [locale, modificationUser?.head_sys_id, asPath]);

  const SedarLogoImage = () => {
    const logoProps = {
      // src: layout?.HEADER?.LOGO?.[0]?.image_path,
      src: locale.split("-")?.[1] === "ar" ? `${process.env.NEXT_PUBLIC_URL}assets/header/logo-ar.avif`
        : `${process.env.NEXT_PUBLIC_URL}assets/header/logo.avif`,
      width: 100,
      height: 55,
      sx: {
        width: {
          lg: "121px!important",
          md: "121px!important",
          sm: "96px!important",
          xs: "96px!important",
          xxs: "96px!important",
        },
        height: {
          lg: "55px!important",
          md: "55px!important",
          sm: "43px!important",
          xs: "43px!important",
          xxs: "43px!important",
        },
        maxWidth: "300px",
      },
      objectFit: "contain",
      sizes: "(min-width: 0px) and (max-width: 1920px) 100vw",
      alt: layout?.HEADER?.LOGO?.[0]?.image_path || "Logo",
    };

    if (router.asPath === "/") {
      return <LazyImage {...logoProps} />;
    } else {
      return (
        <Link href={PATH_PAGE.home} locale={locale}>
          <LazyImage {...logoProps} />
        </Link>
      );
    }
  };





  const HeaderMidMenu = () => {
    return (
      <Stack
        direction="row"
        alignItems="start"
        spacing={isRu ? 3 : 4}
        pr={1}
        justifyContent="end"
      >
        <MidMenu layout={layout} isRu={isRu} />
        {layout &&
          layout?.HEADER?.MIDMENU?.length > 0 &&
          layout?.HEADER?.MIDMENU?.[4]?.CHILD?.length > 0 && (
            <LoginMenu
              title={
                JWTAuthToken && user && user?.cust_cr_uid == "GUEST-USER"
                  ? translate("Hi_Guest")
                  : JWTAuthToken && user?.cust_cr_uid != "GUEST-USER"
                    ? `${user?.cust_first_name}..`
                    : layout?.HEADER?.MIDMENU?.[4]?.CHILD?.[0]?.content
                      ? layout?.HEADER?.MIDMENU?.[4]?.CHILD?.[0]?.content
                      : ""
              }
              alt={layout?.HEADER?.MIDMENU?.[4]?.CHILD?.[0]?.content}
              src={layout?.HEADER?.MIDMENU?.[4]?.CHILD?.[0]?.image_path}
              handleLoginOpen={handleLoginOpen}
              isUser={USER_ID && user && user?.cust_cr_uid ? true : false}
              isGuest={user && user?.cust_cr_uid == "GUEST-USER"}
              isRu={isRu}
            />
          )}
        {layout &&
          layout?.HEADER?.MIDMENU?.length > 0 &&
          layout?.HEADER?.MIDMENU?.[4]?.CHILD?.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              width="max-content"
              sx={{ cursor: "pointer" }}
              onClick={handleCartPopup}
            >
              <Typography
                component="p"
                variant="typography15"
                noWrap
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {layout?.HEADER?.MIDMENU?.[4]?.CHILD?.[2]?.content}
              </Typography>
              {layout?.HEADER?.MIDMENU?.[4]?.CHILD?.[2]?.content && (
                <Badge
                  badgeContent={
                    (!asPath.startsWith("/payment") ||
                      asPath.startsWith("/payment/error")) &&
                      cart?.cart_count?.QTY
                      ? cart?.cart_count?.QTY
                      : "0"
                  }
                  color="primary"
                  className="Begin_Ceckout_Button"
                >
                  <Box
                    sx={(theme) => ({
                      ...(theme.direction == "rtl" && {
                        transform: "scaleX(-1)",
                      }),
                    })}
                  >
                    <CartIcon />
                  </Box>
                </Badge>
              )}
            </Stack>
          )}
      </Stack>
    );
  };

  const HeaderCategoryMenu = () => {
    return (
      <CustomCategoryStack
        width="100%"
        maxWidth="100%"
        direction="row"
        justifyContent={
          layout && layout?.HEADER?.CATEGORIES?.length > 3
            ? "space-between"
            : "left"
        }
        spacing={layout && layout?.HEADER?.CATEGORIES?.length < 8 ? 6 : 0}
      >
        {layout &&
          layout?.HEADER?.CATEGORIES?.length > 0 &&
          layout?.HEADER?.CATEGORIES.map((item, index) => {
            if (item?.CHILD && item?.CHILD?.length > 0) {
              return (
                <CustomLink
                  key={`${item?.content}-layout_HEADER_CATEGORIES-${index}`}
                  lang={locale}
                  link={`/${item?.link_url}`}
                >
                  <Typography
                    color={(theme) => theme.palette.grey[6000]}
                    fontWeight={200}
                    className="category-text"
                    component="h2"
                    variant={langName == "ar" ? "typography15" : "caption"}
                    noWrap
                    sx={(theme) => ({
                      pb: "0.5rem",
                      height: "30px",
                      transition: "all .3s",
                      cursor: "pointer",
                      position: "relative",
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                      ":hover": {
                        borderBottom: (theme) =>
                          `3px solid ${theme.palette.warning.main}`,
                      },
                    })}
                    onMouseOver={() => {
                      handleOpen();
                      setCategoryData({
                        title: item?.content,
                        data: item?.CHILD,
                        ...item,
                      });
                    }}
                    onMouseLeave={() => {
                      handleClose();
                      setCategoryData({
                        title: item?.content,
                        data: item?.CHILD,
                        ...item,
                      });
                    }}
                    textTransform="uppercase"
                  >
                    {item?.content}
                  </Typography>
                </CustomLink>
              );
            } else {
              return (
                <React.Fragment key={`${item?.content}-divider-link-${index}`}>
                  <Divider
                    orientation="vertical"
                    sx={{
                      height: "18px!important",
                      color: (theme) => theme.palette.common.black,
                    }}
                  />
                  <CustomLink
                    key={`${item?.content}-layout_HEADER_CATEGORIES-${index}`}
                    lang={locale}
                    link={`/${item?.link_url}`}
                  >
                    <Typography
                      className="category-text"
                      component="p"
                      variant={langName == "ar" ? "typography15" : "caption"}
                      noWrap
                      color={(theme) => theme.palette.grey[6000]}
                      fontWeight={200}
                      sx={(theme) => ({
                        pb: "0.5rem",
                        height: "30px",
                        transition: "all .3s",
                        cursor: "pointer",
                        position: "relative",
                        fontFamily: theme.fontFaces.helveticaNeueBold,
                        ":hover": {
                          borderBottom: (theme) =>
                            `3px solid ${theme.palette.warning.main}`,
                        },
                      })}
                      textTransform="uppercase"
                    >
                      {item?.content}
                    </Typography>
                  </CustomLink>
                </React.Fragment>
              );
            }
          })}

        {layout?.HEADER?.CATEGORIES &&
          layout?.HEADER?.CATEGORIES?.length > 8 && (
            <>
              <Stack
                {...bindHover(popupState)}
                direction="row"
                spacing={1}
                alignItems="center"
                display={{
                  xl: "none",
                  lg: "flex",
                  md: "flex",
                }}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  component="p"
                  variant={langName == "ar" ? "typography15" : "caption"}
                  fontSize={13}
                  noWrap
                  color={(theme) => theme.palette.grey[6000]}
                  fontWeight={200}
                  sx={{
                    pb: "0.5rem",
                    fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                    cursor: "pointer",
                  }}
                  textTransform="uppercase"
                >
                  {translate("More")}
                </Typography>
                <ArrowDown sx={{ pb: "0.5rem" }} />
              </Stack>
              <Popper
                open={true}
                placement="bottom"
                transition
                sx={{
                  zIndex: 2000,
                  borderRadius: 0,
                  position: "relative",
                }}
                disablePortal={false}
                {...bindPopover(popupState)}
              >
                {({ TransitionProps }) => (
                  <Fade
                    {...TransitionProps}
                    timeout={350}
                    sx={{
                      width: "296px",
                      borderRadius: 0,
                    }}
                  >
                    <CustomCategoryPaper elevation={3}>
                      {layout &&
                        layout?.HEADER?.CATEGORIES?.length > 8 &&
                        layout?.HEADER?.CATEGORIES.map((item, index) => {
                          return (
                            <CustomLink
                              key={`SLICE-CATEGORY-${index}`}
                              lang={locale}
                              link={`/${item?.link_url}`}
                            >
                              <Typography
                                className="more-text"
                                component="p"
                                variant="body2"
                                noWrap
                                sx={{
                                  p: "0.5rem",
                                  px: "1rem",
                                  transition: "all .3s",
                                  cursor: "pointer",
                                  position: "relative",
                                  fontFamily: (theme) =>
                                    theme.fontFaces.helveticaNeueBold,
                                  ":hover": {
                                    borderBottom: (theme) =>
                                      `3px solid ${theme.palette.warning.main}`,
                                  },
                                }}
                              >
                                {item?.content}
                              </Typography>
                            </CustomLink>
                          );
                        })}
                    </CustomCategoryPaper>
                  </Fade>
                )}
              </Popper>
            </>
          )}
      </CustomCategoryStack>
    );
  };
  
  return (
    <>
      {/* <Head>
      <SeoHeader data={layout} router={router} />
      {router.pathname == "/" ? (
        <WebSiteShema data={layout?.SEO} router={router} />
      ) : (
        ""
      )}
      <CanonicalTag router={router} pagetype={productType} />
      </Head> */}
      <SeoHeader data={layout} router={router} />
      {router.pathname == "/" ? (
        <WebSiteShema data={layout?.SEO} router={router} />
      ) : (
        ""
      )}
      <Head>
      <CanonicalTag router={router} pagetype={productType} />
    </Head>
      <MUIAppbar position="relative" color="inherit">
        <LocaleMuiContainer>
          {locale != "default" && (
            <Stack
              spacing={1}
              width="100%"
              maxWidth="100%"
              mt="1rem"
              sx={{
                display: {
                  md: "grid",
                  sm: "none",
                  xs: "none",
                  xxs: "none",
                },
              }}
            >
              {HeaderMidMenu()}
            </Stack>
          )}

          <Grid
            container
            columnSpacing={{ lg: 6, md: 6, sm: 4, xs: 4, xxs: 2 }}
            alignItems="center"
          >
            <Grid item lg={1.5} md={2.5} sm={4} xs={5} xxs={8}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={0}
                py={{
                  md: 0,
                  sm: locale != "default" ? 2 : 0,
                  xs: locale != "default" ? 2 : 0,
                  xxs: locale != "default" ? 2 : 0,
                }}
                height="100%"
              >
                <Box
                  sx={{
                    display: {
                      lg: "none",
                      md: "none",
                      sm: pathname === "/" ? "none" : "block",
                      xs: pathname === "/" ? "none" : "block",
                      xxs: pathname === "/" ? "none" : "block",
                    },
                  }}
                >
                  <IconButton
                    onClick={() => back()}
                    sx={{
                      // pl: 0,
                      display: {
                        md: "none",
                        sm: pathname === "/" ? "none" : "flex",
                        xs: pathname === "/" ? "none" : "flex",
                        xxs: pathname === "/" ? "none" : "flex",
                      },
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    size="small"
                  >
                    <ArrowBackIcon
                      sx={(theme) => ({
                        ...(theme.direction == "rtl" && {
                          transform: "rotate(180deg)",
                        }),
                        color: (theme) => theme.palette.common.black,
                      })}
                    />
                  </IconButton>
                </Box>
                {locale !== "default" && (
                  <Box component="div">
                    <IconButton
                      onClick={handleOpenClose}
                      aria-label="open drawer"
                      sx={{
                        // pl: 0,
                        display: {
                          md: "none",
                          sm: "flex",
                          xs: "flex",
                          xxs: "flex",
                        },
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        mr:2
                      }}
                    >
                      <Menu
                        sx={{ color: (theme) => theme.palette.common.black }}
                      />
                    </IconButton>
                  </Box>
                )}
                <Box
                  display={{
                    lg: "block",
                    md: "block",
                    sm: "block",
                    xs: pathname === "/" ? "block" : "none",
                    xxs: pathname === "/" ? "block" : "none",
                  }}
                >
                  {/* <SedarLogoImage /> */}
                  <Link
                    href={locale} 
                    passHref 
                  >
                    <Box
                      component="img"
                      src={
                        locale.split("-")?.[1] === "ar"
                          ? `${process.env.NEXT_PUBLIC_URL}assets/header/logo-ar.avif`
                          : `${process.env.NEXT_PUBLIC_URL}assets/header/logo.avif`
                      }
                      alt={layout?.HEADER?.LOGO?.[0]?.image_path || "Logo"}
                      sx={{
                        width: {
                          lg: "121px!important",
                          md: "121px!important",
                          sm: "96px!important",
                          xs: "96px!important",
                          xxs: "96px!important",
                        },
                        height: {
                          lg: "55px!important",
                          md: "55px!important",
                          sm: "43px!important",
                          xs: "43px!important",
                          xxs: "43px!important",
                        },
                        maxWidth: "300px",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                    />
                  </Link>


                </Box>
                {locale != "default" && (
                  <Box
                    display={{
                      lg: "none",
                      md: "none",
                      sm: "none",
                      xs: pathname === "/" ? "none" : "block",
                      xxs: pathname === "/" ? "none" : "block",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="typography15"
                      sx={(theme) => ({
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: theme.palette.common.black,
                        fontFamily: theme.fontFaces.helveticaNeue,
                        lineHeight: 4,
                      })}
                    >
                      {layout?.SEO && layout?.SEO?.SEO_PAGE_DESC}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>
            <Grid item lg={10.5} md={9.5} sm={8} xs={7} xxs={4}>
              {locale != "default" && (
                <Stack
                  spacing={2}
                  width="100%"
                  maxWidth="100%"
                  mt="0.5rem"
                  sx={{
                    display: {
                      md: "grid",
                      sm: "none",
                      xs: "none",
                      xxs: "none",
                    },
                  }}
                >
                  {/* {HeaderMidMenu} */}
                  <SearchBox />
                  {locale != "default" && HeaderCategoryMenu()}
                </Stack>
              )}

              {locale != "default" && (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  ml="auto"
                  pr={2}
                  height="100%"
                  width="100%"
                  justifyContent="end"
                  display={{
                    md: "none",
                    sm: "flex",
                    xs: "flex",
                    xxs: "flex",
                  }}
                  position="relative"
                >
                  <Box sx={{ width: "20px" }}>
                    <Search
                      sx={(theme) => ({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transform: theme.direction === "rtl" && "scaleX(-1)",
                      })}
                      onClick={() => setOpenDialog(true)}
                      svgColor="rgba(44, 44, 44, 0.83)"
                    />
                  </Box>
                  <Box sx={{ width: "20px" }}>
                    <Link
                      href={
                        layout?.HEADER?.TOPBAR?.[1]?.CHILD?.[0]?.link_url || ""
                      }
                    >
                      <NextLazyLoadImage
                        src={
                          layout?.HEADER?.TOPBAR?.[1]?.CHILD?.[0]?.image_path
                        }
                        width={100}
                        height={55}
                        sx={{
                          width: "100%!important",
                          objectFit: "contain",
                          ml:1
                        }}
                        objectFit="contain"
                        alt={layout?.HEADER?.LOGO?.[0]?.image_path || "Logo"}
                        upLgWidth={50}
                        downLgWidth={50}
                        downMdWidth={50}
                        downSmWidth={50}
                        downXsWidth={50}
                      />
                    </Link>
                  </Box>
                </Stack>
              )}
            </Grid>
          </Grid>
        </LocaleMuiContainer>
      </MUIAppbar>
      {!isDownMd && (
        <Box
          component="div"
          sx={{
            position: "relative",
            mt: 0,
            display: { md: "block", sm: "none", xs: "none", xxs: "none" },
          }}
          onMouseOver={handleOpen}
          onMouseLeave={handleClose}
        >
          {Boolean(anchorEl) && (
            <MegaMenuPopover
              handleOpen={handleOpen}
              handleClose={handleClose}
              anchorEl={anchorEl}
              categoryData={categoryData}
            />
          )}
        </Box>
      )}
      {loginPopupOpen && (
        <AuthDialog open={loginPopupOpen} handleClose={handleLoginClose} />
      )}
      {isDownMd && openDialog && (
        <SearchDialogBox open={openDialog} handleClose={handleCloseDialog} />
      )}
      {!isDownMd && cartPopupOpen && (
        <CartPopup open={cartPopupOpen} handleClose={handleCartPopup} />
      )}
    </>
  );
};

export default React.memo(WebHeader);
