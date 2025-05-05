"use client";
import React, { useState, useEffect } from "react";
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
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "@/auth/useAuthContext";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { setOrderList } from "@/redux/slices/customization";
import { toast } from "react-toastify";
import { setStepIndex } from "@/redux/slices/tourSlice";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import axios from "axios";

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Chinese" },
  { code: "ru", name: "Russian" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  justifyContent: "space-between",
}));

const drawerWidth = 400;

const CartManager = ({ open, handleDrawerClose, setOpen }) => {
  const router = useRouter();
  const { locale, query } = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [localCartData, setLocalCartData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const theme = useTheme();
  const fonts = useSelector((state) => state.font);
  const { state } = useAuthContext();
  const { cookies } = state;
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();

  const cartData = useSelector((state) => state.customization.orderList);
  const { customerSysId } = useSelector((state) => state.customization);

  // Initialize local cart data
  useEffect(() => {
    if (cartData) {
      setLocalCartData(cartData);
    }
  }, [cartData]);

  // Language handling
  useEffect(() => {
    const path = router.asPath;
    const langMatch = path.match(/-([a-z]{2})($|\/)/);
    if (langMatch && langMatch[1]) {
      setSelectedLanguage(langMatch[1]);
    }
  }, [router.asPath]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    const currentPath = router.asPath;
    const currentQuery = router.query;
    let countryCode = "uae";
    const pathMatch = currentPath.match(/^\/([a-z]+)-[a-z]{2}/);
    if (pathMatch && pathMatch[1]) {
      countryCode = pathMatch[1];
    }
    const newPath = `/${countryCode}-${newLanguage}`;

    setSelectedLanguage(newLanguage);
    router.push(
      {
        pathname: newPath,
        query: currentQuery,
      },
      undefined,
      { shallow: false, locale: newLanguage }
    );
  };

  const fetchOrderList = async (cookies, customerSysId, locale) => {
    try {
      const response = await axios.get(
        `https://migapi.sedarglobal.com/kiosk/order/orderList?lang=en&site=100001&country=uae&visitorId=${cookies.visitorId}&userId=${customerSysId}&currency=AED&ccy_decimal=0&cn_iso=${cookies.primary_ref_cn_iso}&locale=${locale}&detect_country=`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      dispatch(
        setOrderList({
          complete: response.data.complete,
          cart_count: response.data.cart_count,
          total_price: response.data.total_price,
        })
      );
    } catch (error) {
      console.error("Failed to fetch order list:", error);
    }
  };

  const removeCart = async (cartId) => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      // Optimistic UI update - remove item immediately
      const updatedCart = {
        ...localCartData,
        complete: localCartData.complete.filter(
          (item) => item.SOL_SYS_ID !== cartId
        ),
        cart_count: localCartData.cart_count - 1,
      };
      setLocalCartData(updatedCart);

      const response = await apiSSRV2DataService.Delete({
        path: `kiosk/cart/${cartId}`,
        param: { content: "customization", sys_id: 0 },
        cookies: cookies,
      });

      if (response.data.complete) {
        toast.success("Item successfully removed from cart!", {
          position: "top-right",
          style: {
            background:
              "linear-gradient(45deg,rgb(44, 136, 13),rgb(24, 162, 19))",
            color: "white",
          },
        });

        // Fetch updated list in background
        fetchOrderList(cookies, customerSysId, locale);
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      // Revert optimistic update if API call fails
      setLocalCartData(cartData);
      toast.error("Failed to remove item. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const updateQuantity = async (cartId, updatedQty) => {
    if (updatedQty < 1 || isUpdating) return;

    setIsUpdating(true);
    try {
      // Optimistic UI update - update quantity immediately
      const updatedCart = {
        ...localCartData,
        complete: localCartData.complete.map((item) =>
          item.SOL_SYS_ID === cartId ? { ...item, SOL_QTY: updatedQty } : item
        ),
      };
      setLocalCartData(updatedCart);

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
          style: {
            background: "linear-gradient(45deg, #16a085, #1abc9c)",
            color: "white",
          },
        });

        // Fetch updated list in background
        fetchOrderList(cookies, customerSysId, locale);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      // Revert optimistic update if API call fails
      setLocalCartData(cartData);
      toast.error("Failed to update quantity. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={() => {
        if (typeof toggleDrawer === "function") {
          toggleDrawer(false)();
        } else {
          console.error("toggleDrawer is not a function");
        }
      }}
      onClick={() => {
        dispatch(setStepIndex(11));
      }}
      sx={{
        width: { md: drawerWidth, sm: "100%", xs: "100%" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: { md: drawerWidth, sm: "100%", xs: "100%" },
          boxSizing: "border-box",
          padding: theme.spacing(2),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Box>
        <DrawerHeader>
          <Typography
            sx={{
              color: "#e67e22",
              fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
              fontWeight: "700",
              fontSize: "1.2rem",
            }}
            variant="h6"
          >
            Added to Your Cart!
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon sx={{ color: "#2c3e50" }} />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ marginBottom: theme.spacing(2) }} />
        <List
          sx={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            padding: 0,
          }}
        >
          {localCartData !== null &&
            localCartData?.complete?.map((item, index) => (
              <React.Fragment key={item.SOL_SYS_ID || index}>
                <Grid
                  container
                  spacing={2}
                  sx={{ padding: "10px" }}
                  justifyContent="space-between"
                >
                  <Grid item xs={4} sm={3} md={3}>
                    <img
                      height={100}
                      width={100}
                      src={
                        item.SOL_IMAGE_PATH || "https://via.placeholder.com/100"
                      }
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
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          marginBottom: "4px",
                          color: "#333",
                        }}
                      >
                        Item Code: {item?.info_data?.MEASUREMENT?.ITEM_ID}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontFamily:
                              fonts.Helvetica_Neue_Medium.style.fontFamily,
                            overflowWrap: "break-word",
                            wordBreak: "keep-all",
                            whiteSpace: "pre-line",
                            fontWeight: 600,
                            flexGrow: 1,
                          }}
                        >
                          {(() => {
                            const title =
                              item?.info_data?.MEASUREMENT?.SFP_TITLE || "";
                            if (title.length <= 25) return title;
                            const breakIndex = title.lastIndexOf(" ", 25);
                            return breakIndex > 0
                              ? title.slice(0, breakIndex) +
                                  "\n" +
                                  title.slice(breakIndex + 1)
                              : title;
                          })()}
                        </Typography>

                        <Chip
                          onClick={() =>
                            !isUpdating && removeCart(item.SOL_SYS_ID)
                          }
                          icon={
                            <DeleteIcon
                              style={{ color: "#fff", marginRight: "-20px" }}
                            />
                          }
                          sx={{
                            backgroundColor: isUpdating ? "#95a5a6" : "#c0392b",
                            color: "#fff",
                            borderRadius: "12px",
                            fontWeight: "600",
                            cursor: isUpdating ? "not-allowed" : "pointer",
                            ml: 1,
                            "&:hover": {
                              backgroundColor: isUpdating
                                ? "#95a5a6"
                                : "#e74c3c",
                            },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          marginTop: "10px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontFamily:
                              fonts.Helvetica_Neue_Medium.style.fontFamily,
                            marginRight: "10px",
                            color: "#333",
                          }}
                        >
                          QTY:
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Button
                            onClick={() =>
                              !isUpdating &&
                              updateQuantity(
                                item.SOL_SYS_ID,
                                Number(item?.SOL_QTY) - 1
                              )
                            }
                            disabled={isUpdating}
                            variant="outlined"
                            sx={{
                              minWidth: "28px",
                              height: "28px",
                              padding: "0",
                              fontSize: "0.9rem",
                              fontFamily:
                                fonts.Helvetica_Neue_Medium.style.fontFamily,
                              borderRadius: "6px",
                              borderColor: isUpdating ? "#bdc3c7" : "#2c3e50",
                              color: isUpdating ? "#bdc3c7" : "inherit",
                            }}
                          >
                            -
                          </Button>

                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.95rem",
                              margin: "0 10px",
                              minWidth: "24px",
                              textAlign: "center",
                              fontFamily:
                                fonts.Helvetica_Neue_Medium.style.fontFamily,
                              color: "#333",
                            }}
                          >
                            {item?.SOL_QTY}
                          </Typography>

                          <Button
                            onClick={() =>
                              !isUpdating &&
                              updateQuantity(
                                item.SOL_SYS_ID,
                                Number(item?.SOL_QTY) + 1
                              )
                            }
                            disabled={isUpdating}
                            variant="outlined"
                            sx={{
                              minWidth: "28px",
                              height: "28px",
                              padding: "0",
                              fontSize: "0.9rem",
                              fontFamily:
                                fonts.Helvetica_Neue_Medium.style.fontFamily,
                              borderRadius: "6px",
                              borderColor: isUpdating ? "#bdc3c7" : "#2c3e50",
                              color: isUpdating ? "#bdc3c7" : "inherit",
                            }}
                          >
                            +
                          </Button>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          marginTop: "4px",
                          color: "#2c3e50",
                          fontFamily:
                            fonts.Helvetica_Neue_Medium.style.fontFamily,
                          fontWeight: 500,
                        }}
                      >
                        Value : {translate(cookies?.CCYCODE || "AED")}{" "}
                        {Number(item.SOL_PRICE || 0).toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ marginBottom: theme.spacing(2) }} />
              </React.Fragment>
            ))}
        </List>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: theme.spacing(2),
          backgroundColor: "#000000",
          color: "white",
          borderTop: "1px solid white",
          boxShadow: "0 -2px 10px hsla(37, 78.60%, 52.40%, 0.10)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: theme.spacing(1),
            fontWeight: "bold",
          }}
        >
          <span>Total:</span>
          <span>
            {localCartData?.total_price?.SOL_VALUE
              ? `${translate(cookies?.CCYCODE || "AED")} ${Number(
                  localCartData.total_price.SOL_VALUE
                ).toFixed(2)}`
              : "AED 0.00"}
          </span>
        </Box>

        <Box mt={2} sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <Select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              displayEmpty
              inputProps={{ "aria-label": "Select language" }}
              sx={{
                color: "white",
                fontFamily: fonts.Helvetica_Neue.style.fontFamily,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSelect-select": {
                  padding: theme.spacing(1),
                },
              }}
            >
              {languages.map((language) => (
                <MenuItem
                  key={language.code}
                  value={language.code}
                  sx={{ fontFamily: fonts.Helvetica_Neue.style.fontFamily }}
                >
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartManager;
