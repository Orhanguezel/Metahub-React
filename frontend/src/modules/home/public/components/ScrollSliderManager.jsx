// src/pages/home/ScrollSliderManager.jsx
import { useEffect } from "react";
import { useGsap } from "@/contexts/GsapContext";

const ScrollSliderManager = ({ isAppReady, onActivate, onDeactivate, triggerRef, isActive }) => {
  const gsap = useGsap();

  useEffect(() => {
    if (!isAppReady || !gsap) return;
    const el = triggerRef.current;

    const handleScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.3) {
        if (!isActive) {
          onActivate();
          document.body.style.overflowY = "hidden";
        }
      } else {
        if (isActive) {
          onDeactivate();
          document.body.style.overflowY = "auto";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (isAppReady) handleScroll(); // initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflowY = "auto";
    };
  }, [isAppReady, gsap, isActive, onActivate, onDeactivate, triggerRef]);

  return null;
};

export default ScrollSliderManager;
