import { getCookie } from "cookies-next";
import store from "store-js";

const site = getCookie("siteDetail");
const ccy_code =
  site != "undefined" &&
    site &&
    JSON.parse(site) != null &&
    JSON.parse(site).show_ccy_code
    ? JSON.parse(site).show_ccy_code
    : "AED";

const user_email =
  getCookie("USER_EMAIL") == undefined ? "" : getCookie("USER_EMAIL");

var cookie_name = "deduplication_cookie";
// cookie lifetime
var days_to_store = 90;
// expected deduplication_cookie value for Admitad
var deduplication_cookie_value = "admitad";
// name of GET parameter for deduplication
// change if you have another name
var channel_name = "utm_source";
// a function to get the source from the GET parameter
if (typeof window !== "undefined") {
  window.orderedItem = window.orderedItem || []; //temporary array for product items for Admitad
}
let searchParams = new URLSearchParams(
  typeof window !== "undefined" && window.location.search
);
let utm_source_url;

if (typeof window !== "undefined") {
  utm_source_url = store.get("utm_source_url");
  if (
    searchParams &&
    searchParams.get("utm_source") &&
    searchParams.get("tagtag_uid")
  ) {
    utm_source_url =
      "utm_source=admitad&tagtag_uid=" + searchParams.get("tagtag_uid");
    store.set("utm_source_url", utm_source_url);
  }
}

const AdmitadIndex = () => {
};

const getSourceParamFromUri = function () {
  if (typeof window !== "undefined") {
    var pattern = channel_name + "=([^&]+)";
    var re = new RegExp(pattern);
    return (re.exec(document.location.search) || [])[1] || "";
  }
};

