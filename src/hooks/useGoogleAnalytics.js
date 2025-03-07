// @mui
import { useAuthContext } from "@/auth/useAuthContext";
const site_url = process.env.NEXT_PUBLIC_SITE_URL; //100001;

// ----------------------------------------------------------------------

export default function useGoogleAnalytics() {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { CCYCODE: ccy_code } = cookies || {};

  const viewItemList = (order_list) => {
    if (site_url == "www.sedarglobal.com" && order_list && order_list.length) {
      let gtag_items = [];
      order_list.length > 0 &&
        order_list.forEach((item, index) => {
          gtag_items.push({
            item_id: item.SFI_CODE,
            item_name: item.SFI_DESC,
            affiliation: "sedarglobal.com",
            currency: ccy_code,
            discount: item.OFFER_PCT,
            index: index,
            item_brand: item.BRAND_DESC,
            item_category: item.SPI_LINK_URL,
            item_list_id: item.SPI_PR_ITEM_CODE,
            item_list_name: item.SPI_DESC_EN,
            item_variant: item.SFI_COLLECTION_DESC,
            price: item.PRICE,
            quantity: 1,
          });
        });

      if (order_list.length > 0) {
        gtag("event", "view_item_list", {
          item_list_id:
            order_list && order_list[0]
              ? order_list[0]["SPI_PR_ITEM_CODE"]
              : "",
          item_list_name:
            order_list && order_list[0]
              ? order_list[0]["item.SPI_DESC_EN"]
              : "",
          items: gtag_items,
        });
      }
    }
  };

  const selectItem = (item) => {
    if (
      site_url == "www.sedarglobal.com" &&
      item &&
      item.PRICE &&
      item.SFI_CODE
    ) {
      gtag("event", "select_item", {
        item_list_id: item.SPI_PR_ITEM_CODE,
        item_list_name: item.SPI_DESC_EN,
        items: [
          {
            item_id: item.SFI_CODE,
            item_name: item.SFI_DESC,
            affiliation: "sedarglobal.com",
            currency: ccy_code,
            discount: item.OFFER_PCT,
            index: 0,
            item_brand: item.BRAND_DESC,
            item_category: item.SPI_LINK_URL,
            item_list_id: item.SPI_PR_ITEM_CODE,
            item_list_name: item.SPI_DESC_EN,
            item_variant: item.SFI_COLLECTION_DESC,
            price: item.PRICE,
            quantity: 1,
          },
        ],
      });
    }
  };

  const viewSingleItem = (item) => {
    if (
      site_url == "www.sedarglobal.com" &&
      item &&
      item.PRICE &&
      item.SFI_CODE
    ) {
      gtag("event", "view_item", {
        currency: ccy_code,
        value: item.PRICE,
        items: [
          {
            item_id: item.SFI_CODE,
            item_name: item.SFI_DESC,
            affiliation: "sedarglobal.com",
            currency: ccy_code,
            discount: item.OFFER_PCT,
            index: 0,
            item_brand: item.BRAND_DESC,
            item_category: item.SPI_LINK_URL,
            item_list_id: item.SPI_PR_ITEM_CODE,
            item_list_name: item.SPI_DESC_EN,
            item_variant: item.SFI_COLLECTION_DESC,
            price: item.PRICE,
            quantity: 1,
          },
        ],
      });
    }
  };

  const addToCart = (item, state = false) => {
    if (
      site_url == "www.sedarglobal.com" &&
      item &&
      item.PRICE &&
      item.SFI_CODE
    ) {
      gtag("event", "add_to_cart", {
        currency: ccy_code,
        value:
          state && state.price_array ? state.price_array.SOL_VALUE : item.PRICE,
        items: [
          {
            card_type: "Quick By",
            item_id: item.SFI_CODE,
            item_name: item.SFI_DESC,
            affiliation: "sedarglobal.com",
            currency: ccy_code,
            discount: item.OFFER_PCT,
            index: 1,
            item_brand: item.BRAND_DESC,
            item_category: item.SPI_LINK_URL,
            item_list_id: item.SPI_PR_ITEM_CODE,
            item_list_name: item.SPI_DESC_EN,
            item_variant: item.SFI_COLLECTION_DESC,
            price: item.PRICE,
            quantity:
              state && state.product_info ? state.product_info.count : 1,
          },
        ],
      });
    }
  };

  const addToCartCustomizeGoogle = (item) => {
    if (site_url == "www.sedarglobal.com" && item && item.steps) {
      gtag("event", "add_to_cart", {
        currency: ccy_code,
        value: item.price_array ? item.price_array.SOL_VALUE : 0,
        items: [
          {
            card_type: "Customize",
            item_id:
              item.steps["MATERIAL_SELECTION"] &&
                item.steps["MATERIAL_SELECTION"]["material_info"]
                ? item.steps["MATERIAL_SELECTION"]["material_info"]["SII_CODE"]
                : "",
            item_name:
              item.steps["MATERIAL_SELECTION"] &&
                item.steps["MATERIAL_SELECTION"]["material_info"]
                ? item.steps["MATERIAL_SELECTION"]["material_info"][
                "SII_ITEM_ID"
                ]
                : "",
            affiliation: "sedarglobal.com",
            currency: ccy_code,
            index: 1,
            item_brand:
              item.steps["MATERIAL_SELECTION"] &&
                item.steps["MATERIAL_SELECTION"]["material_info"]
                ? item.steps["MATERIAL_SELECTION"]["material_info"][
                "SII_BR_DESC"
                ]
                : "",
            item_variant:
              item.steps["MATERIAL_SELECTION"] &&
                item.steps["MATERIAL_SELECTION"]["material_info"]
                ? item.steps["MATERIAL_SELECTION"]["material_info"][
                "SII_COLLECTION_CODE"
                ]
                : "",
            item_list_name: item.product_info ? item.product_info.SPI_DESC : "",
            item_category: item.product_info ? item.product_info.SC_DESC : "",
            price: item.price_array ? item.price_array.SOL_VALUE : 0,
            quantity: item.product_info ? item.product_info.count : 1,
          },
        ],
      });
    }
  };

  const viewCart = (order_list, total_price) => {
    if (site_url == "www.sedarglobal.com" && order_list.length > 0) {
      let gtag_items = [];
      order_list.length > 0 &&
        order_list.forEach((item, index) => {
          gtag_items.push({
            item_id:
              item.brand_info && item.brand_info.SII_CODE
                ? item.brand_info.SII_CODE
                : "",
            item_name: item.PRODUCT_DESC,
            affiliation: "sedarglobal.com",
            currency: ccy_code,
            index: index,
            item_brand:
              item.brand_info && item.brand_info.SII_BR_DESC
                ? item.brand_info.SII_BR_DESC
                : "",
            item_category: item.SPI_CATEGORY,
            price: item.SOL_VALUE,
            quantity: item.SOL_QTY,
          });
        });

      if (order_list.length > 0) {
        gtag("event", "view_cart", {
          currency: ccy_code,
          value: total_price.SOL_VALUE,
          items: gtag_items,
        });
      }
    }
  };

  const removeFromCart = (item) => {
    if (site_url == "www.sedarglobal.com" && item && item.PRODUCT_DESC) {
      gtag("event", "remove_from_cart", {
        currency: ccy_code,
        value: item.SOL_VALUE,
        items: [
          {
            item_id:
              item.brand_info && item.brand_info.SII_CODE
                ? item.brand_info.SII_CODE
                : "",
            item_name: item.PRODUCT_DESC,
            affiliation: "sedarglobal.com",
            currency: ccy_code,
            index: 0,
            item_brand:
              item.brand_info && item.brand_info.SII_BR_DESC
                ? item.brand_info.SII_BR_DESC
                : "",
            item_category: item.SPI_CATEGORY,
            price: item.SOL_VALUE,
            quantity: item.SOL_QTY,
          },
        ],
      });
    }
  };

  const purchase = (header_result, line_result) => {
    if (site_url == "www.sedarglobal.com" && line_result.length > 0) {
      let gtag_items = [];

      line_result.length > 0 &&
        line_result.forEach((item, index) => {
          gtag_items.push({
            item_id:
              item.brand_info && item.brand_info.SII_CODE
                ? item.brand_info.SII_CODE
                : "",
            item_name: item.PRODUCT_DESC,
            affiliation: "sedarglobal.com",
            coupon: header_result.SOH_PROMO_CODE,
            currency: ccy_code,
            discount: item.SOL_PROMO_VALUE,
            index: index,
            item_brand:
              item.brand_info && item.brand_info.SII_BR_DESC
                ? item.brand_info.SII_BR_DESC
                : "",
            item_category: item.SPI_CATEGORY,
            price: item.SOL_VALUE,
            quantity: item.SOL_QTY,
          });
        });

      dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: header_result.SOH_TXN_NO,
          affiliation: "sedarglobal.com",
          value: header_result.SOH_NET_VALUE,
          tax: header_result.SOH_TAX_VALUE ? header_result.SOH_TAX_VALUE : 0,
          shipping: header_result.SOH_SHIP_VALUE
            ? header_result.SOH_SHIP_VALUE
            : 0,
          currency: header_result.SOH_CCY_CODE,
          coupon: header_result.SOH_PROMO_CODE
            ? header_result.SOH_PROMO_CODE
            : "",
          items: gtag_items,
        },
      });
    }
  };

  const beginCheckout = (line_result, total_price) => {
    if (site_url == "www.sedarglobal.com" && line_result.length > 0) {
      let gtag_items = [];
      line_result.length > 0 &&
        line_result.forEach((item, index) => {
          gtag_items.push({
            item_id:
              item.brand_info && item.brand_info.SII_CODE
                ? item.brand_info.SII_CODE
                : "",
            item_name: item.PRODUCT_DESC,
            affiliation: "sedarglobal.com",
            currency: ccy_code,
            discount: item.SOL_PROMO_VALUE,
            index: index,
            item_brand:
              item.brand_info && item.brand_info.SII_BR_DESC
                ? item.brand_info.SII_BR_DESC
                : "",
            item_category: item.SPI_CATEGORY,
            price: item.SOL_VALUE,
            quantity: item.SOL_QTY,
          });
        });

      gtag("event", "begin_checkout", {
        currency: ccy_code,
        value: total_price.SOL_VALUE,
        items: gtag_items,
      });
    }
    return true;
  };

  const addShippingInfo = (header_result, line_result) => {
    if (site_url == "www.sedarglobal.com" && line_result.length > 0) {
      let gtag_items = [];
      line_result.length > 0 &&
        line_result.forEach((item, index) => {
          gtag_items.push({
            item_id:
              item.brand_info && item.brand_info.SII_CODE
                ? item.brand_info.SII_CODE
                : "",
            item_name: item.PRODUCT_DESC,
            affiliation: "sedarglobal.com",
            coupon: header_result.SOH_PROMO_CODE,
            currency: ccy_code,
            discount: item.SOL_PROMO_VALUE,
            index: index,
            item_brand:
              item.brand_info && item.brand_info.SII_BR_DESC
                ? item.brand_info.SII_BR_DESC
                : "",
            item_category: item.SPI_CATEGORY,
            price: item.SOL_VALUE,
            quantity: item.SOL_QTY,
          });
        });

      gtag("event", "add_shipping_info", {
        shipping_tier: "sedarglobal.com",
        value: header_result.SOH_NET_VALUE,
        tax: header_result.SOH_TAX_VALUE,
        shipping: header_result.SOH_SHIP_VALUE,
        currency: header_result.SOH_CCY_CODE,
        coupon: header_result.SOH_PROMO_CODE,
        items: gtag_items,
      });
    }
  };

  const deliverInfo = (header_result, line_result) => {
    if (site_url == "www.sedarglobal.com" && line_result.length > 0) {
      let gtag_items = [];
      line_result.length > 0 &&
        line_result.forEach((item, index) => {
          gtag_items.push({
            item_id:
              item.brand_info && item.brand_info.SII_CODE
                ? item.brand_info.SII_CODE
                : "",
            item_name: item.PRODUCT_DESC,
            affiliation: "sedarglobal.com",
            coupon: header_result.SOH_PROMO_CODE,
            currency: ccy_code,
            discount: item.SOL_PROMO_VALUE,
            index: index,
            item_brand:
              item.brand_info && item.brand_info.SII_BR_DESC
                ? item.brand_info.SII_BR_DESC
                : "",
            item_category: item.SPI_CATEGORY,
            price: item.SOL_VALUE,
            quantity: item.SOL_QTY,
          });
        });

      gtag("event", "delivery_info", {
        shipping_tier: "sedarglobal.com",
        value: header_result.SOH_NET_VALUE,
        tax: header_result.SOH_TAX_VALUE,
        shipping: header_result.SOH_SHIP_VALUE,
        currency: header_result.SOH_CCY_CODE,
        coupon: header_result.SOH_PROMO_CODE,
        items: gtag_items,
      });
    }
  };

  const addPaymentInfo = (header_result, line_result, payment_type) => {
    if (
      site_url == "www.sedarglobal.com" &&
      line_result &&
      line_result.length > 0
    ) {
      let gtag_items = [];
      line_result.length > 0 &&
        line_result.forEach((item, index) => {
          gtag_items.push({
            item_id:
              item.brand_info && item.brand_info.SII_CODE
                ? item.brand_info.SII_CODE
                : "",
            item_name: item.PRODUCT_DESC,
            affiliation: "sedarglobal.com",
            coupon: header_result.SOH_PROMO_CODE,
            currency: ccy_code,
            discount: item.SOL_PROMO_VALUE,
            index: index,
            item_brand:
              item.brand_info && item.brand_info.SII_BR_DESC
                ? item.brand_info.SII_BR_DESC
                : "",
            item_category: item.SPI_CATEGORY,
            price: item.SOL_VALUE,
            quantity: item.SOL_QTY,
          });
        });

      gtag("event", "add_payment_info", {
        payment_type: payment_type,
        value: header_result.SOH_NET_VALUE,
        tax: header_result.SOH_TAX_VALUE,
        shipping: header_result.SOH_SHIP_VALUE,
        currency: header_result.SOH_CCY_CODE,
        coupon: header_result.SOH_PROMO_CODE,
        items: gtag_items,
      });
    }
  };

  return {
    viewItemList,
    selectItem,
    viewSingleItem,
    addToCart,
    addToCartCustomizeGoogle,
    viewCart,
    removeFromCart,
    purchase,
    beginCheckout,
    addShippingInfo,
    deliverInfo,
    addPaymentInfo,
  };
}
