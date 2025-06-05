// utils/sliderAnimations.js
export function animateSlideIn(gsap, slideElements, direction = "down") {
  if (!gsap || !slideElements) return null;
  const { bgImageWrapper, mainImageWrapper, title, description } = slideElements;
  const tl = gsap.timeline({ defaults: { duration: 1.25, ease: "custom" } });

  gsap.set(slideElements, { opacity: 1, visibility: "visible" });
  if (bgImageWrapper) {
    gsap.set(bgImageWrapper.querySelector("img"), { opacity: 1, scale: 1.2 });
    gsap.set(bgImageWrapper, {
      opacity: 1,
      clipPath:
        direction === "down"
          ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
          : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
    tl.to(bgImageWrapper, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power2.out" }, 0);
    tl.to(bgImageWrapper.querySelector("img"), { scale: 1, ease: "power2.out" }, 0);
  }
  if (mainImageWrapper) {
    gsap.set(mainImageWrapper.querySelector("img"), { opacity: 1, y: direction === "down" ? "-50%" : "50%" });
    gsap.set(mainImageWrapper, {
      opacity: 1,
      clipPath:
        direction === "down"
          ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
          : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    tl.to(mainImageWrapper, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power1.out" }, 0.1);
    tl.to(mainImageWrapper.querySelector("img"), { y: "0%", ease: "power1.out" }, 0.1);
  }
  if (title) {
    gsap.set(title, { opacity: 1, y: direction === "down" ? "100%" : "-100%" });
    tl.to(title, { y: "0%" }, 0.2);
  }
  if (description) {
    gsap.set(description, { opacity: 1, y: direction === "down" ? "100%" : "-100%" });
    tl.to(description, { y: "0%" }, 0.25);
  }
  return tl;
}

export function animateSlideOut(gsap, slideElements, direction = "down") {
  if (!gsap || !slideElements) return null;
  const { bgImageWrapper, mainImageWrapper, title, description } = slideElements;
  const tl = gsap.timeline({ defaults: { duration: 1.0, ease: "custom" } });

  if (bgImageWrapper) {
    tl.to(bgImageWrapper.querySelector("img"), { scale: 1.15, opacity: 0, duration: 0.8, ease: "power1.in" }, 0);
    tl.to(bgImageWrapper, { opacity: 0, duration: 1.0, ease: "linear" }, 0.05);
  }
  if (mainImageWrapper) {
    tl.to(mainImageWrapper.querySelector("img"), { y: direction === "down" ? "25%" : "-25%", opacity: 0, duration: 0.8, ease: "power1.in" }, 0.1);
    tl.to(mainImageWrapper, { opacity: 0, duration: 0.8, ease: "power1.in" }, 0.15);
  }
  if (title) {
    tl.to(title, { y: direction === "down" ? "-50%" : "50%", opacity: 0, ease: "power1.in" }, 0.15);
  }
  if (description) {
    tl.to(description, { y: direction === "down" ? "-50%" : "50%", opacity: 0, ease: "power1.in" }, 0.2);
  }
  return tl;
}