const getSourceCookie = function () {
  if (typeof window !== "undefined") {
    var matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
        cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
};

const setSourceCookie = function () {
  if (typeof window !== "undefined") {
    var param = getSourceParamFromUri();
    if (!param) {
      return;
    }
    var period = days_to_store * 60 * 60 * 24 * 1000; // in seconds
    var expiresDate = new Date(period + +new Date());
    var cookieString =
      cookie_name +
      "=" +
      param +
      "; path=/; expires=" +
      expiresDate.toGMTString();
    document.cookie = cookieString;
    document.cookie = cookieString + "; domain=." + location.host;
  }
};
// set cookie
setSourceCookie();

const admitadOrderedItem = (order_list, productID = "Non_Product") => {
  if (typeof window !== "undefined") {
    let ADMITAD = window?.ADMITAD || {};
    ADMITAD.Invoice = ADMITAD?.Invoice || {};
    // define a channel for Admitad
    if (!getSourceCookie(cookie_name)) {
      ADMITAD.Invoice.broker = "na";
    } else if (getSourceCookie(cookie_name) != deduplication_cookie_value) {
      ADMITAD.Invoice.broker = getSourceCookie(cookie_name);
    } else {
      ADMITAD.Invoice.broker = "adm";
    }

    ADMITAD.Invoice.category =
      order_list?.SOL_ITEM_LABEL == "SAMPLE" ||
        order_list?.SOL_ITEM_LABEL == "Non_Product"
        ? "2"
        : "1"; // action code (defined during integration)

    if (
      order_list?.PRODUCT_DESC &&
      order_list?.PRODUCT_DESC == "Lets Connect"
    ) {
      var cat = 1;
    } else {
      var cat =
        order_list?.SOL_ITEM_LABEL == "SAMPLE" ||
          order_list?.SOL_ITEM_LABEL == "Non_Product" ||
          order_list?.SOL_ITEM_LABEL == undefined
          ? "2"
          : "1"; // tariff code (defined during integration)
    }

    orderedItem.push({
      Product: {
        productID:
          order_list?.brand_info && order_list?.brand_info.SII_ITEM_ID
            ? order_list?.brand_info.SII_ITEM_ID
            : productID, // internal product ID (not more than 100 characters, the same as in your product feed)
        productName: order_list?.PRODUCT_DESC
          ? order_list?.PRODUCT_DESC
          : "Non_Product",
        category: cat, // tariff code (defined during integration)
        price: order_list?.SOL_VALUE ? order_list?.SOL_VALUE : 0,
        priceCurrency: order_list?.SOL_CCY_CODE
          ? order_list?.SOL_CCY_CODE
          : ccy_code,
      },
      orderQuantity: order_list?.SOL_QTY ? order_list?.SOL_QTY : 1, // product quantity
      additionalType: "sale", // always sale
    });
    return true;
  }
};

const admitadInvoice = (order_info, email_id) => {
  if (typeof window !== "undefined") {
    let ADMITAD = window?.ADMITAD || {};
    ADMITAD.Invoice.referencesOrder = ADMITAD.Invoice.referencesOrder || [];
    ADMITAD.Invoice.accountId = email_id ? email_id : user_email;
    // define a channel for Admitad
    if (!getSourceCookie(cookie_name)) {
      ADMITAD.Invoice.broker = "na";
    } else if (getSourceCookie(cookie_name) != deduplication_cookie_value) {
      ADMITAD.Invoice.broker = getSourceCookie(cookie_name);
    } else {
      ADMITAD.Invoice.broker = "adm";
    }

    ADMITAD.Invoice.referencesOrder.push({
      orderNumber:
        order_info && order_info?.SOH_TXN_NO
          ? order_info?.SOH_TXN_NO
          : "111111", // internal order ID (not more than 100 characters)
      discountCode:
        order_info && order_info?.SOH_PROMO_CODE
          ? order_info?.SOH_PROMO_CODE
          : "", // unique promo code
      orderedItem: orderedItem,
    });

    console.log(orderedItem, "orderedItem", ADMITAD.Invoice.referencesOrder);
    ADMITAD.Tracking.processPositions();
    window.orderedItem = [];
    store.remove("utm_source_url");
  }
};

const ReTagHomePage = () => {
  if (typeof window !== "undefined") {
    window._retag = window._retag || [];
    window._retag.push({ code: "9ce8884e1c", level: 0 });
    (function () {
      var id = "admitad-retag";
      if (document.getElementById(id)) {
        return;
      }
      var s = document.createElement("script");
      s.async = true;
      s.id = id;
      var r = new Date().getDate();
      s.src =
        (document.location.protocol == "https:" ? "https:" : "http:") +
        "//cdn.lenmit.com/static/js/retag.js?r=" +
        r;
      var a = document.getElementsByTagName("script")[0];
      a.parentNode.insertBefore(s, a);
    })();
  }
};

const ReTagCategoryPage = (ad_category) => {
  if (typeof window !== "undefined") {
    window.ad_category = ad_category;

    window._retag = window._retag || [];
    window._retag.push({ code: "9ce8884cd8", level: 1 });
    (function () {
      var id = "admitad-retag";
      if (document.getElementById(id)) {
        return;
      }
      var s = document.createElement("script");
      s.async = true;
      s.id = id;
      var r = new Date().getDate();
      s.src =
        (document.location.protocol == "https:" ? "https:" : "http:") +
        "//cdn.lenmit.com/static/js/retag.js?r=" +
        r;
      var a = document.getElementsByTagName("script")[0];
      a.parentNode.insertBefore(s, a);
    })();
  }
};

const ReTagCartPage = (ad_products) => {
  if (typeof window !== "undefined") {
    window.ad_products = ad_products;

    window._retag = window._retag || [];
    window._retag.push({ code: "9ce8884cd8", level: 3 });
    (function () {
      var id = "admitad-retag";
      if (document.getElementById(id)) {
        return;
      }
      var s = document.createElement("script");
      s.async = true;
      s.id = id;
      var r = new Date().getDate();
      s.src =
        (document.location.protocol == "https:" ? "https:" : "http:") +
        "//cdn.lenmit.com/static/js/retag.js?r=" +
        r;
      var a = document.getElementsByTagName("script")[0];
      a.parentNode.insertBefore(s, a);
    })();
  }
};

const ReTagThankYouPage = (order_id, amount, ad_products) => {
  // if (typeof window !== "undefined") {
  //   window.ad_order = order_id; // required
  //   window.ad_amount = amount;
  //   window.ad_products = ad_products;

  //   window._retag = window._retag || [];
  //   window._retag.push({ code: "9ce8884cdb", level: 4 });
  //   (function () {
  //     var id = "admitad-retag";
  //     if (document.getElementById(id)) {
  //       return;
  //     }
  //     var s = document.createElement("script");
  //     s.async = true;
  //     s.id = id;
  //     var r = new Date().getDate();
  //     s.src =
  //       (document.location.protocol == "https:" ? "https:" : "http:") +
  //       "//cdn.lenmit.com/static/js/retag.js?r=" +
  //       r;
  //     var a = document.getElementsByTagName("script")[0];
  //     a.parentNode.insertBefore(s, a);
  //   })();
  // }
};

export const admitad_utm_source_url = () => utm_source_url;
export default AdmitadIndex;

export {
  admitadOrderedItem,
  admitadInvoice,
  ReTagHomePage,
  ReTagCategoryPage,
  ReTagCartPage,
  ReTagThankYouPage,
  getSourceCookie,
};
