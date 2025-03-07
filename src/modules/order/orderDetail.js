import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import MoreDetailDialogSecond from "@/sections/cartPage/moreDetailDialogSecond";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React from "react";
import FloatPrice from "../product/floatPrice";
import GetOffPercentage from "../product/getOffPercentage";

const TrackOrder = dynamic(
  () => import("@/sections/profile/orders/collapseData/trackOrder"),
  {
    ssr: false,
  }
);
const ViewDetail = dynamic(
  () => import("@/sections/profile/orders/collapseData/viewDetail"),
  {
    ssr: false,
  }
);

const OrderDetail = ({ data }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [checked, setChecked] = React.useState([]);
  const [checked2, setChecked2] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState({
    data: null,
    open: false,
  });
  const { t: translate } = useTranslation();

  const handleChange = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((item) => item !== id));
    } else {
      setChecked([...checked, id]);
    }
    setChecked2(checked2.filter((item) => item !== id));
  };
  const handleChange2 = (id) => {
    if (checked2.includes(id)) {
      setChecked2(checked2.filter((item) => item !== id));
    } else {
      setChecked2([...checked2, id]);
    }
    setChecked(checked.filter((item) => item !== id));
  };

  const handleOpenDialog = (data) => {
    setOpenDialog({ open: true, data: data });
  };

  const handleCloseDialog = () => {
    setOpenDialog((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      {data &&
        data &&
        data?.length > 0 &&
        data.map((item, index) => {
          return (
            <React.Fragment key={`MY-ORDER-DATA-${index}`}>
              <Box
                p={1}
                mt={2}
                sx={{
                  background: (theme) => theme.palette.common.black,
                  color: (theme) => theme.palette.common.white,
                  display: {
                    lg: "block",
                    md: "block",
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  },
                }}
              >
                <Grid container>
                  <Grid item lg={2} md={2}>
                    <Typography
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      fontWeight={400}
                      pl={1}
                    >
                      {translate("OrderNo")}
                    </Typography>
                  </Grid>
                  <Grid item lg={5} md={5}>
                    <Typography
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      fontWeight={400}
                    >
                      {translate("Item")}
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3}>
                    <Typography
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      fontWeight={400}
                    >
                      {translate("Price")}
                    </Typography>
                  </Grid>
                  <Grid item lg={2} md={2}>
                    <Typography
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      fontWeight={400}
                    >
                      {translate("OrderDate")}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              {item &&
                item?.line_info &&
                item?.line_info?.length > 0 &&
                item?.line_info?.map((childItem, childIndex) => {
                  return (
                    <React.Fragment key={`SECOND-CHILD-${childIndex}`}>
                      <Box
                        mt={2}
                        p={1}
                        sx={(theme) => ({
                          border: (theme) =>
                            `1px solid ${theme.palette.grey[2100]}`,
                          backgroundColor:
                            childItem.SOL_ITEM_LABEL == "SAMPLE"
                              ? theme.palette.grey[3600]
                              : theme.palette.common.white,
                        })}
                      >
                        <Grid container spacing={0}>
                          <Grid
                            item
                            lg={2}
                            md={2}
                            sm={12}
                            xs={12}
                            xxs={12}
                            alignContent={"center"}
                          >
                            <Typography
                              sx={(theme) => ({
                                fontSize: theme.typography.typography24,
                                fontFamily: theme.fontFaces.helveticaNeueBold,
                                color: theme.palette.common.black,
                              })}
                            >
                              {item?.EOH_TXN_CODE}-{item?.EOH_TXN_NO}-
                              {childIndex + 1}
                            </Typography>
                          </Grid>

                          <Grid item lg={5} md={5} sm={12} xs={12} xxs={12}>
                            <Stack
                              direction={"row"}
                              spacing={2}
                              alignItems="center"
                            >
                              <Box height="100%" width={120}>
                                <NextLazyLoadImage
                                  src={childItem?.SOL_IMAGE_PATH}
                                  alt={childItem?.image_alt_seo}
                                  width={120}
                                  height={100}
                                  sx={{
                                    width: "90%!important",
                                    height: "100%!important",
                                    objectFit: "cover!important",
                                  }}
                                  sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                                  objectFit="contain"
                                  upLgWidth={120}
                                  downLgWidth={120}
                                  downMdWidth={120}
                                  downSmWidth={120}
                                  downXsWidth={120}
                                />
                              </Box>
                              <Box>
                                <Typography
                                  sx={(theme) => ({
                                    fontSize: theme.typography.typography24,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueBold,
                                    color: "common.black",
                                  })}
                                >
                                  {childItem?.SFP_TITLE}
                                </Typography>
                                <Typography
                                  sx={(theme) => ({
                                    fontSize: theme.typography.typography24,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    color: "common.black",
                                  })}
                                >
                                  {translate("ItemCode")} :
                                  <Typography
                                    component="span"
                                    variant="typography24"
                                    px={0.5}
                                    sx={(theme) => ({
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      fontWeight: 200,
                                      color: theme.palette.grey[3900],
                                    })}
                                  >
                                    {childItem?.brand_info?.SII_ITEM_ID}
                                  </Typography>
                                </Typography>
                                <Typography
                                  sx={(theme) => ({
                                    fontSize: theme.typography.typography24,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    color: "common.black",
                                  })}
                                >
                                  {translate("Brand")}

                                  <Typography
                                    component="span"
                                    variant="typography24"
                                    px={0.5}
                                    sx={(theme) => ({
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      fontWeight: 200,
                                      color: theme.palette.grey[3900],
                                    })}
                                  >
                                    {childItem?.brand_info?.SII_BR_DESC}
                                  </Typography>
                                </Typography>
                                <Typography
                                  mt={2}
                                  component="small"
                                  variant="typography24"
                                  sx={(theme) => ({
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueBold,
                                    color: theme.palette.success.darkGreen,
                                    display: "block",
                                  })}
                                >
                                  {checked2.includes(childItem?.SOL_ORDER_ID)
                                    ? ""
                                    : translate(childItem?.SOL_ORDER_STATUS)}
                                </Typography>
                                {childItem.SOL_ITEM_LABEL &&
                                  childItem.SOL_ITEM_LABEL == "SAMPLE" ? (
                                  <Typography
                                    component="small"
                                    variant="typography24"
                                    sx={(theme) => ({
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueRegular,
                                      color: theme.palette.purple.main,
                                      display: "block",
                                    })}
                                  >
                                    {translate("free_sample")}
                                  </Typography>
                                ) : (
                                  <Typography
                                    display="block"
                                    component="p"
                                    variant="typography24"
                                    color="common.black"
                                    fontFamily={(theme) =>
                                      theme.fontFaces.helveticaNeueBold
                                    }
                                    sx={{
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleOpenDialog(childItem)}
                                  >
                                    {translate("MoreDetail")}
                                  </Typography>
                                )}
                              </Box>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            lg={3}
                            md={3}
                            sm={12}
                            xs={12}
                            xxs={12}
                            alignContent={"center"}
                          >
                            <Typography
                              component={"p"}
                              sx={(theme) => ({
                                fontSize: theme.typography.typography24,
                                fontFamily: theme.fontFaces.helveticaNeueLight,
                                color: "common.black",
                                fontWeight: 600,
                              })}
                            >
                              {translate(childItem?.SOL_CCY_CODE)}{" "}
                              <FloatPrice price={childItem?.SOL_GROSS_VALUE} defaultDecimal={2} />
                            </Typography>
                            {Number(childItem?.SOL_GROSS_VALUE) <
                              Number(childItem?.SOL_OLD_VALUE) && (
                                <Stack direction="row" spacing={1}>
                                  <Typography
                                    component={"p"}
                                    sx={(theme) => ({
                                      fontSize: "12px!important",
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueBold,
                                      color: theme.palette.grey[2700],
                                      fontWeight: 200,
                                      textDecoration: "line-through",
                                    })}
                                  >
                                    {translate(childItem?.SOL_CCY_CODE)}{" "}
                                    <FloatPrice price={childItem?.SOL_OLD_VALUE} defaultDecimal={2} />
                                  </Typography>
                                  <GetOffPercentage
                                    variant="typography12"
                                    new_value={childItem.SOL_GROSS_VALUE}
                                    old_value={childItem?.SOL_OLD_VALUE}
                                  />
                                </Stack>
                              )}
                          </Grid>
                          <Grid
                            item
                            lg={2}
                            md={2}
                            sm={12}
                            xs={12}
                            xxs={12}
                            alignContent={"center"}
                          >
                            <Typography
                              component="p"
                              variant="typography24"
                              sx={(theme) => ({
                                fontFamily: theme.fontFaces.helveticaNeueLight,
                                color: theme.palette.common.black,
                                fontWeight: 500,
                                ...(themeDirection == "rtl" && {
                                  direction: "rtl",
                                  textAlign: "end",
                                }),
                              })}
                            >
                              {childItem?.SOL_TXN_DT}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Divider sx={{ mt: 2, mb: 0 }} />

                        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
                          <Stack
                            direction={{
                              lg: "row",
                              md: "row",
                              sm: "column",
                              xs: "column",
                              xxs: "column",
                            }}
                            justifyContent="space-between"
                            alignItems={{
                              lg: "center",
                              md: "center",
                              sm: "left",
                              xs: "left",
                              xxs: "left",
                            }}
                          >
                            <Typography
                              m={2}
                              onClick={() =>
                                handleChange(childItem?.SOL_SYS_ID)
                              }
                              sx={(theme) => ({
                                fontSize: theme.typography.typography24,
                                fontFamily: theme.fontFaces.helveticaNeueBold,
                                fontWeight: 200,
                                color: theme.palette.grey.shrink,
                                textDecoration: "underline",
                                cursor: "pointer",
                              })}
                            >
                              {checked.includes(childItem?.SOL_SYS_ID)
                                ? translate("HideDetails")
                                : translate("ViewDetail")}
                            </Typography>
                            <Typography
                              onClick={() =>
                                handleChange2(childItem?.SOL_SYS_ID)
                              }
                              m={2}
                              sx={(theme) => ({
                                fontSize: theme.typography.typography24,
                                fontFamily:
                                  theme.fontFaces.helveticaNeueRegular,
                                fontWeight: theme.typography.fontWeightBold,
                                color: theme.palette.grey.shrink,
                                textDecoration: "underline",
                                cursor: "pointer",
                              })}
                            >
                              {checked2.includes(childItem?.SOL_SYS_ID)
                                ? translate("HideTrackOrder")
                                : translate("trackOrder")}
                            </Typography>
                          </Stack>
                          <Collapse
                            in={checked.includes(childItem?.SOL_SYS_ID)}
                          >
                            <ViewDetail item={item} data={childItem} />
                          </Collapse>
                          <Collapse
                            in={checked2.includes(childItem?.SOL_SYS_ID)}
                          >
                            <TrackOrder data={childItem} trackUser={item} />
                          </Collapse>
                        </Grid>
                      </Box>
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
          );
        })}

      <MoreDetailDialogSecond
        open={openDialog}
        handleClose={() => handleCloseDialog()}
      />
    </>
  );
};

export default OrderDetail;
