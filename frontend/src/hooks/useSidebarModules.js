// src/hooks/useSidebarModules.js
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import * as Icons from "react-icons/md";

export const useSidebarModules = () => {
  const modules = useAppSelector((state) => state.adminModule.modules);
  const loading = useAppSelector((state) => state.adminModule.loading);
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const sidebarModules = (modules || [])
    .filter((mod) => mod.enabled && mod.visibleInSidebar !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) // isteğe bağlı sıralama
    .map((mod) => ({
      key: mod.name,
      path: mod.name === "dashboard" ? "/admin" : `/admin/${mod.name}`,
      label: mod.label?.[lang] || mod.name,
      Icon: getDynamicIcon(mod.icon),
    }));

  return { sidebarModules, isLoading: loading };
};

const getDynamicIcon = (iconName) => {
  const defaultIcon = "MdSettings";
  const mappedName = iconName?.startsWith("Md") ? iconName : `Md${capitalize(iconName)}`;
  return Icons[mappedName] || Icons[defaultIcon];
};

const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);
