import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Bikes
import bikes_en from "@/modules/bikes/locales/en.json";
import bikes_de from "@/modules/bikes/locales/de.json";
import bikes_tr from "@/modules/bikes/locales/tr.json";

// Users
// Login
import login_en from "@/modules/users/locales/en/login.json";
import login_de from "@/modules/users/locales/de/login.json";
import login_tr from "@/modules/users/locales/tr/login.json";
// Register
import register_en from "@/modules/users/locales/en/register.json";
import register_de from "@/modules/users/locales/de/register.json";
import register_tr from "@/modules/users/locales/tr/register.json";
// Account
import account_en from "@/modules/users/locales/en/account.json";
import account_de from "@/modules/users/locales/de/account.json";
import account_tr from "@/modules/users/locales/tr/account.json";
// Change Password
import change_en from "@/modules/users/locales/en/change.json";
import change_de from "@/modules/users/locales/de/change.json";
import change_tr from "@/modules/users/locales/tr/change.json";
// Forgot Password
import forgot_en from "@/modules/users/locales/en/forgot.json";
import forgot_de from "@/modules/users/locales/de/forgot.json";
import forgot_tr from "@/modules/users/locales/tr/forgot.json";
// Logout
import logout_en from "@/modules/users/locales/en/logout.json";
import logout_de from "@/modules/users/locales/de/logout.json";
import logout_tr from "@/modules/users/locales/tr/logout.json";
// Reset Password
import reset_en from "@/modules/users/locales/en/reset.json";
import reset_de from "@/modules/users/locales/de/reset.json";
import reset_tr from "@/modules/users/locales/tr/reset.json";
// Navbar
import navbar_en from "./modules/shared/locales/en.json";
import navbar_de from "./modules/shared/locales/de.json";
import navbar_tr from "./modules/shared/locales/tr.json";

// AdminModules
import adminmodules_en from "@/modules/adminmodules/locales/en.json";
import adminmodules_de from "@/modules/adminmodules/locales/de.json";
import adminmodules_tr from "@/modules/adminmodules/locales/tr.json";

import settings_en from "@/modules/settings/locales/en.json";
import settings_de from "@/modules/settings/locales/de.json";
import settings_tr from "@/modules/settings/locales/tr.json";

import company_en from "@/modules/company/locales/en.json";
import company_de from "@/modules/company/locales/de.json";
import company_tr from "@/modules/company/locales/tr.json";

const resources = {
  en: {
    bikes: bikes_en,
    login: login_en,
    register: register_en,
    account: account_en,
    change: change_en,
    forgot: forgot_en,
    logout: logout_en,
    reset: reset_en,
    navbar: navbar_en,
    adminModules: adminmodules_en,
    settings: settings_en,
    company: company_en,
  },
  de: {
    bikes: bikes_de,
    login: login_de,
    register: register_de,
    account: account_de,
    change: change_de,
    forgot: forgot_de,
    logout: logout_de,
    reset: reset_de,
    navbar: navbar_de,
    adminModules: adminmodules_de,
    settings: settings_de,
    company: company_de,
  },
  tr: {
    bikes: bikes_tr,
    login: login_tr,
    register: register_tr,
    account: account_tr,
    change: change_tr,
    forgot: forgot_tr,
    logout: logout_tr,
    reset: reset_tr,
    navbar: navbar_tr,
    adminModules: adminmodules_tr,
    settings: settings_tr,
    company: company_tr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    ns: [
      "bikes",
      "login",
      "register",
      "account",
      "change",
      "forgot",
      "logout",
      "reset",
      "navbar",
      "adminModules",
      "settings",
      "company",
    ],
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
