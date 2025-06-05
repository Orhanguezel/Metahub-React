// src/utils/setupGSAP.js
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

export const setupGSAP = () => {
  if (typeof window === "undefined") return;

  try {
    window.gsap = gsap;
    window.CustomEase = CustomEase;

    gsap.registerPlugin(CustomEase);

    if (!CustomEase.get("hop")) {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");
    }

    if (!CustomEase.get("custom")) {
      CustomEase.create("custom", ".87,0,.13,1");
    }

    console.log("[setupGSAP] CustomEase successfully registered.");
  } catch (e) {
    console.error("[setupGSAP] Failed to register CustomEase:", e);
  }
};
