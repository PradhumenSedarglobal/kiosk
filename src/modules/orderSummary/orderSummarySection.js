import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import useCartContext from "@/provider/cart/cartContext";
import { getDeliveryPageData } from "@/redux/slices/delivery";
import { useDispatch } from "@/redux/store";
import { CartPageOrderSummaryTotal } from "@/styles/cartPage";
import { apiDataService } from "@/utils/apiDataService";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import FloatPrice from "../product/floatPrice";
import ModificationSummary from "./modificationSummary";


const OrderSummarySection = ({ isDelivery }) => {
  const router = useRouter();
  const { pathname } = router;
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const { getMyCartData, cartState } = useCartContext();
  const dispatch = useDispatch();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { modificationUser, user, CCYCODE } = cookies || {};
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;

  const { cart, isCartLoading, shipping_price } = cartState;

  let ShippingPrice =
    cart?.header_info && cart?.header_info?.SOH_SHIP_VALUE
      ? cart?.header_info?.SOH_SHIP_VALUE
      : 0;

  let SOH_PROMO_VALUE =
    cart?.header_info && cart?.header_info?.SOH_PROMO_VALUE > 0
      ? cart?.header_info?.SOH_PROMO_VALUE
      : 0;

  let oldCartValue =
    cart?.header_info && cart?.header_info?.SOH_NET_VALUE_OLD > 0
      ? cart?.header_info?.SOH_NET_VALUE_OLD
      : 0;

  let totalPriceValue = cart?.total_price?.SOL_VALUE
    ? Number(cart?.total_price?.SOL_VALUE) +
    Number(ShippingPrice) -
    (Number(SOH_PROMO_VALUE) + Number(oldCartValue))
    : 0 + Number(ShippingPrice);

  const [open, setOpen] = React.useState({
    data: "",
    open: false,
  });

  const handleClickOpen = (data) => {
    setOpen({ data: data, open: true });
  };

  const handleClose = () => {
    setOpen({ data: "", open: false });
  };
  const orderDelete = async (data) => {
    await dispatch(apiDataService.Delete(`v2/cart/${data?.SOL_SYS_ID}`))
      .then((response) => {
        if (response?.status === 200) {
          enqueueSnackbar(response?.data?.error_message) ||
            `${translate("Success")}`;
          handleClose();
          getMyCartData({
            params: { soh_sys_id: head_sys_id || 0 },
          });
          if (isDelivery) {
            dispatch(getDeliveryPageData());
          }
        }
      })
      .catch((error) => {
        console.log(`${translate("SomethingWentWrong")}`, error);
      });
  };

  React.useEffect(() => {
    if (
      ((!isCartLoading && Number(cart?.cart_count?.QTY) <= 0) ||
        cart?.cart_count?.QTY == null) &&
      pathname != "/cart/shippingAddress"
    ) {
      router.push(
        user?.cust_type == "ADMIN"
          ? `/modification?head_sys_id=${cart?.header_info && cart?.header_info?.SOH_SYS_ID
            ? cart?.header_info?.SOH_SYS_ID
            : 0
          }`
          : "/cartPage"
      );
    }
  }, [cart?.cart_count?.QTY, isCartLoading]);

  return (
    <>
      <Divider
        sx={{
          display: {
            lg: "none",
            md: "none",
            sm: "none",
            xs: "block",
            xxs: "block",
          },
        }}
        color="lightgray"
      />
      <Container maxWidth="xl">
        <Box mt={{ lg: 15, md: 15, sm: 2, xs: 2, xxs: 2 }} mb={7}>
          <Box
            sx={{
              position: "sticky",
              top: 0,
              background: (theme) => theme.palette.common.white,
              py: 2,
            }}
          >
            <Typography
              sx={(theme) => ({
                lineHeight: "25px",
                fontWeight: 400,
                ...theme.typography.typography21,
                fontFamily: theme.fontFaces.helveticaNeueBold,
                color: theme.palette.common.black,
              })}
            >
              {translate("OrderSummary")}
            </Typography>
          </Box>

          {cart &&
            cart?.complete &&
            cart?.complete?.length > 0 &&
            cart?.complete.map((item, index) => (
              <Box key={`ORDER-SUMMARY-${index}`} my={2}>
                <Box
                  sx={{
                    textAlign: "end",
                    mb: 1,
                  }}
                >
                  <Close
                    sx={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => handleClickOpen(item)}
                  />
                </Box>
                <Grid container columnSpacing={2}>
                  <Grid
                    item
                    lg={1}
                    md={1}
                    sm={1}
                    xs={1}
                    xxs={1}
                    alignContent="center"
                  >
                    <Typography
                      sx={(theme) => ({
                        ...theme.typography.typography17,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                      })}
                      ml={1}
                    >
                      {index + 1}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={2.3}
                    md={2.3}
                    sm={2.3}
                    xs={3}
                    xxs={3}
                    alignContent="center"
                  >
                    <Box width={"100%"}>
                      <NextLazyLoadImage
                        src={item?.SOL_IMAGE_PATH}
                        alt={item?.SFP_TITLE}
                        width={79}
                        height={79}
                        sx={{
                          // maxWidth:"60%",
                          width: {
                            lg: "80%!important",
                            md: "80%!important",
                            sm: "80%!important",
                            xs: "45%!important",
                            xxs: "45%!important",
                          },
                          height: "100%!important",
                          objectFit: "cover!important",
                        }}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                        objectFit="contain"
                        upLgWidth={79}
                        downLgWidth={79}
                        downMdWidth={79}
                        downSmWidth={79}
                        downXsWidth={79}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={8.7} md={8.7} sm={8.7} xs={8} xxs={8}>
                    <Stack
                      direction="row"
                      alignItems="start"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography
                          sx={(theme) => ({
                            fontWeight: 300,
                            lineHeight: "18px",
                            fontSize: "15px",
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                            color: "common.black",
                          })}
                          mb={1}
                        >
                          {item?.brand_info?.SII_BR_DESC} :
                          <Typography
                            component="span"
                            sx={(theme) => ({
                              fontWeight: 400,
                              lineHeight: "15px",
                              ...theme.typography.typography13,
                              fontFamily: theme.fontFaces.helveticaNeueBold,
                              color: theme.palette.grey[2200],
                            })}
                          >
                            {" "}
                            {item?.brand_info?.SII_ITEM_ID}
                          </Typography>
                        </Typography>
                        <Typography
                          sx={(theme) => ({
                            fontWeight: 400,
                            fontSize: "15px",
                            lineHeight: "16px",
                            color: "common.black",
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                          })}
                        >
                          {item?.SFP_TITLE}
                        </Typography>
                        {item.SOL_ITEM_LABEL == "SAMPLE" ? (
                          <Typography
                            sx={(theme) => ({
                              ...theme.typography.typography16,
                              fontFamily: theme.fontFaces.helveticaNeue,
                              color: theme.palette.purple.main,
                            })}
                          >
                            {translate("free_sample")}
                          </Typography>
                        ) : (
                          ""
                        )}
                        {item.SFI_STATUS == "ONDEMAND" ? (
                          <Typography
                            sx={(theme) => ({
                              ...theme.typography.typography16,
                              fontFamily: theme.fontFaces.helveticaNeue,
                              color: theme.palette.purple.main,
                            })}
                          >
                            {translate("ONDEMAND")}
                          </Typography>
                        ) : (
                          ""
                        )}
                        {item.SPI_INSTALLATION_PROVIDE_YN == "N" ? (
                          <Typography
                            sx={(theme) => ({
                              ...theme.typography.typography16,
                              fontFamily: theme.fontFaces.helveticaNeue,
                              color: theme.palette.error.main,
                            })}
                          >
                            {translate("delivery_only")}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Stack
                        direction={{
                          xxs: "column",
                          xs: "column",
                          sm: "column",
                          md: "row",
                          lg: "row",
                        }}
                        alignItems="end"
                        spacing={0.5}
                        ml={4}
                        mr={2}
                      >
                        <Typography
                          sx={(theme) => ({
                            fontSize: "12px",
                            lineHeight: "18px",
                            fontWeight: 400,
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                            color: "common.black",
                          })}
                          mt={1}
                        >
                          {translate(CCYCODE)}
                        </Typography>
                        <Typography
                          sx={(theme) => ({
                            fontSize: "12px",
                            lineHeight: "18px",
                            fontWeight: 400,
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                            color: "common.black",
                          })}
                        >
                          <FloatPrice price={item?.SOL_VALUE} />
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2 }} color="lightgrey" />
              </Box>
            ))}

          {cart &&
            cart?.free_sample &&
            cart?.free_sample?.length > 0 &&
            cart?.free_sample.map((item, index) => (
              <Box
                key={`ORDER-SUMMARY-${index}`}
                my={2}
                sx={(theme) => ({
                  backgroundColor: theme.palette.grey[3600],
                })}
              >
                <Box
                  sx={{
                    textAlign: "end",
                    m: 1,
                  }}
                >
                  <Close
                    sx={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => handleClickOpen(item)}
                  />
                </Box>
                <Grid container columnSpacing={2} mb={2}>
                  <Grid
                    item
                    lg={1}
                    md={1}
                    sm={1}
                    xs={1}
                    xxs={1}
                    alignContent="center"
                  >
                    <Typography
                      sx={(theme) => ({
                        ...theme.typography.typography18,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                      })}
                      ml={1}
                    >
                      {index + 1 + cart?.complete?.length}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={2.3}
                    md={2.3}
                    sm={2.3}
                    xs={3}
                    xxs={3}
                    alignContent="center"
                  >
                    <Box width={"100%"}>
                      <NextLazyLoadImage
                        src={item?.SOL_IMAGE_PATH}
                        alt={item?.SFP_TITLE}
                        width={79}
                        height={79}
                        sx={{
                          width: {
                            lg: "80%!important",
                            md: "80%!important",
                            sm: "80%!important",
                            xs: "45%!important",
                            xxs: "45%!important",
                          },
                          height: "100%!important",
                          objectFit: "cover!important",
                        }}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                        objectFit="contain"
                        upLgWidth={79}
                        downLgWidth={79}
                        downMdWidth={79}
                        downSmWidth={79}
                        downXsWidth={79}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={8.7} md={8.7} sm={8.7} xs={8} xxs={8}>
                    <Stack
                      direction="row"
                      alignItems="start"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography
                          sx={(theme) => ({
                            ...theme.typography.typography15,
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                            color: "common.black",
                          })}
                        >
                          {item?.brand_info?.SII_BR_DESC} :
                          <Typography
                            component="span"
                            sx={(theme) => ({
                              fontWeight: 300,
                              lineHeight: "15px",
                              ...theme.typography.typography13,
                              fontFamily: theme.fontFaces.helveticaNeueBold,
                              color: theme.palette.grey[2200],
                            })}
                          >
                            {" "}
                            {item?.brand_info?.SII_ITEM_ID}
                          </Typography>
                        </Typography>
                        <Typography
                          sx={(theme) => ({
                            ...theme.typography.typography15,
                            color: "common.black",
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                          })}
                        >
                          {item?.SFP_TITLE}
                        </Typography>
                        {item.SOL_ITEM_LABEL == "SAMPLE" ? (
                          <Typography
                            sx={(theme) => ({
                              ...theme.typography.typography16,
                              fontFamily: theme.fontFaces.helveticaNeueMedium,
                              color: theme.palette.purple.main,
                              fontWeight: 200,
                            })}
                          >
                            {translate("free_sample")}
                          </Typography>
                        ) : (
                          ""
                        )}
                        {item.SFI_STATUS == "ONDEMAND" ? (
                          <Typography
                            sx={(theme) => ({
                              ...theme.typography.typography18,
                              fontFamily: theme.fontFaces.helveticaNeueLight,
                              color: theme.palette.purple.main,
                            })}
                          >
                            {translate("ONDEMAND")}
                          </Typography>
                        ) : (
                          ""
                        )}
                        {item.SPI_INSTALLATION_PROVIDE_YN == "N" ? (
                          <Typography
                            sx={(theme) => ({
                              ...theme.typography.typography16,
                              fontFamily: theme.fontFaces.helveticaNeue,
                              color: theme.palette.error.main,
                            })}
                          >
                            {translate("delivery_only")}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Stack
                        direction={{
                          xxs: "column",
                          xs: "column",
                          sm: "column",
                          md: "row",
                          lg: "row",
                        }}
                        alignItems="end"
                        spacing={0.5}
                        ml={4}
                        mr={2}
                      >
                        <Typography
                          sx={(theme) => ({
                            ...theme.typography.typography12,
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                          })}
                        >
                          {translate(CCYCODE)}
                        </Typography>
                        <Typography
                          sx={(theme) => ({
                            ...theme.typography.typography12,
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                          })}
                        >
                          <FloatPrice price={item?.SOL_PRICE} />
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            ))}
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
            py={0}
          >
            <Grid item lg={6} md={6} sm={6} xs={6} xxs={6} mb={1.8} mt={2}>
              <Typography
                sx={(theme) => ({
                  ...theme.typography.typography45,
                  fontFamily: theme.fontFaces.helveticaNeue,
                  color: theme.palette.grey[5600],
                })}
              >
                {translate("Subtotal")}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} xxs={6} textAlign={"end"}>
              <CartPageOrderSummaryTotal>
                {translate(CCYCODE)}{" "}
                <FloatPrice price={cart?.total_price?.SOL_VALUE} />
              </CartPageOrderSummaryTotal>
            </Grid>
          </Grid>

          {[
            "/cart/delivery",
            "/cart/payment",
            "/modification/shipping",
            "/modification/delivery",
            "/modification/payment",
          ].indexOf(pathname) >= 0 ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={(theme) => ({
                  ...theme.typography.typography45,
                  fontFamily: theme.fontFaces.helveticaNeueRegular,
                  color: theme.palette.grey[5600],
                })}
              >
                {translate("EstShippingHandling")}
              </Typography>
              <CartPageOrderSummaryTotal
                sx={{ color: (theme) => theme.palette.primary.main }}
              >
                {!Number(shipping_price) ? (
                  `${translate("Free")}`
                ) : (
                  <>
                    {translate(CCYCODE)} <FloatPrice price={shipping_price} />
                  </>
                )}
              </CartPageOrderSummaryTotal>
            </Stack>
          ) : (
            ""
          )}
          {cart?.header_info?.SOH_PROMO_VALUE > 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography
                sx={(theme) => ({
                  ...theme.typography.typography18,
                  fontFamily: theme.fontFaces.helveticaNeueRegular,
                  color: theme.palette.grey[2300],
                })}
              >
                {translate("Promo_discount")}
              </Typography>
              <CartPageOrderSummaryTotal
                sx={{ color: (theme) => theme.palette.primary[100] }}
              >
                {" "}
                {translate(CCYCODE)}{" "}
                <FloatPrice price={cart?.header_info?.SOH_PROMO_VALUE} />
              </CartPageOrderSummaryTotal>
            </Stack>
          )}
          {cart?.header_info?.SOH_NET_VALUE_OLD &&
            cart.header_info.SOH_NET_VALUE_OLD > 0 ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography
                sx={(theme) => ({
                  ...theme.typography.typography18,
                  fontFamily: theme.fontFaces.helveticaNeueRegular,
                  color: theme.palette.grey[2300],
                })}
              >
                {translate("customer_Wallet")}
              </Typography>
              <CartPageOrderSummaryTotal
                sx={{ color: (theme) => theme.palette.primary[100] }}
              >
                {translate(CCYCODE)} {cart?.header_info?.SOH_NET_VALUE_OLD}
              </CartPageOrderSummaryTotal>
            </Stack>
          ) : (
            ""
          )}

          <Divider sx={{ mt: 3, bgcolor: "lightgrey" }} />
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
            pt={2}
            pb={1}
          >
            <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
              <CartPageOrderSummaryTotal>
                {translate("Total")}
              </CartPageOrderSummaryTotal>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} xxs={6} textAlign={"end"}>
              <CartPageOrderSummaryTotal>
                {translate(CCYCODE)} <FloatPrice price={totalPriceValue} />
              </CartPageOrderSummaryTotal>
            </Grid>
          </Grid>

          {[
            "/modification/shipping",
            "/modification/delivery",
            "/modification/payment",
          ].indexOf(pathname) >= 0 ? (
            <>
              <Typography
                mb={3}
                component={"h3"}
                variant="typography16"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                color={(theme) => theme.palette.grey[5600]}
              >
                {translate("CouponCodeorGiftCard")}
              </Typography>
              <ModificationSummary />
            </>
          ) : (
            ""
          )}
        </Box>
        <Dialog
          open={open.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={(theme) => ({
              fontWeight: 300,
              ...theme.typography.typography18,
              color: theme.palette.grey[6500],
              textAlign: "left",
              letterSpacing: 0.5,
            })}
          >
            {translate("Areyousureremove")}
          </DialogTitle>
          <DialogActions sx={{ justifyContent: "flex-start" }}>
            <Button
              variant="contained"
              color="dark"
              sx={(theme) => ({
                backgroundColor: theme.palette.grey.dark,
                fontWeight: 200,
              })}
              onClick={() => {
                orderDelete(open?.data);
              }}
            >
              {translate("Yes")}
            </Button>
            <Button
              variant="contained"
              color="dark"
              onClick={handleClose}
              sx={(theme) => ({
                backgroundColor: theme.palette.grey.dark,
                fontWeight: 200,
              })}
            >
              {translate("No")}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default OrderSummarySection;
