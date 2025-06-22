// src/components/home/HeroSection.jsx
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
// import gsap from 'gsap'; 

// --- Styled-Components  ---
const HeroWrapper = styled.section`
    width: 100%;
    padding-top: 20vh; 
    padding-bottom: 10vh; 
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em; 
    color: ${({ theme }) => theme.colors.text || '#fff'};
    text-align: center; 
    overflow: hidden; 
`;

const HeroCopy = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em; 
`;

const Line = styled.div`
    overflow: hidden;
`;

const HeroHeading = styled.h1`
    font-size: clamp(2.5rem, 8vw, 5rem); 
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    margin: 0; 
    transform: translateY(120%);
    opacity: 0;
    will-change: transform, opacity;

    span {
        font-family: ${({ theme }) => theme.fonts.special || '"PP Editorial Old", sans-serif'};
        font-style: italic;
    }
`;

const HeroParagraph = styled.p`
    font-size: clamp(1rem, 2.5vw, 1.25rem); 
    font-weight: 300; 
    line-height: 1.5;
    color: inherit;
    max-width: 600px; 
    margin: 0 auto; 
    padding: 0 1em; 
    transform: translateY(100px); 
    opacity: 0;
    will-change: transform, opacity;
`;
// --- Styled Components ---

const HeroSection = ({ animate }) => { 
  const gsap = window.gsap; 

  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (!gsap) {
      console.error("[HeroSection.jsx] window.gsap is not available for animation!"); 
      
      if(heading1Ref.current && heading2Ref.current && paragraphRef.current && animate){
          heading1Ref.current.style.transform = 'translateY(0%)';
          heading1Ref.current.style.opacity = '1';
          heading2Ref.current.style.transform = 'translateY(0%)';
          heading2Ref.current.style.opacity = '1';
          paragraphRef.current.style.transform = 'translateY(0%)';
          paragraphRef.current.style.opacity = '1';
      }
      return; 
    }

    const h1 = heading1Ref.current;
    const h2 = heading2Ref.current;
    const p = paragraphRef.current;

    if (h1 && h2 && p) {
        
        gsap.set(h1, { y: '120%', opacity: 0 });
        gsap.set(h2, { y: '120%', opacity: 0 });
        gsap.set(p, { y: '100px', opacity: 0 });

        if (animate) {
            // console.log("[HeroSection.jsx] Animating IN with window.gsap");
            const tl = gsap.timeline({ 
              defaults: { duration: 1, ease: 'power3.out' },
              delay: 0.9 
            });
            
            tl.to(h1, { y: '0%', opacity: 1 });
            tl.to(h2, { y: '0%', opacity: 1 }, "-=0.8"); 
            tl.to(p, { y: '0%', opacity: 1 }, "-=0.7");
        } else if (sessionStorage.getItem('loaderAnimationComplete') === 'true') { 
            
             gsap.set([h1, h2, p], { y: '0%', opacity: 1, visibility: 'visible' });
        }
    }
  }, [animate, gsap]); // Dodano gsap do zależności

  if (typeof window !== "undefined" && !window.gsap && animate) {
      console.error("[HeroSection.jsx] Cannot animate because window.gsap is not available.");
      return null; 
  }

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