import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import { NextImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import { DrawerHeader } from "@/styles/layouts";
import { languageChange } from "@/utils/constant";
import Close from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LoginMenu from "../header/loginMenu";


const DrawerBox = ({ open, handleClose, layout }) => {
  const { t: translate } = useTranslation();
  const { state, setLoginPopupOpen, logout } = useAuthContext();
  const { cookies } = state;
  const {
    user,
    JWTAuthToken,
    countryName,
    langName,
    currentLang,
    languageDropDown,
  } = cookies || {};
  console.log(languageDropDown,'languageDropDown');
  const { push, asPath, locale } = useRouter();
  const [expanded, setExpanded] = useState("panel1");
  const [countryCollapse, setCountryCollapse] = useState(true);
  const [openPopover, setOpenPopover] = useState(true);
  const [languageCollapse, setLanguageCollapse] = useState(true);
  const [loginTitle, setLoginTitle] = useState(translate("LoginAndSignUp"));

  const onChangeLang = (newlang) => {
    push(asPath, asPath, { locale: newlang });
  };

  const handleCountryOpenClose = () => {
    setCountryCollapse(!countryCollapse);
  };

  const handleLanguageOpenClose = () => {
    setLanguageCollapse(!languageCollapse);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLoginOpen = () => {
    setLoginPopupOpen(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (newLang) => {
    onChangeLang(newLang);
    handleClosePopover();
  };
  React.useEffect(() => {
    if (JWTAuthToken && user && user?.cust_cr_uid == "GUEST-USER") {
      setLoginTitle(translate("Hi_Guest"));
    } else if (JWTAuthToken && user && user?.cust_cr_uid != "GUEST-USER") {
      setLoginTitle(`${user?.cust_first_name} ${user?.cust_last_name}`);
    } else {
      setLoginTitle(translate("LoginAndSignUp"));
    }
  }, [cookies, locale]);

  return (
    <>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            background: (theme) => theme.palette.grey[1900],
            pb: "0.5rem",
          },
          zIndex: "2247483648!important",
        }}
        anchor="left"
        open={open}
        onClose={handleClose}
      >
        <Box>
          <DrawerHeader>
            <Stack direction="row" alignItems="center" spacing={2} m={2} mt={4}>
              {layout &&
                layout?.HEADER?.MIDMENU?.length > 0 &&
                layout?.HEADER?.MIDMENU[4]?.CHILD?.length > 0 && (
                  <React.Fragment>
                    <Iconify
                      icon="lucide:user-round"
                      sx={{
                        width: 20,
                        height: 20,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    />
                    <LoginMenu
                      title={loginTitle}
                      handleLoginOpen={handleLoginOpen}
                      handleClose={handleClose}
                      isUser={user && user?.cust_first_name}
                    />
                  </React.Fragment>
                )}
            </Stack>
            <IconButton
              size="small"
              onClick={handleClose}
              aria-label="close drawer"
            >
              <Close fontSize="small" color="dark" />
            </IconButton>
          </DrawerHeader>
          <Box>
            <Stack spacing={2}>
              <Box>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  sx={{
                    backgroundColor: "common.white",
                    "& .MuiAccordionSummary-root": {
                      padding: "10px 20px",
                    },
                    "&.MuiAccordion-root.Mui-expanded": {
                      borderRadius: "0px",
                    },
                    "&.MuiAccordion-root:last-of-type": {
                      borderRadius: "0px",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      expanded === "panel1" ? (
                        <ExpandLess />
                      ) : (
                        <NavigateNext
                          sx={{
                            ...(langName == "ar" && {
                              transform: "rotate(180deg)",
                            }),
                          }}
                        />
                      )
                    }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      component="p"
                      variant="h6"
                      fontWeight={500}
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    >
                      {translate("Products")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, py: 0 }}>
                    {layout?.HEADER?.CATEGORIES &&
                      layout?.HEADER?.CATEGORIES?.length > 0 &&
                      layout?.HEADER?.CATEGORIES.map((item, index) => {
                        if (item?.CHILD && item?.CHILD?.length > 0) {
                          return (
                            <Box
                              component="div"
                              key={`ACCORDIAN-DRAWER-CATEGORIES-${index}`}
                            >
                              <CustomLink lang={locale} link={item?.link_url}>
                                <ListItemText
                                  onClick={handleClose}
                                  sx={{
                                    padding: "10px 20px",
                                  }}
                                  primary={
                                    <Typography
                                      component="p"
                                      variant="h6"
                                      color="common.black"
                                      fontWeight={500}
                                      fontFamily={(theme) =>
                                        theme.fontFaces.helveticaNeue
                                      }
                                    >
                                      {item?.content}
                                    </Typography>
                                  }
                                />
                              </CustomLink>
                              <Divider />
                            </Box>
                          );
                        }
                      })}
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Card sx={{ borderRadius: "0px" }}>
                {layout?.HEADER?.CATEGORIES &&
                  layout?.HEADER?.CATEGORIES?.length > 0 &&
                  layout?.HEADER?.CATEGORIES.map((item, index) => {
                    if (!item?.CHILD) {
                      return (
                        <Box
                          component="div"
                          key={`ACCORDIANCHILD-DRAWER-CATEGORIES-${index}`}
                        >
                          <CustomLink lang={locale} link={item?.link_url}>
                            <Typography
                              component="p"
                              variant="h6"
                              color="common.black"
                              fontWeight={500}
                              padding="10px 20px"
                              fontFamily={(theme) =>
                                theme.fontFaces.helveticaNeue
                              }
                            >
                              {item?.content}
                            </Typography>
                          </CustomLink>
                          <Divider />
                        </Box>
                      );
                    }
                  })}
              </Card>
              {user && user?.cust_cr_uid !== "GUEST-USER" && (
                <Card sx={{ borderRadius: "0px" }}>
                  <Typography
                    component="p"
                    variant="h6"
                    color="common.black"
                    fontWeight={500}
                    padding="10px 20px"
                    onClick={() => push("/dashboard/profile/")}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {translate("MyAccount")}
                  </Typography>
                  <Divider />
                  <Typography
                    component="p"
                    variant="h6"
                    color="common.black"
                    fontWeight={500}
                    padding="10px 20px"
                    onClick={() => push("/dashboard/orders/")}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {translate("MyOrder")}
                  </Typography>
                  <Divider />
                  <Typography
                    component="p"
                    variant="h6"
                    color="common.black"
                    fontWeight={500}
                    padding="10px 20px"
                    onClick={() => push("/cartPage/")}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {translate("MyCart")}
                  </Typography>
                  <Divider />
                  <Typography
                    component="p"
                    variant="h6"
                    color="common.black"
                    fontWeight={500}
                    padding="10px 20px"
                    onClick={() => push("/dashboard/wishlist/")}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {translate("MyWishlist")}
                  </Typography>
                </Card>
              )}

              <Card sx={{ borderRadius: "0px" }}>
                <CustomLink lang={locale} link="/about">
                  <Typography
                    component="p"
                    variant="h6"
                    color="common.black"
                    fontWeight={500}
                    padding="10px 20px"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {translate("AboutUs")}
                  </Typography>
                </CustomLink>
                <Divider />
                <CustomLink lang={locale} link="/contact">
                  <Typography
                    component="p"
                    variant="h6"
                    color="common.black"
                    fontWeight={500}
                    padding="10px 20px"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {translate("ContactUs")}
                  </Typography>
                </CustomLink>
                <Divider />
              </Card>
              <Card sx={{ borderRadius: "0px" }}>
                <Box mb={countryCollapse ? 2 : 0.5}>
                  <ListItemButton

                    sx={{
                      "&.MuiListItemButton-root": {
                        padding: "10px 20px",
                        mt: 1,
                      },
                    }}
                    onClick={handleCountryOpenClose}
                  >
                    <ListItemText
                  
                      primary={
                        <Typography
                          component="p"
                          variant="h6"
                          color="common.black"
                          fontWeight={500}
                          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                        >
                          {translate("CountryIn")}
                        </Typography>
                      }
                    />
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <NextImage
                        src={currentLang?.icon}
                        alt={currentLang?.label}
                        sx={{
                          width: "20px!important",
                          height: "20px!important",
                          borderRadius: "50%",
                          objectPosition: "1%",
                        }}
                      />
                      <Typography
                        component="p"
                        variant="typography15"
                        color="common.black"
                        fontWeight={500}
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                      >
                        {currentLang?.label}
                      </Typography>
                      {countryCollapse ? (
                        <ExpandMoreIcon />
                      ) : (
                        <NavigateNext
                          sx={{
                            direction: "ltr",
                            ...(langName == "ar" && {
                              transform: "rotate(180deg)",
                            }),
                          }}
                        />
                      )}
                    </Stack>
                  </ListItemButton>
                  <Divider sx={{ mt: 1 }} />
                </Box>
                <Collapse in={countryCollapse}>
                  {languageDropDown &&
                    languageDropDown?.length > 0 &&
                    languageDropDown.map((item, index) => {
                      return (
                        <Box key={`COUNTRY-KEYS--COLLAPSE-${index}`}>
                          <ListItemButton
                            sx={{
                              "&.MuiListItemButton-root": {
                                padding: "10px 20px",
                                mb: 0.5,
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                  sx={{}}
                                  onClick={() => {
                                    handleChangeLang(item?.value);
                                    handleClose();
                                  }}
                                >
                                  <NextImage
                                    src={item?.icon}
                                    alt={item?.label}
                                    sx={{
                                      width: "20px!important",
                                      height: "20px!important",
                                      borderRadius: "50%",
                                      objectPosition: "1%",
                                    }}
                                  />
                                  <Typography
                                    component="p"
                                    variant="typography15"
                                    color="common.black"
                                    fontWeight={500}
                                    onClick={() => {
                                      handleChangeLang(item?.value);
                                      handleClose();
                                    }}
                                    fontFamily={(theme) =>
                                      theme.fontFaces.helveticaNeueMedium
                                    }
                                  >
                                    {item?.label}
                                  </Typography>
                                </Stack>
                              }
                            />
                          </ListItemButton>
                        </Box>
                      );
                    })}
                </Collapse>
                <Divider />
                <ListItemButton
                  sx={{
                    "&.MuiListItemButton-root": {
                      padding: "10px 20px",
                      mt: 1,
                    },
                  }}
                  onClick={handleLanguageOpenClose}
                >
                  <ListItemText
                    primary={
                      <Typography
                        component="p"
                        variant="h6"
                        color="common.black"
                        fontWeight={500}
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      >
                        {translate("Languages")}
                      </Typography>
                    }
                  />
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography
                      variant="typography15"
                      color="common.black"
                      fontWeight={500}
                      component="p"
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                    >
                      {
                        languageChange.find((item) => item.value == langName)
                          ?.label
                      }
                    </Typography>
                    {languageCollapse ? (
                      <ExpandMoreIcon />
                    ) : (
                      <NavigateNext
                        sx={{
                          direction: "ltr",
                          ...(langName == "ar" && {
                            transform: "rotate(180deg)",
                          }),
                        }}
                      />
                    )}
                  </Stack>
                </ListItemButton>
                <Collapse in={languageCollapse}>
                  {languageChange?.length > 0 &&
                    languageChange.map((option, index) => {
                      return (
                        <ListItemButton
                          key={`languageChange-${index + 1}`}
                          sx={{
                            "&.MuiListItemButton-root": {
                              padding: "10px 20px",
                              textDecoration: "none",
                            },
                          }}
                          onClick={() => {
                            handleClose();
                            onChangeLang(`${countryName}-${option?.value}`);
                          }}
                          component={NextLink}
                          href={`${asPath}`}
                          locale={`${countryName}-${option?.value}`}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                variant="typography15"
                                color="common.black"
                                fontWeight={400}
                                fontFamily={(theme) =>
                                  option.type == "ar"
                                    ? theme.fontFaces.helveticaNeueArabic
                                    : theme.fontFaces.helveticaNeue
                                }
                              >
                                {option?.label}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      );
                    })}
                </Collapse>
              </Card>
              {user && (
                <Card sx={{ borderRadius: "0px" }}>
                  <Box
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      logout();
                      push("/");
                      handleClose();
                    }}
                  >
                    <Typography
                      component="p"
                      variant="h6"
                      color="common.black"
                      fontWeight={500}
                      padding="10px 20px"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    >
                      {translate("LogOut")}
                    </Typography>
                  </Box>
                </Card>
              )}
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerBox;
