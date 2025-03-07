/** @type {import('next-i18next').UserConfig} */
const path = require("path");
module.exports = {
  debug: process.env.NODE_ENV === "production",
  i18n: {
    locales: [
      "default",
      "global-en",
      "global-ar",
      "bhr-en",
      "bhr-ar",
      "ksa-en",
      "ksa-ar",
      "uae-en",
      "uae-ar",
      "omn-en",
      "omn-ar",
      "qat-en",
      "qat-ar",
      "global-ru",
      "bhr-ru",
      "ksa-ru",
      "uae-ru",
      "omn-ru",
      "qat-ru",
      "egy-en",
      "egy-ar",
      "egy-ru",
      "kwt-en",
      "kwt-ar",
      "kwt-ru",
      //"egy-en",
      //"egy-ar",
      //   "x-default"
    ],
    defaultLocale: 'default',
    localeDetection: false, // disable automatic locale detection
    // defaultNS: undefined,
    // ns: ["common"],
    // defaultNS: "common",
    nonExplicitSupportedLngs: false,
    fallbackLng: {
      default: ["en"],
      // "x-default": ["en"],
      "global-en": ["en"],
      "global-ar": ["ar"],
      "bhr-en": ["en"],
      "bhr-ar": ["ar"],
      "ksa-en": ["en"],
      "ksa-ar": ["ar"],
      "uae-en": ["en"],
      "uae-ar": ["ar"],
      "omn-en": ["en"],
      "omn-ar": ["ar"],
      "qat-en": ["en"],
      "qat-ar": ["ar"],
      "egy-en": ["en"],
      "egy-ar": ["ar"],
      "bhr-ru": ["ru"],
      "global-ru": ["ru"],
      "uae-ru": ["ru"],
      "ksa-ru": ["ru"],
      "omn-ru": ["ru"],
      "qat-ru": ["ru"],
      "egy-ru": ["ru"],
      "kwt-en": ["en"],
      "kwt-ar": ["ar"],
      "kwt-ru": ["ru"],
      "global-ch": ["ch"],
      "uae-ch": ["ch"],
      "ksa-ch": ["ch"],
      "omn-ch": ["ch"],
      "qat-ch": ["ch"],
      "egy-ch": ["ch"],
      "kwt-ch": ["ch"],

    },
    localePath: path.resolve("./public/locales"),
  },
  react: { useSuspense: false },
};
