import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useGsap } from "@/contexts/GsapContext"; 

const HeroSection = ({ animate = false }) => {
  const gsap = useGsap();

  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (!gsap) {
      if (animate) console.error("[HeroSection.jsx] gsap not available from context!");
      return;
    }

    const elements = [heading1Ref.current, heading2Ref.current, paragraphRef.current];
    if (elements.some((el) => !el)) return;

    if (animate) {
      const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
      tl.to(heading1Ref.current, { y: "0%", opacity: 1, delay: 0.2 });
      tl.to(heading2Ref.current, { y: "0%", opacity: 1 }, "-=0.8");
      tl.to(paragraphRef.current, { y: "0%", opacity: 1 }, "-=0.7");
    } else {
      gsap.set(elements, { y: "0%", opacity: 1 });
    }
  }, [animate, gsap]);

  if (animate && !gsap) return null;

  return (
    <HeroWrapper>
      <HeroCopy>
        <Line>
          <HeroHeading ref={heading1Ref}>
            <span>Rooted</span> in passion,
          </HeroHeading>
        </Line>
        <Line>
          <HeroHeading ref={heading2Ref}>
            grown with <span>strength.</span>
          </HeroHeading>
        </Line>
      </HeroCopy>
      <Line>
        <HeroParagraph ref={paragraphRef}>
          Bikes created with passion for lovers of two wheels.
        </HeroParagraph>
      </Line>
    </HeroWrapper>
  );
};

export default HeroSection;


// --- Styled Components ---
const HeroWrapper = styled.section`
  width: 100%;
  padding: 20vh 0 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  overflow: hidden;
`;

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Line = styled.div`
  overflow: hidden;
`;

const HeroHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h1};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  transform: translateY(120%);
  opacity: 0;
  will-change: transform, opacity;
  font-family: ${({ theme }) => theme.fonts.heading};

  span {
    font-family: ${({ theme }) => theme.fonts.special};
    font-style: italic;
    color: ${({ theme }) => theme.colors.title};
  }
`;

const HeroParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 640px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  transform: translateY(100px);
  opacity: 0;
  will-change: transform, opacity;
  font-family: ${({ theme }) => theme.fonts.body};
`;
