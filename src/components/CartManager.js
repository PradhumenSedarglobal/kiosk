import React from "react";
import {
  Grid,
  Box,
  Drawer,
  Divider,
  List,
  styled,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import { useAuthContext } from "@/auth/useAuthContext";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { setOrderList } from "@/redux/slices/customization";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawerWidth = 400;

const CartManager = ({ open, handleDrawerClose, cartData = null }) => {
  const theme = useTheme();
  const fonts = useSelector((state) => state.font);
  const { state } = useAuthContext();
  const { cookies } = state;
  const visitorId = cookies.visitorId;
  const userId = useSelector((state) => state.customization.customerSysId);

  const dispatch = useDispatch();

  const removeCart = async (cartId) => {
    const response = await apiSSRV2DataService.Delete({
      path: `kiosk/cart/${cartId}`,
      param: {
        content: "customization",
        sys_id: 0,
      },
      cookies: cookies,
    });

    if (response.data.complete) {
      dispatch(
        setOrderList({
          complete: response.data.complete,
          cart_count: response.data.cart_count,
          total_price: response.data.total_price,
        })
      );
    }
  };

  return (
    <Drawer
      sx={{
        width: { md: drawerWidth, sm: "100%", xs: "100%" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: { md: drawerWidth, sm: "100%", xs: "100%" },
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Grid
          container
          sx={{ alignItems: "center" }}
          justifyContent="space-between"
        >
          <Typography
            sx={{
              color: "rgb(239, 156, 0)",
              fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
              fontWeight: "600",
            }}
            variant="h6"
            noWrap
            component="div"
          >
            Added to Your Cart!
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <CloseIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Grid>
      </DrawerHeader>
      <Divider />
      <List>
        {cartData !== null &&
          cartData.complete.map((item, index) => (
            <React.Fragment key={item.SOL_SYS_ID || index}>
              <Grid
                container
                sx={{ padding: "10px" }}
                justifyContent="space-between"
              >
                <Grid item xs={4} sm={3} md={3}>
                  <img
                    height={100}
                    width={100}
                    src={
                      item.SOL_IMAGE_PATH
                        ? item.SOL_IMAGE_PATH
                        : "https://api.sedarglobal.com/uploads/100001/item/laptop/1708146524_d97c7cc07e26fd5ba93d.webp?imwidth=1920"
                    }
                    alt="Product"
                  />
                </Grid>
                <Grid sx={{ paddingLeft: "20px" }} item xs={8} sm={9} md={9}>
                  <Typography
                    sx={{
                      fontFamily: fonts.Helvetica_Neue_Medium.style.fontFamily,
                      fontWeight: "500",
                      letterSpacing: "0.00938em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="body2"
                    noWrap
                    component="div"
                  >
                    Item Code: {item?.info_data?.MEASUREMENT?.SOI_ITEM_CODE}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      wordBreak: "break-all",
                      fontFamily: fonts.Helvetica_Neue_Medium.style.fontFamily,
                      fontWeight: "700",
                      fontSize: "1rem", // Medium size
                      letterSpacing: "0.00938em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="h6"
                    component="div"
                  >
                    {item?.info_data?.MEASUREMENT?.SFP_TITLE}
                  </Typography>
                  <Box sx={{ display: "flex", marginTop: "8px" }}>
                    <Typography
                      sx={{
                        fontFamily:
                          fonts.Helvetica_Neue_Medium.style.fontFamily,
                        fontWeight: "500",
                      }}
                      variant="body2"
                      component="div"
                    >
                      QTY:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fonts.Helvetica_Neue_Thin.style.fontFamily,
                        fontWeight: "700",
                        marginLeft: "5px",
                      }}
                      variant="body2"
                      component="div"
                    >
                      {item?.SOL_QTY}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginTop: "8px" }}>
                    <Typography
                      sx={{
                        fontFamily:
                          fonts.Helvetica_Neue_Medium.style.fontFamily,
                        fontWeight: "500",
                        letterSpacing: "0.00938em",
                      }}
                      variant="body2"
                      component="div"
                    >
                      Value:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fonts.Helvetica_Neue_Thin.style.fontFamily,
                        fontWeight: "700",
                        letterSpacing: "0.00938em",
                        marginLeft: "5px",
                      }}
                      variant="body2"
                      component="div"
                    >
                      {item?.SOL_CCY_CODE + " " + item?.SOL_VALUE}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Chip
                sx={{
                  mb: "5px",
                }}
                label="Remove"
                onClick={() => removeCart(item.SOL_SYS_ID)}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
              <Divider />
            </React.Fragment>
          ))}
      </List>
    </Drawer>
  );
};

export default CartManager;
