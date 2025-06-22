// Vite uyumlu
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5019";
const PROJECT_ENV = import.meta.env.VITE_APP_ENV || "radanor";

const folderMap = {
  product: "product-images",
  profile: "profile-images",
  category: "category-images",
  blog: "blog-images",
  gallery: "gallery-images",
  misc: "misc",
};

const defaultImageMap = {
  product: "product.png",
  profile: "profile.png",
  category: "category.png",
  blog: "blog.png",
  gallery: "gallery.png",
  misc: "default.png",
};

export function getImageSrc(imagePath, type = "profile") {
  const folder = folderMap[type] || folderMap.misc;
  const fallbackImage = defaultImageMap[type] || defaultImageMap.misc;

  if (typeof imagePath !== "string" || imagePath.trim() === "") {
    return `${BASE_URL}/uploads/${PROJECT_ENV}/${folder}/${fallbackImage}`;
  }

  if (imagePath.includes("cloudinary.com")) return imagePath;

  if (imagePath.startsWith("http")) return imagePath;

  return `${BASE_URL}/uploads/${PROJECT_ENV}/${folder}/${imagePath}`;
}
