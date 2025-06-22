import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useGsap } from "@/contexts/GsapContext"; // GSAP hook import

const CtaButton = ({ animate, href = "#", children }) => {
  const gsap = useGsap();
  const ctaWrapperRef = useRef(null);
  const ctaLabelRef = useRef(null);
  const ctaIconRef = useRef(null);

  useEffect(() => {
    if (!gsap) {
      if (animate)
        console.error("[CtaButton.jsx] GSAP instance not available!");
      return;
    }

    const wrapper = ctaWrapperRef.current;
    const label = ctaLabelRef.current;
    const icon = ctaIconRef.current;

    if (!wrapper || !label || !icon) return;

    // Set initial GSAP states for animation consistency
    gsap.set(wrapper, { scale: 0.9, y: 30, opacity: 0, visibility: "hidden" });
    gsap.set(label, { yPercent: 40, opacity: 0 });
    gsap.set(icon, { scale: 0.5, opacity: 0 });

    if (animate) {
      const tl = gsap.timeline({ delay: 1.0 });
      tl.to(
        wrapper,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          visibility: "visible",
          duration: 1,
          ease: "power2.out",
        },
        0
      );
      tl.to(
        label,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7"
      );
      tl.to(
        icon,
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "<0.1"
      );
    } else {
      // Set visible state immediately if not animating
      gsap.set(wrapper, { opacity: 1, visibility: "visible", scale: 1, y: 0 });
      gsap.set(label, { yPercent: 0, opacity: 1 });
      gsap.set(icon, { scale: 1, opacity: 1 });
    }
  }, [animate, gsap]);

  if (!gsap && animate) return null;

  const buttonText = children || "View all products";

  return (
    <CtaWrapper ref={ctaWrapperRef}>
      <CtaButtonStyled href={href}>
        <CtaLabel ref={ctaLabelRef}>{buttonText}</CtaLabel>
        <CtaIconWrapper ref={ctaIconRef}>
          <i className="fas fa-arrow-right" />
        </CtaIconWrapper>
      </CtaButtonStyled>
    </CtaWrapper>
  );
};

export default CtaButton;
const CtaWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.9) translateY(30px);
  will-change: transform, opacity;
`;

const CtaButtonStyled = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  min-width: 280px;
  max-width: clamp(280px, 50%, 450px);
  height: 60px;
  padding: 0 ${({ theme }) => theme.spacings.sm} 0
    ${({ theme }) => theme.spacings.lg};
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  border-radius: ${({ theme }) => theme.radii.pill};
  text-decoration: none;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition.normal};
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.button};

  &:hover {
    transform: translateY(-2px) scale(1.02);
    background-color: ${({ theme }) => theme.buttons.primary.backgroundHover};
  }
`;

const CtaLabel = styled.span`
  flex-grow: 1;
  text-align: center;
  margin-right: ${({ theme }) => theme.spacings.sm};
  color: ${({ theme }) => theme.buttons.primary.text};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(40%);
  will-change: transform, opacity;
`;

const CtaIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.radii.circle};
  font-size: 1.1em;
  flex-shrink: 0;
  opacity: 0;
  transform: scale(0.5);
  will-change: transform, opacity;
`;
