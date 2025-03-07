import { combineReducers } from "redux";
// slices
import homepageReducer from "./slices/homepage";
import layoutReducer from "./slices/layout";
import locationReducer from "./slices/location";
import productReducer from "./slices/product";
import localeReducer from "./slices/locale";
import mapReducer from "./slices/map";
import contactReducer from "./slices/contact";
import landingReducer from "./slices/landing";
import aboutReducer from "./slices/about";
import toolsReducer from "./slices/tools-and-guides";
import freeConsultationReducer from "./slices/free-consultation";
import faqsReducer from "./slices/faqs";
import serviceReducer from "./slices/service";
import blogReducer from "./slices/blog";
import contractReducer from "./slices/contract";
import freeSampleReducer from "./slices/free-sample";
import accessibilityReducer from "./slices/accessibility";
import privacyPolicyReducer from "./slices/privacy-policy";
import termsConditionsReducer from "./slices/terms-condition";
import customPrintReducer from "./slices/custom-print";
import cookiePolicyReducer from "./slices/cookie-policy";
import franchiseReducer from "./slices/franchise";
import offersReducer from "./slices/offers";
import projectReducer from "./slices/project";
import homeAutomationReducer from "./slices/home-automation";
import profileSettingReducer from "./slices/auth/profile";
import returnRefundReducer from "./slices/return-refund";
import brandsReducer from "./slices/brands";
import shippingAddressReducer from "./slices/shippingAddressList";
import myOrderReducer from "./slices/myOrder";
import deliveryReducer from "./slices/delivery";
import cartPageReducer from "./slices/cartPage";
import B2BRegistrationReducer from "./slices/b2b-registration";
import productSlugReducer from "./slices/productSlug";
import customizationReducer from "./slices/customization";
import curtainAndBlindReducer from "./slices/curtains_and_blinds";
import theMetReducer from "./slices/the-met";
import customProductReducer from "./slices/custom-product";
import cardPaymentReducer from "./slices/cardPayment";
import orderInfoReducer from "./slices/payment-success"; //
import scannerReducer from "./slices/scannerSlice";
import fontReducer from "./slices/fontSlice";
import stepReducer from "./slices/stepSlice";

// ----------------------------------------------------------------------
const rootReducer = combineReducers({
  homepage: homepageReducer,
  layout: layoutReducer,
  location: locationReducer,
  product: productReducer,
  locale: localeReducer,
  map: mapReducer,
  contact: contactReducer,
  landing: landingReducer,
  about: aboutReducer,
  toolGuides: toolsReducer,
  freeConsultation: freeConsultationReducer,
  faqs: faqsReducer,
  service: serviceReducer,
  blog: blogReducer,
  contract: contractReducer,
  freeSample: freeSampleReducer,
  accessibility: accessibilityReducer,
  privacyPolicy: privacyPolicyReducer,
  termsConditions: termsConditionsReducer,
  customPrint: customPrintReducer,
  cookiePolicy: cookiePolicyReducer,
  franchise: franchiseReducer,
  offers: offersReducer,
  project: projectReducer,
  homeAutomation: homeAutomationReducer,
  profileSetting: profileSettingReducer,
  returnRefund: returnRefundReducer,
  brands: brandsReducer,
  shippingAdress: shippingAddressReducer,
  delivery: deliveryReducer,
  myOrder: myOrderReducer,
  cartPage: cartPageReducer,
  b2BRegistration: B2BRegistrationReducer,
  productSlug: productSlugReducer,
  customization: customizationReducer,
  curtainAndBlind: curtainAndBlindReducer,
  theMet: theMetReducer,
  customProduct: customProductReducer,
  cardPayment: cardPaymentReducer,
  orderInfo: orderInfoReducer,
  scanner: scannerReducer,
  font: fontReducer,
  step: stepReducer,
});

export default rootReducer;
