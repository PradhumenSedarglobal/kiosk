import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import CartPopupSkeleton from "@/components/skeleton/layout/cartPopup";
import useCartContext from "@/provider/cart/cartContext";
import { Close } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import FloatPrice from "../product/floatPrice";

const CartList = ({ handleClose }) => {
  const { t: translate } = useTranslation();
  const { cartState } = useCartContext();
  const { isCartLoading, cartPopupData } = cartState;
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, modificationUser } = cookies || {};
  const router = useRouter();
  const { query, locale } = router;
  const { head_sys_id } = query;
  return (
    <>
      <Toolbar
        sx={{
          minHeight: {
            lg: "160px!important",
            md: "160px!important",
            sm: "106px!important",
          },
        }}
      />

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Card
          sx={(theme) => ({
            borderRadius: "0px!important",
            boxShadow: theme.shadows[25],
            zIndex: 2200,
            width: "100%",
            maxWidth: "430px",
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent>
            <Stack spacing={3} mt={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={3}
                  width="100%"
                >
                  <NextLazyLoadImage
                    src="/assets/cartPage/popup-right-tick.png"
                    alt="right Click"
                    width={29}
                    height={29}
                    sx={{
                      width: "8%!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={29}
                    downLgWidth={29}
                    downMdWidth={29}
                    downSmWidth={29}
                    downXsWidth={29}
                  />
                  <Typography
                    component="p"
                    sx={(theme) => ({
                      fontWeight: 600,
                      fontSize: theme.typography.typography18,
                      color: theme.palette.primary.main,
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                    })}
                  >
                    {translate("AddedtoYourCart")}
                  </Typography>
                </Stack>
                <IconButton size="small" onClick={handleClose}>
                  <Close fontSize="small" />
                </IconButton>
              </Stack>
              <Divider />
              <Box
                sx={{
                  height: "100%",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },

                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  maxHeight: "200px",
                  overflowY: "scroll",
                }}
              >
                {isCartLoading ? (
                  <Stack spacing={2}>
                    <CartPopupSkeleton />
                    <CartPopupSkeleton />
                  </Stack>
                ) : (
                  cartPopupData &&
                  cartPopupData?.complete &&
                  cartPopupData?.complete?.length > 0 &&
                  cartPopupData?.complete.map((item, index) => {
                    return (
                      <Box key={`CARTPAGE-DATA-${index}`} mb={2}>
                        <Stack
                          direction="row"
                          spacing={3}
                          alignItems="center"
                          bgcolor={
                            item?.SOL_ITEM_LABEL == "SAMPLE"
                              ? (theme) => theme.palette.grey[3600]
                              : "inherit"
                          }
                        >
                          <Box width={"100px"}>
                            <NextLazyFillImage
                              src={item?.SOL_IMAGE_PATH}
                              alt={item?.SFP_TITLE}
                              width={100}
                              height={100}
                              sx={{
                                width: "100%!important",
                                height: "100%!important",
                                objectFit: "cover!important",
                              }}
                              aspectRatio={1 / 1}
                              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                              objectFit="contain"
                              upLgWidth={100}
                              downLgWidth={100}
                              downMdWidth={100}
                              downSmWidth={100}
                              downXsWidth={100}
                            />
                          </Box>
                          <Box>
                            {item?.SPI_CATEGORY != "smart-home" ? (
                              <Box>
                                <Typography
                                  component="span"
                                  sx={(theme) => ({
                                    color: theme.palette.grey[4900],
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    fontSize: 14,
                                  })}
                                >
                                  {translate("ItemCode")} :
                                </Typography>
                                <Typography
                                  component="span"
                                  sx={(theme) => ({
                                    color: theme.palette.grey[4900],
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    fontSize: 12,
                                    fontWeight: 500,
                                    ml: 1,
                                  })}
                                >
                                  {item?.brand_info?.SII_ITEM_ID}
                                </Typography>
                              </Box>
                            ) : (
                              ""
                            )}

                            <Box>
                              <Typography
                                sx={(theme) => ({
                                  color: theme.palette.common.black,
                                  fontFamily: theme.fontFaces.helveticaNeueBold,
                                  fontSize: 16,
                                  fontWeight: 600,
                                })}
                              >
                                {item?.SFP_TITLE}
                              </Typography>
                            </Box>
                            {item?.SOL_ITEM_LABEL != "SAMPLE" && (
                              <>
                                <Box>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      color: theme.palette.grey[4900],
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      fontSize: 14,
                                      fontWeight: 500,
                                    })}
                                  >
                                    {translate("QTY")} :
                                  </Typography>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      color: theme.palette.grey[4900],
                                      fontFamily: theme.fontFaces.helveticaNeue,
                                      fontSize: 12,
                                    })}
                                  >
                                    {" "}
                                    {item?.SOL_QTY}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      color: theme.palette.grey[4900],
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      fontSize: 14,
                                    })}
                                  >
                                    {translate("Value")} :
                                  </Typography>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      color: theme.palette.grey[900],
                                      fontFamily: theme.fontFaces.helveticaNeue,
                                      fontSize: 12,
                                      ml: 1,
                                    })}
                                  >
                                    {translate(item?.SOL_CCY_CODE)}{" "}
                                    <FloatPrice price={item?.SOL_VALUE} />
                                  </Typography>
                                </Box>
                              </>
                            )}
                            {item?.SOL_ITEM_LABEL == "SAMPLE" && (
                              <Box>
                                <Typography
                                  component="span"
                                  sx={(theme) => ({
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    fontSize: 14,
                                    color: (theme) => theme.palette.purple.main,
                                  })}
                                >
                                  {translate("free_sample")}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Stack>
                      </Box>
                    );
                  })
                )}
              </Box>

              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  position: "sticky",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 0,
                }}
              >
                <Button
                  sx={(theme) => ({
                    textWrap: "nowrap",
                    "&.MuiButton-root": {
                      ...theme.typography.typography15,
                      fontFamily: `${theme.fontFaces.helveticaNeueBold}!important`,
                      borderRadius: "0px",
                    },
                  })}
                  fullWidth
                  variant="outlined"
                  color="dark"
                  size="large"
                  onClick={() => handleClose()}
                >
                  {translate("ContinueShopping")}
                </Button>
                <Button
                  sx={(theme) => ({
                    "&.MuiButton-root": {
                      ...theme.typography.typography15,
                      fontFamily: `${theme.fontFaces.helveticaNeueBold}!important`,
                      color: theme.palette.common.white,
                      borderRadius: "0px",
                    },
                  })}
                  fullWidth
                  variant="contained"
                  color="dark"
                  size="large"
                  onClick={() =>
                    router.push(
                      user?.cust_type == "ADMIN"
                        ? `/${locale}/modification?head_sys_id=${modificationUser?.head_sys_id || 0
                        }`
                        : `/${locale}/cartPage`
                    )
                  }
                >
                  {translate("ViewCart")}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

export default CartList;
