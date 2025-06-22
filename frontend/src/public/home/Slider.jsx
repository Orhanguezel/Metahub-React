// src/components/home/Slider.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Slide from "./Slide";
import { slidesData as defaultSlidesData } from "@/data/sliderData";

const SliderWrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  background-color: #0a0a0a;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  visibility: ${({ $isActive }) => ($isActive ? "visible" : "hidden")};
  transition: opacity 0.5s ease;
  cursor: ns-resize;
`;

const SliderCounterDisplay = styled.div`
  position: absolute;
  bottom: 2em;
  left: 2em;
  z-index: 10;
  display: flex;
  align-items: baseline;
  color: ${({ theme }) => theme.colors.text || "#fff"};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 15px;
  font-weight: 300;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(15px);
  will-change: opacity, transform;
  span {
    display: inline-block;
    min-width: 18px;
    text-align: center;
    line-height: 1;
    &.divider {
      margin: 0 0.25em;
      opacity: 0.35;
    }
  }
`;

const Slider = ({ isActive, slidesData = defaultSlidesData }) => {
  const gsap = window.gsap;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderWrapperRef = useRef(null);
  const sliderCounterRef = useRef(null);
  const lastInteractionTime = useRef(Date.now());
  const throttleDelay = 1250;
  const slideRefs = useRef([]);

  useEffect(() => {
    slideRefs.current = slidesData.map(
      (_, i) => slideRefs.current[i] ?? React.createRef()
    );
  }, [slidesData]);

  const animateSlideIn = useCallback(
    (slideRef, direction = "down") => {
      if (!gsap || !slideRef?.current) return;
      const {
        container,
        bgImageWrapper,
        mainImageWrapper,
        title,
        description,
      } = slideRef.current;

      gsap.set(container, { visibility: "visible" });
      gsap.set([bgImageWrapper, mainImageWrapper], { opacity: 1 });
      gsap.set(bgImageWrapper, {
        clipPath:
          direction === "down"
            ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });
      gsap.set(bgImageWrapper.querySelector("img"), { scale: 1.2 });
      gsap.set(mainImageWrapper, {
        clipPath:
          direction === "down"
            ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.set(mainImageWrapper.querySelector("img"), {
        y: direction === "down" ? "50%" : "-50%",
      });
      gsap.set(title, { y: "100%", opacity: 0 });
      gsap.set(description, { y: "100%", opacity: 0 });

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power2.out" },
      });
      tl.to(
        bgImageWrapper,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        0
      );
      tl.to(bgImageWrapper.querySelector("img"), { scale: 1 }, "<");
      tl.to(
        mainImageWrapper,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        0.1
      );
      tl.to(mainImageWrapper.querySelector("img"), { y: "0%" }, "<");
      tl.to(title, { y: "0%", opacity: 1 }, 0.2);
      tl.to(description, { y: "0%", opacity: 1 }, "<0.1");

      return tl;
    },
    [gsap]
  );

  const animateSlideOut = useCallback(
    (slideRef, direction) => {
      if (!gsap || !slideRef?.current) return;
      const {
        container,
        bgImageWrapper,
        mainImageWrapper,
        title,
        description,
      } = slideRef.current;
      const tl = gsap.timeline({
        defaults: { duration: 1.0, ease: "power2.in" },
      });

      if (title)
        tl.to(
          title,
          { y: direction === "down" ? "-100%" : "100%", opacity: 0 },
          0
        );
      if (description)
        tl.to(
          description,
          { y: direction === "down" ? "-100%" : "100%", opacity: 0 },
          "<0.1"
        );
      if (mainImageWrapper)
        tl.to(mainImageWrapper, { opacity: 0, duration: 0.8 }, "<");
      if (bgImageWrapper)
        tl.to(bgImageWrapper, { opacity: 0, duration: 1.0 }, "<");

      tl.set(container, { visibility: "hidden" });
      return tl;
    },
    [gsap]
  );

  const changeSlide = useCallback(
    (direction) => {
      if (isAnimating) return;
      const now = Date.now();
      if (now - lastInteractionTime.current < throttleDelay) return;
      lastInteractionTime.current = now;
      setIsAnimating(true);

      const oldIndex = currentSlideIndex;
      let newIndex =
        direction === "down"
          ? (currentSlideIndex + 1) % slidesData.length
          : (currentSlideIndex - 1 + slidesData.length) % slidesData.length;

      const oldSlideRef = slideRefs.current[oldIndex];
      const newSlideRef = slideRefs.current[newIndex];

      const masterTl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      if (oldSlideRef?.current)
        masterTl.add(animateSlideOut(oldSlideRef, direction));
      if (newSlideRef?.current)
        masterTl.add(
          animateSlideIn(newSlideRef, direction),
          oldSlideRef?.current ? "-=0.8" : 0
        );

      setCurrentSlideIndex(newIndex);
    },
    [
      currentSlideIndex,
      isAnimating,
      slidesData.length,
      animateSlideIn,
      animateSlideOut,
      gsap,
    ]
  );

  useEffect(() => {
    const sliderElement = sliderWrapperRef.current;
    if (!sliderElement || !isActive) return;
    const handleWheel = (e) => {
      e.preventDefault();
      changeSlide(e.deltaY > 0 ? "down" : "up");
    };
    sliderElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => sliderElement.removeEventListener("wheel", handleWheel);
  }, [isActive, changeSlide, isAnimating]);

  useEffect(() => {
    if (!gsap || !isActive || slidesData.length === 0) return;
    const firstSlideRef = slideRefs.current[0];
    if (firstSlideRef?.current) {
      animateSlideIn(firstSlideRef, "down");
    }
  }, [isActive, slidesData, animateSlideIn, gsap]);

  useEffect(() => {
    if (!gsap || !sliderCounterRef.current) return;
    gsap.to(sliderCounterRef.current, {
      opacity: isActive ? 1 : 0,
      y: isActive ? 0 : 15,
      visibility: isActive ? "visible" : "hidden",
      duration: 0.5,
    });
  }, [isActive, gsap]);

  return (
    <SliderWrapper ref={sliderWrapperRef} $isActive={isActive}>
      {slidesData.map((slide, index) => (
        <Slide
          key={slide.id}
          ref={slideRefs.current[index]}
          slideData={slide}
        />
      ))}
      <SliderCounterDisplay ref={sliderCounterRef}>
        <span>{currentSlideIndex + 1}</span>
        <span className="divider">/</span>
        <span>{slidesData.length}</span>
      </SliderCounterDisplay>
    </SliderWrapper>
  );
};

export default Slider;
