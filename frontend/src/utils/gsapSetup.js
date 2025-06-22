// src/utils/gsapSetup.js
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

export function setupGsapOnWindow() {
  if (typeof window === "undefined") return;

  window.gsap = gsap;
  window.CustomEase = CustomEase;
  console.log("[gsapSetup] window.gsap object set:", window.gsap);
  console.log("[gsapSetup] window.CustomEase object set:", window.CustomEase);

  const currentGsap = window.gsap;
  if (!currentGsap) {
    console.error("[gsapSetup] GSAP not available on window object.");
    return;
  }

  if (currentGsap.plugins) {
    console.log(
      "[gsapSetup] Available plugins in currentGsap.plugins:",
      Object.keys(currentGsap.plugins)
    );
    if (currentGsap.plugins.css) {
      console.log("[gsapSetup] GSAP CSSPlugin IS AVAILABLE:", currentGsap.plugins.css);
    } else {
      console.error("[gsapSetup] GSAP CSSPlugin NOT FOUND! Animations might fail.");
    }
  } else {
    console.error("[gsapSetup] currentGsap.plugins is undefined/null.");
  }

  if (
    CustomEase &&
    CustomEase.get &&
    typeof currentGsap.registerPlugin === "function"
  ) {
    try {
      currentGsap.registerPlugin(CustomEase);
      console.log("[gsapSetup] GSAP CustomEase registered successfully.");
    } catch (e) {
      console.error("[gsapSetup] Error registering CustomEase:", e);
    }
    if (!CustomEase.get("hop")) {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");
    }
    if (!CustomEase.get("custom")) {
      CustomEase.create("custom", ".87,0,.13,1");
    }
  } else {
    console.error(
      "[gsapSetup] Cannot setup CustomEase: missing CustomEase or registerPlugin."
    );
  }
}
