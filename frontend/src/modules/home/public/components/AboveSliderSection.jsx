// src/pages/home/AboveSliderSection.jsx
import React from "react";
import styled from "styled-components";
import {
  HeroSection,
  CtaButton
} from "@/modules/home";
import { useGsap } from "@/contexts/GsapContext";

const AboveSliderSection = ({ isAppReady }) => {
  const gsap = useGsap(); 

  return (
    <ContentAboveSlider>
      <HeroSection animate={isAppReady} gsapInstance={gsap} />
      <ButtonWrapper>
        <CtaButton animate={isAppReady} gsapInstance={gsap} href="/bikes" />
      </ButtonWrapper>
    </ContentAboveSlider>
  );
};

export default AboveSliderSection;

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

const ButtonWrapper = styled.div`
  padding-bottom: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;
