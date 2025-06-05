import React, { forwardRef } from "react";
import styled from "styled-components";
import heroBackgroundImageFile from "@/assets/images/hero.jpg";

const BackgroundSection = forwardRef((_, ref) => (
  <HeroBackgroundImage>
    <img
      src={heroBackgroundImageFile}
      alt="RadAnOr Bikes - Hero Background"
      ref={ref}
      loading="lazy"
    />
  </HeroBackgroundImage>
));

export default BackgroundSection;

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
