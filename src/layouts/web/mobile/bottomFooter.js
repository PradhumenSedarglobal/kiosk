import CartIcon from "@/assets/header/cart";
import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import useCartContext from "@/provider/cart/cartContext";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";


const BottomFooter = ({ layout }) => {
  const { t: translate } = useTranslation();
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};
  const isRu =
    locale != "default" &&
      locale.split("-")?.[1] &&
      locale.split("-")?.[1] === "ru"
      ? true
      : false;
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        top: "auto",
        bottom: 0,
        pt: 1,
        display: { md: "none", sm: "flex", xs: "flex", xxs: "flex" },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", px: 0 }}>
          <CustomLink link="/" locale={locale}>
            <Stack alignItems="center">
              <Box
                sx={{
                  overflow: "hidden",
                  width: "22px!important",
                  height: "22px!important",
                  aspectRatio: "1 / 1",
                }}
              >
                <NextLazyLoadImage
                  src="/assets/footer/home.svg"
                  alt="home"
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="cover"
                  width={30}
                  height={30}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "cover",
                    backgroundSize: "cover",
                    aspectRatio: "1 / 1",
                  }}
                />
              </Box>
              <Typography
                component="p"
                variant="typography13"
                color="common.black"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                width="min-content"
                sx={(theme) => ({
                  lineHeight: isRu || theme.direction == "rtl" ? "15px" : "",
                })}
              >
                {translate("home")}
              </Typography>
            </Stack>
          </CustomLink>
          {locale != "global-en" ? (
            <CustomLink
              link={layout?.HEADER?.MIDMENU?.[1]?.link_url}
              locale={locale}
            >
              <Stack alignItems="center">
                <Box
                  sx={{
                    overflow: "hidden",
                    width: "30px!important",
                    height: "25px!important",
                    aspectRatio: "1 / 1",
                  }}
                >
                  <NextLazyLoadImage
                    src="/assets/footer/consultation.svg"
                    alt="home"
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                    objectFit="cover"
                    width={30}
                    height={30}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "cover",
                      backgroundSize: "cover",
                      aspectRatio: "1 / 1",
                    }}
                  />
                </Box>
                <Typography
                  component="p"
                  variant="typography13"
                  color="common.black"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                >
                  {translate("Consultation")}
                </Typography>
              </Stack>
            </CustomLink>
          ) : (
            <CustomLink
              link={layout?.HEADER?.TOPBAR?.[1]?.CHILD[3]?.link_url}
              locale={locale}
            >
              <Stack alignItems="center">
                <Box
                  sx={{
                    overflow: "hidden",
                    width: "22px!important",
                    height: "22px!important",
                    aspectRatio: "1 / 1",
                  }}
                >
                  <NextLazyLoadImage
                    src="/assets/footer/contact.svg"
                    alt="home"
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                    objectFit="contain"
                    width={30}
                    height={30}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "contain",
                      backgroundSize: "contain",
                      aspectRatio: "1 / 1",
                    }}
                  />
                </Box>

                <Typography
                  component="p"
                  variant="typography13"
                  color="common.black"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                >
                  {translate("Contact")}
                </Typography>
              </Stack>
            </CustomLink>
          )}
          <CustomLink
            link={layout?.HEADER?.TOPBAR?.[1]?.CHILD[3]?.link_url}
            locale={locale}
          >
            <Stack alignItems="center">
              <Box
                sx={{
                  overflow: "hidden",
                  width: "24px!important",
                  height: "22px!important",
                  aspectRatio: "1 / 1",
                }}
              >
                <NextLazyLoadImage
                  src="/assets/footer/store.svg"
                  alt="home"
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                  width={30}
                  height={30}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    aspectRatio: "1 / 1",
                  }}
                />
              </Box>
              <Typography
                component="p"
                variant="typography13"
                color="common.black"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {translate("Store")}
              </Typography>
            </Stack>
          </CustomLink>
          <CustomLink link="/contracts" locale={locale}>
            <Stack alignItems="center">
              <Box
                sx={{
                  overflow: "hidden",
                  width: "24px!important",
                  height: "22px!important",
                  aspectRatio: "1 / 1",
                }}
              >
                <NextLazyLoadImage
                  src="/assets/footer/project.svg"
                  alt="home"
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                  width={30}
                  height={30}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    aspectRatio: "1 / 1",
                  }}
                />
              </Box>
              <Typography
                component="p"
                variant="typography13"
                color="common.black"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {translate("projects")}
              </Typography>
            </Stack>
          </CustomLink>
          <CustomLink link="/cartPage" locale={locale}>
            <Stack
              alignItems="center"
              sx={{ lineHeight: isRu ? "6px" : "1px" }}
            >
              {layout?.HEADER?.MIDMENU &&
                layout?.HEADER?.MIDMENU?.length > 3 &&
                layout?.HEADER?.MIDMENU?.[4]?.CHILD[2]?.content && (
                  <Badge
                    badgeContent={
                      cart?.cart_count?.QTY ? cart?.cart_count?.QTY : "0"
                    }
                    color="primary"
                    className="Begin_Checkout_Button_Mobile"
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
              <Typography
                component="p"
                variant="typography13"
                color="common.black"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                noWrap
              >
                {layout?.HEADER?.MIDMENU &&
                  layout?.HEADER?.MIDMENU?.length > 3 &&
                  layout?.HEADER?.MIDMENU[4]?.CHILD[2]?.content}
              </Typography>
            </Stack>
          </CustomLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BottomFooter;
