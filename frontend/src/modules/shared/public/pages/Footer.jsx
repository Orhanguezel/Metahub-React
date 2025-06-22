import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useGsap } from "@/contexts/GsapContext"; // GSAP hook import

const Footer = ({ currentSlide, totalSlides, showCounter }) => {
  const gsap = useGsap();
  const footerRef = useRef(null);

  useEffect(() => {
    if (!gsap) {
      console.error("[Footer.jsx] gsapInstance not available!");
      return;
    }
    if (footerRef.current) {
      if (showCounter) {
        gsap.to(footerRef.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power1.out",
        });
      } else {
        gsap.to(footerRef.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.3,
          ease: "power1.in",
        });
      }
    }
  }, [showCounter, gsap]);

  if (!gsap && showCounter) {
    return null;
  }

  return (
    <FooterWrapper ref={footerRef}>
      {showCounter && totalSlides > 0 && currentSlide > 0 && (
        <SliderCounterDisplay>
          <span className="count-digit">{currentSlide}</span>
          <span className="divider">/</span>
          <span className="count-digit">{totalSlides}</span>
        </SliderCounterDisplay>
      )}
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: ${({ theme }) => theme.spacings.md}
    ${({ theme }) => theme.spacings.lg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 50;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  will-change: opacity;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile || "600px"}) {
    padding: ${({ theme }) => theme.spacings.sm}
      ${({ theme }) => theme.spacings.md};
  }
`;

const SliderCounterDisplay = styled.div`
  display: flex;
  align-items: baseline;
  color: ${({ theme }) => theme.colors.text || "#fff"};
  font-family: ${({ theme }) =>
    theme.fonts.main || '"PP Neue Montreal", sans-serif'};
  font-size: ${({ theme }) => theme.fontSizes.small || "15px"};
  font-weight: 300;
  pointer-events: auto;

  span {
    display: inline-block;
    min-width: 20px;
    text-align: center;

    &.count-digit {
      opacity: 1;
    }

    &.divider {
      margin: 0 0.25em;
      opacity: 0.35;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile || "600px"}) {
    font-size: ${({ theme }) => theme.fontSizes.xsmall || "12px"};
    span {
      min-width: 18px;
    }
  }
`;
