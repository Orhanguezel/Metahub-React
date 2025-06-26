import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import * as MdIcons from "react-icons/md";

/**
 * Tenant bazlı, sadece aktif ve sidebar’da gösterilecek modülleri döner.
 */
export const useSidebarModules = () => {
  const modules = useAppSelector((state) => state.adminModule.tenantModules || []);
  const loading = useAppSelector((state) => state.adminModule.loading);

  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const sidebarModules = (modules || [])
    .filter((mod) => mod.enabled === true && mod.visibleInSidebar === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((mod) => ({
      key: mod.module || mod.name,
      path:
        (mod.module || mod.name) === "dashboard"
          ? "/admin"
          : `/admin/${mod.module || mod.name}`,
      label:
        (mod.label?.[lang]?.trim() ||
          mod.label?.en?.trim() ||
          mod.module ||
          mod.name),
      Icon: getDynamicIcon(mod.icon),
    }));

  return { sidebarModules, isLoading: loading };
};



// --- Ikon Mantığı ---
const getDynamicIcon = (iconName) => {
  const defaultIcon = "MdSettings";
  if (!iconName || typeof iconName !== "string") return MdIcons[defaultIcon];
  const normalized =
    iconName.startsWith("Md") && iconName in MdIcons
      ? iconName
      : `Md${capitalize(iconName)}`;
  return MdIcons[normalized] || MdIcons[defaultIcon];
};

const capitalize = (str) =>
  typeof str === "string" && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : "";
