import { SUPPORTED_LOCALES } from "@/i18n";

// Otomatik eksik locale tamamlayıcı (ES6 arrow version)
export const completeLocales = (value = {}) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;

  // Dolu olan dilleri bul (non-empty)
  const filled = SUPPORTED_LOCALES.filter(l => value[l] && value[l].trim());
  const primary = filled.includes("en") ? "en" : filled[0];

  // Eğer hiç dolu yoksa, tümünü boş yap
  if (!primary) {
    return Object.fromEntries(SUPPORTED_LOCALES.map(l => [l, ""]));
  }

  // Eksik dilleri tamamla (referans kopyası ile)
  return SUPPORTED_LOCALES.reduce(
    (acc, lang) => ({
      ...acc,
      [lang]: value[lang] && value[lang].trim() ? value[lang] : value[primary],
    }),
    { ...value }
  );
};
