// src/utils/gsapSetup.js
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

export function setupGsapOnWindow() {
  if (typeof window === "undefined") return;
  window.gsap = gsap;
  window.CustomEase = CustomEase;

  if (typeof window.gsap?.registerPlugin === "function") {
    window.gsap.registerPlugin(CustomEase);
    if (!CustomEase.get("hop")) CustomEase.create("hop", "0.9, 0, 0.1, 1");
    if (!CustomEase.get("custom")) CustomEase.create("custom", ".87,0,.13,1");
    console.log("[gsapSetup] GSAP ve CustomEase başarıyla window'a atandı.");
  } else {
    console.error("[gsapSetup] GSAP plugin register fonksiyonu yok!");
  }
}

// HEMEN ÇAĞIR (side effect)
if (typeof window !== "undefined") {
  setupGsapOnWindow();
}
