import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


export const SUPPORTED_LOCALES = ["en", "de", "tr", "fr", "es", "pl"];

import bikeTranslations from "@/modules/bikes/locales";
import navbarTranslations from "@/public/common/locales/navbar";
import footerTranslations from "@/public/common/locales/footer";
import commonTranslations from "@/public/common/locales/common";
import cartTranslations from "@/modules/cart/locales";
import orderTranslations from "@/modules/order/locales";
import termsTranslations from "@/public/locales/terms";
import privacyTranslations from "@/public/locales/privacy";
import contactTranslations from "@/public/locales/contact";
import returnTranslations from "@/public/locales/return";

import loginTranslations from "@/modules/users/locales/login";
import registerTranslations from "@/modules/users/locales/register";
import forgotTranslations from "@/modules/users/locales/forgot";
import resetTranslations from "@/modules/users/locales/reset";
import changeTranslations from "@/modules/users/locales/change";
import accountTranslations from "@/modules/users/locales/account";
import logoutTranslations from "@/modules/users/locales/logout";

import adminModulesTranslations from "@/modules/adminmodules/locales";
import tenanttranslations from "@/modules/tenants/locales";
/*
import aboutTranslations from "@/modules/about/locales";

import articlesTranslations from "@/modules/articles/locales";

import checkoutTranslations from "@/modules/checkout/locales";
import homeTranslations from "@/modules/home/locales";




*/

const modules = [

  { ns: "bikes", translations: bikeTranslations },
  { ns: "navbar", translations: navbarTranslations },
  { ns: "footer", translations: footerTranslations },
  { ns: "common", translations: commonTranslations },
  { ns: "cart", translations: cartTranslations },
  { ns: "order", translations: orderTranslations },
  { ns: "terms", translations: termsTranslations },
  { ns: "privacy", translations: privacyTranslations },
  { ns: "contact", translations: contactTranslations },
  { ns: "return", translations: returnTranslations },
  { ns: "login", translations: loginTranslations },
  { ns: "register", translations: registerTranslations },
  { ns: "forgot", translations: forgotTranslations },
  { ns: "reset", translations: resetTranslations },
  { ns: "change", translations: changeTranslations },
  { ns: "account", translations: accountTranslations },
  { ns: "logout", translations: logoutTranslations },
  { ns: "adminModules", translations: adminModulesTranslations },
  { ns: "tenants", translations: tenanttranslations },

  /*
 { ns: "about", translations: aboutTranslations },
  { ns: "articles", translations: articlesTranslations },
  { ns: "cart", translations: cartTranslations },
  { ns: "checkout", translations: checkoutTranslations },
  { ns: "home", translations: homeTranslations },
  
  
  ,*/
];

const resources = {};
SUPPORTED_LOCALES.forEach((locale) => {
  resources[locale] = {};
  modules.forEach((mod) => {
    resources[locale][mod.ns] = mod.translations[locale] || {};
  });
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "de",
    fallbackLng: "de",
    ns: modules.map((m) => m.ns),
    defaultNS: "navbar", // Global default
    interpolation: { escapeValue: false },
  });

export default i18n;
