// src/shared/getProfileImageUrl.js 
import { getImageSrc } from "@/shared/getImageSrc";

export function getProfileImageUrl(profileImage) {
  if (!profileImage) return "/default-avatar.png";
  if (typeof profileImage === "string") return getImageSrc(profileImage, "profile");
  if (typeof profileImage === "object") {
    if (profileImage.url && typeof profileImage.url === "string" && profileImage.url.startsWith("http")) return profileImage.url;
    if (profileImage.thumbnail && typeof profileImage.thumbnail === "string" && profileImage.thumbnail.startsWith("http")) return profileImage.thumbnail;
    if (profileImage.webp && typeof profileImage.webp === "string" && profileImage.webp.startsWith("http")) return profileImage.webp;
    if (profileImage.url) return getImageSrc(profileImage.url, "profile");
    if (profileImage.thumbnail) return getImageSrc(profileImage.thumbnail, "profile");
    if (profileImage.webp) return getImageSrc(profileImage.webp, "profile");
  }
  return "/default-avatar.png";
}
