// src/hooks/useSidebarModules.js
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import * as Icons from "react-icons/md";

/**
 * Tenant bazlı, sadece aktif ve sidebarda gösterilecek modülleri listeler.
 * - Redux slice'ta: adminModule.moduleSettings
 * - Her modül objesinde: module (name), label, icon, enabled, visibleInSidebar, order
 */
export const useSidebarModules = () => {
  // 1️⃣ Yeni tenant-aware slice array'i kullanılıyor!
  const modules = useAppSelector((state) => state.adminModule.moduleSettings);
  const loading = useAppSelector((state) => state.adminModule.loading);
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  // 2️⃣ Sidebarda sadece aktif ve visible olanlar gösteriliyor
  const sidebarModules = (modules || [])
    .filter((mod) => mod.enabled && mod.visibleInSidebar)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((mod) => ({
      key: mod.module,
      path: mod.module === "dashboard" ? "/admin" : `/admin/${mod.module}`,
      label: mod.label?.[lang] || mod.label?.en || mod.module,
      Icon: getDynamicIcon(mod.icon),
    }));

  return { sidebarModules, isLoading: loading };
};

// 3️⃣ Dinamik ikon fonksiyonu
const getDynamicIcon = (iconName) => {
  const defaultIcon = "MdSettings";
  const mappedName = iconName?.startsWith("Md") ? iconName : `Md${capitalize(iconName)}`;
  return Icons[mappedName] || Icons[defaultIcon];
};

const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);
