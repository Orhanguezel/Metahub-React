// src/utils/getCurrentLocale.js
import i18n from "@/i18n";
import { SUPPORTED_LOCALES } from "@/i18n";

export function getCurrentLocale() {
  const lang =
    (i18n.language && i18n.language.split("-")[0]) ||
    (typeof navigator !== "undefined" &&
      navigator.language &&
      navigator.language.split("-")[0]) ||
    "en";


  return SUPPORTED_LOCALES.includes(lang) ? lang : "en";
}
