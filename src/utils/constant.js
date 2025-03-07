export const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_SEDAR_ACCESS_TOKEN;
export const SEDAR_USER_DATA = process.env.NEXT_PUBLIC_SEDAR_USER_DATA;
export const SEDAR_USER_MODIFICATION_DATA =
  process.env.NEXT_PUBLIC_SEDAR_USER_MODIFICATION_DATA;
export const SEDAR_FIRST_GEO_DATA =
  process.env.NEXT_PUBLIC_SEDAR_FIRST_GEO_DATA;
export const NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES =
  "NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES";

export const NEXT_SEDAR_PUBLIC_GET_SITE_DETAIL = "SITE_DETAILS";
export const NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN = "LANGUAGE_DROPDOWN";
export const SEDAR_NEXT_LOCALE = "NEXT_LOCALE";
export const RegexDigit = /[^\d]+/g;
export const RegexDecimalDigit = /[^\d.\s]|(?<=\.\d*)\./g;

// MIDDLEWARE DEFAULT SETTINGS START.
export const eng = "en";
export const arb = "ar";
export const global = "global";
export const globalEn = "global-en";
export const globalAr = "global-ar";
export const geo = "XX";
// MIDDLEWARE DEFAULT SETTINGS END.

export function capitalizeFirstLetterOnly(str) {
  if (!str) return ""; // Handle empty string
  // Convert the whole string to lowercase, then capitalize the first letter
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// COUNTRY DATA START
export const countries = {
  BH: {
    code: "bhr",
    name: "Bahrain",
    country_code: "BH",
    url: "bhr",
  },
  SA: {
    code: "ksa",
    name: "KSA",
    country_code: "SA",
    url: "ksa",
  },
  AE: {
    code: "uae",
    name: "UAE",
    country_code: "AE",
    url: "uae",
  },
  US: {
    code: "global",
    name: "Global",
    country_code: "XX",
    url: "global",
  },
  OM: {
    code: "omn",
    name: "Oman",
    country_code: "OM",
    url: "omn",
  },
  QA: {
    code: "qat",
    name: "Qatar",
    country_code: "QA",
    url: "qat",
  },
  XX: {
    code: "global",
    name: "Global",
    country_code: "XX",
    url: "global",
  },
  EG: {
    code: "egy",
    name: "egy",
    country_code: "EG",
  },
  KW: {
    code: "kwt",
    name: "kwt",
    country_code: "KW",
  },
};

export const countries_en_url = {
  "uae-en": {
    locale: "uae-en",
    code: "uae",
    name: "UAE",
    country_code: "AE",
    lang: "en",
    path: "/assets/images/ae.png",
    ccy_code: "AED",
  },
  "ksa-en": {
    locale: "ksa-en",
    code: "ksa",
    name: "KSA",
    country_code: "SA",
    lang: "en",
    path: "/assets/images/sa.png",
    ccy_code: "SAR",
  },
  "omn-en": {
    locale: "omn-en",
    code: "omn",
    name: "Oman",
    country_code: "OM",
    lang: "en",
    path: "/assets/images/om.png",
    ccy_code: "OMR",
  },
  "qat-en": {
    locale: "qat-en",
    code: "qat",
    name: "qatar",
    country_code: "QA",
    lang: "en",
    path: "/assets/images/qa.png",
    ccy_code: "QAR",
  },
  "bhr-en": {
    locale: "bhr-en",
    code: "bhr",
    name: "Bahrain",
    country_code: "BH",
    lang: "en",
    path: "/assets/images/bh.png",
    ccy_code: "BHD",
  },
  "global-en": {
    locale: "global-en",
    code: "global",
    name: "Global",
    country_code: "XX",
    lang: "en",
    path: "/assets/images/xx.png",
    ccy_code: "USD",
  },
  "egy-en": {
    code: "egy",
    name: "Egypt",
    country_code: "EG",
    lang: "en",
    path: "/assets/images/eg.png",
    ccy_code: "EGP",
  },
  "kwt-en": {
    code: "kwt",
    name: "Kuwait",
    country_code: "KW",
    lang: "en",
    path: "/assets/images/kw.png",
    ccy_code: "KWT",
  },
};

export const countries_ar_url = {
  "uae-ar": {
    locale: "uae-ar",
    code: "uae",
    name: "UAE",
    country_code: "AE",
    lang: "ar",
    path: "/assets/images/ae.png",
    ccy_code: "AED",
  },
  "ksa-ar": {
    locale: "ksa-ar",
    code: "ksa",
    name: "KSA",
    country_code: "SA",
    lang: "ar",
    path: "/assets/images/sa.png",
    ccy_code: "SAR",
  },
  "omn-ar": {
    locale: "omn-ar",
    code: "omn",
    name: "Oman",
    country_code: "OM",
    lang: "ar",
    path: "/assets/images/om.png",
    ccy_code: "OMR",
  },
  "qat-ar": {
    locale: "qat-ar",
    code: "qat",
    name: "qatar",
    country_code: "QA",
    lang: "ar",
    path: "/assets/images/qa.png",
    ccy_code: "QAR",
  },
  "bhr-ar": {
    locale: "bhr-ar",
    code: "bhr",
    name: "Bahrain",
    country_code: "BH",
    lang: "ar",
    path: "/assets/images/bh.png",
    ccy_code: "BHD",
  },
  "global-ar": {
    locale: "global-ar",
    code: "global",
    name: "Global",
    country_code: "XX",
    lang: "ar",
    path: "/assets/images/xx.png",
    ccy_code: "USD",
  },
  "egy-ar": {
    code: "egy",
    name: "Egypt",
    country_code: "EG",
    lang: "ar",
    path: "/assets/images/eg.png",
    ccy_code: "EGP",
  },
  "kwt-ar": {
    code: "kwt",
    name: "Kuwait",
    country_code: "KW",
    lang: "ar",
    path: "/assets/images/kw.png",
    ccy_code: "KWT",
  },
};

export const countries_ru_url = {
  "uae-ru": {
    code: "uae",
    name: "UAE",
    country_code: "AE",
    lang: "ru",
    path: "/assets/images/ae.png",
    ccy_code: "AED",
  },
  "ksa-ru": {
    code: "ksa",
    name: "KSA",
    country_code: "SA",
    lang: "ru",
    path: "/assets/images/sa.png",
    ccy_code: "SAR",
  },
  "omn-ru": {
    code: "omn",
    name: "Oman",
    country_code: "OM",
    lang: "ru",
    path: "/assets/images/om.png",
    ccy_code: "OMR",
  },
  "qat-ru": {
    code: "qat",
    name: "qatar",
    country_code: "QA",
    lang: "ru",
    path: "/assets/images/qa.png",
    ccy_code: "QAR",
  },
  "bhr-ru": {
    code: "bhr",
    name: "Bahrain",
    country_code: "BH",
    lang: "ru",
    path: "/assets/images/bh.png",
    ccy_code: "BHD",
  },
  "global-ru": {
    code: "global",
    name: "Global",
    country_code: "XX",
    lang: "ru",
    path: "/assets/images/xx.png",
    ccy_code: "USD",
  },
  "egy-ru": {
    code: "egy",
    name: "Egypt",
    country_code: "EG",
    lang: "ru",
    path: "/assets/images/eg.png",
    ccy_code: "EGP",
  },
  "kwt-ru": {
    code: "kwt",
    name: "Kuwait",
    country_code: "KW",
    lang: "ru",
    path: "/assets/images/kw.png",
    ccy_code: "KWT",
  },
};

export const defaultCountryPath = {
  BH: {
    url: "bhr",
  },
  SA: {
    url: "ksa",
  },
  AE: {
    url: "uae",
  },
  OM: {
    url: "omn",
  },
  QA: {
    url: "qat",
  },
  XX: {
    url: "global",
  },
  EG: {
    url: "egy",
  },
  KW: {
    url: "kwt",
  },
};

export const allLangs = [
  {
    label: "Qatar",
    value: `qat`,
    icon: "/assets/header/languages/qat.png",
  },
  {
    label: "UAE",
    value: `uae`,
    icon: "/assets/header/languages/uae.png",
  },
  {
    label: "Bahrain",
    value: `bhr`,
    icon: "/assets/header/languages/bhr.png",
  },
  {
    label: "Global",
    value: `global`,
    icon: "/assets/header/languages/global.png",
  },
  {
    label: "Saudi Arabia",
    value: `ksa`,
    icon: "/assets/header/languages/ksa.png",
  },
  {
    label: "Oman",
    value: `omn`,
    icon: "/assets/header/languages/omn.png",
  },
  {
    label: "Egypt",
    value: `egy`,
    icon: "/assets/header/languages/eg.png",
  },
  {
    label: "Kuwait",
    value: `kwt`,
    icon: "/assets/header/languages/kw.jpg",
  },
];

export const countryCode = ["BH", "SA", "AE", "OM", "QA"];
export const languageChange = [
  { label: "English", value: "en", type: "en" },
  { label: "العربية", value: "ar", type: "ar" },
  { label: "Русский", value: "ru", type: "ru" },
  { label: "中文", value: "ch", type: "ch" },
];
// COUNTRY DATA END

export const OnlineStoreText = {
  GB: { en: "UNITED KINGDOM", ar: "المملكة المتحدة ", isoen: "", isoar: "" },
  AR: { en: "ARGENTINA", ar: "الأرجنتين", isoen: "GLOBAL", isoar: "عالمي" },
  AU: { en: "AUSTRALIA", ar: "أستراليا", isoen: "GLOBAL", isoar: "عالمي" },
  BS: { en: "BAHAMAS", ar: "الباهاما", isoen: "GLOBAL", isoar: "عالمي" },
  BE: { en: "BELGIUM", ar: "بلجيكا", isoen: "GLOBAL", isoar: "عالمي" },
  BR: { en: "BRAZIL", ar: "البرازيل", isoen: "GLOBAL", isoar: "عالمي" },
  CA: { en: "CANADA", ar: "كندا", isoen: "GLOBAL", isoar: "عالمي" },
  CN: { en: "CHINA", ar: "الصين", isoen: "GLOBAL", isoar: "عالمي" },
  CO: { en: "COLOMBIA", ar: "كولومبيا", isoen: "GLOBAL", isoar: "عالمي" },
  CU: { en: "CUBA", ar: "كوبا", isoen: "GLOBAL", isoar: "عالمي" },
  DO: {
    en: "DOMINICAN REPUBLIC",
    ar: "جمهورية الدومينيكان",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  EC: { en: "ECUADOR", ar: "الاكوادور", isoen: "GLOBAL", isoar: "عالمي" },
  SV: { en: "EL SALVADOR", ar: "السلفادور", isoen: "GLOBAL", isoar: "عالمي" },
  FR: { en: "FRANCE", ar: "فرنسا", isoen: "GLOBAL", isoar: "عالمي" },
  DE: { en: "GERMANY", ar: "ألمانيا", isoen: "GLOBAL", isoar: "عالمي" },
  GT: { en: "GUATEMALA", ar: "جواتيمالا", isoen: "GLOBAL", isoar: "عالمي" },
  HT: { en: "HAITI", ar: "هايتي", isoen: "GLOBAL", isoar: "عالمي" },
  HN: { en: "HONDURAS", ar: "هندوراس", isoen: "GLOBAL", isoar: "عالمي" },
  IN: { en: "INDIA", ar: "الهند", isoen: "GLOBAL", isoar: "عالمي" },
  IE: { en: "IRELAND", ar: "إيرلندا", isoen: "GLOBAL", isoar: "عالمي" },
  IL: { en: "ISRAEL", ar: "إسرائيل", isoen: "GLOBAL", isoar: "عالمي" },
  IT: { en: "ITALY", ar: "إيطاليا", isoen: "GLOBAL", isoar: "عالمي" },
  JP: { en: "JAPAN", ar: "اليابان", isoen: "GLOBAL", isoar: "عالمي" },
  KR: { en: "KOREA", ar: "كوريا", isoen: "GLOBAL", isoar: "عالمي" },
  MX: { en: "MEXICO", ar: "المكسيك", isoen: "GLOBAL", isoar: "عالمي" },
  NL: { en: "NETHERLANDS", ar: "هولندا", isoen: "GLOBAL", isoar: "عالمي" },
  PH: { en: "PHILIPPINES", ar: "فيلبيني", isoen: "GLOBAL", isoar: "عالمي" },
  ES: { en: "SPAIN", ar: "إسبانيا", isoen: "GLOBAL", isoar: "عالمي" },
  SE: { en: "SWEDEN", ar: "السويد", isoen: "GLOBAL", isoar: "عالمي" },
  CH: { en: "SWITZERLAND", ar: "سويسرا", isoen: "GLOBAL", isoar: "عالمي" },
  TW: { en: "TAIWAN", ar: "تايوان", isoen: "GLOBAL", isoar: "عالمي" },
  VE: { en: "VENEZUELA", ar: "فنزويلا", isoen: "GLOBAL", isoar: "عالمي" },
  VN: { en: "VIET NAM", ar: "فيتنام", isoen: "GLOBAL", isoar: "عالمي" },
  AF: { en: "AFGHANISTAN", ar: "أفغانستان", isoen: "GLOBAL", isoar: "عالمي" },
  AL: { en: "ALBANIA", ar: "ألبانيا", isoen: "GLOBAL", isoar: "عالمي" },
  DZ: { en: "ALGERIA", ar: "الجزائر", isoen: "GLOBAL", isoar: "عالمي" },
  AS: {
    en: "AMERICAN SAMOA",
    ar: "ساموا الأمريكية",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  AD: { en: "ANDORRA", ar: "أندورا", isoen: "GLOBAL", isoar: "عالمي" },
  AO: { en: "ANGOLA", ar: "أنغولا", isoen: "GLOBAL", isoar: "عالمي" },
  AM: { en: "ARMENIA", ar: "أرمينيا", isoen: "GLOBAL", isoar: "عالمي" },
  AT: { en: "AUSTRIA", ar: "النمسا", isoen: "GLOBAL", isoar: "عالمي" },
  AZ: { en: "AZERBAIJAN", ar: "أذربيجان", isoen: "GLOBAL", isoar: "عالمي" },
  BH: { en: "Bahrain", ar: "البحرين", isoen: "BHR", isoar: "البحرين" },
  BD: { en: "BANGLADESH", ar: "بنغلاديش", isoen: "GLOBAL", isoar: "عالمي" },
  BB: { en: "BARBADOS", ar: "بربادوس", isoen: "GLOBAL", isoar: "عالمي" },
  BY: { en: "BELARUS", ar: "بيلاروسيا", isoen: "GLOBAL", isoar: "عالمي" },
  BZ: { en: "BELIZE", ar: "بليز", isoen: "GLOBAL", isoar: "عالمي" },
  BJ: { en: "BENIN", ar: "بنين", isoen: "GLOBAL", isoar: "عالمي" },
  BM: { en: "BERMUDA", ar: "برمودا", isoen: "GLOBAL", isoar: "عالمي" },
  BT: { en: "BHUTAN", ar: "بوتان", isoen: "GLOBAL", isoar: "عالمي" },
  BO: { en: "BOLIVIA", ar: "بوليفيا", isoen: "GLOBAL", isoar: "عالمي" },
  BA: {
    en: "BOSNIA AND HERZEGOVINA",
    ar: "البوسنة والهرسك",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  BW: { en: "BOTSWANA", ar: "بوتسوانا", isoen: "GLOBAL", isoar: "عالمي" },
  BG: { en: "BULGARIA", ar: "بلغاريا", isoen: "GLOBAL", isoar: "عالمي" },
  BF: {
    en: "BURKINA FASO",
    ar: "بوركينا فاسو",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  BI: { en: "BURUNDI", ar: "بوروندي", isoen: "GLOBAL", isoar: "عالمي" },
  KH: { en: "CAMBODIA", ar: "كمبوديا", isoen: "GLOBAL", isoar: "عالمي" },
  CM: { en: "CAMEROON", ar: "الكاميرون", isoen: "GLOBAL", isoar: "عالمي" },
  CV: {
    en: "CAPE VERDE ISLANDS",
    ar: "جزر الرأس الأخضر",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  TD: { en: "CHAD", ar: "تشاد", isoen: "GLOBAL", isoar: "عالمي" },
  CL: { en: "CHILE", ar: "شيلي", isoen: "GLOBAL", isoar: "عالمي" },
  CG: { en: "CONGO", ar: "الكونغو", isoen: "GLOBAL", isoar: "عالمي" },
  CR: { en: "COSTA RICA", ar: "كوستا ريكا", isoen: "GLOBAL", isoar: "عالمي" },
  HR: { en: "CROATIA", ar: "كرواتيا", isoen: "GLOBAL", isoar: "عالمي" },
  CY: { en: "CYPRUS", ar: "قبرص", isoen: "GLOBAL", isoar: "عالمي" },
  CZ: {
    en: "CZECH REPUBLIC",
    ar: "الجمهورية التشيكية",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  DK: { en: "DENMARK", ar: "الدنمارك", isoen: "GLOBAL", isoar: "عالمي" },
  DJ: { en: "DJIBOUTI", ar: "جيبوتي", isoen: "GLOBAL", isoar: "عالمي" },
  DM: { en: "DOMINICA", ar: "دومينيكا", isoen: "GLOBAL", isoar: "عالمي" },
  EG: { en: "EGYPT", ar: "مصر", isoen: "GLOBAL", isoar: "عالمي" },
  ER: { en: "ERITREA", ar: "إريتريا", isoen: "GLOBAL", isoar: "عالمي" },
  EE: { en: "ESTONIA", ar: "إستونيا", isoen: "GLOBAL", isoar: "عالمي" },
  ET: { en: "ETHIOPIA", ar: "أثيوبيا", isoen: "GLOBAL", isoar: "عالمي" },
  FJ: { en: "FIJI", ar: "فيجي", isoen: "GLOBAL", isoar: "عالمي" },
  FI: { en: "FINLAND", ar: "فنلندا", isoen: "GLOBAL", isoar: "عالمي" },
  PF: {
    en: "FRENCH POLYNESIA",
    ar: "بولينيزيا الفرنسية",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  GA: { en: "GABON", ar: "جابون", isoen: "GLOBAL", isoar: "عالمي" },
  GM: { en: "GAMBIA", ar: "غامبيا", isoen: "GLOBAL", isoar: "عالمي" },
  GE: { en: "GEORGIA", ar: "جورجيا", isoen: "GLOBAL", isoar: "عالمي" },
  GH: { en: "GHANA", ar: "غانا", isoen: "GLOBAL", isoar: "عالمي" },
  GR: { en: "GREECE", ar: "اليونان", isoen: "GLOBAL", isoar: "عالمي" },
  GD: { en: "GRENADA", ar: "غرينادا", isoen: "GLOBAL", isoar: "عالمي" },
  GN: { en: "GUINEA", ar: "غينيا", isoen: "GLOBAL", isoar: "عالمي" },
  GY: { en: "GUYANA", ar: "غيانا", isoen: "GLOBAL", isoar: "عالمي" },
  HU: { en: "HUNGARY", ar: "هنغاريا", isoen: "GLOBAL", isoar: "عالمي" },
  IS: { en: "ICELAND", ar: "أيسلندا", isoen: "GLOBAL", isoar: "عالمي" },
  ID: { en: "INDONESIA", ar: "إندونيسيا", isoen: "GLOBAL", isoar: "عالمي" },
  IR: { en: "IRAN", ar: "إيران", isoen: "GLOBAL", isoar: "عالمي" },
  IQ: { en: "IRAQ", ar: "العراق", isoen: "GLOBAL", isoar: "عالمي" },
  JM: { en: "JAMAICA", ar: "جامايكا", isoen: "GLOBAL", isoar: "عالمي" },
  JO: { en: "JORDAN", ar: "الأردن", isoen: "GLOBAL", isoar: "عالمي" },
  KZ: { en: "KAZAKHSTAN", ar: "كازاخستان", isoen: "GLOBAL", isoar: "عالمي" },
  KE: { en: "KENYA", ar: "كينيا", isoen: "GLOBAL", isoar: "عالمي" },
  KP: { en: "KOREA", ar: "كوريا", isoen: "GLOBAL", isoar: "عالمي" },
  KW: { en: "KUWAIT", ar: "الكويت", isoen: "GLOBAL", isoar: "عالمي" },
  LV: { en: "LATVIA", ar: "لاتفيا", isoen: "GLOBAL", isoar: "عالمي" },
  LB: { en: "LEBANON", ar: "لبنان", isoen: "GLOBAL", isoar: "عالمي" },
  LR: { en: "LIBERIA", ar: "ليبيريا", isoen: "GLOBAL", isoar: "عالمي" },
  LY: { en: "LIBYA", ar: "ليبيا", isoen: "GLOBAL", isoar: "عالمي" },
  LT: { en: "LITHUANIA", ar: "ليثوانيا", isoen: "GLOBAL", isoar: "عالمي" },
  LU: { en: "LUXEMBOURG", ar: "لوكسمبورغ", isoen: "GLOBAL", isoar: "عالمي" },
  MG: { en: "MADAGASCAR", ar: "مدغشقر", isoen: "GLOBAL", isoar: "عالمي" },
  MW: { en: "MALAWI", ar: "ملاوي", isoen: "GLOBAL", isoar: "عالمي" },
  MY: { en: "MALAYSIA", ar: "ماليزيا", isoen: "GLOBAL", isoar: "عالمي" },
  MV: { en: "MALDIVES", ar: "جزر المالديف", isoen: "GLOBAL", isoar: "عالمي" },
  ML: { en: "MALI", ar: "مالي", isoen: "GLOBAL", isoar: "عالمي" },
  MT: { en: "MALTA", ar: "مالطا", isoen: "GLOBAL", isoar: "عالمي" },
  MR: { en: "MAURITANIA", ar: "موريتانيا", isoen: "GLOBAL", isoar: "عالمي" },
  MU: { en: "MAURITIUS", ar: "موريشيوس", isoen: "GLOBAL", isoar: "عالمي" },
  MC: { en: "MONACO", ar: "موناكو", isoen: "GLOBAL", isoar: "عالمي" },
  MN: { en: "MONGOLIA", ar: "منغوليا", isoen: "GLOBAL", isoar: "عالمي" },
  ME: { en: "MONTENEGRO", ar: "مونتينيغرو", isoen: "GLOBAL", isoar: "عالمي" },
  MA: { en: "MOROCCO", ar: "المغرب", isoen: "GLOBAL", isoar: "عالمي" },
  MZ: { en: "MOZAMBIQUE", ar: "موزامبيق", isoen: "GLOBAL", isoar: "عالمي" },
  NA: { en: "NAMIBIA", ar: "ناميبيا", isoen: "GLOBAL", isoar: "عالمي" },
  NP: { en: "NEPAL", ar: "النيبال", isoen: "GLOBAL", isoar: "عالمي" },
  NZ: { en: "NEW ZEALAND", ar: "نيوزيلندا", isoen: "GLOBAL", isoar: "عالمي" },
  NI: { en: "NICARAGUA", ar: "نيكاراغوا", isoen: "GLOBAL", isoar: "عالمي" },
  NE: { en: "NIGER", ar: "النيجر", isoen: "GLOBAL", isoar: "عالمي" },
  NG: { en: "NIGERIA", ar: "نيجيريا", isoen: "GLOBAL", isoar: "عالمي" },
  NO: { en: "NORWAY", ar: "النرويج", isoen: "GLOBAL", isoar: "عالمي" },
  OM: { en: "Oman", ar: "سلطنة عمان", isoen: "OMN", isoar: "عمان" },
  PK: { en: "PAKISTAN", ar: "باكستان", isoen: "GLOBAL", isoar: "عالمي" },
  PA: { en: "PANAMA", ar: "بنما", isoen: "GLOBAL", isoar: "عالمي" },
  PG: {
    en: "PAPUA NEW GUINEA",
    ar: "بابوا غينيا الجديدة",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  PY: { en: "PARAGUAY", ar: "باراغواي", isoen: "GLOBAL", isoar: "عالمي" },
  PE: { en: "PERU", ar: "بيرو", isoen: "GLOBAL", isoar: "عالمي" },
  PL: { en: "POLAND", ar: "بولندا", isoen: "GLOBAL", isoar: "عالمي" },
  PT: { en: "PORTUGAL", ar: "البرتغال", isoen: "GLOBAL", isoar: "عالمي" },
  QA: { en: "Qatar", ar: "دولة قطر", isoen: "QAT", isoar: "قطر" },
  RO: { en: "ROMANIA", ar: "رومانيا", isoen: "GLOBAL", isoar: "عالمي" },
  RW: { en: "RWANDA", ar: "رواندا", isoen: "GLOBAL", isoar: "عالمي" },
  SA: {
    en: "Kingdom of Saudi Arabia",
    ar: "المملكة العربية السعودية",
    isoen: "KSA",
    isoar: "السعودية",
  },
  SN: { en: "SENEGAL", ar: "السنغال", isoen: "GLOBAL", isoar: "عالمي" },
  RS: { en: "SERBIA", ar: "صربيا", isoen: "GLOBAL", isoar: "عالمي" },
  SL: { en: "SIERRA LEONE", ar: "سيرا ليون", isoen: "GLOBAL", isoar: "عالمي" },
  SG: { en: "SINGAPORE", ar: "سنغافورة", isoen: "GLOBAL", isoar: "عالمي" },
  SK: { en: "SLOVAKIA", ar: "سلوفاكيا", isoen: "GLOBAL", isoar: "عالمي" },
  SI: { en: "SLOVENIA", ar: "سلوفينيا", isoen: "GLOBAL", isoar: "عالمي" },
  SB: {
    en: "SOLOMON ISLANDS",
    ar: "جزر سليمان",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  SO: { en: "SOMALIA", ar: "الصومال", isoen: "GLOBAL", isoar: "عالمي" },
  ZA: {
    en: "SOUTH AFRICA",
    ar: "جنوب أفريقيا",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  LK: { en: "SRI LANKA", ar: "سيريلانكا", isoen: "GLOBAL", isoar: "عالمي" },
  SD: { en: "SUDAN", ar: "السودان", isoen: "GLOBAL", isoar: "عالمي" },
  SR: { en: "SURINAME", ar: "سورينام", isoen: "GLOBAL", isoar: "عالمي" },
  SZ: { en: "SWAZILAND", ar: "سوازيلاند", isoen: "GLOBAL", isoar: "عالمي" },
  TJ: { en: "TAJIKISTAN", ar: "طاجيكستان", isoen: "GLOBAL", isoar: "عالمي" },
  TH: { en: "THAILAND", ar: "تايلاند", isoen: "GLOBAL", isoar: "عالمي" },
  TG: { en: "TOGO", ar: "توجو", isoen: "GLOBAL", isoar: "عالمي" },
  TT: {
    en: "TRINIDAD AND TOBAGO",
    ar: "ترينداد وتوباغو",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  TN: { en: "TUNISIA", ar: "تونس", isoen: "GLOBAL", isoar: "عالمي" },
  TR: { en: "TURKEY", ar: "تركيا", isoen: "GLOBAL", isoar: "عالمي" },
  TM: { en: "TURKMENISTAN", ar: "تركمانستان", isoen: "GLOBAL", isoar: "عالمي" },
  TV: { en: "TUVALU", ar: "توفالو", isoen: "GLOBAL", isoar: "عالمي" },
  UG: { en: "UGANDA", ar: "أوغندا", isoen: "GLOBAL", isoar: "عالمي" },
  UA: { en: "UKRAINE", ar: "أوكرانيا", isoen: "GLOBAL", isoar: "عالمي" },
  AE: {
    en: "United Arab Emirates",
    ar: "الإمارات العربية المتحدة",
    isoen: "UAE",
    isoar: "الإمارات",
  },
  US: {
    en: "United States of America",
    ar: "الولايات المتحدة",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  UY: { en: "URUGUAY", ar: "أوروجواي", isoen: "GLOBAL", isoar: "عالمي" },
  UZ: { en: "UZBEKISTAN", ar: "أوزبيكستان", isoen: "GLOBAL", isoar: "عالمي" },
  VU: { en: "VANUATU", ar: "فانواتو", isoen: "GLOBAL", isoar: "عالمي" },
  YE: { en: "YEMEN", ar: "اليمن", isoen: "GLOBAL", isoar: "عالمي" },
  ZM: { en: "ZAMBIA", ar: "زامبيا", isoen: "GLOBAL", isoar: "عالمي" },
  RU: { en: "RUSSIA", ar: "روسيا", isoen: "GLOBAL", isoar: "عالمي" },
  XX: {
    en: "United States of America ",
    ar: "الولايات المتحدة الأمريكية ",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  get_inspired: {
    en: "Get inspired",
    ar: "تصفح التصاميم",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
  get_started: {
    en: "Get Started",
    ar: "ادخل موقعنا",
    isoen: "GLOBAL",
    isoar: "عالمي",
  },
};

// ----------------------------------------------------------------------
export const countries_url_path = {
  ...countries_en_url,
  ...countries_ar_url,
  ...countries_ru_url,
};

export const projectType = [
  {
    label: "Hospitality",
    value: "Hospitality",
  },
  {
    label: "EducationalInstitutions",
    value: "Educational Institutions",
  },
  {
    label: "GovernmentInstitutions",
    value: "Government Institutions",
  },
  {
    label: "Healthcare",
    value: "Healthcare",
  },
  {
    label: "Residential",
    value: "Residential",
  },
  {
    label: "Retail",
    value: "Retail",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export const projectBudgets = [
  {
    id: 1,
    label: "Lessthen 10,000$",
    value: "100,000$",
  },
  {
    id: 2,
    label: "10,000$ - 50,000$",
    value: "200,000$",
  },
  {
    id: 3,
    label: "50,000$ - 100,000$",
    value: "200,000$",
  },
  {
    id: 4,
    label: "100,000$ - 250,000$",
    value: "200,000$",
  },
  {
    id: 5,
    label: "Morethen 250,000$",
    value: "300,000$- more",
  },
];

export const fileType = [
  "text/csv",
  "text/xls",
  "text/tsv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const mm_unit_val = 10;
export const cm_unit_val = 1;
export const inch_unit_val = 0.393701;

export const selectMeasurementUnitConversion = (type, value) => {
  let Element;
  const finalValue = Number(value);
  switch (type) {
    case "cm":
      Element = Number(finalValue * cm_unit_val).toFixed(2);
      break;

    case "mm":
      Element = Number(finalValue * mm_unit_val).toFixed(2);
      break;

    case "inch":
      Element = Number(finalValue * inch_unit_val).toFixed(2);
      break;
  }
  return Number(Element);
};

export const customMeasurementUnitConversion = (
  oldValue,
  type,
  value = false
) => {
  let setValue = value;

  if (oldValue == "mm" && type == "cm") {
    setValue = (value * (cm_unit_val / mm_unit_val)).toFixed(0);
  } else if (oldValue == "mm" && type == "inch") {
    setValue = (value * (inch_unit_val / mm_unit_val)).toFixed(2);
  } else if (oldValue == "inch" && type == "mm") {
    setValue = (value * (mm_unit_val / inch_unit_val)).toFixed(0);
  } else if (oldValue == "inch" && type == "cm") {
    setValue = (value * (cm_unit_val / inch_unit_val)).toFixed(0);
  } else if (oldValue == "cm" && type == "mm") {
    setValue = (value * (mm_unit_val / cm_unit_val)).toFixed(0);
  } else if (oldValue == "cm" && type == "inch") {
    setValue = (value * (inch_unit_val / cm_unit_val)).toFixed(2);
  }
  return setValue;
};

export const ProductCommonList = (props) => {
  const {
    data,
    measuring_unit,
    SPI_RESTRICT_TO_MATERIAL_COMMON_YN = "N",
    SII_COMMON,
    keyName,
    translate,
  } = props;

  console.log(props, 'ProductCommonList');
  let CREATE_SPI_COMMON_STANDARD_List = [];

  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const commonValue = selectMeasurementUnitConversion(
        measuring_unit,
        element
      );

      CREATE_SPI_COMMON_STANDARD_List.push({
        label: `${commonValue} ${translate(measuring_unit)}`,
        value: commonValue,
        [keyName]: element,
        isDisabled:
          SPI_RESTRICT_TO_MATERIAL_COMMON_YN === "Y" &&
          Number(SII_COMMON) <= Number(element),
      });
    }
  }

  CREATE_SPI_COMMON_STANDARD_List.push({
    label: translate("Other"),
    value: "custom",
    [keyName]: "custom",
  });
  return CREATE_SPI_COMMON_STANDARD_List;
};

export const getYears = () => {
  const date = new Date();
  let today_year = date.getFullYear();
  let year11 = today_year + 11;
  let year_array = [];

  for (today_year; today_year < year11; today_year++) {
    year_array.push({
      label: today_year,
      value: today_year.toString().substr(-2),
    });
  }
  return year_array || [];
};

export const getMonths = (translate) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let newMonths = [];
  months.forEach((element, index) => {
    if (index < 9) {
      newMonths.push({
        label: translate(element),
        value: `0${index + 1}`,
      });
    } else {
      newMonths.push({
        label: translate(element),
        value: `${index + 1}`,
      });
    }
  });

  return newMonths;
};

export const accordianData = [
  {
    id: 1,
    accSum: "Do you offer a measuring and fitting service?",
    accDet:
      "No, we do not offer a measuring and fitting service for our online service but our expert sales team are on hand via email, chat or over the phone to guide you through measuring and fitting your blinds. Alternatively, take a look at our measuring and fitting guides for more information.",
  },
  {
    id: 2,
    accSum: "What is the difference between a recess and an exact fitting?",
    accDet:
      "Recess blinds fit inside the window recess. We will make all of the adjustments for you and your blind will be made to fit inside the recess. These blinds are around the same size as the window and fill the entire window area.Exact blinds hang outside of the recess. These blinds are usually attached to the wall above the window and so cover the window as well as part of the wall on both sides of the recess.Take a look at our measuring guide for more detailed information on measuring your windows for blinds..",
  },
  {
    id: 3,
    accSum: "How do I clean my blind?",
    accDet:
      "All of our blinds are made with materials that are easily wiped clean to help you keep them looking their best. We know how important blinds are to the overall look of your home so our blinds are stain and waterproof.",
  },
];

export const Tabdata = [
  {
    id: 1,
    tabImg: "/assets/ToolsAndGuides/tab1.avif",
    tabDet: "Sunscreen Roller Shades",
  },
  {
    id: 3,
    tabImg: "/assets/ToolsAndGuides/tab2.avif",
    tabDet: "Blackout Roller Shades",
  },
  {
    id: 3,
    tabImg: "/assets/ToolsAndGuides/tab4.avif",
    tabDet: "Solar Roller Shades",
  },
];

export const returnRefundData = [
  {
    id: "1",
    listDet: "Material or workmanship defect (confirmed by Sedar team).",
  },
  {
    id: "2",
    listDet: "Malfunctioning product.",
  },
  {
    id: "3",
    listDet:
      "Product delivered in the wrong size due to our production facility's error.",
  },
  {
    id: "4",
    listDet:
      "Retur request submitted within 2 days of delivery, with unused items in their original packaging.",
  },
  {
    id: "5",
    listDet: "Product deemed irreparable.",
  },
];

export const returnRefundDataSecond = [
  {
    id: "1",
    secondList:
      "Products that have been used, modified, altered, washed, assembled, or installed, unless they are received defective.",
  },
  {
    id: "2",
    secondList:
      "Products damaged due to misuse or displaying signs of wear, even within the warranty period.",
  },
  {
    id: "3",
    secondList:
      "Assembled products, except when a manufacturing defect is determined by the Sedar team. We retain the right to assess defects and will repair or replace defective products at our discretion.",
  },
];

export const faqsTabs = [
  {
    id: "1",
    tabName: "Ordering & Purchasing",
  },
  {
    id: "2",
    tabName: "Delivery",
  },
];

export const faqsACC = [
  {
    id: "1",
    title: "How to choose curtains for the living room?",
    description:
      "You can choose your curtains for the living room based on your desired sunlight level, style, color, fabric, and existing decor. Sedar also offers consultation services to assist customers who need it for their selection process. ",
  },
  {
    id: "2",
    title: "How to hang curtains?",
    description:
      "You can hang curtains by attaching curtain rods securely to the wall or ceiling, sliding the curtain rings onto the rod, and then draping the curtains. For the curtains with rails like pinch pleat and ripple fold, you will need to wall mount by a squint. Yet, At Sedar, we take care of the entire process for you from start to finish.",
  },
];

export const data = [
  {
    id: "1",
    freeImage: "/assets/freeSample/free1.avif",
    freeDet: "Pinch Pleat Curtains",
  },
  {
    id: "2",
    freeImage: "/assets/freeSample/free2.avif",
    freeDet: "Roller Blinds",
  },
  {
    id: "3",
    freeImage: "/assets/freeSample/free2.avif",
    freeDet: "Roller Blinds",
  },
  {
    id: "4",
    freeImage: "/assets/freeSample/free2.avif",
    freeDet: "Roller Blinds",
  },
  {
    id: "5",
    freeImage: "/assets/freeSample/free2.avif",
    freeDet: "Roller Blinds",
  },
  {
    id: "6",
    freeImage: "/assets/freeSample/free2.avif",
    freeDet: "Roller Blinds",
  },
  {
    id: "7",
    freeImage: "/assets/freeSample/free2.avif",
    freeDet: "Roller Blinds",
  },
  {
    id: "8",
    freeImage: "/assets/freeSample/free2.avif",
    freeDet: "Roller Blinds",
  },
];

export const FilterColor = [
  {
    id: "1",
    label: "Beige",
  },
  {
    id: "2",
    label: "Blue",
  },
  {
    id: "3",
    label: "Grey",
  },
  {
    id: "4",
    label: "Brown",
  },
  {
    id: "5",
    label: "Maroon",
  },
];

export const freeCardDetail = [
  {
    id: "1",
    cardImg: "/assets/product/cardpp.png",
  },
  {
    id: "2",
    cardImg: "/assets/product/cardpp.png",
  },
  {
    id: "3",
    cardImg: "/assets/product/cardpp.png",
  },
  {
    id: "4",
    cardImg: "/assets/product/cardpp.png",
  },
];

export const franchiseSwiper = [
  {
    id: "1",
    swiperImage: "/assets/franchise/realty1.avif",
    swiperHeading: "The opportunity is yours",
    swiperData:
      "The Sedar franchisee can expect to deliver the highest quality fashions at competitive prices. From simple mini blinds to opulent and embellished drapes, the options for beautifying customers homes are endless.",
  },
  {
    id: "2",
    swiperImage: "/assets/franchise/realty2.avif",
    swiperHeading: "Make your vision realty",
    swiperData:
      "The Sedar franchisee can expect to deliver the highest quality window fashions at competitive prices. From simple mini blinds to opulent and embellished drapes, the options for beautifying customers homes are endless..",
  },
];

export const serviceSwiperImage = [
  {
    id: "1",
    swiperImg: "/assets/franchise/franSwiper1.avif",
  },
  {
    id: "2",
    swiperImg: "/assets/franchise/franSwiper2.avif",
  },
  {
    id: "3",
    swiperImg: "/assets/franchise/franSwiper3.avif",
  },
  {
    id: "4",
    swiperImg: "/assets/franchise/franSwiper4.avif",
  },
  {
    id: "5",
    swiperImg: "/assets/franchise/franSwiper1.avif",
  },
];

export const serviceSwiperHover = [
  {
    id: "1",
    swiperHeading: "Ongoing research and development",
    swiperDetail:
      "Sedar International continues to research methods and techniques for franchise operations (including purchasing and promotional schemes) that enhance unit\n - level profitability",
  },
  {
    id: "2",
    swiperHeading: "Spine system",
    swiperDetail:
      "Sedar outsources a proprietary cloud-based ERP platform called Spine which offers a user friendly live dashboard where the franchisee will be able to sell, procure, manufacture, monitor, and make decisions from one simple dashboard.",
  },
  {
    id: "3",
    swiperHeading: "Operational support",
    swiperDetail:
      "Sedar International will provide ongoing training and support in many areas critical to the success of the franchise's business, including unit operations and maintenance, customer- service techniques, product ordering, suggested pricing guidelines, and administrative procedures.",
  },
  {
    id: "4",
    swiperHeading: "Site Selection",
    swiperDetail:
      "Branch Location Selection Prior to approving a site for a Sedar outlet, Sedar International will provide franchisees with clear guidelines for a suitable location and best practices to ensure that an appropriate location of a branch is selected.",
  },
  {
    id: "5",
    swiperHeading: "Marketing Support",
    swiperDetail:
      "Sedar International coordinates development of advertising materials and strategies for the benefit of all members of the franchise network. Supplying franchisees with consumer marketing plans and materials for use at the local or regional level.",
  },
];

export const franInvestmen = (translate) => {
  return [
    {
      label: "$100,000",
      value: "100,000",
    },
    {
      label: "$200,000",
      value: "200,000",
    },
    {
      label: `$300,000 - ${translate("More")}`,
      value: "300,000- more",
    },
  ];
};

export const ReasonSelect = (translate) => {
  return [
    {
      label: `${translate("Distributor")}`,
      value: "Distributor",
    },
    {
      label: `${translate("Professional")}`,
      value: "Professional",
    },
    {
      label: `${translate("Project")}`,
      value: "Project",
    },
  ];
};

export const budget = [
  {
    label: "Less than 10,000$",
    value: "10,000",
  },
  {
    label: "10,000$ - 50,000$",
    value: "10,000/50,000$",
  },
  {
    label: "50,000$ - 100,000$",
    value: "50,000/100,000",
  },
  {
    label: "100,000$ - 250,000$",
    value: "100,000/250,000",
  },
  {
    label: "More then 250,000$",
    value: "More-250,000$",
  },
];

export const SelectMr = [
  {
    label: "Mr",
    value: "Mr",
  },
  {
    label: "Mrs",
    value: "Mrs",
  },
  {
    label: "Miss",
    value: "Miss",
  },
];

export const QnsAns = [
  {
    id: "1",
    ques: "Why Is My Card Being Saved On Jollysiks?",
    ans: "It`s quicker.You can save the hassle of typing in the complete card information every time you shop at jollysilks by saving your card details. You can make your payment by selecting the saved card of your choice at checkout.While this is obviously faster, ite is also very secure.",
  },
  {
    id: "2",
    ques: "Is It Safe To Save My Cards On Jollysilks?",
    ans: "It`s quicker.You can save the hassle of typing in the complete card information every time you shop at jollysilks by saving your card details. You can make your payment by selecting the saved card of your choice at checkout.While this is obviously faster, ite is also very secure.",
  },
  {
    id: "3",
    ques: "Can i Delte My Save Cards?",
    ans: "Yes, you can delete your saved cards at any given time",
  },
];

export const profileNav = [
  {
    id: "1",
    iconName: "lucide:user-round",
    listName: "MyAccount",
    href: "/dashboard/profile/account-setting",
  },
  {
    id: "2",
    iconName: "grommet-icons:shop",
    listName: "MyOrders",
    href: "/dashboard/orders",
  },
  {
    id: "3",
    iconName: "mingcute:bank-card-line",
    listName: "SaveCards",
    href: "/dashboard/card",
  },
  {
    id: "4",
    iconName: "fluent:notebook-32-regular",
    listName: "Address",
    href: "/dashboard/address-list",
  },
  // {
  //   id: "2",
  //   iconName: "lucide:heart",
  //   listName: "My Favourites",
  //   href: "/dashboard/wishlist",
  // },
];

export const profileAccountNav = [
  {
    id: "2",
    iconName: "grommet-icons:shop",
    listName: "MyOrders",
    href: "/dashboard/orders",
    src: "/assets/profile/myOrder.png",
  },
  {
    id: "1",
    iconName: "lucide:user-round",
    listName: "AccountSettings",
    href: "/dashboard/profile/account-setting",
    src: "/assets/profile/accountSetting.png",
  },
  {
    id: "3",
    iconName: "mingcute:bank-card-line",
    listName: "SavedCards",
    href: "/dashboard/card",
    src: "/assets/profile/saveCards.png",
  },
  {
    id: "4",
    iconName: "fluent:notebook-32-regular",
    listName: "Addressbook",
    href: "/dashboard/address-list",
    src: "/assets/profile/addressList.png",
  },
  // {
  //   id: "2",
  //   iconName: "lucide:heart",
  //   listName: "My Favourites",
  //   href: "/dashboard/wishlist",
  // },
];

export const ToolsAndGuidesIcon = [
  {
    id: "1",
    icon: "icomoon-free:file-pdf",
  },
  {
    id: "2",
    icon: "octicon:play-24",
  },
];

export const cartPaymentImage = [
  {
    id: "1",
    image: "/assets/images/payment/01.jpg",
  },
  {
    id: "2",
    image: "/assets/images/payment/02.jpg",
  },
  {
    id: "3",
    image: "/assets/images/payment/03.png",
  },
  {
    id: "4",
    image: "/assets/images/payment/04.png",
  },
  {
    id: "5",
    image: "/assets/images/payment/06.jpg",
  },
  {
    id: "6",
    image: "/assets/images/payment/amax_logo.jpg",
  },
];

export const selectWidthHeightOptionValidation = (
  STEPS,
  values,
  compareWidth
) => {
  let isError = false;
  if (values.STEPS && STEPS) {
    Object.values(STEPS).forEach((parentValue) => {
      parentValue &&
        parentValue?.CHILD_STEP?.length > 0 &&
        parentValue?.CHILD_STEP.forEach((childValue) => {
          let SPS_MIN_WIDTH =
            values.measuring_unit == "inch"
              ? childValue.SPS_MIN_WIDTH * values.meas_unit_val
              : childValue.SPS_MIN_WIDTH * values.meas_unit_val;
          if (
            values.STEPS[parentValue?.SS_CODE_NAME]?.SPS_CODE &&
            childValue?.SPS_CODE &&
            values.STEPS[parentValue?.SS_CODE_NAME]?.SPS_CODE ==
              childValue?.SPS_CODE &&
            childValue &&
            SPS_MIN_WIDTH &&
            String(compareWidth) &&
            parseInt(SPS_MIN_WIDTH) > parseInt(compareWidth)
          ) {
            isError = true;
          }
        });
    });
    return isError;
  }
};
