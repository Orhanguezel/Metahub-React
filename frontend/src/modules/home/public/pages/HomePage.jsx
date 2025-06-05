// src/modules/home/public/pages/HomePage.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import {
  BackgroundSection,
  AboveSliderSection,
  ScrollSliderManager,
  Slider,
} from "@/modules/home";
import {Footer} from "@/modules/shared";
import { useGsap } from "@/contexts/GsapContext"; 

const HomePage = ({ isAppReady }) => {
  const gsap = useGsap();

  const homeWrapperRef = useRef(null);
  const heroBgImageRef = useRef(null);
  const sliderActivationRef = useRef(null);

  const [currentSlideNum, setCurrentSlideNum] = useState(0);
  const [totalSlidesNum, setTotalSlidesNum] = useState(0);
  const [isSliderActive, setIsSliderActive] = useState(false);

  useEffect(() => {
    if (!gsap) return;
    const homeWrapper = homeWrapperRef.current;
    const heroBgImg = heroBgImageRef.current;

    if (isAppReady && homeWrapper) {
      const tl = gsap.timeline();
      tl.to(homeWrapper, { opacity: 1, visibility: "visible", duration: 0.01 });
      if (heroBgImg) {
        tl.to(heroBgImg, { scale: 1, opacity: 1, duration: 2, ease: "hop" }, 0);
      }
    } else if (!isAppReady && homeWrapper) {
      gsap.set(homeWrapper, { opacity: 0, visibility: "hidden" });
      if (heroBgImg) gsap.set(heroBgImg, { scale: 1.5, opacity: 0 });
    }
  }, [isAppReady, gsap]);

  const handleSlideChange = useCallback((current, total) => {
    setCurrentSlideNum(current);
    setTotalSlidesNum(total);
  }, []);

  return (
    <HomeWrapper ref={homeWrapperRef}>
      <HeroBackgroundAndContentWrapper>
        <BackgroundSection ref={heroBgImageRef} />
        <AboveSliderSection isAppReady={isAppReady} />
      </HeroBackgroundAndContentWrapper>

      <div
        ref={sliderActivationRef}
        style={{ height: "1px", width: "100%" }}
      ></div>

      <ScrollSliderManager
        isAppReady={isAppReady}
        isActive={isSliderActive}
        triggerRef={sliderActivationRef}
        onActivate={() => setIsSliderActive(true)}
        onDeactivate={() => setIsSliderActive(false)}
      />

      {isAppReady && (
        <Slider
          animate={isAppReady}
          isActive={isSliderActive}
          onSlideChange={handleSlideChange}
        />
      )}

      <Footer
        currentSlide={currentSlideNum}
        totalSlides={totalSlidesNum}
        showCounter={
          isAppReady &&
          isSliderActive &&
          totalSlidesNum > 0 &&
          currentSlideNum > 0
        }
      />
    </HomeWrapper>
  );
};

export default HomePage;


const HomeWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
`;

const HeroBackgroundAndContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;
