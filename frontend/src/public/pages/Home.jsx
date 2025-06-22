// src/pages/Home.jsx
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import heroBackgroundImageFile from "@/assets/images/hero.jpg";
import HeroSection from "@/public/home/HeroSection";
import CtaButton from "@/public/common/CtaButton";
import Slider from "@/public/home/Slider";

const Home = ({ isAppReady }) => {
  const gsap = window.gsap;
  const homeWrapperRef = useRef(null);
  const heroBgImageRef = useRef(null);
  const sliderActivationRef = useRef(null);

  const [isSliderActive, setIsSliderActive] = useState(false);

  useEffect(() => {
    if (!gsap) {
      console.error("[Home.jsx] window.gsap not available!");
      return;
    }
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

  useEffect(() => {
    if (!isAppReady) return;
    const activationTrigger = sliderActivationRef.current;
    const handleScroll = () => {
      if (!activationTrigger) return;
      const activationRect = activationTrigger.getBoundingClientRect();
      if (activationRect.top < window.innerHeight * 0.3) {
        if (!isSliderActive) {
          setIsSliderActive(true);
          document.body.style.overflowY = "hidden";
        }
      } else {
        if (isSliderActive) {
          setIsSliderActive(false);
          document.body.style.overflowY = "auto";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    if (isAppReady) handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflowY = "auto";
    };
  }, [isAppReady, isSliderActive]);

  if (typeof window !== "undefined" && !window.gsap && isAppReady) {
    return <div>GSAP not loaded in Home.</div>;
  }

  return (
    <HomeWrapper ref={homeWrapperRef}>
      <HeroBackgroundAndContentWrapper>
        <HeroBackgroundImage>
          <img
            src={heroBackgroundImageFile}
            alt="RadAnOr Bikes - Hero Background"
            ref={heroBgImageRef}
          />
        </HeroBackgroundImage>
        <ContentAboveSlider>
          <HeroSection animate={isAppReady} />
          <div
            style={{
              paddingBottom: "10vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CtaButton animate={isAppReady} href="/all-bikes" />
          </div>
        </ContentAboveSlider>
      </HeroBackgroundAndContentWrapper>

      <div
        ref={sliderActivationRef}
        style={{ height: "1px", width: "100%" }}
      ></div>

      {isAppReady && <Slider animate={isAppReady} isActive={isSliderActive} />}
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeroBackgroundAndContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const HeroBackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.5);
    opacity: 0;
    will-change: transform, opacity;
  }
`;
const ContentAboveSlider = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
`;
