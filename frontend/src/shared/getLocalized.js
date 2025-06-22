// src/shared/getLocalized.js
export const getLocalized = (obj, lang) =>
    typeof obj === "object"
        ? obj?.[lang] || obj?.en || Object.values(obj)[0] || ""
        : obj || "";
