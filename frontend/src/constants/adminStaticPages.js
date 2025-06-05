// src/constants/adminStaticPages.js
import { MdSettings, MdBusiness, MdDirectionsBike } from "react-icons/md";

export const adminStaticPages = [
  {
    key: "bikes",
    path: "/admin/bikes",
    label: { en: "Bikes", tr: "Bisikletler", de: "Fahrräder" },
    icon: MdDirectionsBike,
  },
  {
    key: "settings",
    path: "/admin/settings",
    label: { en: "Settings", tr: "Ayarlar", de: "Einstellungen" },
    icon: MdSettings,
  },
  {
    key: "company",
    path: "/admin/company",
    label: { en: "Company", tr: "Şirket", de: "Firma" },
    icon: MdBusiness,
  },
];
