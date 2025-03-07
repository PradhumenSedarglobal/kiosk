// @mui

import { getCookie } from "cookies-next";
import localStorageAvailable from "./localStorageAvailable";

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------
const storageAvailable = localStorageAvailable();
const lang = storageAvailable ? getCookie("i18next") : "en";

export const allLangs = [
  {
    label: "Qatar",
    value: `qat-${lang}`,
    icon: "/assets/header/languages/qat.png",
  },
  {
    label: "UAE",
    value: `uae-${lang}`,
    icon: "/assets/header/languages/uae.png",
  },
  {
    label: "Bahrain",
    value: `bhr-${lang}`,
    icon: "/assets/header/languages/bhr.png",
  },
  {
    label: "Global",
    value: `global-${lang}`,
    icon: "/assets/header/languages/global.png",
  },
  {
    label: "Saudi Arabia",
    value: `ksa-${lang}`,
    icon: "/assets/header/languages/ksa.png",
  },
  {
    label: "Oman",
    value: `omn-${lang}`,
    icon: "/assets/header/languages/omn.png",
  },
];
