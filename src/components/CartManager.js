import React from "react";
import {
  Grid,
  Box,
  Drawer,
  Divider,
  List,
  styled,
  useTheme,
  IconButton,
  Chip,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "@/auth/useAuthContext";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { setOrderList } from "@/redux/slices/customization";
import { toast } from "react-toastify";

const WhiteDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
  color: "#fff",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  justifyContent: "space-between",
}));

const drawerWidth = 400;

const CartManager = ({ open, handleDrawerClose, cartData = null }) => {
  const theme = useTheme();
  const fonts = useSelector((state) => state.font);
  const { state } = useAuthContext();
  const { cookies } = state;
  const dispatch = useDispatch();

  const removeCart = async (cartId) => {
    const response = await apiSSRV2DataService.Delete({
      path: `kiosk/cart/${cartId}`,
      param: { content: "customization", sys_id: 0 },
      cookies: cookies,
    });

    if (response.data.complete) {
      toast.success("Item successfully removed from cart!", {
        position: "top-right",
        style: { background: 'linear-gradient(45deg, #d32f2f, #f44336)', color: 'white' },
      });

      dispatch(setOrderList(response.data));
    }
  };

  const updateQuantity = async (cartId, updatedQty) => {
    if (updatedQty < 1) return; // Prevent negative or zero values

    const response = await apiSSRV2DataService.post({
      path: `kiosk/order/cart/updateLineTable/${cartId}`,
      data: {
        line_type: "ORDER_QTY",
        line_value: updatedQty,
        soh_sys_id: 0,
        content: "customization",
        sys_id: 0,
      },
      cookies: cookies,
    });

    if (response.data.complete) {
      toast.success("Item quantity updated successfully!", {
        position: "top-right",
        style: { background: 'linear-gradient(45deg, #16a085, #1abc9c)', color: 'white' },
      });

      dispatch(setOrderList(response.data));
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
          padding: theme.spacing(2),
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Typography
          sx={{
            color: "#f39c12",
            fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
            fontWeight: "700",
            fontSize: "1.2rem",
          }}
          variant="h6"
        >
          Added to Your Cart!
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ marginBottom: theme.spacing(2) }} />
      <List>
        {cartData !== null &&
          cartData.complete.map((item, index) => (
            <React.Fragment key={item.SOL_SYS_ID || index}>
              <Grid container spacing={2} sx={{ padding: "10px" }} justifyContent="space-between">
                <Grid item xs={4} sm={3} md={3}>
                  <img
                    height={100}
                    width={100}
                    src={item.SOL_IMAGE_PATH || "https://via.placeholder.com/100"}
                    alt="Product"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </Grid>
                <Grid item xs={8} sm={9} md={9}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: fonts.Helvetica_Neue.style.fontFamily,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#2c3e50",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        marginBottom: "8px",
                      }}
                    >
                      Item Code: {item?.info_data?.MEASUREMENT?.SOI_ITEM_CODE}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: fonts.Helvetica_Neue_Medium.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: "#34495e",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          marginBottom: "4px",
                        }}
                      >
                        {item?.info_data?.MEASUREMENT?.SFP_TITLE}
                      </Typography>
                      <Chip
                        onClick={() => removeCart(item.SOL_SYS_ID)}
                        icon={<DeleteIcon style={{ color: "#fff", marginRight: "-20px" }} />}
                        sx={{
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          borderRadius: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#c0392b" },
                        }}
                      />
                    </Box>

                    <Box sx={{ display: "flex", marginTop: "8px" }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: fonts.Helvetica_Neue_Medium.style.fontFamily }}>
                        QTY:{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          marginLeft: "5px",
                          fontFamily: fonts.Helvetica_Neue.style.fontFamily,
                        }}
                      >
                        {item?.SOL_QTY}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8px" }}>
                      <Button
                        onClick={() => updateQuantity(item.SOL_SYS_ID, Number(item?.SOL_QTY) - 1)}
                        variant="outlined"
                        sx={{ minWidth: "40px", fontSize: "1.2rem", padding: "5px 10px" }}
                      >
                        -
                      </Button>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          margin: "0 15px",
                          minWidth: "30px",
                          textAlign: "center",
                        }}
                      >
                        {item?.SOL_QTY}
                      </Typography>
                      <Button
                        onClick={() => updateQuantity(item.SOL_SYS_ID, Number(item?.SOL_QTY) + 1)}
                        variant="outlined"
                        sx={{ minWidth: "40px", fontSize: "1.2rem", padding: "5px 10px" }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ marginBottom: theme.spacing(2) }} />
            </React.Fragment>
          ))}
      </List>
    </Drawer>
  );
};

export default CartManager;
