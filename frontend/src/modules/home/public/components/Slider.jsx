import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Slide from "./Slide";
import { slidesData as defaultSlidesData } from "@/data/sliderData";
import { useGsap } from "@/contexts/GsapContext";
import { animateSlideIn, animateSlideOut } from "@/utils/sliderAnimations";

const Slider = ({ animate, isActive, slidesData = defaultSlidesData, onSlideChange }) => {
  const gsap = useGsap();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderWrapperRef = useRef(null);
  const lastInteractionTime = useRef(Date.now());
  const throttleDelay = 1250;
  const touchStartY = useRef(0);
  const isTouchDeviceActive = useRef(false);

  const slideRefs = useRef([]);

  useEffect(() => {
    slideRefs.current = slidesData.map((_, i) => slideRefs.current[i] ?? React.createRef());
  }, [slidesData.length]);

  useEffect(() => {
    if (!gsap) return;
    const wrapper = sliderWrapperRef.current;
    if (!wrapper) return;

    if (animate) {
      gsap.to(wrapper, { opacity: 1, visibility: "visible", duration: 0.8, ease: "power2.inOut", delay: 0.5 });
    } else if (isActive) {
      gsap.set(wrapper, { opacity: 1, visibility: "visible" });
    } else if (!isActive && !animate && wrapper.style.opacity !== "0") {
      gsap.set(wrapper, { opacity: 0, visibility: "hidden" });
    }
  }, [animate, isActive, gsap]);


  useEffect(() => {
    if (!gsap) return;
    if (animate && isActive && slidesData.length > 0 && currentSlideIndex === 0 && !isAnimating) {
      const timer = setTimeout(() => {
        const firstSlideElements = slideRefs.current[0]?.current;
        if (firstSlideElements) {
          gsap.set(firstSlideElements, { opacity: 1, visibility: "visible" });
          if (firstSlideElements.bgImageWrapper) gsap.set(firstSlideElements.bgImageWrapper, { opacity: 1 });
          if (firstSlideElements.mainImageWrapper) gsap.set(firstSlideElements.mainImageWrapper, { opacity: 1 });
          animateSlideIn(gsap, firstSlideElements, "down");
          if (onSlideChange) onSlideChange(1, slidesData.length);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [animate, isActive, slidesData, currentSlideIndex, isAnimating, gsap, onSlideChange]);

  const changeSlide = useCallback(
    (direction) => {
      if (!gsap || isAnimating) return;
      const now = Date.now();
      if (now - lastInteractionTime.current < throttleDelay) return;
      lastInteractionTime.current = now;

      setIsAnimating(true);
      const oldIndex = currentSlideIndex;
      let newIndex =
        direction === "down"
          ? (currentSlideIndex + 1) % slidesData.length
          : (currentSlideIndex - 1 + slidesData.length) % slidesData.length;

      const oldSlideElements = slideRefs.current[oldIndex]?.current;
      const newSlideElements = slideRefs.current[newIndex]?.current;

      const masterTl = gsap.timeline({
        onComplete: () => {
          if (oldSlideElements && oldIndex !== newIndex) {
            gsap.set(oldSlideElements, { opacity: 0, visibility: "hidden" });
            if (oldSlideElements.bgImageWrapper)
              gsap.set(oldSlideElements.bgImageWrapper, { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" });
            if (oldSlideElements.mainImageWrapper)
              gsap.set(oldSlideElements.mainImageWrapper, { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" });
            if (oldSlideElements.title) gsap.set(oldSlideElements.title, { y: "100%", opacity: 0 });
            if (oldSlideElements.description) gsap.set(oldSlideElements.description, { y: "100%", opacity: 0 });
          }
          setCurrentSlideIndex(newIndex);
          setIsAnimating(false);
          if (onSlideChange) onSlideChange(newIndex + 1, slidesData.length);
        },
      });

      if (oldSlideElements && oldIndex !== newIndex) {
        masterTl.add(animateSlideOut(gsap, oldSlideElements, direction));
      }
      if (newSlideElements) {
        gsap.set(newSlideElements, { opacity: 1, visibility: "visible" });
        if (newSlideElements.bgImageWrapper) gsap.set(newSlideElements.bgImageWrapper, { opacity: 1 });
        if (newSlideElements.mainImageWrapper) gsap.set(newSlideElements.mainImageWrapper, { opacity: 1 });
        masterTl.add(animateSlideIn(gsap, newSlideElements, direction), oldSlideElements && oldIndex !== newIndex ? "-=0.95" : 0);
      }
    },
    [currentSlideIndex, isAnimating, slidesData.length, onSlideChange, gsap]
  );

  // Wheel event listener
  useEffect(() => {
    if (!gsap) return;
    const sliderElement = sliderWrapperRef.current;
    if (!sliderElement || !isActive) return;

    const handleWheel = (e) => {
      e.preventDefault();
      changeSlide(e.deltaY > 0 ? "down" : "up");
    };
    sliderElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => sliderElement.removeEventListener("wheel", handleWheel);
  }, [isActive, changeSlide, isAnimating, gsap]);

  // Touch events listener
  useEffect(() => {
    if (!gsap) return;
    const sliderElement = sliderWrapperRef.current;
    if (!sliderElement || !isActive) return;

    const handleTouchStart = (e) => {
      if (isAnimating) return;
      touchStartY.current = e.touches[0].clientY;
      isTouchDeviceActive.current = true;
    };
    const handleTouchMove = (e) => {
      if (!isTouchDeviceActive.current || isAnimating) return;
      const diff = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(diff) > 25) {
        changeSlide(diff > 0 ? "down" : "up");
        isTouchDeviceActive.current = false;
      }
    };
    const handleTouchEnd = () => {
      isTouchDeviceActive.current = false;
    };
    sliderElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    sliderElement.addEventListener("touchmove", handleTouchMove, { passive: true });
    sliderElement.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      sliderElement.removeEventListener("touchstart", handleTouchStart);
      sliderElement.removeEventListener("touchmove", handleTouchMove);
      sliderElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isActive, isAnimating, changeSlide, gsap]);

  if ((!gsap && (animate || isActive)) || !slidesData || slidesData.length === 0) {
    return (
      <SliderWrapper ref={sliderWrapperRef} style={{ opacity: 1, visibility: "visible" }}>
        <div>{!gsap ? "GSAP not available in Slider." : "No slides available."}</div>
      </SliderWrapper>
    );
  }

  return (
    <SliderWrapper ref={sliderWrapperRef}>
      {slidesData.map((slide, index) => (
        <Slide
          key={slide.id || index}
          ref={slideRefs.current[index]}
          slideData={slide}
          isActive={index === currentSlideIndex}
        />
      ))}
    </SliderWrapper>
  );
};

export default Slider;

const SliderWrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
  cursor: ns-resize;
`;
